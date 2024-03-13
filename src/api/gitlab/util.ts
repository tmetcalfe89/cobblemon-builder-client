import { filesDb } from "./indexeddb";

const queryingFiles: Record<string, Promise<string>> = {};

export function fetchFile(filename: string, { branch = "main" } = {}) {
  const path = encodeURIComponent(filename);
  const key = JSON.stringify({ branch, path: filename });
  const useCache = branch !== "main";
  if (key in queryingFiles) {
    return queryingFiles[key];
  }
  const endpoint = `https://gitlab.com/api/v4/projects/cable-mc%2Fcobblemon/repository/files/${path}/raw?ref=${branch}`;
  const fetchIt = async () => {
    const cached = (
      !useCache ? [] : await filesDb.getByField("path", filename)
    ).find((entry) => entry.branch === branch);
    if (cached?.contents) {
      return cached.contents;
    }
    const response = await fetch(endpoint);
    const contents = await response.text();
    if (useCache) {
      if (!cached) {
        await filesDb.create({
          contents,
          path: filename,
          branch,
        });
      } else {
        await filesDb.update(cached.id, {
          ...cached,
          contents,
        });
      }
    }
    return contents;
  };
  const promise = fetchIt();
  queryingFiles[key] = promise;
  return promise;
}

interface DirectoryContent {
  id: string;
  mode: string;
  name: string;
  path: string;
  type: string;
}

export async function fetchDirectoryContents(
  dirname: string,
  { page = 1, recursive = false, pageSize = 20, branch = "main" } = {}
) {
  const path = encodeURIComponent(dirname);
  const endpoint = `https://gitlab.com/api/v4/projects/cable-mc%2Fcobblemon/repository/tree?id=cable-mc%2Fcobblemon&page=${page}&pagination=keyset&path=${path}&per_page=${pageSize}&recursive=${recursive}&ref=${branch}`;
  const response = await fetch(endpoint);
  const data = (await response.json()) as DirectoryContent[];
  return data;
}

export async function huntForFileInDirectory(
  dirname: string,
  filename: string,
  { branch = "main" } = {}
) {
  const useCache = branch !== "main";
  const matcher = ({ path }: { path: string }) =>
    path.startsWith(`${dirname}/`) && path.endsWith(`/${filename}`);
  let found: { path: string } | null = null;
  let count = 0;
  if (useCache) {
    found = (await filesDb.getByField("branch", branch)).find(matcher) || null;
  }
  while (!found) {
    const data = await fetchDirectoryContents(dirname, {
      page: count / 20 + 1,
      recursive: true,
      branch,
      pageSize: 20,
    });
    if (data.length === 0) break;
    data.forEach(({ path }) => filesDb.create({ branch, path }));
    count += data.length;
    found = data.find(matcher) || null;
  }
  return found && (await fetchFile(found.path, { branch }));
}
