export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    brand?: string;
    stock?: number;
    rating?: number;
    images?: string[];
}