import { ENVS } from "@/config/constants"
import { NumberStatistics } from "@/types/types";

export async function getStatistics(): Promise<NumberStatistics>{
    const res = await fetch(`${ENVS.API_URL}/statistics`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!res.ok){
        throw new Error("No se pudo traer las estadisticas");
    }
    const data = res.json();
    return data

}