import { isArray } from "class-validator";

function parseTextToArray(name: string, value?: string) {
  const arr = value ? JSON.parse(value) : "";
  if (!isArray(arr)) {
    throw new Error(`${name} should be array.`);
  }
  return arr;
}

export default parseTextToArray;
