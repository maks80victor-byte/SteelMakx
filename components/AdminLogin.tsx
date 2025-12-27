import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, X, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
    onLogin: (password: string) => void;
    onCancel: () => void;
    error?: string | null;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel, error }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(password);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-steel-dark/95 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-steel-card border border-steel-border rounded-3xl shadow-2xl overflow-hidden animate-slide-in">

                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-steel-green to-transparent opacity-50" />

                <button
                    onClick={onCancel}
                    className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-steel-border rounded-xl transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-20 h-20 bg-steel-green/10 rounded-2xl flex items-center justify-center text-steel-green mb-6 shadow-inner">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 italic">ACESSO RESTRITO</h2>
                        <p className="text-gray-400 text-sm font-medium">Somente administradores autorizados.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Senha de Admin</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-steel-green transition-colors" />
                                <input
                                    autoFocus
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-steel-dark text-white pl-12 pr-4 py-4 rounded-2xl border border-steel-border focus:outline-none focus:border-steel-green/50 focus:ring-4 focus:ring-steel-green/5 transition-all text-lg tracking-widest"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 animate-shake">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-steel-green hover:bg-green-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-steel-green/20 hover:shadow-steel-green/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-lg uppercase tracking-wider"
                        >
                            Autenticar
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-600 font-medium">
                        SteelMakx Admin Protocol v1.0
                    </p>
                </div>
            </div>
        </div>
    );
};
