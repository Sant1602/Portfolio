"use client";

import { useEffect, useRef, useState } from "react";

import { getAboutMe, updateAboutMe } from "@/services/aboutme.service";
import { AboutMe } from "@/types/types";

export default function AboutMePage() {
    const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
    const [form, setForm] = useState<AboutMe | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    const shortDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    async function loadAboutMe() {
        setLoading(true);

        try {
            const data = await getAboutMe();

            setAboutMe(data);
            setForm(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAboutMe();
    }, []);

    useEffect(() => {
        if (!form) return;

        const resize = (textarea: HTMLTextAreaElement | null) => {
            if (!textarea) return;

            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        };

        resize(shortDescriptionRef.current);
        resize(descriptionRef.current);
    }, [form]);

    function autoResize(textarea: HTMLTextAreaElement) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function handleChange<K extends keyof AboutMe>(
        key: K,
        value: AboutMe[K]
    ) {
        if (!form) return;

        setForm({
            ...form,
            [key]: value,
        });
    }

    function handleCancel() {
        setForm(aboutMe);
        setEditing(false);
    }

    async function handleSave() {
        if (!form) return;

        setSaving(true);

        try {
            const data = await updateAboutMe(form);

            setAboutMe(data);
            setForm(data);

            setEditing(false);
        } finally {
            setSaving(false);
        }
    }

    if (loading || !form) {
        return (
            <div className="py-20 text-center text-gray-400">
                Cargando información...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold text-white">
                    Sobre mí
                </h1>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            Nombre
                        </label>

                        <input
                            disabled={!editing}
                            value={form.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            Profesión
                        </label>

                        <input
                            disabled={!editing}
                            value={form.profession}
                            onChange={(e) =>
                                handleChange("profession", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-gray-400">
                            Descripción corta
                        </label>

                        <textarea
                            ref={shortDescriptionRef}
                            disabled={!editing}
                            value={form.shortDescription}
                            onChange={(e) => {
                                autoResize(e.target);
                                handleChange(
                                    "shortDescription",
                                    e.target.value
                                );
                            }}
                            className="w-full overflow-hidden resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-gray-400">
                            Descripción
                        </label>

                        <textarea
                            ref={descriptionRef}
                            disabled={!editing}
                            value={form.description}
                            onChange={(e) => {
                                autoResize(e.target);
                                handleChange(
                                    "description",
                                    e.target.value
                                );
                            }}
                            className="w-full overflow-hidden resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            Ubicación
                        </label>

                        <input
                            disabled={!editing}
                            value={form.location}
                            onChange={(e) =>
                                handleChange("location", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            CV
                        </label>

                        <input
                            disabled={!editing}
                            value={form.cv}
                            onChange={(e) =>
                                handleChange("cv", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            GitHub
                        </label>

                        <input
                            disabled={!editing}
                            value={form.github}
                            onChange={(e) =>
                                handleChange("github", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-400">
                            LinkedIn
                        </label>

                        <input
                            disabled={!editing}
                            value={form.linkedin}
                            onChange={(e) =>
                                handleChange("linkedin", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none disabled:opacity-70"
                        />
                    </div>

                    <div className="flex flex-col justify-end">
                        <label className="mb-3 block text-sm text-gray-400">
                            Disponible para trabajar
                        </label>

                        <button
                            type="button"
                            disabled={!editing}
                            onClick={() =>
                                handleChange(
                                    "availableForWork",
                                    !form.availableForWork
                                )
                            }
                            className={`relative h-7 w-14 rounded-full transition ${form.availableForWork
                                    ? "bg-sky-500"
                                    : "bg-gray-600"
                                } ${!editing
                                    ? "cursor-not-allowed opacity-70"
                                    : "cursor-pointer"
                                }`}
                        >
                            <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${form.availableForWork
                                        ? "left-8"
                                        : "left-1"
                                    }`}
                            />
                        </button>

                        <span className="mt-2 text-sm text-gray-300">
                            {form.availableForWork
                                ? "Disponible para trabajar"
                                : "No disponible"}
                        </span>
                    </div>

                </div>

                <div className="mt-10 flex justify-end gap-4">

                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="cursor-pointer rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
                        >
                            Editar
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving
                                    ? "Guardando..."
                                    : "Guardar cambios"}
                            </button>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}