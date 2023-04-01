function SocketNewsOnChangeObject(obj: any, room: string, input: string, value: string) {
    const a = input.split(".");
    if (input.length) {
      if (a.length == 2) {
        if (obj?.[room]) {
          if (obj[room]?.[a[0]]) {
            obj[room][a[0]][a[1]] = value;
          } else {
            obj[room][a[0]] = {};
            obj[room][a[0]][a[1]] = value;
            obj[room]["editors"] = [];
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
          obj[room]["editors"] = [];
        }
      }
    } else {
      if (obj?.[room]) {
        if (!obj?.[room]?.["editors"]) {
          obj[room]["editors"] = [];
        }
      } else {
        obj[room] = {};
        obj[room]["editors"] = [];
      }
    }

    return obj;
  }

  export default SocketNewsOnChangeObject