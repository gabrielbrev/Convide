"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

    const [isFullyScrolled, setIsFullyScrolled] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        function handleScroll() {
            if (!scrollRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

            setIsScrolled(scrollTop > 0);
            setIsFullyScrolled(scrollTop + clientHeight >= scrollHeight);
        }

        scrollRef.current?.addEventListener("scroll", handleScroll);

        return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col p-8 w-full items-center">
            <div className="flex flex-row items-center justify-between bg-white w-full rounded-lg max-w-6xl mb-5 shadow-md overflow-hidden">
                <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex bg-black/35 h-10 w-full justify-start items-center px-3">
                        <label className="text-xl text-white font-semibold">Meus convites</label>
                    </div>
                    <div className="flex flex-row items-center justify-center p-3">
                        <Image
                            className="rounded-full"
                            width={72}
                            height={72}
                            alt="user image"
                            objectFit="cover"
                            src="https://img.freepik.com/free-photo/vertical-shot-amazed-young-african-american-male-with-stupefied-expression_273609-28353.jpg"
                        />
                        <div className="flex flex-col">
                            <label className="ml-3 text-xl font-bold">Sigma boy</label>
                            <label className="ml-3 text-md">
                                {invites.length} convite{invites.length > 1 ? "s" : ""} criado
                                {invites.length > 1 ? "s" : ""}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative overflow-clip h-full max-w-6xl w-full flex-1">
                <div
                    className={`absolute h-4 w-full top-0 bg-gradient-to-b from-[#F1F5F5] to-transparent z-10 duration-100 ${
                        isScrolled ? "opacity-100" : "opacity-0"
                    }`}
                />
                <div
                    className={`absolute h-4 w-full bottom-0 bg-gradient-to-t from-[#F1F5F5] to-transparent z-10 duration-100 ${
                        isFullyScrolled ? "opacity-0" : "opacity-100"
                    }`}
                />

                <ul className="overflow-scroll h-full max-w-6xl w-full flex-1" ref={scrollRef}>
                    {invites.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-row h-48 bg-white rounded-lg mx-auto mb-4 shadow-md overflow-hidden"
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
                                <div className="flex flex-col gap-y-2 w-32 font-bold">
                                    <button className="bg-blue-200 h-10 rounded-xl border-2 border-blue-400 text-blue-800">
                                        VER
                                    </button>
                                    <button className="bg-green-200 h-10 rounded-xl border-2 border-green-400 text-green-800">
                                        EDITAR
                                    </button>
                                    <button className="bg-red-200 h-10 rounded-xl border-2 border-red-400 text-red-800">
                                        ARQUIVAR
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
