import React from 'react';
import { X, FileText, Shield, UserCheck, CreditCard, AlertTriangle, RefreshCw, Mail, MessageSquare } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
            <FileText className="h-6 w-6 text-steel-green" />
            Termos e Condições
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
          
          <div className="bg-steel-green/10 border border-steel-green/20 p-4 rounded-xl text-sm text-steel-green">
            Ao utilizar nossos serviços, você declara estar de acordo com os presentes Termos e Condições. Recomendamos a leitura completa antes de continuar.
          </div>

          {/* Section 1 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-steel-accent" />
              1. Uso da Plataforma
            </h3>
            <p className="text-sm">
              O acesso é permitido apenas para maiores de 18 anos ou menores acompanhados de responsável legal. Qualquer uso indevido, tentativa de fraude ou violação de regras pode resultar em suspensão da conta.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-steel-accent" />
              2. Cadastro e Dados
            </h3>
            <p className="text-sm">
              Informações fornecidas no momento do cadastro devem ser verdadeiras e atualizadas. A empresa não se responsabiliza por dados incorretos inseridos pelo usuário.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-steel-accent" />
              3. Pagamentos
            </h3>
            <p className="text-sm">
              Os pagamentos realizados dentro da plataforma devem seguir os métodos disponibilizados. Transações são processadas com segurança por parceiros certificados.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-steel-accent" />
              4. Responsabilidade do Usuário
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Utilizar o serviço de forma ética e legal.</li>
              <li>Manter senha e acesso em sigilo.</li>
              <li>Não publicar conteúdo ofensivo, ilegal ou que viole direitos de terceiros.</li>
            </ul>
          </section>

           {/* Section 5 */}
           <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-steel-accent" />
              5. Alterações nos Termos
            </h3>
            <p className="text-sm">
              Os termos podem ser atualizados a qualquer momento. O uso contínuo dos serviços representa aceitação das novas condições.
            </p>
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