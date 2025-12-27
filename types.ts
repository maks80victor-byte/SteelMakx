export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  badge?: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  GAMES = 'Jogos',
  GIFT_CARDS = 'Gift Cards',
  CRAFTING_ITEMS = 'Itens de Crafting',
  SOFTWARE = 'Software'
}