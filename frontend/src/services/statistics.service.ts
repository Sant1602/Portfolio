import { ENVS } from "@/config/constants"

export async function getStatistics(): Promise<number>{
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