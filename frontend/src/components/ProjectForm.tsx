"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { LuUpload, LuX } from "react-icons/lu";

import { createProject, modifyProject } from "@/services/project.service";
import { getTechnologies } from "@/services/technologies.service";

import {
    Project,
    ProjectPostDto,
    ProjectStatus,
    Technologies,
} from "@/types/types";

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
    const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.Publicado);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [availableTechnologies, setAvailableTechnologies] = useState<Technologies[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>([]);

    useEffect(() => {
        const loadTechnologies = async () => {
            try {
                const data = await getTechnologies();
                setAvailableTechnologies(data);
            } catch (error) {
                console.error("Error cargando tecnologías:", error);
            }
        };
        loadTechnologies();
    }, []);

    useEffect(() => {
        if (!project) return;
        setName(project.name);
        setShortDescription(project.shortDescription);
        setDescription(project.description);
        setGithubFrontend(project.githubFrontend);
        setGithubBackend(project.githubBackend);
        setDemo(project.demo);
        setStatus(project.statusProject);
        setSelectedTechnologies(
            project.technologies?.map(
                (technology) => technology.id) ?? []);
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

    function toggleTechnology(technologyId: number) {
        setSelectedTechnologies((prev) => {
            if (prev.includes(technologyId)) {
                return prev.filter(
                    (id) => id !== technologyId);
            }
            return [...prev, technologyId,];
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const projectDto: ProjectPostDto = {
            name,
            description,
            shortDescription,
            githubFrontend,
            githubBackend,
            demo,
            statusProject: status,
            technologies:
                selectedTechnologies,
        };

        try {
            if (project) {
                await modifyProject(project.id, projectDto, image ?? undefined);
            } else {
                if (!image) {
                    alert("Debes seleccionar una imagen.");
                    return;
                }
                await createProject(projectDto, image);
            }

            onClose();

        } catch (error) {
            console.error(
                "Error guardando proyecto:",
                error
            );
        }
    }


    return (
        <div className="fixed inset-0 z-50 bg-black/60 p-6 backdrop-blur-sm">
            <div className="flex h-full items-center justify-center">
                <div
                    className="
                        relative
                        flex
                        h-[90vh]
                        w-full
                        max-w-3xl
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-[#151515]
                    "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-6
                            top-6
                            z-30
                            text-gray-400
                            transition
                            hover:text-white
                        "
                    >
                        <LuX size={22} />
                    </button>
                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            p-8
                            pb-6
                            scrollbar
                            scrollbar-w-2
                            scrollbar-thumb-rounded-full
                            scrollbar-thumb-cyan-500/60
                            scrollbar-track-transparent
                        "
                    >
                        <h2 className="mb-8 text-3xl font-bold text-white">

                            {project
                                ? "Editar Proyecto"
                                : "Nuevo Proyecto"
                            }
                        </h2>
                        <form
                            id="project-form"
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Nombre"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                                required
                            />
                            <input
                                value={shortDescription}
                                onChange={(e) =>
                                    setShortDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Descripción corta"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                                required
                            />
                            <textarea
                                rows={5}
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Descripción"
                                className="
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                                required
                            />
                            <input
                                value={githubFrontend}
                                onChange={(e) =>
                                    setGithubFrontend(
                                        e.target.value
                                    )
                                }
                                placeholder="Github Frontend"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                            />
                            <input
                                value={githubBackend}
                                onChange={(e) =>
                                    setGithubBackend(
                                        e.target.value
                                    )
                                }
                                placeholder="Github Backend"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                            />
                            <input
                                value={demo}
                                onChange={(e) =>
                                    setDemo(e.target.value)
                                }
                                placeholder="Demo"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-cyan-500
                                "
                            />
                            <div>

                                <label className="mb-3 block text-sm font-medium text-gray-300">

                                    Tecnologías

                                </label>


                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                                    {availableTechnologies.map(
                                        (technology) => {

                                            const selected =
                                                selectedTechnologies.includes(
                                                    technology.id
                                                );

                                            return (

                                                <button
                                                    key={technology.id}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleTechnology(
                                                            technology.id
                                                        )
                                                    }
                                                    className={`
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        border
                                                        p-3
                                                        text-left
                                                        transition
                                                        ${selected
                                                            ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                                                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className={`
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            ${selected
                                                                ? "bg-cyan-400/10"
                                                                : "bg-white/5"
                                                            }
                                                        `}
                                                    >

                                                        <img
                                                            src={`${ENVS.API_ICONS}${technology.slug}`}
                                                            alt={technology.name}
                                                            className="h-6 w-6 object-contain"
                                                        />

                                                    </div>


                                                    <span className="truncate text-sm font-medium">

                                                        {technology.name}

                                                    </span>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>


                                {selectedTechnologies.length > 0 && (

                                    <p className="mt-3 text-xs text-gray-500">

                                        {selectedTechnologies.length}{" "}
                                        tecnología
                                        {selectedTechnologies.length !== 1
                                            ? "s"
                                            : ""}{" "}
                                        seleccionada
                                        {selectedTechnologies.length !== 1
                                            ? "s"
                                            : ""}

                                    </p>

                                )}

                            </div>
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as ProjectStatus
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
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
                            <label
                                className="
                                    flex
                                    h-52
                                    cursor-pointer
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border-2
                                    border-dashed
                                    border-white/10
                                    transition
                                    hover:border-cyan-500
                                "
                            >

                                {preview ? (

                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        className="
                                            h-full
                                            w-full
                                            rounded-2xl
                                            object-cover
                                        "
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
                    <div
                        className="
                            flex
                            items-center
                            justify-end
                            gap-3
                            border-t
                            border-white/10
                            bg-[#151515]
                            px-8
                            py-5
                        "
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-xl
                                bg-white/10
                                px-5
                                py-2
                                transition
                                hover:bg-white/20
                            "
                        >
                            Cancelar

                        </button>


                        <button
                            type="submit"
                            form="project-form"
                            className="
                                rounded-xl
                                bg-cyan-500
                                px-6
                                py-2
                                transition
                                hover:bg-cyan-600
                            "
                        >

                            {project
                                ? "Actualizar"
                                : "Crear"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}