"use client";

import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, QuadraticBezierLine, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
// @ts-expect-error - Theatre.js types have package.json exports issue
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { Suspense } from "react";

const project = getProject("HyperTradingSite");
const contactSheet = project.sheet("Contact-Globe");

function SignalArc({
    start,
    end,
    color,
}: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    const mid = useMemo(() => {
        const midpoint = new THREE.Vector3(
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2
        );
        return midpoint.normalize().multiplyScalar(1.8);
    }, [start, end]);

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <QuadraticBezierLine
                start={start}
                end={end}
                mid={[mid.x, mid.y, mid.z]}
                color={color}
                lineWidth={hovered ? 3 : 2}
                transparent
                opacity={hovered ? 0.9 : 0.6}
            />
        </group>
    );
}

function SignalPoint({ position, color }: { position: [number, number, number]; color: string }) {
    const pointRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        if (pointRef.current) {
            const pulse = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5;
            pointRef.current.scale.setScalar(0.8 + pulse * 0.4);
        }
    });

    return (
        <mesh position={position} ref={pointRef}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2.5}
                toneMapped={false}
            />
        </mesh>
    );
}

export default function SignalGlobe() {
    const globeRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = clock.elapsedTime * 0.05;
        }
    });

    const points: Array<[number, number, number]> = useMemo(() => [
        [1, 0.5, 0.3],
        [-0.8, 0.7, 0.5],
        [0.3, -0.9, 0.4],
        [-0.5, -0.6, -0.7],
        [0.9, 0.2, -0.5],
        [-0.3, 0.8, -0.6],
    ], []);

    return (
        <SheetProvider sheet={contactSheet}>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0, 4.5]}
                fov={50}
            />

            {/* Environment for PBR reflections - using preset instead of HDR file */}
            <Suspense fallback={null}>
                <Environment preset="night" />
            </Suspense>

            <ambientLight intensity={0.4} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[3, 3, 3]}
                intensity={2.0}
                color="#38bdf8"
            />
            <spotLight
                position={[-3, 2, 2]}
                intensity={1.3}
                angle={0.5}
                penumbra={1}
                color="#a78bfa"
            />

            <mesh ref={globeRef} castShadow>
                <sphereGeometry args={[1.2, 64, 64]} />
                <meshPhysicalMaterial
                    color="#0a1628"
                    roughness={0.3}
                    metalness={0.7}
                    clearcoat={0.5}
                    clearcoatRoughness={0.4}
                    wireframe
                    emissive="#1e3a8a"
                    emissiveIntensity={0.4}
                    toneMapped={false}
                />
            </mesh>

            {points.map((point, i) => (
                <SignalPoint key={i} position={point} color="#06b6d4" />
            ))}

            <SignalArc start={points[0]} end={points[1]} color="#38bdf8" />
            <SignalArc start={points[1]} end={points[2]} color="#06b6d4" />
            <SignalArc start={points[2]} end={points[3]} color="#0ea5e9" />
            <SignalArc start={points[3]} end={points[4]} color="#38bdf8" />
            <SignalArc start={points[4]} end={points[5]} color="#06b6d4" />
            <SignalArc start={points[5]} end={points[0]} color="#0ea5e9" />

            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={1.5}
                    luminanceThreshold={1}
                    luminanceSmoothing={0.2}
                />
                <Noise opacity={0.025} />
            </EffectComposer>
        </SheetProvider>
    );
}
