import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, Zap } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onSearch, onOpenLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-steel-dark/90 backdrop-blur-md border-b border-steel-border h-16 sm:h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1 cursor-pointer select-none group">
            <div className="relative">
              <Zap className="h-7 w-7 text-steel-green fill-steel-green transition-transform group-hover:scale-110 duration-300" />
              <div className="absolute inset-0 bg-steel-green/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tighter">
              STEEL<span className="text-steel-green">MAKX</span>
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Busque por jogos, gift cards..."
                className="w-full bg-steel-card text-gray-200 pl-10 pr-4 py-2.5 rounded-xl border border-steel-border focus:outline-none focus:ring-2 focus:ring-steel-green/50 focus:border-steel-green transition-all"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 group-focus-within:text-steel-green transition-colors" />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onOpenLogin}
              className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block"
              title="Minha Conta"
            >
              <User className="h-6 w-6" />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white bg-steel-green hover:bg-steel-greenHover rounded-lg transition-transform active:scale-95 group"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-steel-accent text-steel-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-steel-card border-b border-steel-border p-4 animate-fade-in">
           <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full bg-steel-dark text-white pl-10 pr-4 py-3 rounded-lg border border-steel-border focus:outline-none focus:ring-1 focus:ring-steel-green"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
            </form>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenLogin();
                }}
                className="text-left px-4 py-2 text-gray-300 hover:bg-steel-border rounded-lg flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                Minha Conta
              </button>
              <button className="text-left px-4 py-2 text-gray-300 hover:bg-steel-border rounded-lg">Meus Pedidos</button>
              <button className="text-left px-4 py-2 text-gray-300 hover:bg-steel-border rounded-lg">Suporte</button>
            </div>
        </div>
      )}
    </nav>
  );
};