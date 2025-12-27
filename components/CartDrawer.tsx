import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  isCheckoutLoading: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  isCheckoutLoading
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);


  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-steel-card shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-steel-border flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-steel-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-steel-green" />
            <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
            <span className="bg-steel-border text-gray-400 text-xs px-2 py-1 rounded-full">
              {cart.length} itens
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-steel-border rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-steel-border/50 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">Seu carrinho está vazio</p>
              <button
                onClick={onClose}
                className="text-steel-green hover:underline font-medium"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-steel-dark/50 p-3 rounded-xl border border-steel-border group">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-steel-green font-bold mt-1">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-steel-border rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-gray-400 hover:text-white disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-steel-border bg-steel-card">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-steel-green text-sm">
                <span>Desconto Pix (-5%)</span>
                <span>- R$ {(total * 0.05).toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-gray-800">
                <span>Total</span>
                <span>R$ {(total * 0.95).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              disabled={isCheckoutLoading || cart.length === 0}
              className="w-full py-4 bg-steel-green hover:bg-steel-greenHover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-steel-green/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckoutLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Finalizar Compra
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};