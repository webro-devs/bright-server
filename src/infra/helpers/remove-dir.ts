import * as fs from "fs";

const deleteDirectory = () => {
  if (fs.existsSync(__dirname + "/output/uploads"))
    return fs.rmSync(__dirname + "/output/uploads", {
      recursive: true,
      force: true,
    });
};

export default deleteDirectory;
