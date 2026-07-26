"use client";

import { Suggestion } from "@/types/types";

interface Props {
    open: boolean;
    suggestion: Suggestion | null;
    onClose: () => void;
}

export default function SuggestionDrawer({
    open,
    suggestion,
    onClose,
}: Props) {

    if (!open || !suggestion) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            <div className="fixed right-0 top-0 z-50 h-screen w-[480px] bg-[#111827] border-l border-white/10 shadow-2xl flex flex-col">
                <div className="border-b border-white/10 p-8">
                    <h2 className="text-2xl font-bold text-white">
                        Detalles del mensaje
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Información del mensaje recibido.
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Nombre
                        </label>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white">
                            {suggestion.name}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Correo
                        </label>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white break-all">
                            {suggestion.mail}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Celular
                        </label>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white">
                            {suggestion.cellphoneNumber || "-"}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Fecha
                        </label>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white">
                            {new Date(suggestion.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Mensaje
                        </label>

                        <div className="min-h-[220px] rounded-xl bg-white/5 border border-white/10 p-4 text-white whitespace-pre-wrap break-words">
                            {suggestion.message}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 p-8">
                    <button
                        onClick={onClose}
                        className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 transition py-3 text-white font-semibold cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div >
        </>
    );
}