import { isObject } from "class-validator";
function parseTextToObject(name: string, value?: string) {
  const obj = value ? JSON.parse(value) : "";
  if (!isObject(obj)) {
    throw new Error(`${name} should be Object.`);
  }
  return obj;
}

export default parseTextToObject;
