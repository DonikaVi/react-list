import { v4 as uuidv4 } from "uuid";

/**
 * Generate array
 * @returns {({position: *} & {value: *})[]}
 */
export const generateArray = () => {
  const arr = [...Array(100)].map((item, index) =>
    Object.assign({}, { position: index }, { value: uuidv4() })
  );
  localStorage.setItem("list", JSON.stringify(arr));
  return arr;
};

export const addEl = (pos) => {
  return { position: pos, value: uuidv4() };
};
