import { IconType } from "react-icons";

export interface statistics {
    id: number,
    name: string,
    amount?: number,
}

export interface actions {
    id: number,
    name: string,
    color: string,
    icon: IconType
    // url: string
}

export interface sidebar {
    id: number,
    name: string,
    icon: IconType,
    iconColor?: string,
    url: string,
}

export interface NumberStatistics {
    projects: number,
    skills: number,
    technologies: number,
    views: number,
}

export interface Technologies{
    id: number,
    name: string,
    slug: string,
}

export interface TechnologyPost{
    name: string,
    slug: string,
}

export interface Skill{
    id: number,
    description: string,
}

export interface SkillPost{
    description: string,
}

export interface Suggestion {
    id: number;
    name: string;
    cellphoneNumber: string;
    mail: string;
    message: string;
    status: StatusMessage;
    createdAt: string;
}

export interface SuggestionData{
    total: number,
    read: number,
    unread: number,
    suggestions: Suggestion[],
}

export interface SuggestionAmount{
    total: number,
    read: number,
    unread: number,
}

export enum StatusMessage {
    Leido = "Leido",
    No_leido = "No_leido",
}

export interface SuggestionPatch{
    id: number,
    status: StatusMessage,
}

export interface AboutMe {
    id: number;
    name: string;
    profession: string;
    shortDescription: string;
    description: string;
    location: string;
    cv: string;
    github: string;
    linkedin: string;
    availableForWork: boolean;
}

export interface Experience {
    id: number;
    position: string;
    company: string;
    location: string;
    description: string;
}

export interface ExperiencePost {
    position: string;
    company: string;
    location: string;
    description: string;
}

export enum ProjectStatus{
    Publicado = "Publicado",
    Actualizando = "Actualizando",
    Inhabilitado = "Inhabilitado"
}

export interface Project {
    id: number;
    name: string;
    description: string;
    shortDescription: string;
    githubFrontend: string;
    githubBackend: string;
    demo: string;
    statusProject: ProjectStatus;
    createdAt: string;
    updatedAt: string;
    image: string;
    technologies: Technologies[];
}

export interface ProjectPostDto {
    name: string;
    description: string;
    shortDescription: string;
    githubFrontend: string;
    githubBackend: string;
    demo: string;
    statusProject: ProjectStatus
    technologies: number[];
}