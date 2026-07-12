import { IconType } from "react-icons";

export interface statistics{
    id: number,
    name: string,
    amount?: number,
}

export interface actions{
    id: number,
    name: string,
    color: string,
    icon: IconType
    // url: string
}

export interface sidebar{
    id: number,
    name: string,
    icon: IconType,
    iconColor?: string,
    // url: string,
}