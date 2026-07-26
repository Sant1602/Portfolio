import { ENVS } from "@/config/constants";
import { AboutMe } from "@/types/types";

export async function getAboutMe(): Promise<AboutMe> {
    const res = await fetch(`${ENVS.API_URL}/about-me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error obteniendo la información.");
    }

    return res.json();
}

export async function updateAboutMe(data: AboutMe): Promise<AboutMe> {
    const res = await fetch(`${ENVS.API_URL}/about-me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Error actualizando la información.");
    }

    return res.json();
}