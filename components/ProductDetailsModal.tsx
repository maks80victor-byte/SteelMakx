import React from 'react';
import { X, ShoppingCart, Zap, Check, Shield, Star, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
    product,
    isOpen,
    onClose,
    onAddToCart
}) => {
    if (!isOpen || !product) return null;

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-steel-card border border-steel-border rounded-2xl shadow-2xl overflow-hidden animate-slide-in flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-steel-green rounded-full transition-colors z-20 backdrop-blur-sm"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 relative bg-black/20 flex items-center justify-center p-8 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-steel-card/50 z-10"></div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain max-h-[400px] transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                    />

                    {/* Badges Overlay */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                        {product.badge && (
                            <span className="bg-steel-accent text-steel-dark text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                {product.badge}
                            </span>
                        )}
                        {discount > 0 && (
                            <span className="bg-steel-green text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                -{discount}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar bg-steel-card">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-steel-green text-sm font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs font-medium text-gray-300">{product.rating || 4.8} (120+ avaliações)</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                            {product.name}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags && product.tags.map((tag, i) => (
                                <span key={i} className="text-xs text-gray-400 bg-steel-dark px-2.5 py-1 rounded-md border border-steel-border">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price Box */}
                    <div className="bg-steel-dark/50 border border-steel-border rounded-xl p-4 mb-6">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-white">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-gray-500 line-through mb-1.5">
                                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-400 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-steel-accent" />
                            Entrega automática via e-mail
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mb-8">
                        <button
                            onClick={() => {
                                onAddToCart(product);
                                onClose();
                            }}
                            className="w-full bg-steel-green hover:bg-steel-greenHover text-white font-bold py-4 rounded-xl shadow-lg shadow-steel-green/20 hover:shadow-steel-green/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Adicionar ao Carrinho
                        </button>
                        <button className="w-full bg-steel-dark border border-steel-border hover:bg-steel-border text-white font-semibold py-3 rounded-xl transition-all active:scale-95">
                            Comprar Agora
                        </button>
                    </div>

                    {/* Features / Info */}
                    <div className="space-y-4 border-t border-steel-border pt-6 mt-auto">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-steel-green/10 rounded-lg text-steel-green">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Envio Imediato</h4>
                                <p className="text-gray-400 text-xs mt-0.5">Receba sua chave de ativação em segundos após a confirmação do pagamento.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-steel-green/10 rounded-lg text-steel-green">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Garantia Vitalícia</h4>
                                <p className="text-gray-400 text-xs mt-0.5">Suporte total e garantia de funcionamento para todos os produtos.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-steel-green/10 rounded-lg text-steel-green">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Ativação Global</h4>
                                <p className="text-gray-400 text-xs mt-0.5">Funciona em contas de qualquer região (salvo indicação contrária).</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
