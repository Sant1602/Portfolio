export default function Header() {
    const words: string[] =["Crack", "Maquina", "Mastodonte", "#1", "Idolo", "Ingeniero"];
     const randomWord = words[Math.floor(Math.random() * words.length)];

    return (
        <header className="h-20 border-b border-white/10 backdrop-blur-xl bg-white/5 px-8 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Mi Portafolio</h1>
                <p className="text-sm text-gray-300">
                {`Bienvenido de nuevo ${randomWord}!!`}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-semibold">Santiago</p>
                    <p className="text-xs text-gray-400">
                        Administrador
                    </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    S
                </div>
            </div>
        </header>
    );
}