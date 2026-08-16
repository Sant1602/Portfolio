"use client";

import { sidebar } from "@/types/types";
import Link from "next/link";
import {
    LuChartNoAxesCombined, LuFolderArchive, LuAlbum, LuTrophy, LuScanQrCode,
    LuCircleUser, LuBell, LuBellDot, LuBadgeAlert
} from "react-icons/lu";

import { useNotification } from "@/websocket/NotificationContext";

export default function Sidebar() {

    const { unread } = useNotification();

    const dataSidebar: sidebar[] = [{
        id: 1,
        name: "Dashboard",
        icon: LuChartNoAxesCombined,
        url: "/dashboard",
    }, {
        id: 2,
        name: "Proyectos",
        icon: LuFolderArchive,
        url: "/dashboard/project",
    },
    {
        id: 3,
        name: "Experiencia",
        icon: LuAlbum,
        url: "/dashboard/experience",
    },
    {
        id: 4,
        name: "Skill",
        icon: LuTrophy,
        url: "/dashboard/skills",
    },
    {
        id: 5,
        name: "Tecnologias",
        icon: LuScanQrCode,
        url: "/dashboard/technologies",
    },
    {
        id: 6,
        name: "Contacto",
        icon: LuCircleUser,
        url: "/dashboard/me",
    },

    {
        id: 7,
        name: "Notificaciones",
        icon: unread > 0 ? LuBellDot : LuBell,
        iconColor: unread > 0 ? "text-red-500" : "text-white",
        url: "/dashboard/suggestions",
    },
    {
        id: 8,
        name: "Configuracion",
        icon: LuBadgeAlert,
        url: "#",
    },]

    return (
        <aside className="hidden lg:flex w-72 h-full bg-[#0C2340] border-r border-white/10 flex-col p-6">

            <h2 className="uppercase text-xs tracking-widest text-gray-400 mb-6">
                Navegación
            </h2>

            <nav className="space-y-2">
                {dataSidebar.map((d) => {
                    const Icon = d.icon;
                    return (
                        <Link
                            key={d.id}
                            href={d.url}
                            className="w-full flex items-center justify-between rounded-xl px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 transition"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${d.iconColor}`} />
                                <span className={d.iconColor}>{d.name}</span>
                            </div>

                            {d.id === 8 && unread > 0 && (
                                <span className="min-w-6 h-6 px-2 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                                    {unread}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-auto">
                <button className="w-full rounded-xl bg-red-500/20 hover:bg-red-500/30 transition py-3">
                    Cerrar sesión
                </button>
            </div>

        </aside>
    );
}