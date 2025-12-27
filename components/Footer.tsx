import React from 'react';
import { Instagram, MessageCircle, Mail, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface FooterProps {
  onOpenRefundPolicy: () => void;

  onOpenTerms: () => void;
  onOpenHelpCenter: () => void;
  onCategoryClick: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRefundPolicy,
  onOpenTerms,
  onOpenHelpCenter,
  onCategoryClick
}) => {
  return (
    <footer className="bg-steel-card border-t border-steel-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 select-none">
              <Zap className="h-6 w-6 text-steel-green fill-steel-green" />
              <span className="text-2xl font-extrabold text-white tracking-tighter">
                STEEL<span className="text-steel-green">MAKX</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A melhor loja de produtos digitais com entrega imediata e suporte eficiente. Desenvolvido para gamers, por gamers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/maxicollombo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-steel-border rounded-lg text-gray-400 hover:text-white hover:bg-steel-green transition-all"
                aria-label="Siga no Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/556596690117?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20SteelMakx."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-steel-border rounded-lg text-gray-400 hover:text-white hover:bg-[#25D366] transition-all"
                aria-label="Falar no WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Categorias</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onCategoryClick(Category.GAMES)}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Jogos PC & Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick(Category.GAMES)}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Xbox Game Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick(Category.GIFT_CARDS)}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Gift Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick(Category.SOFTWARE)}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Software
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Suporte</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button
                  onClick={onOpenHelpCenter}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Central de Ajuda
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Termos e Condições
                </button>
              </li>
              <li>
                <Link
                  to="/politica-privacidade"
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenRefundPolicy}
                  className="hover:text-steel-green transition-colors text-left"
                >
                  Política de Reembolso
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Fique por dentro</h4>
            <p className="text-gray-400 text-sm mb-4">Receba ofertas exclusivas no seu email.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-steel-dark border border-steel-border rounded-lg px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-steel-green"
              />
              <button className="bg-steel-green text-white px-3 py-2 rounded-lg hover:bg-steel-greenHover transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Copyright © 2025 SteelMakx Store. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>Segurança SSL</span>
            <span>Pagamento Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
