const UpdateNestedObject = (updatedObj, mainObj) => {
  for (let lang in updatedObj) {
    if (mainObj?.hasOwnProperty(lang)) {
      if (
        typeof updatedObj[lang] === "object" &&
        !Array.isArray(updatedObj[lang]) &&
        updatedObj[lang] !== null
      ) {
        for (let prop in updatedObj[lang]) {
          mainObj[lang][prop] = updatedObj[lang][prop];
        }
      } else {
        mainObj[lang] = updatedObj[lang];
      }
    } else {
      mainObj[lang] = updatedObj[lang];
    }
  }
  return mainObj;
};

export default UpdateNestedObject;
