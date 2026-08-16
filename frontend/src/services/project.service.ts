import { ENVS } from "@/config/constants";
import { Project, ProjectPostDto } from "@/types/types";

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${ENVS.API_URL}/project`);
    if (!response.ok) {
        throw new Error("No se pudieron obtener los proyectos");
    }
    return await response.json();
}

export async function createProject(project: ProjectPostDto,image: File): Promise<Project> {
    const formData = new FormData();
    formData.append(
        "projectPostDto",
        new Blob([JSON.stringify(project)], {
            type: "application/json",
        })
    );
    formData.append("image", image, image.name);
    const response = await fetch(`${ENVS.API_URL}/project`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("No se pudo crear el proyecto");
    }
    return await response.json();
}

export async function modifyProject(id: number,project: ProjectPostDto,image?: File): Promise<Project> {
    const formData = new FormData();
    formData.append(
        "projectPutDto",
        new Blob([JSON.stringify(project)], {
            type: "application/json",
        })
    );
    if (image) {
        formData.append("image", image, image.name);
    }
    const response = await fetch(`${ENVS.API_URL}/project/${id}`, {
        method: "PUT",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("No se pudo actualizar el proyecto");
    }
    return await response.json();
}

export async function deleteProject(id: number): Promise<void> {
    const response = await fetch(`${ENVS.API_URL}/project/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar el proyecto");
    }
}