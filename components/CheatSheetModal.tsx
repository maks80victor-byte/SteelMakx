import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface CheatSheetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-steel-dark border border-steel-border rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-scale-up">
                {/* Header */}
                <div className="p-4 border-b border-steel-border flex items-center justify-between bg-steel-card/50">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 bg-steel-green rounded-full animate-pulse"></span>
                            ARC Raiders Loot Cheat Sheet V2.1
                        </h3>
                        <p className="text-xs text-gray-400">Guia de sobrevivência e materiais de crafting</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content - Image Container */}
                <div className="flex-grow overflow-auto p-4 bg-black/40 scrollbar-thin scrollbar-thumb-steel-green/20 scrollbar-track-transparent">
                    <div className="min-w-fit flex justify-center">
                        <img
                            src="/images/arc-raiders-cheat-sheet.png"
                            alt="ARC Raiders Loot Cheat Sheet V2.1"
                            className="max-w-none h-auto rounded-lg shadow-2xl ring-1 ring-white/10"
                            style={{ imageRendering: 'auto' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-steel-border bg-steel-card/30 flex justify-between items-center text-xs text-gray-500">
                    <span>Dica: Clique e arraste para navegar no guia.</span>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1">V2.1 - Nov 2025</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
