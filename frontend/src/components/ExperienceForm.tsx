"use client";

import { useEffect, useState } from "react";

import {
    Experience,
    ExperiencePost
} from "@/types/types";

interface Props {

    experience?: Experience;

    onSubmit: (experience: ExperiencePost) => Promise<void>;

    onClose: () => void;

}

export default function ExperienceForm({

    experience,

    onSubmit,

    onClose

}: Props) {

    const [form, setForm] = useState<ExperiencePost>({
        position: "",
        company: "",
        location: "",
        description: ""
    });

    useEffect(() => {

        if (experience) {

            setForm({
                position: experience.position,
                company: experience.company,
                location: experience.location,
                description: experience.description
            });

        }

    }, [experience]);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        await onSubmit(form);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
        >

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">

                    {experience ? "Editar experiencia" : "Nueva experiencia"}

                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                >
                    ✕
                </button>

            </div>

            <div>

                <label className="block mb-2">
                    Cargo
                </label>

                <input
                    value={form.position}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            position: e.target.value
                        })
                    }
                    className="w-full rounded-xl bg-white/5 border border-sky-500/20 px-4 py-3"
                />

            </div>

            <div>

                <label className="block mb-2">
                    Empresa
                </label>

                <input
                    value={form.company}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            company: e.target.value
                        })
                    }
                    className="w-full rounded-xl bg-white/5 border border-sky-500/20 px-4 py-3"
                />

            </div>

            <div>

                <label className="block mb-2">
                    Ubicación
                </label>

                <input
                    value={form.location}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            location: e.target.value
                        })
                    }
                    className="w-full rounded-xl bg-white/5 border border-sky-500/20 px-4 py-3"
                />

            </div>

            <div>

                <label className="block mb-2">
                    Descripción
                </label>

                <textarea
                    rows={7}
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }
                    className="w-full rounded-xl bg-white/5 border border-sky-500/20 px-4 py-3 resize-none"
                />

            </div>

            <button
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 transition"
            >
                {experience ? "Actualizar experiencia" : "Guardar experiencia"}
            </button>

        </form>

    );

}