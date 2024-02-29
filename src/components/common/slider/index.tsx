import { useState, useEffect } from "react";
import colors from "@/tailwind/colors";
import Styled from "./css";

const gray = colors.gray["300"];
const primaryColor = colors.blue["900"];

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (changeTo: number) => any;
}
const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: SliderProps) => {
  const [_value, _setValue] = useState(min);
  const [percent, setPercent] = useState(0);

  const calculateGaugePercent = (val: number) => {
    const _percent = ((val - min) * 100) / (max - min);
    setPercent(_percent);
  };

  const _onChange = (changeTo: number) => {
    _setValue(changeTo);
    onChange && onChange(changeTo);
  };
  useEffect(() => {
    if (value != _value && value != null) {
      _setValue(value);
      calculateGaugePercent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, _value]);
  const gaugeStyle = `linear-gradient(
    to right,
    ${primaryColor} 0%,
    ${primaryColor} ${percent}%,
    ${gray} ${percent}%,
    ${gray} 100%
  )`;
  return (
    <Styled className="slider">
      <input
        style={{ background: gaugeStyle }}
        className="range"
        type="range"
        value={_value}
        onInput={(e: any) => calculateGaugePercent(+e.target.value)}
        min={min}
        max={max}
        step={step}
        onChange={(e) => _onChange(+e.target.value)}
      />
    </Styled>
  );
};

export default Slider;
