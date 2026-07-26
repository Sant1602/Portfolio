import { ENVS } from "@/config/constants";
import { Skill, SkillPost } from "@/types/types";

export async function getSkills(): Promise<Skill[]> {
    const res = await fetch(`${ENVS.API_URL}/skill`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error("Error obteniendo skills");

    return res.json();
}

export async function createSkill(data: SkillPost) {
    const res = await fetch(`${ENVS.API_URL}/skill`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error creando skill");

    return res.json();
}

export async function modifySkill(id: number, data: SkillPost) {
    const res = await fetch(`${ENVS.API_URL}/skill/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error actualizando");

    return res.json();
}

export async function deleteSkill(id: number) {
    const res = await fetch(`${ENVS.API_URL}/skill/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error eliminando");
}