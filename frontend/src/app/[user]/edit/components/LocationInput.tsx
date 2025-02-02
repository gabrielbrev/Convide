"use client";

import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface Props {
    placeholder?: string;
    name?: string;
    onKeyDown?: (event: any) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

interface PlaceSuggestionResponse {
    placePrediction?: {
        place: string;
        placeId: string;
        text: {
            text: string;
            matches: { endOffset: number }[];
        };
    };
}

export function LocationInput({ placeholder, name, onKeyDown, onFocus, onBlur }: Props) {
    const { debounce } = useDebounce(300);
    const [input, setInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<PlaceSuggestionResponse[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestionResponse | null>(null);
    const [hoveringList, setHoveringList] = useState<boolean>(false);

    async function getAutocompleteResults(input: string) {
        if (input.length === 0) return;

        try {
            const response = await axios.post(
                "https://places.googleapis.com/v1/places:autocomplete",
                {
                    input: input,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                    },
                }
            );

            setSuggestions(response.data.suggestions ? response.data.suggestions : []);
        } catch (err: any) {
            setSuggestions([]);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target.value;
        setInput(input);
        debounce(() => getAutocompleteResults(input));
        if (selectedPlace && selectedPlace.placePrediction?.text.text !== input) setSelectedPlace(null);
    }

    function handleSelectPlace(place: PlaceSuggestionResponse) {
        setSelectedPlace(place);
        setInput(place.placePrediction?.text.text ?? "");
        setSuggestions([]);
    }

    function handleBlur() {
        if (hoveringList) return;
        setSuggestions([]);
        if (onBlur) onBlur();
    }

    function handleFocus() {
        if (onFocus) onFocus();
    }

    return (
        <div className="flex flex-row">
            <div
                className={`flex justify-center items-center size-14 rounded-2xl shadow-md flex-none mr-3 duration-300 ${
                    selectedPlace ? "bg-lightPink" : "bg-slate-300"
                }`}
            >
                <MapPin className="text-white size-7" />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full h-14 border rounded-lg px-3 justify-between items-center shadow-md">
                    <input
                        className="w-full outline-none pr-3 text-md placeholder-slate-400"
                        placeholder={placeholder}
                        type="text"
                        name={name}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={input}
                    />
                </div>
                <div className="relative flex w-full h-0">
                    {suggestions.length > 0 && (
                        <ul
                            className="absolute -translate-y-1 bg-white border rounded-lg shadow-md mt-2 mx-1.5"
                            onMouseEnter={() => setHoveringList(true)}
                            onMouseLeave={() => setHoveringList(false)}
                        >
                            {suggestions.map((place, index) => (
                                <>
                                    {index !== 0 && <hr />}
                                    <li
                                        key={place.placePrediction?.placeId}
                                        className="hover:bg-black/5 p-1.5 cursor-pointer"
                                        onClick={() => handleSelectPlace(place)}
                                    >
                                        <span
                                            key={place.placePrediction?.placeId}
                                            className="text-sm text-start leading-tight"
                                        >
                                            {place.placePrediction?.text.text}
                                        </span>
                                    </li>
                                </>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
