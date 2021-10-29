export interface Order {
    _id?: string;
    user?: string;
    items?: [];
    shipping?: {};
    createdAt?: string;
    tipo?: string;
}