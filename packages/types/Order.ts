export type Order = {
    id: string;
    created_at: string;
    status: string;
    total_price: number;
    address: string;
    city: string;
    country: string;
    phone: string;
    zip_code: string;
    orderProducts: {
        product_id: string;
        price: string;
        quantity: number;
        product: {
            name: string;
            image: string;
        }
    }[]
}