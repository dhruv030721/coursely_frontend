interface Cart {
    items: CartItem[];
    totalAmount: number;
}

interface CartItem {
    _id: string;
    title: string;
    price: number;
}

export type {Cart, CartItem};