"use client";

import { use, useEffect, useState } from "react";
import { darken, lighten } from "polished";
import { ColorContext } from "@/providers/Color";

interface Props {
    setIsAnimationOver: (b: boolean) => void;
    className?: string;
}

const Envelope = ({ setIsAnimationOver, className }: Props) => {
    const { envelopeColor, letterFadeColor, infoColor } = use(ColorContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLetterRemoved, setIsLetterRemoved] = useState<boolean>(false);

    useEffect(() => {
        document.documentElement.style.setProperty("--envelope-color", darken(0.1, envelopeColor));
        document.documentElement.style.setProperty("--flap-color", lighten(0.1, envelopeColor));
        document.documentElement.style.setProperty("--pocket-color", envelopeColor);
        document.documentElement.style.setProperty("--pocket-dark-color", darken(0.05, envelopeColor));
        document.documentElement.style.setProperty("--letter-fade-color", lighten(0.6, letterFadeColor));
    }, [envelopeColor]);

    function openEnvelope() {
        setIsOpen(true);
        setTimeout(() => {
            setIsLetterRemoved(true);
            setTimeout(() => {
                setIsAnimationOver(true);
            }, 1000);
        }, 1000);
    }

    return (
        <div className={className}>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className={`envelope-wrapper`}>
                    <div
                        id="envelope"
                        onClick={openEnvelope}
                        className={`relative w-72 h-44 duration-700 cursor-pointer ${
                            isOpen ? "open scale-110" : "close hover:scale-110"
                        }`}
                    >
                        {/* Parte da Frente */}
                        <div className="front flap"></div>
                        <div className="front pocket"></div>

                        {/* Conteúdo da Carta */}
                        <div className={`letter ${isLetterRemoved ? "removed" : ""}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Envelope;
