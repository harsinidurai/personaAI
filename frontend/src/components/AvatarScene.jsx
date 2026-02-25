import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Avatar() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#8b5cf6" />
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.35, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.05, 0.38]}>
        <boxGeometry args={[0.2, 0.05, 0.1]} />
        <meshStandardMaterial color="#e57373" />
      </mesh>
    </mesh>
  );
}

export default function AvatarScene() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-gray-700 flex items-center px-4">
        <h3 className="text-lg font-bold text-white">3D Avatar</h3>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 relative bg-gradient-to-b from-gray-800 to-gray-900">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 3]} />
          <OrbitControls enableZoom={true} enablePan={true} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Avatar />
        </Canvas>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-white text-sm">Loading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="h-20 border-t border-gray-700 p-4 bg-gray-800">
        <p className="text-xs text-gray-400 mb-2">
          Drag to rotate • Scroll to zoom
        </p>
        <p className="text-sm text-gray-300">
          This is your AI persona. It will talk and gesture as you chat!
        </p>
      </div>
    </div>
  );
}
