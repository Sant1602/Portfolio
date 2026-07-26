"use client";

import { useEffect, useState } from "react";

interface Props {
    open: boolean;
    loading: boolean;
    initialValue?: string;
    onClose: () => void;
    onSubmit: (description: string) => void;
}

export default function SkillForm({
    open,
    loading,
    initialValue,
    onClose,
    onSubmit,
}: Props) {

    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(initialValue ?? "");
    }, [initialValue, open]);

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            <div className="fixed right-0 top-0 h-screen w-[420px] bg-[#111827] border-l border-white/10 z-50 p-8">

                <h2 className="text-2xl font-bold text-white mb-8">
                    {initialValue ? "Editar Skill" : "Nueva Skill"}
                </h2>

                <div className="space-y-2">
                    <label className="block mb-6 text-gray-300">
                        Descripción
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);

                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        rows={1}
                        className="w-full resize-none overflow-hidden rounded-xl bg-[#1e293b] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    disabled={loading || !description.trim()}
                    onClick={() => onSubmit(description.trim())}
                    className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed transition p-3 text-white font-semibold cursor-pointer"
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>

            </div>
        </>
    );
}