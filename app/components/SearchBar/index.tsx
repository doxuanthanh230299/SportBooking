"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Option = {
    value: string;
    label: string;
};

type Province = {
    id: string;
    name: string;
};

type District = {
    id: string;
    name: string;
};

type Sport = {
    id: string;
    name: string;
};

export default function SearchBar() {
    const [provinces, setProvinces] = useState<Option[]>([]);
    const [districts, setDistricts] = useState<Option[]>([]);
    const [sports, setSports] = useState<Option[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<Option | null>(
        null,
    );
    const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(
        null,
    );
    const [selectedSport, setSelectedSport] = useState<Option | null>(null);

    // load provinces + sports
    useEffect(() => {
        api<Province[]>("/provinces").then((data) => {
            setProvinces(data.map((p) => ({ value: p.id, label: p.name })));
        });

        api<Sport[]>("/sports").then((data) => {
            setSports(data.map((s) => ({ value: s.id, label: s.name })));
        });
    }, []);

    // load districts theo province
    useEffect(() => {
        if (!selectedProvince) {
            setDistricts([]);
            setSelectedDistrict(null);
            return;
        }

        api<District[]>(`/districts?provinceId=${selectedProvince.value}`).then(
            (data) => {
                setDistricts(data.map((d) => ({ value: d.id, label: d.name })));
            },
        );

        setSelectedDistrict(null);
    }, [selectedProvince]);

    return (
        <div className="flex items-center bg-white rounded-2xl shadow-lg py-2 px-4">
            <div className="w-60 border-r border-gray-300 pr-2">
                <Select
                    placeholder="Chọn địa điểm"
                    options={provinces}
                    value={selectedProvince}
                    onChange={setSelectedProvince}
                    isClearable
                />
            </div>

            <div className="w-60 border-r border-gray-300 px-2">
                <Select
                    placeholder="Quận / Huyện"
                    options={districts}
                    value={selectedDistrict}
                    onChange={setSelectedDistrict}
                    isDisabled={!selectedProvince}
                    isClearable
                />
            </div>

            <div className="w-60 border-r border-gray-300 px-2">
                <Select
                    placeholder="Môn thể thao"
                    options={sports}
                    value={selectedSport}
                    onChange={setSelectedSport}
                    isClearable
                />
            </div>

            <button
                onClick={() => {
                    console.log({
                        province: selectedProvince,
                        district: selectedDistrict,
                        sport: selectedSport,
                    });
                }}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
                Tìm kiếm
            </button>
        </div>
    );
}
