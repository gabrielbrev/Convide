"use client";

import { useState, use } from "react";
import { ScheduleProps } from "../../types/Info";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ColorContext } from "@/providers/Color";
import data from "../../../public/data.json";

function formatDate(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    const day = String(utcDate.getUTCDate()).padStart(2, "0");
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");

    return `${day}/${month}`;
}

export function Schedule() {
    const { infoColor } = use(ColorContext);

    const [currentIndex, setCurrentIndex] = useState(0);

    const content: ScheduleProps = {
        days: data.schedule.days.map((day) => ({
            date: new Date(day.date),
            description: day.description,
        })),
    };

    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    function handleTouchStart(e: React.TouchEvent) {
        setStartX(e.touches[0].clientX);
    }

    function handleTouchMove(e: React.TouchEvent) {
        setEndX(e.touches[0].clientX);
    }

    function handleTouchEnd() {
        const deltaX = endX - startX;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            } else {
                setCurrentIndex((prev) => Math.min(prev + 1, content.days.length - 1));
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-lg p-2">
            <div className="flex flex-row">
                {currentIndex >= 0 && (
                    <ChevronLeft
                        className={`mx-3 duration-500 ${currentIndex > 0 ? "opacity-100 cursor-pointer" : "opacity-0"}`}
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    />
                )}

                <h2 className="text-center mb-2">
                    <strong>{formatDate(content.days[currentIndex].date)}</strong>
                </h2>
                <ChevronRight
                    className={`mx-3 duration-500 ${
                        currentIndex < content.days.length - 1 ? "opacity-100 cursor-pointer" : "opacity-0"
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, content.days.length - 1))}
                />
            </div>
            <div
                className={`flex flex-row w-full max-w-lg mb-6 flex-none overflow-hidden`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {content.days.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col w-full flex-none duration-500`}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {(() => {
                            const lines = item.description.split("\n");
                            return lines.map((line) => (
                                <div key={`${index}${line.length}`} className="flex flex-row">
                                    <div
                                        className="rounded-full m-2 w-2 h-2 flex-none"
                                        style={{ backgroundColor: infoColor }}
                                    />
                                    <p>{line}</p>
                                </div>
                            ));
                        })()}
                    </div>
                ))}
            </div>
        </div>
    );
}
