import React, { useState, useMemo, useEffect } from 'react';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { ProductDetailsModal } from './ProductDetailsModal';
import { AdminPanel } from './AdminPanel';
import { AdminLogin } from './AdminLogin';
import { CheatSheetModal } from './CheatSheetModal';
import { HowItWorksModal } from './HowItWorksModal';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product, Category } from '../types';
import { Filter, SlidersHorizontal, ExternalLink, Settings, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HomeProps {
    addToCart: (product: Product) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function Home({ addToCart, searchQuery, setSearchQuery }: HomeProps) {
    const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Admin State
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        return sessionStorage.getItem('steelmax_admin_auth') === 'true';
    });
    const [adminError, setAdminError] = useState<string | null>(null);
    const [failedAttempts, setFailedAttempts] = useState(() => {
        return Number(localStorage.getItem('steelmax_admin_failures')) || 0;
    });
    const [lockoutTime, setLockoutTime] = useState(() => {
        return Number(localStorage.getItem('steelmax_admin_lockout')) || 0;
    });

    // Home Specific Modals
    const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

    // Filter State
    const [selectedCategory, setSelectedCategory] = useState<string>(Category.GAMES);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedCraftingTag, setSelectedCraftingTag] = useState<string | null>(null);
    const [showAllCraftingItems, setShowAllCraftingItems] = useState(false);

    // Supabase Fetching
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                setCurrentProducts(data);
            } else {
                setCurrentProducts(PRODUCTS);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setCurrentProducts(PRODUCTS);
        } finally {
            setIsLoading(false);
        }
    };

    // Security persistence
    useEffect(() => {
        localStorage.setItem('steelmax_admin_failures', failedAttempts.toString());
        localStorage.setItem('steelmax_admin_lockout', lockoutTime.toString());
    }, [failedAttempts, lockoutTime]);

    // Auto-logout
    useEffect(() => {
        if (!isAdminAuthenticated) return;
        let timeout: NodeJS.Timeout;
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsAdminAuthenticated(false);
                sessionStorage.removeItem('steelmax_admin_auth');
                setIsAdmin(false);
            }, 15 * 60 * 1000);
        };
        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);
        resetTimeout();
        return () => {
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
            clearTimeout(timeout);
        };
    }, [isAdminAuthenticated]);

    // Admin Handlers
    const handleAddProduct = async (product: Product) => {
        try {
            const { data, error } = await supabase.from('products').insert([{ ...product, id: undefined }]).select().single();
            if (error) throw error;
            setCurrentProducts(prev => [data, ...prev]);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Erro ao adicionar produto no Supabase.');
        }
    };

    const handleUpdateProduct = async (product: Product) => {
        try {
            const { error } = await supabase.from('products').update(product).eq('id', product.id);
            if (error) throw error;
            setCurrentProducts(prev => prev.map(p => p.id === product.id ? product : p));
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Erro ao atualizar produto no Supabase.');
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setCurrentProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Erro ao excluir produto no Supabase.');
        }
    };

    const handleAdminLogin = (password: string) => {
        const now = Date.now();
        if (lockoutTime > now) {
            const remainingSeconds = Math.ceil((lockoutTime - now) / 1000);
            setAdminError(`Muitas tentativas. Tente novamente em ${remainingSeconds}s.`);
            return;
        }
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'steelmax@admin';
        if (password === correctPassword) {
            setIsAdminAuthenticated(true);
            sessionStorage.setItem('steelmax_admin_auth', 'true');
            setAdminError(null);
            setFailedAttempts(0);
            localStorage.removeItem('steelmax_admin_failures');
            localStorage.removeItem('steelmax_admin_lockout');
        } else {
            const newFailures = failedAttempts + 1;
            setFailedAttempts(newFailures);
            if (newFailures >= 3) {
                setLockoutTime(Date.now() + 5 * 60 * 1000);
                setAdminError('Muitas tentativas falhas. Acesso bloqueado por 5 minutos.');
            } else {
                setAdminError(`Senha incorreta. Tentativa ${newFailures}/3.`);
            }
            setTimeout(() => setAdminError(null), 3000);
        }
    };

    // Price Filter State
    const globalMinPrice = useMemo(() => {
        if (currentProducts.length === 0) return 0;
        return Math.floor(Math.min(...currentProducts.map(p => p.price)));
    }, [currentProducts]);

    const globalMaxPrice = useMemo(() => {
        if (currentProducts.length === 0) return 1000;
        return Math.ceil(Math.max(...currentProducts.map(p => p.price)));
    }, [currentProducts]);

    const [minPrice, setMinPrice] = useState(globalMinPrice);
    const [maxPrice, setMaxPrice] = useState(globalMaxPrice);

    useEffect(() => {
        setMinPrice(globalMinPrice);
        setMaxPrice(globalMaxPrice);
    }, [globalMinPrice, globalMaxPrice]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setSelectedTag(null);
    };

    // Check URL params for category on mount (Optional but nice)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat && Object.values(Category).includes(cat as any)) {
            setSelectedCategory(cat);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const availableTags = useMemo(() => {
        const productsInCat = currentProducts.filter(p => p.category === selectedCategory);
        const tags = new Set<string>();
        productsInCat.forEach(p => p.tags?.forEach(tag => tags.add(tag)));
        let sortedTags = Array.from(tags).sort();
        if (selectedCategory === 'Jogos') {
            const priority = ['RPG', 'FPS', 'Ação', 'Aventura', 'Estratégia'];
            sortedTags.sort((a, b) => {
                const idxA = priority.indexOf(a);
                const idxB = priority.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a.localeCompare(b);
            });
        }
        return sortedTags;
    }, [selectedCategory, currentProducts]);

    const filteredProducts = useMemo(() => {
        return currentProducts.filter(product => {
            const matchesCategory = product.category === selectedCategory;
            const matchesTag = selectedTag === null || (product.tags && product.tags.includes(selectedTag));
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesCategory && matchesTag && matchesSearch && matchesPrice;
        });
    }, [selectedCategory, selectedTag, searchQuery, minPrice, maxPrice, currentProducts]);

    const craftingItems = useMemo(() => {
        return currentProducts.filter(p => {
            const isCrafting = p.category === Category.CRAFTING_ITEMS;
            const matchesTag = !selectedCraftingTag || p.tags.includes(selectedCraftingTag);
            return isCrafting && matchesTag;
        });
    }, [selectedCraftingTag, currentProducts]);

    const craftingTags = [
        'Munição', 'Fuzil de Assalto', 'Aumento', 'Amuleto de Mochila', 'Material Básico',
        'Fuzil de Batalha', 'Diagrama', 'Cosmético', 'Canhão de Mão', 'Chave',
        'Metralhadora Leve', 'Material', 'Diversos', 'Modificação', 'Natureza',
        'Traje', 'Pistola', 'Uso Rápido', 'Reciclável', 'Material Refinado',
        'Submetralhadora', 'Escudo', 'Escopeta', 'Rifle de Precisão', 'Especial',
        'Material da Superfície', 'Bibeliô'
    ];

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };
    const getPercent = (value: number) => Math.round(((value - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100);

    if (isAdmin) {
        if (!isAdminAuthenticated) {
            return (
                <AdminLogin
                    onLogin={handleAdminLogin}
                    onCancel={() => setIsAdmin(false)}
                    error={adminError}
                />
            );
        }
        return (
            <AdminPanel
                products={currentProducts}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onBack={() => setIsAdmin(false)}
            />
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-steel-green animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Carregando SteelMakx...</p>
            </div>
        );
    }

    return (
        <>
            <button
                onDoubleClick={() => setIsAdmin(true)}
                className="fixed bottom-4 left-4 w-10 h-10 bg-steel-card/10 hover:bg-steel-green/5 border border-steel-border/10 rounded-full flex items-center justify-center text-gray-800 hover:text-gray-700 transition-all z-[100] group cursor-default"
                title="Protocol Support"
            >
                <Settings className="w-5 h-5 opacity-20 group-hover:opacity-40 transition-opacity" />
            </button>

            <HowItWorksModal
                isOpen={isHowItWorksOpen}
                onClose={() => setIsHowItWorksOpen(false)}
            />

            <ProductDetailsModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />

            <CheatSheetModal
                isOpen={isCheatSheetOpen}
                onClose={() => setIsCheatSheetOpen(false)}
            />

            <main className="flex-grow">
                <Hero onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />

                {/* Categories Section */}
                <section className="py-12 bg-steel-dark" id="products">
                    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-6 mb-12">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Populares</h2>
                                    <p className="text-gray-400">As melhores ofertas selecionadas para você.</p>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                <div className="flex-1 flex flex-col gap-4 w-full">
                                    {/* Main Categories */}
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleCategoryChange(cat.id)}
                                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedCategory === cat.id
                                                    ? 'bg-steel-green text-white shadow-lg shadow-steel-green/20 scale-105'
                                                    : 'bg-steel-card text-gray-400 hover:text-white border border-steel-border hover:border-steel-green/50'
                                                    }`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Subcategories / Tags */}
                                    {availableTags.length > 0 && (
                                        <div className="flex items-center gap-3 animate-fade-in overflow-x-auto pb-2 scrollbar-hide w-full border-t border-steel-border/50 pt-4 mt-2">
                                            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider whitespace-nowrap pl-1">
                                                {selectedCategory === 'Jogos' ? 'Gêneros:' : 'Filtrar:'}
                                            </span>
                                            <div className="flex gap-2">
                                                {availableTags.map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap ${selectedTag === tag
                                                            ? 'bg-steel-green text-white border-steel-green shadow-md shadow-steel-green/20'
                                                            : 'bg-steel-card border-steel-border text-gray-400 hover:text-white hover:border-gray-500'
                                                            }`}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price Filter */}
                                <div className="w-full lg:w-72 bg-steel-card/50 border border-steel-border p-4 rounded-xl flex flex-col gap-3 animate-fade-in">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                            <SlidersHorizontal className="w-4 h-4 text-steel-green" />
                                            Faixa de Preço
                                        </div>
                                        <div className="text-xs font-mono text-steel-green bg-steel-green/10 px-2 py-1 rounded">
                                            R$ {minPrice} - R$ {maxPrice}
                                        </div>
                                    </div>

                                    <div className="relative h-2 w-full mt-2 mb-2">
                                        <div className="absolute w-full h-full bg-steel-border rounded-full z-0"></div>
                                        <div
                                            className="absolute h-full bg-steel-green rounded-full z-10 transition-all duration-75"
                                            style={{
                                                left: `${getPercent(minPrice)}%`,
                                                width: `${getPercent(maxPrice) - getPercent(minPrice)}%`
                                            }}
                                        ></div>
                                        <input
                                            type="range"
                                            min={globalMinPrice}
                                            max={globalMaxPrice}
                                            value={minPrice}
                                            onChange={handleMinPriceChange}
                                            className="absolute top-0 w-full h-full appearance-none bg-transparent pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing hover:[&::-webkit-slider-thumb]:scale-110 transition-all [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing"
                                        />
                                        <input
                                            type="range"
                                            min={globalMinPrice}
                                            max={globalMaxPrice}
                                            value={maxPrice}
                                            onChange={handleMaxPriceChange}
                                            className="absolute top-0 w-full h-full appearance-none bg-transparent pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing hover:[&::-webkit-slider-thumb]:scale-110 transition-all [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={addToCart}
                                        onClick={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-steel-card/30 rounded-2xl border border-steel-border border-dashed px-4 text-center">
                                <Filter className="w-20 h-20 mb-6 opacity-20" />
                                <p className="text-xl font-medium mb-2 text-white">Nenhum resultado para sua busca ou filtros aplicados</p>
                                <p className="text-sm opacity-60 max-w-md mx-auto">Tente ajustar os termos, limpar os filtros ou expandir a faixa de preço.</p>
                                <button
                                    onClick={() => {
                                        setSelectedTag(null);
                                        setSearchQuery('');
                                        setSelectedCategory('Jogos');
                                        setMinPrice(globalMinPrice);
                                        setMaxPrice(globalMaxPrice);
                                    }}
                                    className="mt-6 text-steel-green hover:underline text-sm font-medium"
                                >
                                    Limpar todos os filtros
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Crafting Items (ARC Raiders) Section */}
                <section className="py-20 bg-steel-dark/50 border-y border-steel-border" id="crafting-items">
                    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-2 text-steel-green font-bold text-sm tracking-widest uppercase mb-3">
                                    <span className="w-8 h-[2px] bg-steel-green"></span>
                                    EXCLUSIVO: ARC RAIDERS
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4 italic">ITENS DE CRAFTING</h2>
                                <p className="text-gray-400 text-lg">
                                    Coletáveis essenciais para sobreviver e evoluir. Baseado no guia ARC Raiders Recycling Cheat Sheet.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCheatSheetOpen(true)}
                                className="text-steel-green hover:text-white transition-colors flex items-center gap-2 font-bold"
                            >
                                Ver Guia Completo <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mb-10 animate-fade-in relative">
                            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-steel-green/20 scrollbar-track-transparent mask-fade-right">
                                <button
                                    onClick={() => setSelectedCraftingTag(null)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${!selectedCraftingTag
                                        ? 'bg-steel-green text-white shadow-lg shadow-steel-green/20'
                                        : 'bg-steel-card text-gray-500 hover:text-white border border-steel-border'
                                        }`}
                                >
                                    Tudo
                                </button>
                                {craftingTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedCraftingTag(tag)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${selectedCraftingTag === tag
                                            ? 'bg-steel-green text-white border-steel-green shadow-lg shadow-steel-green/20'
                                            : 'bg-steel-card text-gray-400 border-steel-border hover:border-steel-green/50 hover:text-white'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {(showAllCraftingItems ? craftingItems : craftingItems.slice(0, 8)).map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                    onClick={setSelectedProduct}
                                />
                            ))}
                        </div>

                        {!showAllCraftingItems && craftingItems.length > 8 && (
                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => setShowAllCraftingItems(true)}
                                    className="px-8 py-3 bg-steel-card border border-steel-border text-white font-bold rounded-xl hover:bg-steel-green hover:border-steel-green transition-all"
                                >
                                    Ver todos os itens ({craftingItems.length})
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Feature Banner */}
                <section className="py-24 relative overflow-hidden" id="how-it-works">
                    <div className="absolute inset-0 bg-steel-green/5"></div>
                    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative">
                        <div className="bg-gradient-to-r from-steel-card to-steel-dark border border-steel-border p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                            <div className="max-w-xl">
                                <h2 className="text-3xl font-bold text-white mb-4">Receba seus jogos instantaneamente</h2>
                                <p className="text-gray-400 mb-8">
                                    Na SteelMakx, a entrega é automática. Pagou, recebeu. Sem enrolação e com ativação garantida em todas as plataformas.
                                </p>
                                <button
                                    onClick={() => setIsHowItWorksOpen(true)}
                                    className="px-8 py-3 bg-white text-steel-dark font-bold rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    Saiba mais
                                </button>
                            </div>
                            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">S</div>
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">X</div>
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">P</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
