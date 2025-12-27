import React, { useEffect } from 'react';
import { Lock, Eye, Share2, ShieldCheck, Database, FileText, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-steel-dark min-h-screen py-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-steel-green hover:text-white mb-8 transition-colors font-semibold"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Voltar para a Loja
                </Link>

                <div className="bg-steel-card border border-steel-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-steel-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-10 border-b border-steel-border/50 pb-8">
                        <div className="p-4 bg-steel-green/10 rounded-2xl">
                            <Lock className="h-10 w-10 text-steel-green" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                                Política de Privacidade
                            </h1>
                            <p className="text-gray-400">Última atualização: Dezembro 2025</p>
                        </div>
                    </div>

                    <div className="space-y-12 text-gray-300 leading-relaxed">

                        <div className="bg-steel-green/5 border border-steel-green/10 p-6 rounded-2xl text-steel-green font-medium">
                            Sua privacidade é nossa prioridade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais na SteelMakx.
                        </div>

                        {/* Section 1: Informações Recolhidas */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="p-2 bg-steel-dark rounded-lg border border-steel-border">
                                    <Database className="h-5 w-5 text-steel-green" />
                                </div>
                                1. Informações Recolhidas
                            </h3>
                            <p className="mb-4">
                                Coletamos as informações que você nos fornece diretamente ao criar uma conta, fazer uma compra ou entrar em contato conosco. Isso pode incluir:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-3 bg-steel-dark/50 p-3 rounded-lg border border-steel-border/50">
                                    <div className="w-1.5 h-1.5 bg-steel-green rounded-full"></div>
                                    Nome completo e contato
                                </li>
                                <li className="flex items-center gap-3 bg-steel-dark/50 p-3 rounded-lg border border-steel-border/50">
                                    <div className="w-1.5 h-1.5 bg-steel-green rounded-full"></div>
                                    Dados de pagamento
                                </li>
                                <li className="flex items-center gap-3 bg-steel-dark/50 p-3 rounded-lg border border-steel-border/50">
                                    <div className="w-1.5 h-1.5 bg-steel-green rounded-full"></div>
                                    Histórico de pedidos
                                </li>
                                <li className="flex items-center gap-3 bg-steel-dark/50 p-3 rounded-lg border border-steel-border/50">
                                    <div className="w-1.5 h-1.5 bg-steel-green rounded-full"></div>
                                    Preferências de conta
                                </li>
                            </ul>
                        </section>

                        {/* Section 2: Uso das Informações */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="p-2 bg-steel-dark rounded-lg border border-steel-border">
                                    <Eye className="h-5 w-5 text-steel-green" />
                                </div>
                                2. Uso das Informações
                            </h3>
                            <p className="mb-4">
                                Utilizamos suas informações para garantir a melhor experiência possível:
                            </p>
                            <div className="space-y-3 pl-4 border-l-2 border-steel-border">
                                <p>• Processar e entregar seus produtos digitais instantaneamente.</p>
                                <p>• Comunicar sobre o status da compra e atualizações importantes.</p>
                                <p>• Melhorar nossa plataforma, detectar bugs e prevenir fraudes.</p>
                                <p>• Enviar ofertas e promoções personalizadas (apenas se autorizado).</p>
                            </div>
                        </section>

                        {/* Section 3: Compartilhamento de Dados */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="p-2 bg-steel-dark rounded-lg border border-steel-border">
                                    <Share2 className="h-5 w-5 text-steel-green" />
                                </div>
                                3. Compartilhamento de Dados
                            </h3>
                            <p>
                                Não vendemos suas informações pessoais. Compartilhamos dados estritamente com:
                            </p>
                            <ul className="mt-4 space-y-2 list-none">
                                <li className="flex items-start gap-2">
                                    <span className="text-steel-green font-bold">✓</span> Processadores de pagamento (Stripe, PayPal, etc) para efetuar transações.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-steel-green font-bold">✓</span> Prestadores de serviços de infraestrutura (servidores, segurança).
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-steel-green font-bold">✓</span> Autoridades legais, apenas se estritamente exigido por lei.
                                </li>
                            </ul>
                        </section>

                        {/* Section 4: Método de Divulgação e Segurança */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="p-2 bg-steel-dark rounded-lg border border-steel-border">
                                    <ShieldCheck className="h-5 w-5 text-steel-green" />
                                </div>
                                4. Segurança e Proteção
                            </h3>
                            <div className="bg-steel-dark/30 p-6 rounded-xl border border-steel-border/50">
                                <p className="mb-4">
                                    Adotamos medidas rigorosas de segurança cibernética para proteger seus ativos digitais e dados:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-steel-dark rounded-lg shadow-inner">
                                        <strong className="block text-white mb-1">Criptografia SSL</strong>
                                        <span className="text-xs text-gray-500">Em todas as transações</span>
                                    </div>
                                    <div className="p-4 bg-steel-dark rounded-lg shadow-inner">
                                        <strong className="block text-white mb-1">Acesso Restrito</strong>
                                        <span className="text-xs text-gray-500">Apenas equipe autorizada</span>
                                    </div>
                                    <div className="p-4 bg-steel-dark rounded-lg shadow-inner">
                                        <strong className="block text-white mb-1">Monitoramento 24/7</strong>
                                        <span className="text-xs text-gray-500">Contra ataques e fraudes</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Seus Direitos */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className="p-2 bg-steel-dark rounded-lg border border-steel-border">
                                    <FileText className="h-5 w-5 text-steel-green" />
                                </div>
                                5. Seus Direitos
                            </h3>
                            <p>
                                Você tem total controle. Você pode solicitar acesso, correção ou a exclusão completa de seus dados pessoais a qualquer momento, basta entrar em contato com nosso suporte oficial.
                            </p>
                        </section>

                        {/* Support Section */}
                        <div className="border-t border-steel-border pt-10 mt-10">
                            <h4 className="text-white font-bold mb-6 text-lg">
                                Dúvidas ou solicitações sobre Privacidade?
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <a href="mailto:privacidade@steelmakx.com" className="flex items-center gap-4 bg-steel-dark p-4 rounded-xl border border-steel-border hover:border-steel-green transition-all group">
                                    <div className="p-3 bg-steel-card rounded-lg group-hover:bg-steel-green group-hover:text-white transition-colors text-steel-green">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block uppercase tracking-wider font-bold">Email</span>
                                        <span className="text-white font-medium">privacidade@steelmakx.com</span>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4 bg-steel-dark p-4 rounded-xl border border-steel-border">
                                    <div className="p-3 bg-steel-card rounded-lg text-steel-green">
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block uppercase tracking-wider font-bold">Chat Online</span>
                                        <span className="text-white font-medium">Seg - Sex, 08h às 20h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
