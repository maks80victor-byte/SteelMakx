import React from 'react';
import { X, Lock, Eye, Share2, ShieldCheck, FileText, Database, Mail, MessageSquare } from 'lucide-react';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
                        <Lock className="h-6 w-6 text-steel-green" />
                        Política de Privacidade
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
                        Sua privacidade é nossa prioridade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
                    </div>

                    {/* Section 1: Informações Recolhidas */}
                    <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <Database className="h-5 w-5 text-steel-accent" />
                            1. Informações Recolhidas
                        </h3>
                        <p className="text-sm mb-2">
                            Coletamos as informações que você nos fornece diretamente ao criar uma conta, fazer uma compra ou entrar em contato conosco. Isso pode incluir:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Nome completo e informações de contato (e-mail, telefone).</li>
                            <li>Dados de pagamento e faturamento (processados de forma segura por terceiros).</li>
                            <li>Informações da conta (usuário, histórico de pedidos).</li>
                        </ul>
                    </section>

                    {/* Section 2: Uso das Informações */}
                    <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <Eye className="h-5 w-5 text-steel-accent" />
                            2. Uso das Informações
                        </h3>
                        <p className="text-sm">
                            Utilizamos suas informações para:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                            <li>Processar e entregar seus pedidos.</li>
                            <li>Comunicar sobre o status da compra e atualizações da conta.</li>
                            <li>Melhorar nossa plataforma e prevenir fraudes.</li>
                            <li>Enviar ofertas e promoções, caso você tenha optado por recebê-las.</li>
                        </ul>
                    </section>

                    {/* Section 3: Compartilhamento de Dados */}
                    <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-steel-accent" />
                            3. Compartilhamento de Dados
                        </h3>
                        <p className="text-sm">
                            Não vendemos suas informações pessoais. Compartilhamos dados apenas com:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                            <li>Processadores de pagamento (para efetuar transações).</li>
                            <li>Prestadores de serviços essenciais (hospedagem, segurança).</li>
                            <li>Autoridades legais, se exigido por lei.</li>
                        </ul>
                    </section>

                    {/* Section 4: Método de Divulgação e Segurança */}
                    <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-steel-accent" />
                            4. Segurança e Proteção
                        </h3>
                        <p className="text-sm mb-2">
                            Adotamos medidas rigorosas de segurança para proteger suas informações:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Criptografia SSL em todas as transações.</li>
                            <li>Acesso restrito a dados pessoais apenas a funcionários autorizados.</li>
                            <li>Monitoramento constante contra vulnerabilidades e ataques.</li>
                        </ul>
                        <p className="text-sm mt-2 text-gray-400">
                            Embora nos esforcemos para proteger seus dados, nenhuma transmissão pela internet é 100% segura, mas garantimos o uso das melhores práticas do mercado.
                        </p>
                    </section>

                    {/* Section 5: Seus Direitos */}
                    <section className="bg-steel-dark/30 p-4 rounded-xl border border-steel-border/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-steel-accent" />
                            5. Seus Direitos
                        </h3>
                        <p className="text-sm">
                            Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento, entrando em contato com nosso suporte.
                        </p>
                    </section>

                    {/* Support Section */}
                    <div className="border-t border-steel-border pt-6 mt-6">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            📩 Dúvidas sobre Privacidade?
                        </h4>
                        <p className="text-sm mb-4">Entre em contato com nossa equipe de proteção de dados:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-steel-card p-3 rounded-lg border border-steel-border/50">
                                <Mail className="h-5 w-5 text-steel-green" />
                                <span className="text-sm text-white">privacidade@steelmakx.com</span>
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
