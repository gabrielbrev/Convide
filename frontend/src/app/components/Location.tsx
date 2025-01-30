import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import data from "../../../public/data.json";
import { CoordinateProps } from "@/types/Info";

const center: CoordinateProps = data.locationCoords;

export function Location() {
    const url = data.googleMapsUrl;

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const mapOptions: google.maps.MapOptions = {
        fullscreenControl: false, // Desativa o botão de tela cheia
        zoomControl: false, // Desativa os controles de zoom
        mapTypeControl: false, // Desativa o controle de tipo de mapa (satélite/terreno)
        streetViewControl: false, // Desativa o Pegman (Street View)
    };

    const [zoom, setZoom] = useState<number>(1);
    useEffect(() => {
        setTimeout(() => setZoom(10), 1000);
    }, []);

    const [mapSize, setMapSize] = useState<number>(200);
    // Não consegui fazer usando w-full ?????
    useEffect(() => {
        const size = Math.min(window.innerWidth, window.innerHeight);
        setMapSize((size * 3) / 4);
    }, [window.innerWidth, window.innerHeight]);

    return (
        <>
            <div className="bg-white rounded-lg p-2">
                {(isLoaded && (
                    <GoogleMap
                        mapContainerClassName="rounded-lg"
                        mapContainerStyle={{ width: `${mapSize}px`, height: `${mapSize}px` }}
                        center={center}
                        zoom={zoom}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={mapOptions}
                    >
                        <Marker position={center} />
                    </GoogleMap>
                )) || <div style={{ width: `${mapSize}px`, height: `${mapSize}px` }} />}
            </div>
            <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold justify-center items-centers text"
            >
                <p className="text-center pt-2">Ver no google maps</p>
            </Link>
        </>
    );
}
