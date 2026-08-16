"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { LuUpload, LuX } from "react-icons/lu";

import { createProject, modifyProject } from "@/services/project.service";
import { Project, ProjectPostDto, ProjectStatus } from "@/types/types";
import { ENVS } from "@/config/constants";

interface Props {
    project?: Project;
    onClose: () => void;
}

export default function ProjectForm({ project, onClose }: Props) {

    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [githubFrontend, setGithubFrontend] = useState("");
    const [githubBackend, setGithubBackend] = useState("");
    const [demo, setDemo] = useState("");

    const [status, setStatus] = useState<ProjectStatus>(
        ProjectStatus.Publicado
    );

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {

        if (!project) return;

        setName(project.name);
        setShortDescription(project.shortDescription);
        setDescription(project.description);
        setGithubFrontend(project.githubFrontend);
        setGithubBackend(project.githubBackend);
        setDemo(project.demo);
        setStatus(project.statusProject);

        if (project.image) {
            setPreview(`${ENVS.API_UPLOADS}${project.image}`);
        }

    }, [project]);


    function handleImage(e: ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    }


    async function handleSubmit(e: FormEvent) {

        e.preventDefault();

        const projectDto: ProjectPostDto = {
            name,
            description,
            shortDescription,
            githubFrontend,
            githubBackend,
            demo,
            statusProject: status,
        };


        try {

            if (project) {

                await modifyProject(
                    project.id,
                    projectDto,
                    image ?? undefined
                );

            } else {

                if (!image) {
                    alert("Debes seleccionar una imagen.");
                    return;
                }

                await createProject(
                    projectDto,
                    image
                );
            }


            onClose();

        } catch (error) {

            console.error(error);

        }
    }


    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-6">

            <div className="flex h-full items-center justify-center">

                <div className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151515]">


                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 z-30 text-gray-400 transition hover:text-white"
                    >
                        <LuX size={22} />
                    </button>


                    <div
                        className="
                        flex-1 overflow-y-auto
                        p-8 pb-6
                        scrollbar scrollbar-w-2
                        scrollbar-thumb-rounded-full
                        scrollbar-thumb-cyan-500/60
                        scrollbar-track-transparent
                    "
                    >

                        <h2 className="mb-8 text-3xl font-bold text-white">
                            {project ? "Editar Proyecto" : "Nuevo Proyecto"}
                        </h2>


                        <form
                            id="project-form"
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                                required
                            />


                            <input
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                placeholder="Descripción corta"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                                required
                            />


                            <textarea
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción"
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                                required
                            />


                            <input
                                value={githubFrontend}
                                onChange={(e) => setGithubFrontend(e.target.value)}
                                placeholder="Github Frontend"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                            />


                            <input
                                value={githubBackend}
                                onChange={(e) => setGithubBackend(e.target.value)}
                                placeholder="Github Backend"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                            />


                            <input
                                value={demo}
                                onChange={(e) => setDemo(e.target.value)}
                                placeholder="Demo"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none transition focus:border-cyan-500"
                            />


                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as ProjectStatus)
                                }
                                className="
                                    w-full rounded-xl
                                    border border-white/10
                                    bg-white/5
                                    p-3
                                    text-white
                                    outline-none
                                    focus:border-cyan-500
                                "
                            >

                                <option
                                    className="bg-[#151515] text-white"
                                    value={ProjectStatus.Publicado}
                                >
                                    Publicado
                                </option>


                                <option
                                    className="bg-[#151515] text-white"
                                    value={ProjectStatus.Actualizando}
                                >
                                    Actualizando
                                </option>


                                <option
                                    className="bg-[#151515] text-white"
                                    value={ProjectStatus.Inhabilitado}
                                >
                                    Inhabilitado
                                </option>

                            </select>


                            <label className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 transition hover:border-cyan-500">

                                {preview ? (

                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        className="h-full w-full rounded-2xl object-cover"
                                    />

                                ) : (

                                    <>
                                        <LuUpload
                                            size={40}
                                            className="mb-3 text-cyan-400"
                                        />

                                        <p className="text-gray-400">
                                            Seleccionar imagen
                                        </p>
                                    </>

                                )}


                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                />

                            </label>


                        </form>

                    </div>


                    <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-[#151515] px-8 py-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-white/10 px-5 py-2 transition hover:bg-white/20"
                        >
                            Cancelar
                        </button>


                        <button
                            type="submit"
                            form="project-form"
                            className="rounded-xl bg-cyan-500 px-6 py-2 transition hover:bg-cyan-600"
                        >
                            {project ? "Actualizar" : "Crear"}
                        </button>

                    </div>


                </div>

            </div>

        </div>
    );
}