import { useEffect, useMemo, useState } from "react";
import { LangFile, getLangFile } from "../api/gitlab";

export interface useGitlabOptions {
  lang: string;
  branch: string;
}

export default function useGitlab(
  { lang, branch }: useGitlabOptions = {
    lang: "en_us",
    branch: "1.4.1",
  }
) {
  const [langFile, setLangFile] = useState<LangFile | null>(null);

  useEffect(() => {
    let running = true;
    (async function fetchLang() {
      const fetched = await getLangFile({ lang, branch });
      if (running) setLangFile(fetched);
    })();
    return () => {
      running = false;
    };
  }, [branch, lang]);

  const pokemonNames = useMemo(() => {
    if (!langFile) return [];
    return Object.entries(langFile)
      .filter(([k]) => {
        return /cobblemon\.species\.[^.]+\.name/.test(k);
      })
      .map(([k, v]) => ({
        value: k.match(/cobblemon\.species\.([^.]+)\.name/)![1],
        label: v,
      }));
  }, [langFile]);

  return { pokemonNames };
}
