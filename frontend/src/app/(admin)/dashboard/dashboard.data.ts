import { actions} from "@/types/types";
import { LuFolderKanban, LuMedal, LuBriefcase, LuScanQrCode } from "react-icons/lu";


export const actionsDashboard: actions[] = [{
    id: 1,
    name: "Nuevo Proyecto",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: LuFolderKanban,
},
{
    id: 2,
    name: "Nueva experiencia",
    color: "bg-green-600 hover:bg-green-700",
    icon: LuBriefcase,
}, {
    id: 3,
    name: "Nueva Skill",
    color: "bg-purple-600 hover:bg-purple-700",
    icon: LuMedal,
},
{
    id: 4,
    name: "Nueva Tecnologia",
    color: "bg-orange-500 hover:bg-orange-600",
    icon: LuScanQrCode,
}]