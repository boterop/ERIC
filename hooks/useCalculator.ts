import { useCallback, useRef, useState } from "react";

const ERROR_MESSAGE = "Syntax error";

const useCalculator = () => {
  const ans = useRef<string>("");

  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const specialKeys = ["ans", "*10^"];

  const isNumber = (value: string) => {
    return !isNaN(parseFloat(value));
  };

  const replacePower = (text: string) => {
    const parts = text.split("^");
    if (parts.length >= 2) {
      let number = "";
      let power = "";
      const powers = new Map<string, number>();
      parts.forEach((part, index) => {
        if (index !== 0) {
          for (let i = 0; i < part.length; i++) {
            if (isNumber(part[i])) continue;
            power = part.slice(0, i);
            break;
          }
          power = power === "" ? part : power;

          if (number && power) {
            const key = `${number}^${power}`;
            if (!powers.has(key)) {
              powers.set(key, Math.pow(parseFloat(number), parseFloat(power)));
            }
            number = "";
            power = "";
          }
        }

        if (index !== parts.length - 1) {
          for (let i = part.length - 1; i >= 0; i--) {
            if (isNumber(part[i])) continue;
            number = part.slice(i + 1);
            break;
          }
          number = number === "" ? part : number;
        }
      });
      powers.forEach((value, key) => {
        text = text.replaceAll(key, value.toString());
      });
    }
    return text;
  };

  const onPress = useCallback(
    (value: string) => {
      switch (value.toLowerCase()) {
        case "ans":
          return setText((prev) => `${prev}Ans`);
        case "del":
          return setText((prev) => {
            for (const key of specialKeys) {
              if (prev.slice(prev.length - key.length).toLowerCase() === key) {
                return prev.slice(0, -key.length);
              }
            }
            return prev.slice(0, -1);
          });
        case "ac":
          setResult("");
          return setText("");
        case "*10^x":
          return setText((prev) => `${prev}*10^`);
        case "=":
          return setText((prev) => {
            let formatted = prev.replaceAll("Ans", ans.current || "0");
            formatted = replacePower(formatted);
            try {
              const r = eval(formatted);
              setResult(r.toString());
              ans.current = r.toString();
            } catch (_) {
              setResult(ERROR_MESSAGE);
            }
            return prev;
          });
        default:
          return setText((prev) => `${prev}${value}`);
      }
    },
    [setText, setResult],
  );

  return { text, result, onPress };
};

export default useCalculator;
