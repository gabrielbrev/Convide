"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type ColorContextData = {
    infoColor: string;
    setInfoColor: (c: string | undefined) => void;
    letterFadeColor: string;
    setLetterFadeColor: (c: string | undefined) => void;
    envelopeColor: string;
    setEnvelopeColor: (c: string | undefined) => void;
};

type ColorProviderProps = {
    children: ReactNode;
};

export const ColorContext = createContext({} as ColorContextData);

export function ColorProvider({ children }: ColorProviderProps) {
    const defaultInfoColor = "#3333222";
    const defaultLetterFadeColor = "#55555555";
    const defaultEnvelopeColor = "#FFFFFFFF";

    const [infoColor, setInfoColorState] = useState<string>(defaultInfoColor);
    const [letterFadeColor, setLetterFadeColorState] = useState<string>(defaultLetterFadeColor);
    const [envelopeColor, setEnvelopeColorState] = useState<string>(defaultEnvelopeColor);

    const setInfoColor = (c: string | undefined) => {
        setInfoColorState(c ?? defaultInfoColor);
    };

    const setLetterFadeColor = (c: string | undefined) => {
        setLetterFadeColorState(c ?? defaultLetterFadeColor);
    };

    const setEnvelopeColor = (c: string | undefined) => {
        setEnvelopeColorState(c ?? defaultEnvelopeColor);
    };

    return (
        <ColorContext.Provider
            value={{
                infoColor,
                setInfoColor,
                letterFadeColor,
                setLetterFadeColor,
                envelopeColor,
                setEnvelopeColor,
            }}
        >
            {children}
        </ColorContext.Provider>
    );
}
