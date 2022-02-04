export type Subscription = {
    id: string;
    created_at: string;
    status: string
    product: {
        id: string;
        course_cost: number;
        course_last: number;
        course_plan: string;
    }
}