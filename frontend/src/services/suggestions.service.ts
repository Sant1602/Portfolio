import { ENVS } from "@/config/constants";
import { StatusMessage, SuggestionData, SuggestionPatch } from "@/types/types";

export async function getSuggestions(filter?: StatusMessage): Promise<SuggestionData> {
    const params = new URLSearchParams();
    if (filter) {
        params.append("filter", filter);
    }
    const res = await fetch(
        `${ENVS.API_URL}/suggestion${params.toString() ? `?${params.toString()}` : ""}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Error obteniendo las sugerencias");
    }
    return res.json();
}

export async function createSuggestion(data: {
    name: string;
    cellphoneNumber: string;
    mail: string;
    message: string;
}) {
    const res = await fetch(`${ENVS.API_URL}/suggestion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Error al enviar sugerencia");
    }

    return res.json();
}

export async function setStatusSuggestion(data: SuggestionPatch) {
    const res = await fetch(`${ENVS.API_URL}/suggestion`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Error al editar la sugerencia");
    }

    return res.json();
}