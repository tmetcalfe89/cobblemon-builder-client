import ModelFile from "../types/ModelFile";

export function checkForRootFolderAndFix(modelFile: ModelFile) {
  const clonedModelFile = JSON.parse(JSON.stringify(modelFile)) as ModelFile;
  const bones = clonedModelFile["minecraft:geometry"][0].bones;
  const bonesWithoutParents = bones.filter(({ parent }) => !parent);
  if (bonesWithoutParents.length > 1) {
    bones.unshift({
      name: "root",
      pivot: [0, 0, 0],
    });
    bonesWithoutParents.forEach((bone) => (bone.parent = "root"));
  }
  return clonedModelFile;
}
