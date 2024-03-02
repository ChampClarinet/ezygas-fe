"use client";
import { FC, useEffect } from "react";
import Slider from "@/components/common/slider";
import { useSettingsStore } from "@/stores/settings";
import Styled from "./css";

const Zoomer: FC = () => {
  const zoomLevel = useSettingsStore((state) => state.zoomLevel);
  const changeZoomLevel = useSettingsStore((state) => state.changeZoomLevel);
  useEffect(() => {
    (document.body.style as any)["zoom"] = `${zoomLevel}%`;
  }, [zoomLevel]);
  return (
    <Styled>
      <span>ปรับขนาดการแสดงผล</span>
      <Slider
        min={100}
        max={120}
        step={5}
        value={zoomLevel}
        onChange={(value) => changeZoomLevel(value)}
      />
    </Styled>
  );
};

export default Zoomer;
