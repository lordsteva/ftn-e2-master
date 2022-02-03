export type Product = {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    quantity?: number;
    place?: string;
    date_start?: string;
    date_end?: string;
    course_cost?: number;
    course_last?: number;
    course_plan?: string;
}