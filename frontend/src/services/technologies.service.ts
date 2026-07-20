import { Technologies, TechnologyPost } from "@/types/types";
import { ENVS } from "@/config/constants";

export async function getTechnologies(): Promise<Technologies[]> {
    const res = await fetch(`${ENVS.API_URL}/technology`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("No se pudo traer las tecnologias");
    }
    const data = res.json();
    return data

}

export async function createTechnology(data: TechnologyPost) {
const res = await fetch(`${ENVS.API_URL}/technology`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data), 
    });
    if (!res.ok) {
        throw new Error("No se pudo crear la tecnologia")
    }
    return res.ok
}

export async function modifyTechnology(id: number, data: TechnologyPost) {
    const res = await fetch(`${ENVS.API_URL}/technology/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data), 
    });
    if (!res.ok) {
        throw new Error("No se pudo modificar la tecnologia")
    }
    return res.ok
}

export async function deleteTechnology(id: number) {
    const res = await fetch(`${ENVS.API_URL}/technology/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("No se pudo eliminar la tecnologia")
    }
    return res.ok
}