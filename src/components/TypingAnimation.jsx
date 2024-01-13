import { useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { useRef } from "react";

const TypingAnimation = () => {
  const group = useRef();
  const { scene, animations } = useFBX("animations/Typing.fbx"); // Replace with the path to your .fbx file

  const typingAnimation = animations.find((anim) => anim.name === "Typing");

  useFrame((_, delta) => {
    if (typingAnimation) {
      typingAnimation.currentTime += delta; // Update the animation's time
    }
  });

  return <primitive object={scene} ref={group} />;
};

export default TypingAnimation;
