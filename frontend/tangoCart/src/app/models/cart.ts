export interface Cart {
    _id: string;
    user: string;
    state: string;
    items: [];
    createdAt?: string;
}