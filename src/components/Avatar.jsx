
import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // Import THREE


export function Avatar(props) {

	const { animation } = props;
	

	const group = useRef();
	const { nodes, materials } = useGLTF("models/657a0cf4012bb533ff10fefd.glb");

	const { animations: typingAnimation } = useFBX("animations/TypingBug.fbx")
	const { animations: fallingAnimation } = useFBX("animations/Falling Idle.fbx")
	const { animations: standingAnimation } = useFBX("animations/Standing Idle.fbx")
	const {animations: wavingAnimation} = useFBX("animations/Waving.fbx")
	const {animations: armsCrossedAnimation} = useFBX("animations/Arms Crossed.fbx")
	const {animations: harshRanjanImage} = useFBX("animations/HRP.fbx")


	typingAnimation[0].name = "Typing";
	fallingAnimation[0].name = "Falling";
	standingAnimation[0].name = "Standing";
	wavingAnimation[0].name = "Waving";
	armsCrossedAnimation[0].name = "ArmsCrossed"


	const { actions } = useAnimations([typingAnimation[0], fallingAnimation[0], standingAnimation[0],wavingAnimation[0], armsCrossedAnimation[0]], group);


	useEffect(() => {
		actions[animation].reset().fadeIn(0.5).play();
		return () => {
			actions[animation].reset().fadeOut(0.5);
		};
	}, [animation]);

	//console.log(typingAnimation[0]);


	return (
		<group {...props} ref={group} dispose={null}>
			<group rotation-x={-Math.PI / 2}>
				<primitive object={nodes.Hips} />
				<skinnedMesh
					frustumCulled={false}
					name="EyeLeft"
					geometry={nodes.EyeLeft.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeLeft.skeleton}
					morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="EyeRight"
					geometry={nodes.EyeRight.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeRight.skeleton}
					morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Head"
					geometry={nodes.Wolf3D_Head.geometry}
					material={materials.Wolf3D_Skin}
					skeleton={nodes.Wolf3D_Head.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Teeth"
					geometry={nodes.Wolf3D_Teeth.geometry}
					material={materials.Wolf3D_Teeth}
					skeleton={nodes.Wolf3D_Teeth.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					geometry={nodes.Wolf3D_Hair.geometry}
					material={materials.Wolf3D_Hair}
					skeleton={nodes.Wolf3D_Hair.skeleton}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Outfit_Top"
					geometry={nodes.Wolf3D_Outfit_Top.geometry}
					material={materials.Wolf3D_Outfit_Top}
					skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Outfit_Bottom"
					geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
					material={materials.Wolf3D_Outfit_Bottom}
					skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Outfit_Footwear"
					geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
					material={materials.Wolf3D_Outfit_Footwear}
					skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
					morphTargetDictionary={
						nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
					}
					morphTargetInfluences={
						nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
					}
				/>
				<skinnedMesh
					frustumCulled={false}
					name="Wolf3D_Body"
					geometry={nodes.Wolf3D_Body.geometry}
					material={materials.Wolf3D_Body}
					skeleton={nodes.Wolf3D_Body.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("models/657a0cf4012bb533ff10fefd.glb");


