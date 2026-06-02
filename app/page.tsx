import { Clock, Headset, ShieldCheck, Tag } from "lucide-react";

const HomePage = () => {
    return (
        <div className="flex flex-col flex-1 bg-no-repeat bg-[url('/banner.png')] bg-cover w-full">
            <div className="max-w-screen-2xl mx-auto py-20 px-6 flex flex-col items-start gap-4 max-w-screen-xl mx-auto w-full rounded-b-xl">
                <h1 className="text-6xl font-bold text-white">
                    Đặt sân thể thao
                </h1>
                <div className="text-4xl font-semibold text-primary-500">
                    Nhanh chóng - Tiện lợi - An toàn
                </div>
                <div className="border-l-2 border-primary-500 pl-4 text-xl text-white">
                    <div>Hàng nghìn sân chất lượng trên toàn quốc</div>
                    <div>
                        Trải nghiệm đặt sân chỉ với vài bước thật đơn giản
                    </div>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto p-6 flex justify-between items-start gap-4 max-w-screen-xl mx-auto w-full rounded-xl bg-primary-850">
                <div className="flex items-center gap-4 text-white">
                    <ShieldCheck width={50} height={50} className="text-primary-500" />
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Uy tín & chất lượng</div>
                        <div className="text-sm text-text-muted">
                            Sân chất lượng, giá minh bạch
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                    <Clock width={50} height={50} className="text-primary-500" />
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Đặt nhanh chóng</div>
                        <div className="text-sm text-text-muted">
                            Chỉ với vài thao tác đơn giản
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                    <Tag width={50} height={50} className="text-primary-500" />
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Giá tốt mỗi ngày</div>
                        <div className="text-sm text-text-muted">
                            Nhiều ưu đãi hấp dẫn
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                    <Headset width={50} height={50} className="text-primary-500" />
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">Hỗ trơ 24/7</div>
                        <div className="text-sm text-text-muted">
                            Đội ngũ hỗ trợ tận tâm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
