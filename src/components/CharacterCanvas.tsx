"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// isThinkingをpropsで受け取る型定義
interface CharacterCanvasProps {
  isThinking?: boolean;
}

// Bunnyモデルを読み込むコンポーネント
function BunnyModel({ isThinking }: { isThinking?: boolean }) {
  const gltf = useGLTF("/models/bunny.glb") as any;
  const ref = useRef<any>();
  // AIが回答中はpivotを下にして前後スイング
  useFrame((state) => {
    if (ref.current) {
      if (isThinking) {
        // pivotを下にずらして前後回転（x軸）
        const swing = Math.sin(state.clock.getElapsedTime() * 3) * 0.25;
        ref.current.rotation.x = swing;
        ref.current.position.y = -1.0 + Math.abs(Math.sin(swing) * 0.1); // 支点を下に
      } else {
        ref.current.rotation.x = 0;
        ref.current.position.y = -1.0;
      }
    }
  });
  return (
    <group position={[0, 0.1, 0]}>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={0.25}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function CharacterCanvas({ isThinking }: CharacterCanvasProps) {
  return (
    <div className="w-full h-full" style={{ minHeight: 320, minWidth: 320 }}>
      {/* 3Dモデル表示用Canvas */}
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} shadows style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        <Suspense fallback={<Html><div style={{color: 'white'}}>Loading...</div></Html>}>
          <BunnyModel isThinking={isThinking} />
        </Suspense>
        <OrbitControls enablePan={false} target={[0, 1, 0]} />
      </Canvas>
    </div>
  );
}