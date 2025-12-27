import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isBlueprint = product.name.toLowerCase().includes('blueprint') ||
    product.name.toLowerCase().includes('diagrama') ||
    (product.tags && product.tags.includes('Diagrama'));

  return (
    <div
      onClick={() => onClick(product)}
      className={`group relative bg-steel-card rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col h-full hover:-translate-y-1 cursor-pointer ${isBlueprint
          ? 'border-blue-500 hover:border-blue-400 hover:shadow-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
          : 'border-steel-border hover:border-steel-green/50 hover:shadow-steel-green/10'
        }`}
    >
      {/* Image Container */}
      <div className={`relative aspect-[4/3] overflow-hidden ${isBlueprint ? 'blueprint-grid p-6' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full transform group-hover:scale-110 transition-transform duration-500 ${isBlueprint ? 'object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'object-cover'}`}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {(product.badge || isBlueprint) && (
            <span className={`${isBlueprint ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-steel-accent'} text-white text-xs font-bold px-2 py-1 rounded shadow-sm border border-white/10 uppercase`}>
              {product.badge || 'DIAGRAMA'}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-steel-green text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs text-steel-green font-bold uppercase tracking-wider">
            {product.category}
          </span>
          {product.tags && product.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[10px] text-gray-500 bg-steel-dark px-1.5 py-0.5 rounded border border-steel-border">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-white font-semibold text-lg leading-tight mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          {product.originalPrice && (
            <div className="text-gray-500 text-xs line-through mb-1">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-xs text-gray-400 block">À vista no Pix</span>
              <span className="text-xl sm:text-2xl font-bold text-white">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-3 bg-steel-green text-white rounded-lg hover:bg-steel-greenHover active:scale-95 transition-all shadow-lg shadow-steel-green/20"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Instant Delivery Tag */}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-steel-accent border border-white/10" title="Entrega Automática">
        <Zap className="h-4 w-4 fill-current" />
      </div>
    </div>
  );
};