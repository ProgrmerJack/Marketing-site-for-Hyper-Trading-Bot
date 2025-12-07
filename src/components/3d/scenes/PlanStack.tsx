"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, RoundedBox, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
// @ts-expect-error - Theatre.js types have package.json exports issue
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { Suspense } from "react";

const project = getProject("HyperTradingSite");
const pricingSheet = project.sheet("Pricing-PlanStack");

function TierCard({
    theatreKey,
    position,
    color,
    emissive,
    label,
    isActive = false,
}: {
    theatreKey: string;
    position: [number, number, number];
    color: string;
    emissive: string;
    label: string;
    isActive?: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
    const cardRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (cardRef.current && isActive) {
            cardRef.current.position.z = THREE.MathUtils.lerp(
                cardRef.current.position.z,
                position[2] + 0.5,
                0.1
            );
        } else if (cardRef.current) {
            cardRef.current.position.z = THREE.MathUtils.lerp(
                cardRef.current.position.z,
                position[2],
                0.1
            );
        }
    });

    return (
        <e.group theatre Key={theatreKey} position={position} ref={cardRef}>
            <group
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.05 : 1}
                rotation={isActive ? [0, 0, 0] : [0, -0.1, 0]}
            >
                <RoundedBox args={[1.5, 2, 0.1]} radius={0.05} smoothness={4} castShadow>
                    <meshPhysicalMaterial
                        color={color}
                        roughness={0.15}
                        metalness={0.85}
                        clearcoat={0.8}
                        clearcoatRoughness={0.2}
                        emissive={emissive}
                        emissiveIntensity={hovered || isActive ? 1.8 : 0.8}
                        toneMapped={false}
                    />
                </RoundedBox>

                <mesh position={[0, 0, 0.07]} rotation={[0, 0, 0]}>
                    <ringGeometry args={[0.6, 0.65, 64]} />
                    <meshStandardMaterial
                        color={emissive}
                        emissive={emissive}
                        emissiveIntensity={hovered || isActive ? 2.0 : 1.0}
                        toneMapped={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        </e.group>
    );
}

export default function PlanStack() {
    const [activeTier] = useState<string>("pro");

    return (
        <SheetProvider sheet={pricingSheet}>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0, 6]}
                fov={45}
            />

            {/* Environment for PBR reflections */}
            <Suspense fallback={null}>
                <Environment files="/hdri/studio.hdr" />
            </Suspense>

            <ambientLight intensity={0.5} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[4, 4, 4]}
                intensity={2.0}
                color="#d4f1f9"
            />
            <spotLight
                position={[-4, 3, 2]}
                intensity={1.3}
                angle={0.4}
                penumbra={1}
                color="#ffd89b"
            />

            <TierCard
                theatreKey="Card_Starter"
                position={[-2, 0, -0.3]}
                color="#1e40af"
                emissive="#3b82f6"
                label="Starter"
                isActive={activeTier === "starter"}
            />
            <TierCard
                theatreKey="Card_Pro"
                position={[0, 0, 0]}
                color="#065f46"
                emissive="#10b981"
                label="Pro"
                isActive={activeTier === "pro"}
            />
            <TierCard
                theatreKey="Card_Inst"
                position={[2, 0, -0.3]}
                color="#7e22ce"
                emissive="#a855f7"
                label="Institutional"
                isActive={activeTier === "institutional"}
            />

            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={1.4}
                    luminanceThreshold={1}
                    luminanceSmoothing={0.2}
                />
                <Noise opacity={0.015} />
            </EffectComposer>
        </SheetProvider>
    );
}
