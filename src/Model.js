import React, { useState, useEffect } from 'react';
import { Text } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Model({props}) {
   
    const [loading, setLoading] = useState(true);
    const [model, setModel] = useState(null);

    const modelPath = `${process.env.PUBLIC_URL}/modern_chair.glb`;


console.log(modelPath);

    useEffect(() => {
        if (modelPath) {
            const loader = new GLTFLoader();
            loader.load(
                modelPath,
                (gltf) => {
                    setModel(gltf.scene);
                    setLoading(false);
                },
                undefined,
                (error) => {
                    console.error('Error loading GLTF model:', error);
                    setLoading(false);
                }
            );
        }
    }, [modelPath]);



    if (loading) {
        return (
            <group>
                <Text
                    position={[0, -1.5, 0]}
                    color="white"
                    fontSize={0.4}
                    maxWidth={5}
                    lineHeight={1}
                    letterSpacing={0.02}
                >
                    Loading...
                </Text>
            </group>
        );
    }

    // Render the model only when it's not null
    return model ? (
        <group scale={[0.7,0.7,0.7]} dispose={null}>
            <primitive object={model} />
        </group>
    ) : null;
}
