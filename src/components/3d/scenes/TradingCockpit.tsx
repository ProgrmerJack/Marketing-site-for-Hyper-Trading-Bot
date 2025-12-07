"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise } from "@react-three/postprocessing";
// @ts-expect-error - Theatre.js types have package.json exports issue
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { Suspense } from "react";

const project = getProject("HyperTradingSite");
const demoSheet = project.sheet("LiveDemo-Cockpit");

function GlassPanel({
    theatreKey,
    position,
    rotation,
    isMain = false,
}: {
    theatreKey: string;
    position: [number, number, number];
    rotation: [number, number, number];
    isMain?: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
    const panelRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (panelRef.current && hovered) {
            panelRef.current.rotation.y = THREE.MathUtils.lerp(
                panelRef.current.rotation.y,
                rotation[1] + 0.05,
                0.1
            );
        } else if (panelRef.current) {
            panelRef.current.rotation.y = THREE.MathUtils.lerp(
                panelRef.current.rotation.y,
                rotation[1],
                0.1
            );
        }
    });

    return (
        <e.mesh
            theatreKey={theatreKey}
            position={position}
            rotation={rotation}
            ref={panelRef}
            castShadow
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[isMain ? 2.5 : 1.8, isMain ? 1.8 : 1.3]} />
            <meshPhysicalMaterial
                color="#0a0f1a"
                roughness={0.1}
                metalness={0.1}
                transmission={0.9}
                thickness={0.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive="#2dd4bf"
                emissiveIntensity={hovered ? 1.5 : 0.6}
                toneMapped={false}
                side={THREE.DoubleSide}
            />

            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[isMain ? 2.6 : 1.9, isMain ? 1.9 : 1.4]} />
                <meshStandardMaterial
                    color="#334155"
                    metalness={0.9}
                    roughness={0.2}
                    emissive="#475569"
                    emissiveIntensity={0.3}
                    toneMapped={false}
                />
            </mesh>
        </e.mesh>
    );
}

export default function TradingCockpit() {
    return (
        <SheetProvider sheet={demoSheet}>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0.5, 5]}
                fov={50}
            />

            {/* Environment for PBR reflections - using preset instead of HDR file */}
            <Suspense fallback={null}>
                <Environment preset="night" />
            </Suspense>

            <ambientLight intensity={0.3} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[3, 3, 4]}
                intensity={2.2}
                color="#06b6d4"
            />
            <spotLight
                position={[-3, 2, 2]}
                intensity={1.0}
                angle={0.5}
                penumbra={1}
                color="#8b5cf6"
            />

            <GlassPanel
                theatreKey="Panel_Main"
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                isMain={true}
            />
            <GlassPanel
                theatreKey="Panel_Left"
                position={[-2.3, 0, 0.3]}
                rotation={[0, 0.4, 0]}
                isMain={false}
            />
            <GlassPanel
                theatreKey="Panel_Right"
                position={[2.3, 0, 0.3]}
                rotation={[0, -0.4, 0]}
                isMain={false}
            />

            <EffectComposer>
                <DepthOfField
                    focusDistance={0.01}
                    focalLength={0.02}
                    bokehScale={3}
                />
                <Bloom
                    mipmapBlur
                    intensity={1.6}
                    luminanceThreshold={1}
                    luminanceSmoothing={0.25}
                />
                <Noise opacity={0.03} />
            </EffectComposer>
        </SheetProvider>
    );
}
