import React from 'react';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';

interface HeroProps {
  onOpenHowItWorks?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHowItWorks }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/banners/SteelMakx---Banners-1920x600px-para-hero-sections.webp"
          alt="SteelMakx Gaming Banner"
          className="w-full h-full object-cover opacity-100"
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-steel-dark/80 via-steel-dark/90 to-steel-dark"></div>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-steel-green/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-steel-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-steel-green/10 border border-steel-green/20 text-steel-green text-sm font-medium mb-6 animate-fade-in">
            <Star className="h-3 w-3 fill-current" />
            <span>Melhores preços do Brasil</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Level up na sua diversão <br className="hidden sm:block" />
            com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-steel-green to-emerald-400">SteelMakx</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Encontre gift cards, jogos digitais e assinaturas com entrega imediata e suporte 24/7. O menor preço do mercado está aqui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('products')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-steel-green hover:bg-steel-greenHover text-white font-semibold rounded-xl transition-all shadow-lg shadow-steel-green/25 hover:-translate-y-1"
            >
              Ver Ofertas
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="https://wa.me/556596690117?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20SteelMakx."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-gray-700 hover:border-[#25D366] text-gray-300 hover:text-white hover:bg-[#25D366]/10 font-medium rounded-xl transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800 pt-8">
          {[
            { label: 'Clientes Felizes', value: '1mil+' },
            { label: 'Produtos', value: '40+' },
            { label: 'Entrega', value: 'Imediata' },
            { label: 'Suporte', value: '24/7' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
