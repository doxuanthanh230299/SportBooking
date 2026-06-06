"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body,
    );
}
