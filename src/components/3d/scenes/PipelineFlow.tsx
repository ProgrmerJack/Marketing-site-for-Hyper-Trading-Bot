"use client";

import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, Tube, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
// @ts-expect-error - Theatre.js types have package.json exports issue
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { Suspense } from "react";

// Theatre project + sheet
const project = getProject("HyperTradingSite");
const howSheet = project.sheet("HowItWorks-Pipeline");

// ====== Pipeline Curve ======
function PipelineCurve() {
    const points = useMemo(() => {
        return [
            new THREE.Vector3(-3, 0, 0),
            new THREE.Vector3(-1, 0.5, 0),
            new THREE.Vector3(1, 0.3, 0),
            new THREE.Vector3(3, 0, 0),
        ];
    }, []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

    return (
        <Tube args={[curve, 64, 0.08, 16, false]}>
            <meshStandardMaterial
                color="#4fc3ff"
                metalness={0.8}
                roughness={0.2}
                emissive="#2a9fd6"
                emissiveIntensity={0.4}
                toneMapped={false}
            />
        </Tube>
    );
}

// ====== Flow Particles ======
function FlowParticles({ count = 600 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    const { positions, offsets } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const offsets = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const t = i / count;
            const x = -3 + t * 6;
            const y = Math.sin(t * Math.PI) * 0.5;

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

            offsets[i] = Math.random();
        }
        return { positions, offsets };
    }, [count]);

    useFrame(({ clock }) => {
        const pts = pointsRef.current;
        const arr = pts.geometry.attributes.position.array as Float32Array;
        const t = clock.elapsedTime * 0.3;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const offset = offsets[i];

            arr[ix] = -3 + ((t + offset) % 1) * 6;
            arr[ix + 1] = Math.sin(((t + offset) % 1) * Math.PI) * 0.5;
        }
        pts.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color={new THREE.Color(1.8, 2.2, 2.5)}
                transparent
                opacity={0.8}
                depthWrite={false}
                toneMapped={false}
            />
        </points>
    );
}

// ====== Pipeline Node ======
function PipelineNode({
    theatreKey,
    position,
    color,
    emissive,
    label,
}: {
    theatreKey: string;
    position: [number, number, number];
    color: string;
    emissive: string;
    label: string;
}) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <e.group theatreKey={theatreKey} position={position}>
            <group
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.15 : 1}
            >
                <mesh castShadow>
                    <sphereGeometry args={[0.5, 64, 64]} />
                    <meshPhysicalMaterial
                        color={color}
                        roughness={0.1}
                        metalness={0.9}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        emissive={emissive}
                        emissiveIntensity={hovered ? 2.0 : 1.2}
                        toneMapped={false}
                    />
                </mesh>

                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.7, 0.02, 16, 64]} />
                    <meshStandardMaterial
                        color={emissive}
                        emissive={emissive}
                        emissiveIntensity={hovered ? 1.5 : 0.6}
                        toneMapped={false}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </group>
        </e.group>
    );
}

// ====== Main Scene ======
export default function PipelineFlow() {
    return (
        <SheetProvider sheet={howSheet}>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 2, 8]}
                fov={50}
            />

            {/* Environment for PBR reflections */}
            <Suspense fallback={null}>
                <Environment files="/hdri/sunset.hdr" />
            </Suspense>

            <ambientLight intensity={0.4} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[5, 5, 5]}
                intensity={2.5}
                color="#6dd5ff"
            />
            <spotLight
                position={[-5, 3, 3]}
                intensity={1.5}
                angle={0.4}
                penumbra={1}
                color="#8a9cff"
            />

            <PipelineNode
                theatreKey="Node_Data"
                position={[-3, 0, 0]}
                color="#1e3a8a"
                emissive="#3b82f6"
                label="Data"
            />
            <PipelineNode
                theatreKey="Node_Signal"
                position={[0, 0.3, 0]}
                color="#7e22ce"
                emissive="#a855f7"
                label="Signal"
            />
            <PipelineNode
                theatreKey="Node_Exec"
                position={[3, 0, 0]}
                color="#065f46"
                emissive="#10b981"
                label="Execution"
            />

            <PipelineCurve />
            <FlowParticles />

            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={1.2}
                    luminanceThreshold={1}
                    luminanceSmoothing={0.2}
                />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.05} />
            </EffectComposer>
        </SheetProvider>
    );
}
