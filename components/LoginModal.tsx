import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ArrowLeft, Send } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'register' | 'forgot';

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');

  if (!isOpen) return null;

  const getTitle = () => {
    switch (view) {
      case 'register': return 'Crie sua conta';
      case 'forgot': return 'Recuperar senha';
      default: return 'Bem-vindo de volta';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'register': return 'Preencha seus dados para começar.';
      case 'forgot': return 'Digite seu e-mail para redefinir a senha.';
      default: return 'Acesse sua conta para gerenciar seus pedidos.';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-steel-card border border-steel-border rounded-2xl shadow-2xl overflow-hidden animate-slide-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-steel-border rounded-lg transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {getTitle()}
            </h2>
            <p className="text-gray-400 text-sm">
              {getDescription()}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {view === 'register' && (
              <div className="space-y-1 animate-fade-in">
                <label className="text-xs font-medium text-gray-400 ml-1">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full bg-steel-dark text-white pl-10 pr-4 py-3 rounded-xl border border-steel-border focus:outline-none focus:ring-2 focus:ring-steel-green/50 focus:border-steel-green transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1 animate-fade-in">
              <label className="text-xs font-medium text-gray-400 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full bg-steel-dark text-white pl-10 pr-4 py-3 rounded-xl border border-steel-border focus:outline-none focus:ring-2 focus:ring-steel-green/50 focus:border-steel-green transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div className="space-y-1 animate-fade-in">
                 <div className="flex justify-between ml-1">
                  <label className="text-xs font-medium text-gray-400">Senha</label>
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-xs text-steel-green hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                 </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-steel-dark text-white pl-10 pr-4 py-3 rounded-xl border border-steel-border focus:outline-none focus:ring-2 focus:ring-steel-green/50 focus:border-steel-green transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
            )}

            <button className="w-full bg-steel-green hover:bg-steel-greenHover text-white font-bold py-3.5 rounded-xl shadow-lg shadow-steel-green/20 hover:shadow-steel-green/40 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2">
              {view === 'login' && (
                <>
                  Entrar
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
              {view === 'register' && (
                <>
                  Criar Conta
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
              {view === 'forgot' && (
                <>
                  Enviar Link
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {view !== 'forgot' && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-steel-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-steel-card text-gray-500">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-steel-border rounded-xl text-gray-300 hover:bg-steel-border hover:text-white transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            {view === 'login' && (
              <p className="text-gray-400 text-sm">
                Novo por aqui?
                <button 
                  onClick={() => setView('register')}
                  className="ml-1 text-steel-green font-semibold hover:underline"
                >
                  Criar conta grátis
                </button>
              </p>
            )}
            
            {view === 'register' && (
              <p className="text-gray-400 text-sm">
                Já tem uma conta?
                <button 
                  onClick={() => setView('login')}
                  className="ml-1 text-steel-green font-semibold hover:underline"
                >
                  Fazer Login
                </button>
              </p>
            )}

            {view === 'forgot' && (
              <button 
                onClick={() => setView('login')}
                className="text-gray-400 text-sm hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
