"use client";

import { useEffect, useState } from "react";

import SuggestionCard from "@/components/SuggestionCard";
import SuggestionDrawer from "@/components/SuggestionDrawer";

import { StatusMessage, Suggestion, SuggestionAmount } from "@/types/types";
import { getSuggestions } from "@/services/suggestions.service";

export default function MessagesPage() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [suggestionsCount, setSuggestionsCount] = useState<SuggestionAmount>();
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"Todos" | "Leidos" | "Sin leer">("Todos");

    async function loadSuggestions(filter?: StatusMessage) {
        setLoading(true);

        try {
            const data = await getSuggestions(filter);

            setSuggestionsCount({
                total: data.total,
                read: data.read,
                unread: data.unread,
            });

            setSuggestions(data.suggestions);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSuggestions();
    }, []);

    function reloadViewAction(){
        window.location.reload();
    }

    function handleView(suggestion: Suggestion) {
        setSelectedSuggestion(suggestion);
        setDrawerOpen(true);
    }

    function handleClose() {
        reloadViewAction();
        setDrawerOpen(false);
        setSelectedSuggestion(null);

    }

    return (
        <>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Mensajes
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Administra los mensajes enviados desde tu portfolio.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => {
                            setFilter("Todos");
                            loadSuggestions();
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                            filter === "Todos"
                                ? "bg-sky-500 text-white"
                                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Todos ({suggestionsCount?.total ?? 0})
                    </button>

                    <button
                        onClick={() => {
                            setFilter("Sin leer");
                            loadSuggestions(StatusMessage.No_leido);
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                            filter === "Sin leer"
                                ? "bg-sky-500 text-white"
                                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        No leídos ({suggestionsCount?.unread ?? 0})
                    </button>

                    <button
                        onClick={() => {
                            setFilter("Leidos");
                            loadSuggestions(StatusMessage.Leido);
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                            filter === "Leidos"
                                ? "bg-sky-500 text-white"
                                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Leídos ({suggestionsCount?.read ?? 0})
                    </button>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-gray-400">
                        Cargando mensajes...
                    </div>
                ) : suggestions.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400 backdrop-blur">
                        No hay mensajes para este filtro.
                    </div>
                ) : (
                    <div className="space-y-5">
                        {suggestions.map((suggestion) => (
                            <SuggestionCard
                                key={suggestion.id}
                                suggestion={suggestion}
                                onView={handleView}
                            />
                        ))}
                    </div>
                )}
            </div>

            <SuggestionDrawer
                open={drawerOpen}
                suggestion={selectedSuggestion}
                onClose={handleClose}   
            />
        </>
    );
}