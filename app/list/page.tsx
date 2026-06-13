import { courtService } from "@/services/courts.service";
import { sportService } from "@/services/sport.service";
import { provinceService } from "@/services/provinces.service";
import { CourtCard } from "../components/CourtCard";
import CourtFilter from "../components/CourtFilter";
import { SearchX } from "lucide-react";

interface Props {
    searchParams: Promise<{
        sportId?: string;
        provinceId?: string;
        districtId?: string;
    }>;
}

const ListPage = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const [sports, provinces, courts] = await Promise.all([
        sportService.getAll(),
        provinceService.getAll(),
        courtService.getAll({
            sportId: params.sportId,
            provinceId: params.provinceId,
            districtId: params.districtId,
        }),
    ]);

    return (
        <div className="bg-primary-700 w-full p-4">
            <div className="flex flex-col h-full max-w-screen-xl mx-auto py-4 px-6">
                <h1 className="mb-6 text-2xl font-bold text-white">Danh sách sân</h1>

                <div className="flex-1 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Filter */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-4 rounded-lg bg-white p-4">
                            <h2 className="mb-4 text-lg font-semibold">Bộ lọc</h2>

                            <CourtFilter sports={sports} provinces={provinces} />
                        </div>
                    </div>

                    {/* Court List */}
                    <div className={courts.length !== 0 ? "lg:col-span-9" : "lg:col-span-9 flex flex-1"}>
                        {courts.length === 0 ? (
                            <div className="flex flex-col justify-center rounded-lg flex-1 bg-white p-6 items-center text-center text-gray-500">
                                <SearchX className="mx-auto mb-4 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32" />
                                <span className="text-4 lg:text-[30px]">Không tìm thấy sân nào phù hợp.</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {courts.map((court) => (
                                    <CourtCard key={court.id} court={court} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
