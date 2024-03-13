import {
  getAddonById,
  getAllAnimationsForMonster,
  getAllModelsForMonster,
  getAllMonstersForAddon,
  getAllPosersForMonster,
  getAllResolversForMonster,
  getAllSpeciesForMonster,
  getAllTexturesForMonster,
} from "../api/indexeddb";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportAddon(id: number) {
  const addon = await getAddonById(id);
  const addonName = addon.name.toLowerCase();
  const zipped = new JSZip();
  const modelFolder = zipped.folder(
    `assets/${addonName}/bedrock/pokemon/models/`
  )!;
  const animFolder = zipped.folder(
    `assets/${addonName}/bedrock/pokemon/animations`
  )!;
  const poserFolder = zipped.folder(
    `assets/${addonName}/bedrock/pokemon/posers`
  )!;
  const resolverFolder = zipped.folder(
    `assets/${addonName}/bedrock/pokemon/resolvers`
  )!;
  const textureFolder = zipped.folder(`assets/${addonName}/textures`)!;
  const speciesFolder = zipped.folder(`data/${addonName}/species`)!;

  const monsters = await getAllMonstersForAddon(addon.id);
  for (const monster of monsters) {
    const monsterName = monster.name.toLowerCase();
    const rawModels = await getAllModelsForMonster(monster.id);
    for (const rawModel of rawModels) {
      modelFolder.file(rawModel.name, JSON.stringify(rawModel.model, null, 2));
    }

    const rawAnims = await getAllAnimationsForMonster(monster.id);
    animFolder.file(
      `${monsterName}.animation.json`,
      JSON.stringify(
        {
          format_version: "1.8.0",
          animations: rawAnims.reduce(
            (acc, { animation, name }) => ({
              ...acc,
              [`animation.${monsterName}.${name}`]: animation,
            }),
            {}
          ),
        },
        null,
        2
      )
    );

    const rawPosers = await getAllPosersForMonster(monster.id);
    for (const rawPoser of rawPosers) {
      poserFolder.file(
        `${rawPoser.name.toLowerCase()}.json`,
        JSON.stringify(rawPoser.poser, null, 2)
      );
    }

    const rawTextures = await getAllTexturesForMonster(monster.id);
    for (const rawTexture of rawTextures) {
      textureFolder.file(
        `${rawTexture.name.toLowerCase()}`,
        await fetch(`data:image/jpeg;base64,${rawTexture.texture}`).then(
          (res) => res.blob()
        )
      );
    }

    const rawResolvers = await getAllResolversForMonster(monster.id);
    for (const rawResolver of rawResolvers) {
      resolverFolder.file(
        `${rawResolver.name.toLowerCase()}.json`,
        JSON.stringify(
          {
            species: `cobblemon:${monsterName}`,
            order: 0,
            variations: rawResolver.resolver.variations.map((variation) => ({
              ...variation,
              aspects: variation.aspects.map(
                ({ key, value }) => `${key}=${value}`
              ),
              model: !variation.model
                ? undefined
                : `cobblemon:${rawModels
                    .find((model) => model.id === variation.model)
                    ?.name.slice(0, -5)
                    .toLowerCase()}`,
              poser: !variation.poser
                ? undefined
                : `cobblemon:${rawPosers
                    .find((poser) => poser.id === variation.poser)
                    ?.name.toLowerCase()}`,
              texture: !variation.texture
                ? undefined
                : `cobblemon:textures/pokemon/${
                    rawTextures.find(
                      (texture) => texture.id === variation.texture
                    )?.name
                  }`,
            })),
          },
          null,
          2
        )
      );
    }

    const rawSpecies = await getAllSpeciesForMonster(monster.id);
    for (const rawSpecie of rawSpecies) {
      speciesFolder.file(
        `${rawSpecie.name.toLowerCase()}.json`,
        JSON.stringify(rawSpecie, null, 2)
      );
    }
  }

  const zipData = await zipped.generateAsync({ type: "blob" });
  saveAs(zipData, `${addon.name}.zip`);
}
