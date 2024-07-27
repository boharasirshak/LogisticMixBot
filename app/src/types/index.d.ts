export interface IProduct {
    id: number;
    title: string;
    price: number;
    preview_image: string;
}
export interface IGetProductResponse {
    products: IProduct[];
}

export interface IAuth {
    jwt: string | null;
    isAdmin: boolean;
}

export interface ISession {
    hasMore: boolean,
    loading: boolean,
    page: number
}