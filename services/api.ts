import { axiosInstance } from "./axios";

export async function api<T>(
    endpoint: string,
    options?: any
): Promise<T> {
    const res = await axiosInstance.request<T>({
        url: endpoint,
        ...options
    });

    return res.data;
}