import { sidebar } from "@/types/types";
import Link from "next/link";
import {
    LuChartNoAxesCombined, LuFolderArchive, LuAlbum, LuTrophy, LuScanQrCode,
    LuCircleUser, LuBell, LuBellDot, LuBadgeAlert
} from "react-icons/lu";

export default function Sidebar() {

    const messages = 10;

    const dataSidebar: sidebar[] = [{
        id: 1,
        name: "Dashboard",
        icon: LuChartNoAxesCombined,
        url:"/dashboard",
    }, {
        id: 2,
        name: "Proyectos",
        icon: LuFolderArchive,
        url:"#",
    },
    {
        id: 3,
        name: "Experiencia",
        icon: LuAlbum,
        url:"#",
    },
    {
        id: 4,
        name: "Skill",
        icon: LuTrophy,
        url:"#",
    },
    {
        id: 5,
        name: "Tecnologias",
        icon: LuScanQrCode,
        url:"/dashboard/technologies",
    },
    {
        id: 6,
        name: "Contacto",
        icon: LuCircleUser,
        url:"#",
    },
    {
        id: 7,
        name: "Configuracion",
        icon: LuBadgeAlert,
        url:"#",
    },
    {
        id: 8,
        name: "Notificaciones",
        icon: messages ? LuBellDot:LuBell,
        iconColor: messages? "text-red-500":"text-white",
        url:"#",
    }]

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
                            className="w-full flex items-center gap-3 text-left rounded-xl px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 transition cursor-pointer"
                        >
                            <Icon className={`w-5 h-5 ${d.iconColor}`} />
                            <span className={d.iconColor}>{d.name}</span>
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