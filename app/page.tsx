import { Clock, Headset, ShieldCheck, Tag } from "lucide-react";
import SearchBar from "./components/SearchBar";

export default async function HomePage() {
    return (
        <div className="flex flex-col flex-1 bg-no-repeat bg-[url('/banner.png')] bg-cover w-full">
            <div className="mx-auto mb-4 py-20 px-6 flex flex-col items-start gap-4 max-w-screen-xl w-full rounded-b-xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white">Đặt sân thể thao</h1>
                <div className="text-lg md:text-4xl font-semibold text-primary-500">Nhanh chóng - Tiện lợi - An toàn</div>
                <div className="border-l-2 border-primary-500 pl-4 text-md md:text-xl text-white">
                    <div>Hàng nghìn sân chất lượng trên toàn quốc</div>
                    <div>Trải nghiệm đặt sân chỉ với vài bước thật đơn giản</div>
                </div>
            </div>

            <div className="mx-auto px-6 md:px-0 mb-4 flex flex-col items-start gap-4 max-w-screen-xl w-full rounded-b-xl">
                <SearchBar />
            </div>

            <div className="grid grid-cols-1 gap-4 mx-auto mb-4 p-6 sm:grid-cols-2 md:grid-cols-4 max-w-screen-xl w-full rounded-xl bg-primary-850">
                <Feature icon={<ShieldCheck />} title="Uy tín & chất lượng" desc="Sân chất lượng, giá minh bạch" />
                <Feature icon={<Clock />} title="Đặt nhanh chóng" desc="Chỉ vài thao tác đơn giản" />
                <Feature icon={<Tag />} title="Giá tốt mỗi ngày" desc="Nhiều ưu đãi hấp dẫn" />
                <Feature icon={<Headset />} title="Hỗ trợ 24/7" desc="Đội ngũ tận tâm" />
            </div>
        </div>
    );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="flex items-center gap-4 text-white">
            <div className="text-primary-500">{icon}</div>
            <div className="flex flex-col gap-1">
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-text-muted">{desc}</div>
            </div>
        </div>
    );
}
