import React, { useState, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { RefundPolicyModal } from './components/RefundPolicyModal';
import { TermsModal } from './components/TermsModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { Product, CartItem } from './types';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

import { PaymentModal } from './components/PaymentModal';

function App() {
  const navigate = useNavigate();

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Payment State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Auth State
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Modals State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      const { preferenceId, error } = await response.json();

      if (error) throw new Error(error);

      if (preferenceId) {
        setPreferenceId(preferenceId);
        setIsPaymentOpen(true);
        setIsCartOpen(false); // Close cart drawer
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Erro ao iniciar pagamento: ' + (error.message || 'Error desconhecido'));
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleFooterCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-steel-dark flex flex-col font-sans relative overflow-x-hidden">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        isCheckoutLoading={isCheckoutLoading}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        preferenceId={preferenceId}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <RefundPolicyModal
        isOpen={isRefundPolicyOpen}
        onClose={() => setIsRefundPolicyOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route path="/politica-privacidade" element={<PrivacyPolicyPage />} />
      </Routes>

      <Footer
        onOpenRefundPolicy={() => setIsRefundPolicyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
        onCategoryClick={handleFooterCategoryClick}
      />
      <SpeedInsights />
    </div>
  );
}

export default App;
