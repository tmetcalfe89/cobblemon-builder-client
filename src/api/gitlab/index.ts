import Species from "../../types/Species";
import { fetchFile, huntForFileInDirectory } from "./util";

export type LangFile = Record<string, string>;

export const getLangFile = async ({ lang = "en_us", branch = "main" } = {}) => {
  const path = `common/src/main/resources/assets/cobblemon/lang/${lang}.json`;
  return JSON.parse(await fetchFile(path, { branch })) as LangFile;
};

export const getSpecies = async (species: string, { branch = "main" } = {}) => {
  const filename = `${species}.json`;
  const dirname = "common/src/main/resources/data/cobblemon/species";
  const foundFile = await huntForFileInDirectory(dirname, filename, { branch });
  return foundFile ? (JSON.parse(foundFile) as Species) : null;
};
