"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const invites: { name: string; accesses: number }[] = [
    { name: "Lucas", accesses: 15 },
    { name: "Ana & John", accesses: 28 },
    { name: "House Party", accesses: 45 },
    { name: "Carla", accesses: 9 },
    { name: "Peter & Mary", accesses: 21 },
    { name: "Sunset Vibes", accesses: 37 },
    { name: "Gabriel", accesses: 5 },
    { name: "Neon Night", accesses: 33 },
    { name: "Fernanda & Rafael", accesses: 18 },
    { name: "Beach Bash", accesses: 26 },
];

export default function User() {
    const scrollRef = useRef<HTMLUListElement>(null);

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        function handleScroll() {
            if (scrollRef.current) setIsScrolled(scrollRef.current.scrollTop > 0);
        }

        scrollRef.current?.addEventListener("scroll", handleScroll);

        return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col p-4 pb-0 w-full items-center">
            <div className="flex flex-row items-center justify-between w-full max-w-6xl shadow-sm rounded-lg border">
                <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex flex-row items-center justify-start p-2.5 bg-white w-full rounded-lg">
                        <Image
                            className="rounded-full"
                            width={64}
                            height={64}
                            alt="user image"
                            objectFit="cover"
                            src="https://img.freepik.com/free-photo/vertical-shot-amazed-young-african-american-male-with-stupefied-expression_273609-28353.jpg"
                        />
                        <div className="flex flex-col">
                            <label className="ml-3 text-lg font-bold">Sigma boy</label>
                            <label className="ml-3 text-sm">
                                {invites.length} convite{invites.length > 1 ? "s" : ""} criado
                                {invites.length > 1 ? "s" : ""}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-start items-start my-3 max-w-6xl">
                <h2 className="text-3xl text-black font-semibold mx-5">Meus convites</h2>
            </div>
            <div className="relative overflow-clip h-full w-full flex-1">
                <div
                    className={`absolute h-2 w-full top-0 bg-gradient-to-b from-[#FBFCFF] to-transparent z-10 duration-100 ${
                        isScrolled ? "opacity-100" : "opacity-0"
                    }`}
                />

                <ul
                    className="overflow-scroll size-full flex-1 scrollbar-hide justify-center items-center"
                    ref={scrollRef}
                >
                    {invites.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-row h-36 bg-white rounded-lg mb-4 shadow-sm overflow-hidden max-w-6xl mx-auto border"
                        >
                            <Image
                                src="/images/convite.png"
                                alt="convite"
                                width={192}
                                height={192}
                                style={{ objectFit: "cover" }}
                            />
                            <div className="flex flex-row justify-between items-center w-full mx-7">
                                <div className="flex flex-col justify-center items-start">
                                    <label className="text-3xl font-bold">{item.name}</label>
                                    <label className="text-lg">{item.accesses} acessos</label>
                                </div>
                                <div className="flex flex-col gap-y-2 w-32 font-bold text-sm">
                                    <button className="bg-blue-200 h-7 rounded-full border-2 border-blue-400 text-blue-800">
                                        VER
                                    </button>
                                    <button className="bg-green-200 h-7 rounded-full border-2 border-green-400 text-green-800">
                                        EDITAR
                                    </button>
                                    <button className="bg-red-200 h-7 rounded-full border-2 border-red-400 text-red-800">
                                        ARQUIVAR
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    <li className="flex flex-row mb-10 justify-center items-center">
                        <button className="flex flex-row justify-center my-1 rounded-2xl items-center duration-300 text-gray-400 hover:text-gray-500">
                            <Plus className="size-20 ml-1" strokeWidth={1.5} />
                            <span className="text-3xl font-semibold mr-6">Novo convite</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
