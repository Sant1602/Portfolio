"use client";

import { actionsDashboard } from "./dashboard.data";
import { useState, useEffect } from "react";
import { getStatistics } from "@/services/statistics.service";
import { statistics } from "@/types/types";

export default function AdminDashboard() {
    const [statisticsDash, setStatisticsDash] = useState<number>();
    useEffect(() => {
        async function getInformation() {
            const data = await getStatistics();
            if (!data) {
                console.log("No se pudo")
            }
            setStatisticsDash(data);
        }
        getInformation();
    }, [])

    const dataDashboard: statistics[] = [{
        id: 1,
        name: "Proyectos",
        amount: statisticsDash
    }, {
        id: 2,
        name: "Skills",
        amount: 10
    },
    {
        id: 3,
        name: "Tecnologias",
        amount: 10
    },
    {
        id: 4,
        name: "Visitas",
        amount: 10
    }]

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {dataDashboard.map((d) => (
                    <div
                        key={d.id}
                        className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 text-center"
                    >
                        <p className="text-white">{d.name}</p>
                        <h3 className="text-4xl font-bold mt-3">{d.amount}</h3>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-2 gap-6 mt-8">

                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

                    <h3 className="text-xl font-semibold mb-6">
                        Acciones rápidas
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {actionsDashboard.map((a) => {
                            const Icon = a.icon;
                            return (
                                <button
                                    key={a.id}
                                    className={`rounded-xl ${a.color} transition p-5 text-left cursor-pointer`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-6 h-6" />
                                        <span>{a.name}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

                    <h3 className="text-xl font-semibold mb-6">
                        Actividad reciente
                    </h3>

                    <div className="space-y-4">

                        <div className="rounded-xl bg-white/5 p-4">
                            ✔ Proyecto "Task Manager" actualizado
                        </div>

                        <div className="rounded-xl bg-white/5 p-4">
                            ✔ Nueva tecnología agregada
                        </div>

                        <div className="rounded-xl bg-white/5 p-4">
                            ✔ Imagen subida correctamente
                        </div>

                        <div className="rounded-xl bg-white/5 p-4">
                            ✔ Portfolio publicado
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}