"use client";

import { useEffect, useState } from "react";
import {
    LuPlus,
    LuPencil,
    LuTrash2,
    LuGithub,
    LuGlobe,
    LuImage,
} from "react-icons/lu";

import { getProjects, deleteProject } from "@/services/project.service";
import ProjectForm from "@/components/ProjectForm";
import { Project } from "@/types/types";
import { ENVS } from "@/config/constants";

const statusStyles = {
    Publicado: "bg-green-500/20 text-green-400",
    Actualizando: "bg-yellow-500/20 text-yellow-400",
    Inhabilitado: "bg-red-500/20 text-red-400",
} as const;

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project>();

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        try {
            const response = await getProjects();
            setProjects(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("¿Eliminar este proyecto?")) return;

        try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((project) => project.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Proyectos
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Administra los proyectos de tu portafolio.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelectedProject(undefined);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition px-4 py-2 rounded-xl text-white font-medium"
                >
                    <LuPlus />
                    Nuevo Proyecto
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500 transition"
                    >
                        <div className="aspect-video bg-zinc-900 flex items-center justify-center overflow-hidden">
                            {project.image ? (
                                <img
                                    src={`${ENVS.API_UPLOADS}/${project.image}`}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <LuImage
                                    size={48}
                                    className="text-gray-500"
                                />
                            )}
                        </div>

                        <div className="p-5 flex flex-col gap-4">

                            <div className="flex items-center justify-between">

                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                                        statusStyles[project.statusProject]
                                    }`}
                                >
                                    {project.statusProject}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowForm(true);
                                        }}
                                        className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition"
                                    >
                                        <LuPencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                                    >
                                        <LuTrash2 size={16} />
                                    </button>
                                </div>

                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {project.name}
                                </h2>

                                <p className="text-gray-400 mt-2 line-clamp-3">
                                    {project.shortDescription}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">

                                <a
                                    href={project.githubFrontend}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2 hover:bg-white/10 transition"
                                >
                                    <LuGithub />
                                    Front
                                </a>

                                <a
                                    href={project.githubBackend}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2 hover:bg-white/10 transition"
                                >
                                    <LuGithub />
                                    Back
                                </a>

                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-2 hover:bg-cyan-600 transition"
                                >
                                    <LuGlobe />
                                    Demo
                                </a>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <ProjectForm
                    project={selectedProject}
                    onClose={() => {
                        setShowForm(false);
                        loadProjects();
                    }}
                />
            )}
        </>
    );
}