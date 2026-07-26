import { ENVS } from "@/config/constants";
import { Experience, ExperiencePost } from "@/types/types";

export async function getExperiences(): Promise<Experience[]> {
    const res = await fetch(`${ENVS.API_URL}/experience`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error("Error obteniendo experiencias");

    return res.json();
}

export async function createExperience(data: ExperiencePost) {
    const res = await fetch(`${ENVS.API_URL}/experience`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error creando experiencia");

    return res.json();
}

export async function modifyExperience(id: number, data: ExperiencePost) {
    const res = await fetch(`${ENVS.API_URL}/experience/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error actualizando experiencia");

    return res.json();
}

export async function deleteExperience(id: number) {
    const res = await fetch(`${ENVS.API_URL}/experience/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error eliminando experiencia");
}