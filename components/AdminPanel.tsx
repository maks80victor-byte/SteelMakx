import React, { useState } from 'react';
import {
    Package,
    Plus,
    Search,
    Edit2,
    Trash2,
    Save,
    X,
    Tag,
    Layers,
    ArrowLeft,
    Settings,
    Image as ImageIcon,
    DollarSign,
    Star,
    CheckCircle2,
    AlertCircle,
    Upload
} from 'lucide-react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
    products: Product[];
    onAddProduct: (product: Product) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (id: number) => void;
    onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
    products,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    onBack
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [showNotification, setShowNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const initialFormState: Product = {
        id: 0,
        name: '',
        price: 0,
        image: '',
        category: Category.GAMES,
        tags: [],
        badge: '',
        rating: 5
    };

    const [formData, setFormData] = useState<Product>(initialFormState);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({ ...product });
        setIsAdding(false);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setFormData({ ...initialFormState, id: Math.max(...products.map(p => p.id)) + 1 });
        setIsAdding(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            onDeleteProduct(id);
            notify('Produto removido com sucesso!', 'success');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isAdding) {
            onAddProduct(formData);
            notify('Produto cadastrado com sucesso!', 'success');
            setIsAdding(false);
        } else {
            onUpdateProduct(formData);
            notify('Produto atualizado com sucesso!', 'success');
            setEditingProduct(null);
        }
        setFormData(initialFormState);
    };

    const notify = (message: string, type: 'success' | 'error') => {
        setShowNotification({ message, type });
        setTimeout(() => setShowNotification(null), 3000);
    };

    const handleTagToggle = (tag: string) => {
        const currentTags = formData.tags || [];
        if (currentTags.includes(tag)) {
            setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
        } else {
            setFormData({ ...formData, tags: [...currentTags, tag] });
        }
    };

    // Mock common tags based on categories
    const commonTags = [
        'Ação', 'Aventura', 'RPG', 'Mundo Aberto', 'Terror', 'Multiplayer',
        'Estratégia', 'Simulação', 'FPS', 'Indie', 'Arcade', 'Esportes',
        'Munição', 'Arma', 'Material', 'Coletável', 'Chave', 'Diagrama'
    ];

    if (isAdding || editingProduct) {
        return (
            <div className="min-h-screen bg-steel-dark p-6 md:p-12 animate-fade-in">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar para a Lista
                    </button>

                    <div className="bg-steel-card border border-steel-border rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-steel-border">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                {isAdding ? <Plus className="text-steel-green" /> : <Edit2 className="text-steel-green" />}
                                {isAdding ? 'Cadastrar Novo Produto' : `Editando: ${editingProduct?.name}`}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Nome do Produto</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-steel-dark/50 border border-steel-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors"
                                        placeholder="Ex: Assassin's Creed Shadows"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Preço (R$)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                                className="w-full bg-steel-dark/50 border border-steel-border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Avaliação (1-5)</label>
                                        <div className="relative">
                                            <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="1"
                                                max="5"
                                                value={formData.rating}
                                                onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                                                className="w-full bg-steel-dark/50 border border-steel-border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                                        className="w-full bg-steel-dark/50 border border-steel-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors appearance-none"
                                    >
                                        {Object.values(Category).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Badge / Selo</label>
                                    <input
                                        type="text"
                                        value={formData.badge}
                                        onChange={e => setFormData({ ...formData, badge: e.target.value })}
                                        className="w-full bg-steel-dark/50 border border-steel-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors"
                                        placeholder="Ex: PROMOCIONAL, GAME PASS, NOVO"
                                    />
                                </div>
                            </div>

                            {/* Media and Tags */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Imagem do Produto</label>

                                    {/* Drag & Drop Zone */}
                                    <div
                                        className="relative border-2 border-dashed border-steel-border rounded-xl p-8 hover:border-steel-green hover:bg-steel-green/5 transition-all cursor-pointer group mb-4"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file && file.type.startsWith('image/')) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    setFormData({ ...formData, image: event.target?.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                    >
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        setFormData({ ...formData, image: event.target?.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-steel-dark border border-steel-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-steel-green">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-bold text-white mb-1">Clique para enviar ou arraste aqui</p>
                                            <p className="text-xs text-gray-500">JPG, PNG ou GIF (Max. 5MB)</p>
                                        </div>
                                    </div>

                                    {/* URL Fallback */}
                                    <div className="relative mb-4">
                                        <div className="text-xs text-gray-500 mb-1 text-center font-medium uppercase tracking-widest">OU INSIRA UMA URL</div>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                required
                                                type="text"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full bg-steel-dark/50 border border-steel-border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-steel-green transition-colors text-sm"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    {formData.image && (
                                        <div className="relative aspect-video rounded-xl bg-steel-dark overflow-hidden border border-steel-border group/preview">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Preview+Indispon%C3%ADvel';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500 text-white rounded-lg transition-colors opacity-0 group-hover/preview:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags / Gêneros</label>
                                    <div className="flex flex-wrap gap-2 p-4 bg-steel-dark/30 border border-steel-border rounded-xl max-h-48 overflow-y-auto scrollbar-hide">
                                        {commonTags.map(tag => (
                                            <button
                                                type="button"
                                                key={tag}
                                                onClick={() => handleTagToggle(tag)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${formData.tags?.includes(tag)
                                                    ? 'bg-steel-green text-white shadow-md shadow-steel-green/20'
                                                    : 'bg-steel-card border border-steel-border text-gray-400 hover:text-white hover:border-gray-500'
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-6 border-t border-steel-border flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                                    className="px-8 py-3 bg-steel-dark border border-steel-border text-gray-400 font-bold rounded-xl hover:text-white hover:border-gray-400 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-steel-green text-white font-bold rounded-xl hover:shadow-lg hover:shadow-steel-green/20 transition-all flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    {isAdding ? 'Salvar Produto' : 'Atualizar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-steel-dark font-sans pb-20">
            {/* Header */}
            <header className="bg-steel-card/50 border-b border-steel-border sticky top-0 z-50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-steel-dark rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-steel-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-steel-green/20">
                                <Settings className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white leading-tight">Painel Administrativo</h1>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Gestão de Inventário</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="bg-steel-dark border border-steel-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-steel-green w-64 transition-all"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 bg-steel-green hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-steel-green/20 active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Produto
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Produtos', value: products.length, icon: Package, color: 'text-blue-400' },
                        { label: 'Categorias', value: CATEGORIES.length, icon: Layers, color: 'text-purple-400' },
                        { label: 'Itens Crafting', value: products.filter(p => p.category === Category.CRAFTING_ITEMS).length, icon: Tag, color: 'text-orange-400' },
                        { label: 'Valor em Estoque', value: `R$ ${products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-steel-card border border-steel-border p-6 rounded-2xl flex items-center gap-5 group hover:border-steel-green/30 transition-all">
                            <div className={`w-12 h-12 rounded-xl bg-steel-dark flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product List */}
                <div className="bg-steel-card border border-steel-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-steel-dark/50 border-b border-steel-border">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Produto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Preço</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Avaliação</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-steel-border">
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-steel-dark/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-steel-dark border border-steel-border flex-shrink-0">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=?';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{product.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-steel-dark border border-steel-border rounded-full text-xs text-gray-400 font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-steel-green">R$ {product.price.toFixed(2)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-bold">{product.rating || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-gray-500 hover:text-white hover:bg-steel-dark rounded-lg transition-all"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-lg">Nenhum produto encontrado</p>
                            <p className="text-sm">Tente ajustar sua busca ou cadastrar um novo produto.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Persistence Notification */}
            <div className="fixed bottom-8 right-8 z-[60] space-y-4">
                {showNotification && (
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-slide-up ${showNotification.type === 'success' ? 'bg-steel-green text-white' : 'bg-red-500 text-white'
                        }`}>
                        {showNotification.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <p className="font-bold">{showNotification.message}</p>
                        <button onClick={() => setShowNotification(null)} className="ml-4 p-1 hover:bg-black/10 rounded-full">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
