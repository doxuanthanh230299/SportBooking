export interface Court {
    id: string;
    ownerId: string;
    name: string;
    sportId: string;
    provinceId: string;
    districtId: string;
    address: string;
    pricePerHour: number;
    courtType: string;
    status: "active" | "inactive" | "maintenance";
    averageRating: number;
    reviewCount: number;
}