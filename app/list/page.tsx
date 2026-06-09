import { courtService } from "@/services/courts.service";
import { CourtCard } from "../components/CourtCard";

const ListPage = async () => {
    const courts = await courtService
        .getAll()
        .then((courts) => {
            console.log("Courts:", courts);
            return courts;
        })
        .catch((error) => {
            console.error("Error fetching courts:", error);
            return [];
        });
    return (
        <div className="bg-primary-700 w-full p-4">
            <div className="max-w-screen-2xl mx-auto py-4 px-6 flex items-center gap-4 max-w-screen-xl mx-auto w-full rounded-b-xl">
                <div>
                    <h1 className="mb-6 text-2xl font-bold text-white">
                        Danh sách sân
                    </h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Filter */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-4 rounded-lg bg-white p-4">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Bộ lọc
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Môn thể thao
                                        </label>

                                        <select className="w-full rounded border p-2">
                                            <option>Tất cả</option>
                                            <option>Bóng đá</option>
                                            <option>Cầu lông</option>
                                            <option>Tennis</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Quận/Huyện
                                        </label>

                                        <select className="w-full rounded border p-2">
                                            <option>Tất cả</option>
                                            <option>Cầu Giấy</option>
                                            <option>Ba Đình</option>
                                            <option>Đống Đa</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Khoảng giá
                                        </label>

                                        <select className="w-full rounded border p-2">
                                            <option>Tất cả</option>
                                            <option>Dưới 200.000đ</option>
                                            <option>200.000đ - 500.000đ</option>
                                            <option>Trên 500.000đ</option>
                                        </select>
                                    </div>

                                    <button className="w-full rounded bg-primary-600 py-2 text-white">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Court List */}
                        <div className="lg:col-span-9">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {courts.map((court) => (
                                    <CourtCard key={court.id} court={court} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
