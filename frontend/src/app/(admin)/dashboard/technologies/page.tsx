"use client";

import { useEffect, useState } from "react";
import { LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";
import {
    deleteTechnology,
    getTechnologies,
    createTechnology,
    modifyTechnology
} from "@/services/technologies.service";
import { Technologies } from "@/types/types";
import { ENVS } from "@/config/constants";
import TechnologyForm from "@/components/TechnologyForm";

export default function TechnologiesPage() {
    const [technologies, setTechnologies] = useState<Technologies[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTechnology, setSelectedTechnology] = useState<Technologies>();

    async function loadTechnologies() {
        const data = await getTechnologies();

        if (data) {
            setTechnologies(data);
        }
    }

    useEffect(() => {
        loadTechnologies();
    }, []);

    return (
        <div className="space-y-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        Mis Tecnologías
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Administra las tecnologías que aparecerán en el portafolio.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedTechnology(undefined);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition px-5 py-3 cursor-pointer"
                >
                    <LuPlus className="w-5 h-5" />
                    Agregar tecnología
                </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
                <h2 className="text-xl font-semibold mb-6">
                    Tecnologías registradas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {technologies.map((technology) => (
                        <div
                            key={technology.id}
                            className="rounded-xl bg-white/5 border border-white/5 p-5 hover:bg-white/10 transition"
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <img
                                    src={`${ENVS.API_ICONS}${technology.slug}`}
                                    alt={technology.name}
                                    className="w-30 h-30 object-contain"/>
                                <h3 className="font-semibold text-lg">
                                    {technology.name}
                                </h3>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        setSelectedTechnology(technology);
                                        setShowForm(true);
                                    }}
                                    className="flex-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition py-1.5 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <LuPencil className="w-4 h-4" />
                                    Editar
                                </button>
                                <button
                                    onClick={async () => {
                                        await deleteTechnology(technology.id);
                                        await loadTechnologies();
                                    }}
                                    className="flex-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition py-1.5 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <LuTrash2 className="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showForm && (
                <div
                    onClick={() => setShowForm(false)}
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20 px-4">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl rounded-2xl shadow-2xl shadow-black/70">
                        <TechnologyForm
                            technology={selectedTechnology}
                            onSubmit={async (technology) => {
                                if (selectedTechnology == null) {
                                    await createTechnology(technology);
                                } else {
                                    await modifyTechnology(
                                        selectedTechnology.id,
                                        technology
                                    );
                                }
                                await loadTechnologies();
                                setShowForm(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}