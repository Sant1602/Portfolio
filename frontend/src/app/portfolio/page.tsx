"use client";

import { useEffect, useState } from "react";
import { ENVS } from "@/config/constants";
import {
    LuArrowDown,
    LuArrowUp,
    LuBriefcase,
    LuCalendar,
    LuCode,
    LuDatabase,
    LuDownload,
    LuExternalLink,
    LuGithub,
    LuLinkedin,
    LuMail,
    LuMapPin,
    LuMenu,
    LuSend,
    LuServer,
    LuX,
} from "react-icons/lu";

import {
    AboutMe,
    Experience,
    NumberStatistics,
    Project,
    Technologies,
    Skill,
    Suggestion,
} from "@/types/types";

import { getAboutMe } from "@/services/aboutme.service";
import { getExperiences } from "@/services/experience.service";
import { getTechnologies } from "@/services/technologies.service";
import { getProjects } from "@/services/project.service";
import { getStatistics } from "@/services/statistics.service";
import { getSkills } from "@/services/skills.service";
import { createSuggestion } from "@/services/suggestions.service";
import MagicRings from "@/components/MagicRings";


export default function PortfolioPage() {

    const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [technologies, setTechnologies] = useState<Technologies[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [suggestion, setSuggestion] = useState({
        name: "",
        cellphoneNumber: "",
        mail: "",
        message: "",
    });

    const [sending, setSending] = useState(false);

    useEffect(() => {
        const loadPortfolio = async () => {
            try {

                const [
                    aboutData,
                    experiencesData,
                    technologiesData,
                    projectsData,
                    skillsData,
                    statisticsData
                ] = await Promise.all([
                    getAboutMe(),
                    getExperiences(),
                    getTechnologies(),
                    getProjects(),
                    getSkills(),
                    getStatistics()
                ]);

                setAboutMe(aboutData);
                setExperiences(experiencesData);
                setTechnologies(technologiesData);
                setProjects(projectsData);
                setSkills(skillsData);
            } catch (error) {

                console.error(
                    "Error al cargar portfolio:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        loadPortfolio();
    }, []);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-sky-400" />
                    <p className="mt-4 text-sm text-gray-400">
                        Cargando portfolio...
                    </p>
                </div>
            </main>
        );
    }

    const handleSuggestionChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setSuggestion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSuggestionSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setSending(true);

            await createSuggestion(suggestion);

            setSuggestion({
                name: "",
                cellphoneNumber: "",
                mail: "",
                message: "",
            });

        } catch (error) {
            console.error("Error enviando mensaje:", error);
        } finally {
            setSending(false);
        }
    };
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-[150px]" />
                <div className="absolute right-[-200px] top-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
                <div className="absolute bottom-[-200px] left-[30%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
            </div>
            <nav className="fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                    <a
                        href="#home"
                        className="text-xl font-bold"
                    >
                        {aboutMe?.name ?? "Developer"}
                        <span className="text-sky-400">.</span>
                    </a>
                    <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
                        <a
                            href="#about"
                            className="transition hover:text-white"
                        >
                            Acerca de mi
                        </a>
                        <a
                            href="#technologies"
                            className="transition hover:text-white"
                        >
                            Tecnologias
                        </a>

                        <a
                            href="#experience"
                            className="transition hover:text-white"
                        >
                            Experiencia
                        </a>

                        <a
                            href="#projects"
                            className="transition hover:text-white"
                        >
                            Proyectos
                        </a>
                    </div>
                    <a
                        href="#contact"
                        className="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black md:block"
                    >
                        Contactame
                    </a>
                </div>
            </nav>
            <section
                id="home"
                className="flex min-h-screen items-center px-6 pt-24"
            >

                <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
                    <div>
                        {aboutMe?.availableForWork && (

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-sm text-green-400">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                                Buscando Empleo
                            </div>
                        )}
                        <p className="text-lg text-gray-500">
                            Hello, I'm
                        </p>
                        <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                            {aboutMe?.name}
                            <span className="text-sky-400">
                                .
                            </span>
                        </h1>
                        <h2 className="mt-6 text-xl font-medium text-gray-300 sm:text-2xl">
                            {aboutMe?.profession}
                        </h2>
                        <p className="mt-6 max-w-xl leading-8 text-gray-400">
                            {aboutMe?.shortDescription}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold transition hover:bg-sky-400"
                            >
                                Mis Proyectos
                                <LuArrowDown size={18} />
                            </a>


                            {aboutMe?.cv && (

                                <a
                                    href={aboutMe.cv}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10"
                                >
                                    Descargar CV
                                    <LuDownload size={18} />
                                </a>
                            )}
                        </div>
                        <div className="mt-8 flex gap-5">
                            {aboutMe?.github && (
                                <a
                                    href={aboutMe.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-500 transition hover:text-white"
                                >
                                    <LuGithub size={23} />
                                </a>
                            )}
                            {aboutMe?.linkedin && (
                                <a
                                    href={aboutMe.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-500 transition hover:text-white"
                                >
                                    <LuLinkedin size={23} />
                                </a>
                            )}
                            <a
                                href="#contact"
                                className="text-gray-500 transition hover:text-white"
                            >
                                <LuMail size={23} />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative h-80 w-80 overflow-hidden rounded-full sm:h-[500px] sm:w-[500px]">
                            <MagicRings
                                color="#38BDF8"
                                colorTwo="#6366F1"
                                ringCount={5}
                                speed={1}
                                attenuation={10}
                                lineThickness={1.5}
                                baseRadius={0.35}
                                radiusStep={0.1}
                                scaleRate={0.08}
                                opacity={0.8}
                                blur={0}
                                noiseAmount={0.08}
                                rotation={0}
                                ringGap={1.5}
                                fadeIn={0.7}
                                fadeOut={0.5}
                                followMouse={true}
                                mouseInfluence={0.15}
                                hoverScale={1.1}
                                parallax={0.03}
                                clickBurst={false}
                            />
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-56 w-56 overflow-hidden rounded-full border-2 border-sky-400/30 bg-[#050816] shadow-[0_0_80px_rgba(56,189,248,0.3)] sm:h-80 sm:w-80">
                                    <img
                                        src="https://scontent.cdninstagram.com/v/t51.75761-19/491468752_17995673210790138_1637854424917164322_n.jpg?_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=5nmDbuK1wRQQ7kNvwG_jT1C&_nc_oc=Adr6BLNJt2E6dAO1ZQhpUTSoXsHHqkEHHrKNaJb1xObtjN0ZY8Vy_l719VZ3j6g6FprS-D2HcSynRLc1pebAIvnp&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=DSlhayDc1VuMtepGjPnFCQ&_nc_ss=7b6a8&oh=00_AQE9mL4MvgGTaHWJ0UujjNDYGzj8mVMtBS5-5Z1NZJ6gQg&oe=6A87EA21"
                                        alt="Santiago"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section
                id="about"
                className="scroll-mt-24 px-6 py-16"
            >
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Sobre mi
                    </p>
                    <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                        ¿Quien soy?
                    </h2>
                    <div className="mt-10 max-w-3xl">
                        <p className="leading-8 text-gray-400">
                            {aboutMe?.description}
                        </p>
                        {aboutMe?.location && (
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                                <LuMapPin size={17} />
                                {aboutMe.location}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section
                id="technologies"
                className="scroll-mt-24 px-6 py-16"
            >
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Mi stack
                    </p>
                    <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Tecnologias
                    </h2>
                    <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {technologies.map((technology) => (
                            <div
                                key={technology.id}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400/30"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5">

                                    <img
                                        src={`${ENVS.API_ICONS}${technology.slug}`}
                                        alt={technology.name}
                                        className="h-9 w-9 object-contain transition group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    {technology.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section
                id="skills"
                className="scroll-mt-24 px-6 py-16"
            >

                <div className="mx-auto max-w-6xl">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Mis habilidades
                    </p>

                    <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Skills
                    </h2>

                    <p className="mt-5 max-w-2xl leading-7 text-gray-400">
                        Habilidades que he desarrollado durante mi formación
                        y experiencia en el desarrollo de software.
                    </p>


                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.05]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">
                                        <LuCode
                                            size={20}
                                            className="text-sky-400"
                                        />
                                    </div>
                                    <p className="leading-7 text-gray-300">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            <section
                id="experience"
                className="scroll-mt-24 px-6 py-16"
            >
                <div className="mx-auto max-w-5xl">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Carrera
                    </p>

                    <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Experiencia
                    </h2>
                    <div className="relative mt-14">
                        <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-sky-400" />
                        <div className="space-y-12">
                            {experiences.map((experience) => (
                                <article
                                    key={experience.id}
                                    className="relative pl-10"
                                >
                                    <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sky-400 bg-[#050816]">

                                        <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                                    </div>
                                    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-sky-400/20 hover:bg-white/[0.05] md:p-7">
                                        <h3 className="text-xl font-semibold text-white">
                                            {experience.position}
                                        </h3>
                                        <p className="mt-1 font-medium text-sky-400">
                                            {experience.company}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                            <LuMapPin size={15} />
                                            <span>
                                                {experience.location}
                                            </span>
                                        </div>
                                        <p className="mt-5 max-w-3xl leading-7 text-gray-400">
                                            {experience.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="projects"
                className="scroll-mt-24 px-6 py-16"
            >
                <div className="mx-auto max-w-6xl">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Mis trabajos
                    </p>

                    <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Proyectos
                    </h2>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => (

                            <article
                                key={project.id}
                                className="
                        group
                        flex
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        backdrop-blur-xl
                        transition
                        duration-300
                        hover:-translate-y-2
                        hover:border-sky-400/20
                        hover:bg-white/[0.05]
                    "
                            >
                                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-white/[0.02]">

                                    {project.image ? (

                                        <img
                                            src={`${ENVS.API_UPLOADS}/${project.image}`}
                                            alt={project.name}
                                            className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition
                                    duration-500
                                    group-hover:scale-105
                                "
                                        />

                                    ) : (

                                        <LuCode
                                            size={70}
                                            strokeWidth={1}
                                            className="text-sky-400"
                                        />

                                    )}

                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-start justify-between gap-3">

                                        <h3 className="text-xl font-semibold text-white">
                                            {project.name}
                                        </h3>

                                        <span className="shrink-0 rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[10px] text-sky-300">
                                            {project.statusProject}
                                        </span>

                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-400">
                                        {project.shortDescription}
                                    </p>
                                    <div className="mt-5">

                                        <h4 className="text-sm font-semibold text-gray-300">
                                            Sobre el proyecto
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {project.description}
                                        </p>

                                    </div>
                                    {project.technologies &&
                                        project.technologies.length > 0 && (

                                            <div className="mt-6">

                                                <h4 className="mb-3 text-sm font-semibold text-gray-300">
                                                    Tecnologías
                                                </h4>

                                                <div className="flex flex-wrap gap-2">

                                                    {project.technologies.map(
                                                        (technology) => (

                                                            <div
                                                                key={technology.id}
                                                                className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-lg
                                                        border
                                                        border-white/10
                                                        bg-white/5
                                                        px-2.5
                                                        py-1.5
                                                        text-xs
                                                        text-gray-300
                                                        transition
                                                        hover:border-sky-400/20
                                                        hover:bg-sky-400/5
                                                    "
                                                            >

                                                                <img
                                                                    src={`${ENVS.API_ICONS}${technology.slug}`}
                                                                    alt={technology.name}
                                                                    className="h-4 w-4 object-contain"
                                                                />

                                                                <span>
                                                                    {technology.name}
                                                                </span>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        )}
                                    <div className="mt-auto pt-6">

                                        <div className="flex flex-wrap gap-2">

                                            {project.githubFrontend && (

                                                <a
                                                    href={project.githubFrontend}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            border
                                            border-white/10
                                            px-3
                                            py-2
                                            text-xs
                                            transition
                                            hover:bg-white/10
                                        "
                                                >
                                                    <LuGithub size={15} />
                                                    Frontend
                                                </a>

                                            )}


                                            {project.githubBackend && (

                                                <a
                                                    href={project.githubBackend}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            border
                                            border-white/10
                                            px-3
                                            py-2
                                            text-xs
                                            transition
                                            hover:bg-white/10
                                        "
                                                >
                                                    <LuGithub size={15} />
                                                    Backend
                                                </a>

                                            )}


                                            {project.demo && (

                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            bg-white
                                            px-3
                                            py-2
                                            text-xs
                                            font-medium
                                            text-black
                                            transition
                                            hover:bg-gray-200
                                        "
                                                >
                                                    <LuExternalLink size={15} />
                                                    Demo
                                                </a>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>
            </section>
            <section
                id="contact"
                className="scroll-mt-24 px-6 py-16"
            >
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                            Contacto
                        </p>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl text-white">
                            Si estás interesado en mi trabajo o tienes alguna
                            sugerencia, siéntete libre de contactarme.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_280px]">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
                            <div className="mb-7">
                                <h3 className="text-xl font-semibold">
                                    Envíame un mensaje
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Completa el formulario y me pondré en contacto contigo.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSuggestionSubmit}
                                className="space-y-5"
                            >
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Nombre *
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={suggestion.name}
                                            onChange={handleSuggestionChange}
                                            placeholder="Tu nombre"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-sky-400/50 focus:bg-white/[0.04]"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="cellphoneNumber"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Teléfono
                                        </label>
                                        <input
                                            id="cellphoneNumber"
                                            name="cellphoneNumber"
                                            type="tel"
                                            value={suggestion.cellphoneNumber}
                                            onChange={handleSuggestionChange}
                                            placeholder="Tu número"
                                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-sky-400/50 focus:bg-white/[0.04]"
                                        />
                                    </div>
                                </div>
                                <div>

                                    <label
                                        htmlFor="mail"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Correo electrónico *
                                    </label>
                                    <input
                                        id="mail"
                                        name="mail"
                                        type="email"
                                        value={suggestion.mail}
                                        onChange={handleSuggestionChange}
                                        placeholder="tucorreo@ejemplo.com"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-sky-400/50 focus:bg-white/[0.04]"
                                    />

                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Mensaje *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={suggestion.message}
                                        onChange={handleSuggestionChange}
                                        placeholder="Escribe tu mensaje..."
                                        rows={6}
                                        required
                                        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-sky-400/50 focus:bg-white/[0.04]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                >
                                    <LuSend size={18} />
                                    {sending
                                        ? "Enviando..."
                                        : "Enviar mensaje"
                                    }
                                </button>
                            </form>
                        </div>
                        <div className="flex h-fit flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl md:p-7">

                            <h3 className="mt-2 text-xl font-semibold text-white">
                                A través del correo
                            </h3>

                            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
                                Si lo prefieres, puedes escribirme directamente por correo.
                            </p>

                            <a
                                href={`mailto:${ENVS.Mail}`}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-400/30 hover:bg-sky-400/10"
                            >
                                <LuMail size={17} />
                                Escribirme por correo
                            </a>

                        </div>
                    </div>
                </div>
            </section>
            <footer className="border-t border-white/10 px-6 py-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()}{" "}
                        {aboutMe?.name}
                    </p>
                </div>
            </footer>
        </main>

    );

}