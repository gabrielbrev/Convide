"use client";

import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { MoveUp, MapPin, MessageCircle, Calendar, X, Undo2 } from "lucide-react";
import { InfoProps } from "../../types/Info";
import { Schedule } from "./Schedule";
import { Location } from "./Location";
import { ColorContext } from "@/providers/Color";
import React from "react";
import Link from "next/link";
import data from "../../../public/data.json";

interface Props {
    isAnimationOver: boolean;
    imagePath: string;
    className?: string;
}

const infos: InfoProps[] = [
    { icon: Calendar, label: "Programação", content: Schedule },
    { icon: MapPin, label: "Local", content: Location },
    { icon: MessageCircle, label: "Confirme sua presença!", href: data.whatsappUrl },
];

export function Invite({ isAnimationOver, imagePath, className }: Props) {
    const { infoColor } = use(ColorContext);

    // Lógica para ajustar o tamanho da imagem do convite
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const img = new window.Image();
        img.src = imagePath;
        img.onload = () => setDimensions({ width: img.width, height: img.height });
    }, [imagePath]);

    useEffect(() => {
        if (dimensions.width == 0) {
            return;
        }
        const newWidth = dimensions.width * (window.innerHeight / dimensions.height);
        setImageWidth(newWidth);
    }, [dimensions]);

    // Lógica para mostrar o tutorial
    const [showTutorial, setShowTutorial] = useState<boolean>(false);

    useEffect(() => {
        if (!isAnimationOver) {
            return;
        }

        setTimeout(() => {
            setShowTutorial(true);
        }, 3500);
    }, [isAnimationOver]);

    // Lógica para mostrar mais informações
    const [scrollDirection, setScrollDirection] = useState<number>(0);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState<boolean>(false);

    useEffect(() => {
        function handleWheel(e: WheelEvent) {
            if (!isAnimationOver) {
                return;
            }

            e.preventDefault();

            if (e.deltaY > 0) {
                setScrollDirection(-1);
            } else if (e.deltaY < 0) {
                setScrollDirection(1);
            }

            if (scrollDirection !== 0) {
                setScrolled(true); // Não volta a ser false
            }
        }

        function handleTouchStart(e: TouchEvent) {
            setTouchStart(e.touches[0].clientY);
        }

        function handleTouchMove(e: TouchEvent) {
            if (!isAnimationOver || touchStart === null) {
                return;
            }

            const touchEnd = e.touches[0].clientY;
            if (touchEnd < touchStart) {
                setScrollDirection(-1);
            } else if (touchEnd > touchStart) {
                setScrollDirection(1);
            }

            if (scrollDirection !== 0) {
                setScrolled(true); // Não volta a ser false
            }

            setTouchStart(touchEnd);
        }

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [isAnimationOver, scrollDirection]);

    useEffect(() => {
        if (!isModalOpen) {
            setShowInfo(scrollDirection === -1);
        }
    }, [scrollDirection]);

    // Logica do modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<React.ReactElement>();
    const [modalTitle, setModalTitle] = useState<string>("");
    const modalRef = useRef<HTMLDivElement | null>(null);

    function openModal(title: string, content: React.ElementType) {
        setModalTitle(title);
        setModalContent(React.createElement(content));
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;
            if (modalRef.current && !modalRef.current.contains(target)) {
                closeModal();
            }
        };

        // Adiciona eventos de clique e toque no documento
        document.addEventListener("click", handleOutsideInteraction);
        document.addEventListener("touchstart", handleOutsideInteraction);

        return () => {
            document.removeEventListener("click", handleOutsideInteraction);
            document.removeEventListener("touchstart", handleOutsideInteraction);
        };
    }, [closeModal]);

    return (
        <div className={className}>
            <div
                className={`h-full flex justify-center items-start duration-[1750ms] transition-all ease-backOut ${
                    isAnimationOver ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                {/* Tutorial */}
                <div
                    className={`absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-black/85 to-transparent duration-300 flex flex-col justify-center items-center ${
                        showTutorial && !scrolled ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ height: "100%" }}
                >
                    <MoveUp
                        className={`duration-[2000ms] ${showTutorial ? "animate-moveUp" : ""}`}
                        width={300}
                        height={75}
                    />
                    <p className="mt-4">Arraste para mais informações</p>
                </div>

                {/* Convite */}
                <Image
                    priority
                    src={imagePath}
                    alt="Convite"
                    width={imageWidth}
                    height={10}
                    className={`rounded-lg duration-700 transition-all ${isAnimationOver ? "sm:mt-0 mt-5" : "mt-0"} ${
                        isAnimationOver ? "shadow-xl" : "shadow-none"
                    } ${showInfo ? "filter blur-[4px]" : "filter blur-none"}`}
                    style={{
                        transition: "filter 700ms",
                    }}
                />

                {/* Mais informações */}
                <div className="absolute z-10 top-1/3 w-full flex flex-col justify-center items-center">
                    <div
                        className={`flex flex-row duration-300 w-full justify-center items-center ${
                            isModalOpen ? "opacity-0 translate-y-10" : "opacity-100"
                        }`}
                    >
                        {infos.map((info, index) => (
                            <div key={index} className="flex justify-center items-center flex-grow max-w-56">
                                <Link
                                    href={info.href ?? ""}
                                    target={info.href ? "_blank" : ""}
                                    rel="noopener noreferrer"
                                    className={`duration-700 transition-all flex flex-col justify-center items-center ${
                                        showInfo
                                            ? "translate-y-0 opacity-100 pointer-events-auto cursor-pointer"
                                            : "translate-y-[300%] opacity-0 pointer-events-none"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                    onClick={() => {
                                        if (info.content) openModal(info.label, info.content);
                                    }}
                                >
                                    <div
                                        className="text-white rounded-full flex justify-center items-center w-20 h-20 shadow-2xl"
                                        style={{ backgroundColor: infoColor }}
                                    >
                                        <info.icon className={`w-10 h-10 m-6`} />
                                    </div>
                                    <p
                                        className="absolute top-full mt-2 leading-4 text-center"
                                        style={{ color: infoColor }}
                                    >
                                        {info.label}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div
                        className={`w-auto h-auto mt-28 rounded-full ${
                            showInfo && !isModalOpen
                                ? "opacity-100 duration-[1750ms] pointer-events-auto cursor-pointer delay-700"
                                : "opacity-0 duration-500 pointer-events-none"
                        }`}
                        style={{ backgroundColor: infoColor }}
                        onClick={() => setScrollDirection(0)}
                    >
                        <X className={`w-6 h-6 m-2 text-white`} />
                    </div>
                </div>

                {/* Modal */}
                <div
                    ref={modalRef}
                    className={`absolute z-10 top-1/3 duration-500 rounded-lg max-w-full mx-4 ${
                        isModalOpen
                            ? `${
                                  showInfo
                                      ? "-translate-y-1/3 opacity-100 pointer-events-auto flex-col"
                                      : "translate-y-[300%] opacity-0 pointer-events-none"
                              }`
                            : "opacity-0 translate-y-10"
                    }`}
                    style={{ backgroundColor: infoColor }}
                >
                    <div className="w-6 h-6 m-2 mb-0 text-white flex flex-row">
                        <Undo2 className="flex-none cursor-pointer" onClick={closeModal} />
                        <p className="mx-2">
                            <strong>{modalTitle}</strong>
                        </p>
                    </div>
                    <div className={`p-2 rounded-lg`}>{modalContent}</div>
                </div>
            </div>
        </div>
    );
}
