"use client";

import { Technologies, TechnologyPost } from "@/types/types";
import { useState } from "react";

interface Props {
    technology?: Technologies;
    onSubmit: (technology: TechnologyPost) => Promise<void>;
}

export default function TechnologyForm({ technology: initialTechnology, onSubmit }: Props) {
    const [technology, setTechnology] = useState<TechnologyPost>(
        initialTechnology == null
            ? {
                name: "",
                slug: ""
            }
            : {
                name: initialTechnology.name,
                slug: initialTechnology.slug
            }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTechnology(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(technology);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6"
        >
            <div className="border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white">
                    {initialTechnology == null
                        ? "Crear tecnología"
                        : "Editar tecnología"}
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                    {initialTechnology == null
                        ? "Completa la información para agregar una nueva tecnología a tu portafolio."
                        : "Actualiza la información de la tecnología seleccionada."}
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                </label>

                <input
                    type="text"
                    name="name"
                    value={technology.name}
                    onChange={handleChange}
                    placeholder="Ej. Java"
                    className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none transition focus:border-sky-400"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug
                </label>

                <input
                    type="text"
                    name="slug"
                    value={technology.slug}
                    onChange={handleChange}
                    placeholder="Ej. java"
                    className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none transition focus:border-sky-400"
                    required
                />

                <p className="mt-2 text-xs text-gray-400">
                    Identificador utilizado para cargar el ícono desde Devicon.
                    Ejemplos: <strong>java</strong>, <strong>spring</strong>,
                    <strong> react</strong>, <strong>docker</strong>.
                </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    className="rounded-xl bg-sky-500 hover:bg-sky-600 transition px-6 py-3 font-semibold cursor-pointer"
                >
                    {initialTechnology == null
                        ? "Crear tecnología"
                        : "Guardar cambios"}
                </button>
            </div>
        </form>
    );
}