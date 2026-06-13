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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white shadow-xl sm:max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-3 sm:p-4">
                    <h2 className="text-base font-semibold sm:text-lg">{title}</h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 hover:bg-gray-100 cursor-pointer flex-shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-3 sm:p-4">{children}</div>
            </div>
        </div>,
        document.body,
    );
}
