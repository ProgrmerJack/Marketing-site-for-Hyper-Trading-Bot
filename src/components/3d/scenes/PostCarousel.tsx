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
const blogSheet = project.sheet("Blog-Carousel");

function BlogCard({
    index,
    total,
    radius = 3,
}: {
    index: number;
    total: number;
    radius?: number;
}) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
    const cardRef = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        if (!cardRef.current) return;

        const angle = (index / total) * Math.PI * 2 + clock.elapsedTime * 0.15;
        cardRef.current.position.x = Math.cos(angle) * radius;
        cardRef.current.position.z = Math.sin(angle) * radius;
        cardRef.current.rotation.y = -angle + Math.PI / 2;

        if (hovered) {
            cardRef.current.position.y = THREE.MathUtils.lerp(
                cardRef.current.position.y,
                0.3,
                0.1
            );
            cardRef.current.scale.setScalar(THREE.MathUtils.lerp(
                cardRef.current.scale.x,
                1.15,
                0.1
            ));
        } else {
            cardRef.current.position.y = THREE.MathUtils.lerp(
                cardRef.current.position.y,
                0,
                0.1
            );
            cardRef.current.scale.setScalar(THREE.MathUtils.lerp(
                cardRef.current.scale.x,
                1,
                0.1
            ));
        }
    });

    const colors = [
        { base: "#1e3a8a", emissive: "#3b82f6" },
        { base: "#7e22ce", emissive: "#a855f7" },
        { base: "#065f46", emissive: "#10b981" },
        { base: "#9a3412", emissive: "#f97316" },
        { base: "#be123c", emissive: "#f43f5e" },
        { base: "#1e40af", emissive: "#60a5fa" },
    ];

    const colorSet = colors[index % colors.length];

    return (
        <group
            ref={cardRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <RoundedBox args={[1.2, 1.6, 0.08]} radius={0.04} smoothness={4} castShadow>
                <meshPhysicalMaterial
                    color={colorSet.base}
                    roughness={0.2}
                    metalness={0.8}
                    clearcoat={0.6}
                    clearcoatRoughness={0.3}
                    emissive={colorSet.emissive}
                    emissiveIntensity={hovered ? 1.6 : 0.7}
                    toneMapped={false}
                />
            </RoundedBox>

            <mesh position={[0, 0.6, 0.05]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color={colorSet.emissive}
                    emissive={colorSet.emissive}
                    emissiveIntensity={hovered ? 2.5 : 1.2}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

export default function PostCarousel() {
    const cardCount = 8;

    return (
        <SheetProvider sheet={blogSheet}>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 2, 6]}
                fov={55}
            />

            {/* Environment for PBR reflections - using preset instead of HDR file */}
            <Suspense fallback={null}>
                <Environment preset="sunset" />
            </Suspense>

            <ambientLight intensity={0.45} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[4, 5, 3]}
                intensity={2.0}
                color="#f59e0b"
            />
            <spotLight
                position={[-4, 3, 2]}
                intensity={1.2}
                angle={0.5}
                penumbra={1}
                color="#ec4899"
            />

            {Array.from({ length: cardCount }).map((_, i) => (
                <BlogCard key={i} index={i} total={cardCount} radius={3.5} />
            ))}

            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={1.3}
                    luminanceThreshold={1}
                    luminanceSmoothing={0.2}
                />
                <Noise opacity={0.02} />
            </EffectComposer>
        </SheetProvider>
    );
}
