"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import { Province } from "@/types/province";
import { api } from "@/services/api";

type OptionType = {
    value: string;
    label: string;
};

type District = {
    id: string;
    name: string;
    provinceId: string;
};

export default function SelectLocation() {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(null);

    useEffect(() => {
        api<Province[]>("/provinces").then(setProvinces);
    }, []);

    useEffect(() => {
        if (!selectedProvince) {
            setDistricts([]);
            setSelectedDistrict(null);
            return;
        }

        api<District[]>(
            `/districts?provinceId=${selectedProvince.value}`
        ).then(setDistricts);

        setSelectedDistrict(null);
    }, [selectedProvince]);

    return (
        <div className="flex gap-4">

            <div className="w-64 border-r-1 border-gray-300 pr-4">
                <Select<OptionType>
                    placeholder="Chọn tỉnh/thành"
                    isClearable
                    isSearchable
                    options={provinces.map((p) => ({
                        value: p.id,
                        label: p.name
                    }))}
                    value={selectedProvince}
                    onChange={(val) => setSelectedProvince(val)}
                />
            </div>

            <div className="w-64">
                <Select<OptionType>
                    placeholder="Chọn quận/huyện"
                    isClearable
                    isSearchable
                    isDisabled={!selectedProvince}
                    options={districts.map((d) => ({
                        value: d.id,
                        label: d.name
                    }))}
                    value={selectedDistrict}
                    onChange={(val) => setSelectedDistrict(val)}
                />
            </div>

        </div>
    );
}