"use client";
import { Color } from "playcanvas";
import { Entity } from "@playcanvas/react";
import { Camera, Light, GSplat } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { useSplat } from "../../utils/hooks";

const Scene = () => {
  const { data: model, isPending: isModeLoading } = useSplat("./stone.ply", { autoRelease: true });
  if (isModeLoading || !model) return null;

  return (
    <>
      <Entity name="light" rotation={[45, 45, 0]}>
        {/* @ts-ignore */}
        <Light type="directional" color={Color.WHITE} />
      </Entity>
      <Entity name="camera" position={[4, 2, 4]}>
        <Camera clearColor="#ccccff" />
        <OrbitControls inertiaFactor={0.6} distanceMax={5} distanceMin={3} />
      </Entity>
      <Entity name="model">
        <GSplat asset={model} />
      </Entity>
    </>
  );
};

export default Scene;
