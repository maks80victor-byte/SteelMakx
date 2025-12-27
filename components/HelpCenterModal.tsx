import React from 'react';
import { X, HelpCircle, BookOpen, UserPlus, ShoppingBag, CreditCard, MessageSquare, Mail } from 'lucide-react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
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
            <HelpCircle className="h-6 w-6 text-steel-green" />
            Central de Ajuda
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-steel-border rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 text-gray-300 leading-relaxed">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-steel-green/10 to-steel-dark border border-steel-green/20 p-6 rounded-xl">
             <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                📌 Introdução
             </h3>
             <p className="text-sm text-gray-300">
               Bem-vindo à Central de Ajuda. Aqui você encontra respostas rápidas, guias práticos e suporte para utilizar nossos serviços com segurança e eficiência.
             </p>
          </div>

          {/* Guides & Tutorials */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-steel-accent" />
              🔍 Guias e Tutoriais
            </h3>
            
            <div className="grid gap-4">
               {/* Account Guide */}
               <div className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50 hover:border-steel-green/30 transition-colors">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                     <UserPlus className="h-4 w-4 text-steel-green" /> Criando uma conta
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5 text-gray-400">
                     <li>Acesse o aplicativo ou site.</li>
                     <li>Cadastre seus dados pessoais.</li>
                     <li>Confirme o e-mail ou número de telefone.</li>
                     <li>Pronto, sua conta estará ativa.</li>
                  </ul>
               </div>

               {/* Order Guide */}
               <div className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50 hover:border-steel-green/30 transition-colors">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                     <ShoppingBag className="h-4 w-4 text-steel-green" /> Realizando pedidos/entregas
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5 text-gray-400">
                     <li>Encontre o serviço desejado no menu principal.</li>
                     <li>Confirme os detalhes e prossiga com o pedido.</li>
                     <li>Acompanhe o status em tempo real na área “Meus pedidos”.</li>
                  </ul>
               </div>

               {/* Payment Guide */}
               <div className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50 hover:border-steel-green/30 transition-colors">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                     <CreditCard className="h-4 w-4 text-steel-green" /> Pagamentos
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5 text-gray-400">
                     <li>Aceitamos cartão de crédito, débito ou outros meios digitais.</li>
                     <li>Informações de pagamento são criptografadas e protegidas.</li>
                  </ul>
               </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-steel-accent" />
              ❓ Perguntas Frequentes (FAQ)
            </h3>
            
            <div className="space-y-3">
               <div className="bg-steel-card border border-steel-border/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-1">Como recuperar minha senha?</h5>
                  <p className="text-sm text-gray-400">Acesse Esqueci minha senha, informe seu e-mail e siga as instruções enviadas.</p>
               </div>
               <div className="bg-steel-card border border-steel-border/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-1">Meu pagamento não foi aprovado, o que fazer?</h5>
                  <p className="text-sm text-gray-400">Recomendamos verificar limite, dados informados ou tentar outro método de pagamento.</p>
               </div>
               <div className="bg-steel-card border border-steel-border/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-1">Posso cancelar um pedido?</h5>
                  <p className="text-sm text-gray-400">Sim, desde que ainda não tenha sido processado. Veja Política de Reembolso abaixo.</p>
               </div>
            </div>
          </section>

          {/* Support Section */}
          <div className="border-t border-steel-border pt-6 mt-6">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              📩 Suporte direto
            </h4>
            <p className="text-sm mb-4">Caso não encontre a resposta aqui, fale com nossa equipe:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-steel-card p-3 rounded-lg border border-steel-border/50">
                <Mail className="h-5 w-5 text-steel-green" />
                <span className="text-sm text-white">suporte@empresa.com</span>
              </div>
              <div className="flex items-center gap-3 bg-steel-card p-3 rounded-lg border border-steel-border/50">
                <MessageSquare className="h-5 w-5 text-steel-green" />
                <span className="text-sm text-white">Chat: 08h às 20h</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-steel-border bg-steel-dark/50">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-steel-card hover:bg-steel-border border border-steel-border text-white font-semibold rounded-xl transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};