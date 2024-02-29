import { useCallback, useState } from "react";

export default function useBoolean(initialValue: boolean): [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
    setVal: React.Dispatch<React.SetStateAction<boolean>>;
  }
] {
  const [val, setVal] = useState<boolean>(initialValue);

  const on = useCallback(() => {
    setVal(true);
  }, []);
  const off = useCallback(() => {
    setVal(false);
  }, []);
  const toggle = useCallback(() => {
    setVal((p) => !p);
  }, []);

  return [val, { on, off, toggle, setVal }];
}
