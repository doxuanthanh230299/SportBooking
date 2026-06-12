export interface Province {
    id: string;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface District {
    id: string;
    name: string;
    code: string;
    provinceId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}