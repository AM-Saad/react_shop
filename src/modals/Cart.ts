export interface Cart {
    _id: string;
    sessionId: string;
    items: CartItem[];
    total: number;
    promo: { id: string; name: string; discount: number }
}

export interface CartItem {
    _id: string;
    id: string,
    name: string,
    image: string,
    category: string,
    quantity: number,
    price: number,
    unit: string,
    attributes: [
        {
            name: String,
            option: String,
            price: String,
        }
    ],
    total: Number
}