"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MapNoSSR = () => {
    return (
        <>
            <MapContainer
                center={[35, 50]}
                zoom={13}
                style={{ height: "90%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker />
            </MapContainer>
        </>
    );
};

function DraggableMarker() {
    const [position, setPosition]: any = useState({ lat: 35, lng: 50 });
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("latitude", position.lat);
        params.set("longitude", position.lng);
        router.replace(`${pathname}?${params.toString()}`);
    }, [position, pathname, router, searchParams]);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker: any = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    return (
        <Marker
            draggable
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        />
    );
}

export default MapNoSSR;
