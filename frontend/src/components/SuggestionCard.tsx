"use client";

import { LuEye } from "react-icons/lu";
import { StatusMessage, Suggestion } from "@/types/types";
import { setStatusSuggestion } from "@/services/suggestions.service";

interface Props {
    suggestion: Suggestion;
    onView: (suggestion: Suggestion) => void;
    
}

export default function SuggestionCard({
    suggestion,
    onView,
}: Props) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 transition hover:bg-white/10">

            <div className="flex items-start justify-between gap-6">

                <div className="flex-1 min-w-0">

                    <div className="flex items-center justify-between gap-4">

                        <h2 className="text-lg font-semibold text-white truncate">
                            {suggestion.name}
                        </h2>

                        <span className="text-sm text-gray-400 whitespace-nowrap">
                            {new Date(suggestion.createdAt).toLocaleDateString()}
                        </span>

                    </div>

                    <p className="mt-1 text-sm text-blue-400 break-all">
                        {suggestion.mail}
                    </p>

                    {suggestion.cellphoneNumber && (
                        <p className="mt-1 text-sm text-gray-400">
                            {suggestion.cellphoneNumber}
                        </p>
                    )}

                    <p className="mt-4 text-gray-300 line-clamp-3 break-words">
                        {suggestion.message}
                    </p>

                </div>

                <button
                    onClick={() => {
                        onView(suggestion);
                        setStatusSuggestion({
                            id: suggestion.id,
                            status: StatusMessage.Leido,
                        });
                    }}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition px-4 py-2 text-white cursor-pointer"
                >
                    <LuEye size={18} />
                    Ver
                </button>

            </div>

        </div>
    );
}