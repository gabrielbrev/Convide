"use client";

import { Calendar, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InputData {
    id: number;
    date: Date;
    description?: string;
}

export function ScheduleInput() {
    const [_, refresh] = useState<boolean>(false);
    const [daysList, setDaysList] = useState<InputData[]>([]);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLLIElement>(null);
    const [ulHeight, setUlHeight] = useState<number>(0);

    function handleDateInput(event: React.ChangeEvent<HTMLInputElement>, id: number) {
        const item = daysList.find((d) => d.id === id);
        if (item) item.date = new Date(event.target.value);
        refresh((prev) => !prev);
    }

    function handleDescriptionInput(event: React.ChangeEvent<HTMLTextAreaElement>, id: number) {
        const item = daysList.find((d) => d.id === id);
        if (item) item.description = event.target.value;
    }

    function handleAddDay() {
        const ids = daysList.map((d) => d.id);

        let randnum;
        do {
            randnum = Math.random();
        } while (ids.includes(randnum));

        setDaysList((prev) => {
            let date = new Date();
            if (prev.length && prev[0].date) {
                const prevDate = prev[0].date;
                date = new Date(prevDate);
                date.setDate(prevDate.getDate() + 1);
            }
            return [{ id: randnum, date: date }, ...prev];
        });
    }

    function handleRemoveDay(id: number) {
        setDaysList((prev) => prev.filter((d) => d.id !== id));
    }

    useEffect(() => {
        const inputMarginTop = 8;
        const inputHeight = 156;
        setUlHeight((inputHeight + inputMarginTop) * daysList.length);
    }, [daysList]);

    return (
        <div className="flex flex-row">
            <div
                className={`flex justify-center items-center w-14 rounded-2xl shadow-md flex-none mr-3 duration-300 ${
                    daysList.length ? "bg-lightPink" : "bg-slate-300"
                }`}
                style={{ height: 56 + ulHeight }}
            >
                <Calendar className="text-white size-7" />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full h-14 justify-between items-center px-3 rounded-lg bg-white shadow-md border">
                    <label className="text-md text-slate-400">Programação</label>
                    <div className="flex justify-center items-center size-8 rounded-lg shadow-md bg-green-300 flex-none cursor-pointer">
                        <Plus className="text-green-800" strokeWidth={2} onClick={handleAddDay} />
                    </div>
                </div>

                <ul className="relative flex flex-col w-full duration-300" style={{ height: ulHeight }} ref={listRef}>
                    {daysList.map((item, index) => (
                        <li
                            key={item.id}
                            className="absolute flex flex-col w-full h-0 animate-expandHeight156 duration-300 mt-2 rounded-lg border shadow-md bg-white overflow-hidden"
                            style={{ transform: `translateY(calc(${index} * 100% + ${index * 8}px))` }}
                        >
                            <div className="bg-white w-full flex flex-row rounded-t-lg px-3 my-1 justify-between items-center">
                                <input
                                    className="w-full flex cursor-pointer text-slate-400"
                                    type="date"
                                    onChange={(e) => handleDateInput(e, item.id)}
                                    value={item.date?.toISOString().split("T")[0]}
                                />
                                <div
                                    className="bg-red-300 size-6 rounded-lg justify-center items-center flex cursor-pointer shadow-md"
                                    onClick={() => handleRemoveDay(item.id)}
                                >
                                    <Trash className="size-4 text-red-900" strokeWidth={2} />
                                </div>
                            </div>

                            <div className="flex size-full p-1.5 pt-0">
                                <textarea
                                    className="flex resize-none w-full h-28 rounded-lg outline-none border p-1.5 placeholder-slate-400 whitespace-pre-wrap"
                                    placeholder={`Exemplo:\n10h - Início da festa\n13h - Hora do parabéns\n14h - Fim da festa`}
                                    onChange={(e) => handleDescriptionInput(e, item.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
