"use client";

import { Mail } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
    maxCharacters: number;
    placeholder?: string;
    name?: string;
    icon: React.ElementType;
    onKeyDown?: (event: any) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    setLimitReached?: (b: boolean) => void;
}

export function TextInput({ maxCharacters, placeholder, name, icon: Icon, onKeyDown, onFocus, onBlur }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [inputLength, setInputLength] = useState<number>(0);
    const counterRef = useRef<HTMLDivElement>(null);

    function shakeCounter() {
        const counter = counterRef.current;
        if (counter) {
            counter.classList.remove("animate-shakeHorizontal");
            void counter.offsetHeight; // Forçar reflow
            counter.classList.add("animate-shakeHorizontal");
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newInput = event.target.value;
        if (newInput.length > inputLength && newInput.length > maxCharacters) shakeCounter();
        setInputValue(newInput);
        setInputLength(inputValue.length);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && inputLength > maxCharacters) {
            event.preventDefault();
            shakeCounter();
            return;
        }
        if (onKeyDown) onKeyDown(event);
    }

    return (
        <div className="flex flex-row">
            <div
                className={`flex justify-center items-center size-14 rounded-2xl shadow-md flex-none mr-3 duration-300 ${
                    inputValue.length ? "bg-lightPink" : "bg-slate-300"
                }`}
            >
                <Icon className="text-white size-7" />
            </div>
            <div
                ref={counterRef}
                className="flex flex-row w-full h-14 border rounded-lg px-3 justify-between items-center shadow-md"
            >
                <input
                    className="w-full outline-none pr-3 text-md placeholder-slate-400"
                    placeholder={placeholder}
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name={name}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {maxCharacters !== undefined && (
                    <span
                        className={`text-nowrap text-sm ${
                            inputValue.length > maxCharacters ? "text-red-500" : "text-slate-400"
                        }`}
                    >
                        {inputValue.length}/{maxCharacters}
                    </span>
                )}
            </div>
        </div>
    );
}
