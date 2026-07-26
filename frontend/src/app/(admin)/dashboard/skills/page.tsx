"use client";

import { useEffect, useState } from "react";
import { LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";

import {
    getSkills,
    createSkill,
    modifySkill,
    deleteSkill,
} from "@/services/skills.service";

import SkillForm from "@/components/SkillForm";
import { Skill, SkillPost } from "@/types/types";

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [editing, setEditing] = useState<Skill | null>(null);

    async function load() {
        const data = await getSkills();
        setSkills(data);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleSubmit(description: string) {
        setLoading(true);

        try {
            const skill: SkillPost = {
                description,
            };

            if (editing) {
                await modifySkill(editing.id, skill);
            } else {
                await createSkill(skill);
            }

            await load();

            setDrawer(false);
            setEditing(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("¿Eliminar skill?")) return;

        await deleteSkill(id);

        await load();
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Skills
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Estas son mis habilidades.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditing(null);
                            setDrawer(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-500"
                    >
                        <LuPlus />
                        Nueva Skill
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400">
                                <th className="p-5 text-left">
                                    Descripción
                                </th>

                                <th className="w-[110px] text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {skills.map((skill) => (
                                <tr
                                    key={skill.id}
                                    className="border-b border-white/5 transition hover:bg-white/5"
                                >
                                    <td className="p-5 align-top">
                                        <p className="break-words whitespace-pre-wrap text-white leading-7">
                                            {skill.description}
                                        </p>
                                    </td>

                                    <td className="w-[110px] align-top p-5">
                                        <div className="flex items-start justify-center gap-5">
                                            <button
                                                onClick={() => {
                                                    setEditing(skill);
                                                    setDrawer(true);
                                                }}
                                                className="text-yellow-400 transition hover:text-yellow-300"
                                            >
                                                <LuPencil size={20} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(skill.id)
                                                }
                                                className="text-red-500 transition hover:text-red-400"
                                            >
                                                <LuTrash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <SkillForm
                open={drawer}
                loading={loading}
                initialValue={editing?.description}
                onClose={() => {
                    setDrawer(false);
                    setEditing(null);
                }}
                onSubmit={handleSubmit}
            />
        </>
    );
}