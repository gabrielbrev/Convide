"use client";

import { use, useEffect, useState } from "react";
import Envelope from "./components/Envelope";
import { Invite } from "./components/Invite";
import { usePalette } from "react-palette";
import Loading from "./components/Loading";
import { ColorContext } from "@/providers/Color";
import ScrollReset from "./components/ScrollReset";

export default function Home() {
    const imagePath = "/images/convite.png";

    const [isAnimationOver, setIsAnimationOver] = useState<boolean>(false);
    const [showEnvelope, setShowEnvelope] = useState<boolean>(true);
    const { data, loading } = usePalette(imagePath);
    const { setInfoColor, setEnvelopeColor, setLetterFadeColor } = use(ColorContext);

    useEffect(() => {
        setInfoColor(data.darkVibrant);
        setEnvelopeColor(data.vibrant);
        setLetterFadeColor(data.muted);
        document.documentElement.style.setProperty("--background-color", data.lightVibrant ?? "#000000");
    }, [data]);

    useEffect(() => {
        if (isAnimationOver) {
            setTimeout(() => {
                setShowEnvelope(false);
            }, 3000);
        }
    }, [isAnimationOver]);

    return (
        <main>
            <ScrollReset />
            {(loading && <Loading />) || (
                <div
                    style={{ backgroundColor: data.lightVibrant }}
                    className={`min-h-screen flex items-center justify-center relative`}
                >
                    <Invite
                        isAnimationOver={isAnimationOver}
                        imagePath={imagePath}
                        className={`absolute inset-0 z-20 pointer-events-none`}
                    />
                    <Envelope
                        setIsAnimationOver={setIsAnimationOver}
                        className={`absolute inset-0 z-10 ${showEnvelope ? "" : "hidden"}`}
                    />
                </div>
            )}
        </main>
    );
}
