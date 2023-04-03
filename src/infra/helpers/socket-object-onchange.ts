function SocketNewsOnChangeObject(
  obj: any,
  room: string,
  input: string,
  value: string,
) {
  const a = input.split(".");
  if (input.length) {
    if (a.length == 2) {
      if (obj?.[room]) {
        if (obj[room]?.[a[0]]) {
          obj[room][a[0]][a[1]] = value;
        } else {
          obj[room][a[0]] = {};
          obj[room][a[0]][a[1]] = value;
          obj[room]["onlineEditors"] = [];
        }
      } else {
        obj[room] = {};
        obj[room][a[0]] = {};
        obj[room][a[0]][a[1]] = value;
      }
    } else {
      if (obj?.[room]) {
        obj[room][a[0]] = value;
      } else {
        obj[room] = {};
        obj[room][a[0]] = value;
        obj[room]["onlineEditors"] = [];
      }
    }
  } else {
    if (obj?.[room]) {
      if (!obj?.[room]?.["onlineEditors"]) {
        obj[room]["onlineEditors"] = [];
      }
    } else {
      obj[room] = {};
      obj[room]["onlineEditors"] = [];
    }
  }

  return obj;
}

export default SocketNewsOnChangeObject;
