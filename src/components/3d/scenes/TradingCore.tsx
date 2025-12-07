"use client";

import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useCursor, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
// @ts-expect-error - Theatre.js types have package.json exports issue
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import { Suspense } from "react";

// Theatre project + sheet
const project = getProject("HyperTradingSite");
const homeSheet = project.sheet("Home-TradingCore");

// ====== Particles helper ======
function CandlestickParticles({ count = 1200, radius = 2.2 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 0.25;
            const y = (Math.random() - 0.5) * 1.5;

            positions[i * 3 + 0] = Math.cos(angle) * r;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * r;

            speeds[i] = 0.001 + Math.random() * 0.003;
        }
        return { positions, speeds };
    }, [count, radius]);

    useFrame(({ clock }) => {
        const pts = pointsRef.current;
        const arr = pts.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const x = arr[ix];
            const z = arr[ix + 2];

            const angle = Math.atan2(z, x) + speeds[i] * 60;
            const r = Math.sqrt(x * x + z * z);

            arr[ix] = Math.cos(angle) * r;
            arr[ix + 2] = Math.sin(angle) * r;

            // subtle vertical wave
            arr[ix + 1] += Math.sin(clock.elapsedTime * speeds[i] * 20) * 0.0005;
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
                size={0.02}
                color={new THREE.Color(1.5, 1.8, 2.2)} // >1 to glow
                transparent
                opacity={0.9}
                depthWrite={false}
                toneMapped={false} // required for selective bloom
            />
        </points>
    );
}

// ====== Main Scene ======
export default function TradingCore() {
    const groupRef = useRef<THREE.Group>(null!);
    const ringOuterRef = useRef<THREE.Mesh>(null!);
    const ringInnerRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const accel = hovered ? 2.6 : 1.0;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.12;
        }
        if (ringOuterRef.current) {
            ringOuterRef.current.rotation.x = t * 0.35 * accel;
            ringOuterRef.current.rotation.z = t * 0.22 * accel;
        }
        if (ringInnerRef.current) {
            ringInnerRef.current.rotation.y = -t * 0.5 * accel;
            ringInnerRef.current.rotation.z = t * 0.18 * accel;
        }
    });

    return (
        <SheetProvider sheet={homeSheet}>
            {/* Theatre editable camera */}
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0.4, 6]}
                fov={45}
            />

            {/* Environment for PBR reflections - using preset instead of HDR file */}
            <Suspense fallback={null}>
                <Environment preset="studio" />
            </Suspense>

            {/* Lighting */}
            <ambientLight intensity={0.35} />
            <e.pointLight
                theatreKey="KeyLight"
                position={[4, 6, 6]}
                intensity={2.2}
                color="#8bf3ff"
            />
            <spotLight
                position={[-6, 4, 2]}
                intensity={1.2}
                angle={0.35}
                penumbra={1}
                color="#7f9cff"
            />

            {/* Orb + rings */}
            <group
                ref={groupRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.1}>
                    {/* Trading core orb */}
                    <e.mesh theatreKey="CoreOrb" castShadow>
                        <sphereGeometry args={[1.15, 128, 128]} />
                        <meshPhysicalMaterial
                            color="#05080f"
                            roughness={0.15}
                            metalness={0.9}
                            clearcoat={1}
                            clearcoatRoughness={0.02}
                            transmission={0.25}
                            thickness={1.2}
                            ior={1.35}
                            emissive={hovered ? "#36e2ff" : "#0b3040"}
                            emissiveIntensity={hovered ? 2.5 : 1.2}
                            toneMapped={false}
                        />
                    </e.mesh>

                    {/* Outer ring */}
                    <mesh ref={ringOuterRef} castShadow>
                        <torusGeometry args={[1.9, 0.035, 48, 320]} />
                        <meshStandardMaterial
                            color="#cfd9ff"
                            metalness={1}
                            roughness={0.05}
                            emissive="#7ad6ff"
                            emissiveIntensity={hovered ? 1.3 : 0.6}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* Inner ring */}
                    <mesh ref={ringInnerRef} castShadow rotation={[Math.PI / 2.3, 0, 0]}>
                        <torusGeometry args={[1.55, 0.03, 48, 260]} />
                        <meshStandardMaterial
                            color="#9ec8ff"
                            metalness={1}
                            roughness={0.07}
                            emissive="#b68cff"
                            emissiveIntensity={hovered ? 1.15 : 0.5}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* Particles */}
                    <CandlestickParticles count={1200} radius={2.2} />
                </Float>
            </group>

            {/* Post-processing */}
            <EffectComposer>
                <Bloom luminanceThreshold={1} intensity={1.5} levels={9} mipmapBlur />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
        </SheetProvider>
    );
}
