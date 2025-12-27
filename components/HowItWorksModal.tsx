import React from 'react';
import { X, ShoppingCart, CreditCard, Zap, CheckCircle } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      title: "1. Escolha seu produto",
      description: "Navegue pela nossa seleção de jogos, gift cards e softwares. Adicione os itens desejados ao seu carrinho."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: "2. Pagamento Seguro",
      description: "Finalize sua compra com total segurança. Aceitamos Pix para aprovação imediata e cartões de crédito."
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "3. Entrega Automática",
      description: "Assim que o pagamento for confirmado, você recebe seu código ou chave de ativação instantaneamente no e-mail e na tela."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "4. Ative e Aproveite",
      description: "Siga as instruções simples para ativar seu produto na plataforma correspondente (Steam, Xbox, PSN, etc) e divirta-se!"
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-steel-card border border-steel-border rounded-2xl shadow-2xl overflow-hidden animate-slide-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-steel-border flex items-center justify-between bg-steel-dark/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-steel-green">Como Funciona</span> a SteelMakx
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-steel-border rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-steel-dark/30 border border-steel-border/50 hover:border-steel-green/30 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-steel-green/20 flex items-center justify-center border border-steel-green/30">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-steel-green/10 border border-steel-green/20 rounded-xl p-4 text-center">
            <p className="text-steel-green font-medium text-sm">
              Dúvidas? Nosso suporte funciona 24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-steel-border bg-steel-dark/50">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-steel-green hover:bg-steel-greenHover text-white font-bold rounded-xl transition-all shadow-lg shadow-steel-green/20"
          >
            Entendi, vamos às compras!
          </button>
        </div>
      </div>
    </div>
  );
};