"use client";

import { useEffect, useState } from "react";
import {
    LuPlus,
    LuPencil,
    LuTrash2,
    LuMapPin,
    LuBuilding2
} from "react-icons/lu";

import {
    getExperiences,
    createExperience,
    modifyExperience,
    deleteExperience
} from "@/services/experience.service";

import ExperienceForm from "@/components/ExperienceForm";

import {
    Experience,
    ExperiencePost
} from "@/types/types";

export default function ExperiencesPage() {

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState<Experience>();

    async function loadExperiences() {
        const data = await getExperiences();
        setExperiences(data);
    }

    useEffect(() => {
        loadExperiences();
    }, []);

    async function handleCreate(experience: ExperiencePost) {
        await createExperience(experience);
        setShowForm(false);
        loadExperiences();
    }

    async function handleUpdate(experience: ExperiencePost) {
        if (!selectedExperience) return;

        await modifyExperience(selectedExperience.id, experience);

        setSelectedExperience(undefined);
        setShowForm(false);
        loadExperiences();
    }

    async function handleDelete(id: number) {
        if (!confirm("¿Deseas eliminar esta experiencia?")) return;

        await deleteExperience(id);
        loadExperiences();
    }

    return (
        <div className="relative">

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-3xl font-bold text-white">
                    Experiencias
                </h1>

                <button
                    onClick={() => {
                        setSelectedExperience(undefined);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 transition hover:bg-sky-600 cursor-pointer"
                >
                    <LuPlus size={18} />
                    Agregar
                </button>

            </div>

            <div className="space-y-5">

                {experiences.map((experience) => (

                    <div
                        key={experience.id}
                        className="rounded-2xl border border-sky-500/30 bg-white/5 p-6 backdrop-blur-lg"
                    >

                        <div className="flex items-start gap-6">
                            <div className="flex-1">

                                <h2 className="text-xl font-semibold text-white">
                                    {experience.position}
                                </h2>

                                <div className="mt-2 flex items-center gap-2 text-gray-300">
                                    <LuBuilding2 size={18} />
                                    <span>{experience.company}</span>
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                    <LuMapPin size={17} />
                                    <span>{experience.location}</span>
                                </div>

                            </div>

                            <div className="flex shrink-0 items-center gap-3">

                                <button
                                    onClick={() => {
                                        setSelectedExperience(experience);
                                        setShowForm(true);
                                    }}
                                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 transition hover:bg-sky-600 cursor-pointer"
                                >
                                    <LuPencil size={20} />
                                </button>

                                <button
                                    onClick={() => handleDelete(experience.id)}
                                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 transition hover:bg-red-600 cursor-pointer"
                                >
                                    <LuTrash2 size={20} />
                                </button>

                            </div>

                        </div>

                        <p className="mt-6 whitespace-pre-wrap text-gray-300 leading-7">
                            {experience.description}
                        </p>

                    </div>

                ))}

            </div>

            {showForm && (

                <div
                    className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowForm(false)}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="h-full w-full max-w-xl overflow-y-auto border-l border-sky-500/30 bg-[#0F172A] shadow-2xl"
                    >

                        <ExperienceForm
                            experience={selectedExperience}
                            onSubmit={
                                selectedExperience
                                    ? handleUpdate
                                    : handleCreate
                            }
                            onClose={() => {
                                setSelectedExperience(undefined);
                                setShowForm(false);
                            }}
                        />

                    </div>

                </div>

            )}

        </div>
    );
}