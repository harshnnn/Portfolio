import { Float, MeshDistortMaterial, MeshWobbleMaterial, useScroll } from "@react-three/drei";
import { Office } from "./Office"
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { useFrame, useThree , extend, useLoader} from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config"
import * as THREE from 'three';
import { Projects } from "./Projects";
import { Background } from "./Background";


export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();

  const data = useScroll();
  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");

  useEffect(() => {
    // Set initial animation to "Falling"
    setCharacterAnimation("Falling");

    // After 1 second, check the section and update animation accordingly
    const timeoutId = setTimeout(() => {
      if (section === 0) {
        setCharacterAnimation("Typing");
      } else if (section === 1 || section === 2) {
        setCharacterAnimation("Standing");
      } else if (section === 3) {
        setCharacterAnimation("Waving");

        // After 2 seconds, change animation to "ArmsCrossed"
        setTimeout(() => {
          setCharacterAnimation("ArmsCrossed");
        }, 2000);

      }
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);

  }, [section]);

  useFrame((state) => {

    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }



    if (!curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0)

    // const position = new THREE.Vector3();
    // characterContainerAboutRef.current.getWorldPosition(position);
    // // console.log([position.x, position.y, position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");
    // console.log([euler.x, euler.y, euler.z]);

  })

  return (
    <>
      <Background />
      <motion.group
        position={[
          1.9072935059634513,
          0.14400000000000002,
          2.681898051533946
        ]}

        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 1,
        }}
        variants={{
          0: {
            scaleX: 0.9,
            scaleY: 0.9,
            scaleZ: 0.9,
          },
          1: {
            y: -viewport.height + 0.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          2: {

            y: -viewport.height * 2 + 0.5,
            x: -2,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.4,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 5,
            rotateZ: 0,
          }
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>


      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >

        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}

        >
        </group>

      </motion.group>

      {/* Skills */}
      <motion.group position={[0, -1.5, -10]}
        animate={
          {
            z: section === 1 ? 0 : -10,
            y: section === 1 ? -viewport.height : -1.5,
          }
        }
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[3, 1, -18]} scale={[3, 3, 3]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[-3, -1, -11]} scale={[1.4, 1.4, 1.4]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects />
    </>
  );
};
