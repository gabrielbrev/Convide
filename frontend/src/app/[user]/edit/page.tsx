"use client";

import { AlignLeft, Type } from "lucide-react";
import { TextInput } from "./components/TextInput";
import { ScheduleInput } from "./components/ScheduleInput";
import { LocationInput } from "./components/LocationInput";

export default function Edit() {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col bg-white border-r w-1/2 h-full overflow-scroll scrollbar-hide pb-[30vh] p-3">
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault}>
                    <TextInput icon={Type} maxCharacters={15} placeholder="Título" onKeyDown={handleKeyDown} />
                    <TextInput icon={AlignLeft} maxCharacters={25} placeholder="Descrição" onKeyDown={handleKeyDown} />
                    <ScheduleInput />
                    <LocationInput placeholder="Local" />
                </form>
            </div>

            <div className="flex w-1/2 justify-center items-center p-14">
                <div className="flex bg-white size-full border rounded-xl justify-center items-center">
                    <span className="text-black/10 text-6xl">BLANK</span>
                </div>
            </div>
        </div>
    );
}
