import { useEffect, useRef } from "react";

export const useListen = <T>(
  objectToListen: T,
  onChange: (objectToListen: T) => unknown
) => {
  const prevObjectRef = useRef<T>();

  useEffect(() => {
    const equal =
      JSON.stringify(prevObjectRef.current) === JSON.stringify(objectToListen);
    if (!equal) onChange(objectToListen);
    prevObjectRef.current = objectToListen;
  }, [objectToListen, onChange]);
};
