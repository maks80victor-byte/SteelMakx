import React from 'react';
import { X, FileText, AlertCircle, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ isOpen, onClose }) => {
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
            Política de Reembolso
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
          
          {/* Section 1 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="bg-steel-green/20 text-steel-green w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
              Cancelamento de Serviços
            </h3>
            <p className="text-sm">
              O usuário pode solicitar cancelamento dentro do prazo estipulado. Pedidos já iniciados ou concluídos (como chaves de ativação já visualizadas ou resgatadas) podem não ser elegíveis para reembolso devido à natureza irreversível dos produtos digitais.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="bg-steel-green/20 text-steel-green w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
              Condições para Reembolso
            </h3>
            <div className="space-y-3 text-sm">
              <p>Reembolsos serão avaliados nos seguintes casos:</p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-steel-accent mt-0.5 flex-shrink-0" />
                  <span>Problemas técnicos comprovados que impeçam o uso do serviço;</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-steel-accent mt-0.5 flex-shrink-0" />
                  <span>Cobrança duplicada;</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-steel-accent mt-0.5 flex-shrink-0" />
                  <span>Erro no processamento do pagamento.</span>
                </li>
              </ul>
              <p className="mt-2 italic text-gray-500">
                Em casos de desacordo sobre a qualidade do serviço, a solicitação será analisada individualmente pelo nosso time de qualidade.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="bg-steel-green/20 text-steel-green w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
              Prazos
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p>
                Após aprovação, o reembolso será processado em até <strong className="text-white">7 dias úteis</strong>. O prazo de compensação na sua conta pode variar conforme o banco ou operadora do cartão de crédito.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="bg-steel-green/20 text-steel-green w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span>
              Como Solicitar
            </h3>
            <div className="space-y-3 text-sm">
              <p>Envie sua solicitação pelos canais de suporte (WhatsApp ou E-mail) informando:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="bg-steel-card p-2 rounded border border-steel-border/30 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-steel-green" /> Nome completo
                </li>
                <li className="bg-steel-card p-2 rounded border border-steel-border/30 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-steel-green" /> E-mail cadastrado
                </li>
                <li className="bg-steel-card p-2 rounded border border-steel-border/30 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-steel-green" /> Número do pedido
                </li>
                <li className="bg-steel-card p-2 rounded border border-steel-border/30 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-steel-green" /> Motivo da solicitação
                </li>
              </ul>
              <div className="flex items-center gap-2 mt-4 text-steel-green font-medium">
                <MessageSquare className="h-4 w-4" />
                <span>Nosso time retornará com a resposta e status do processo.</span>
              </div>
            </div>
          </section>

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