interface Cart {
    items: CartItem[];
    totalAmount: number;
}

interface CartItem {
    _id: number;
    title: string;
    price: number;
}

export type {Cart, CartItem};