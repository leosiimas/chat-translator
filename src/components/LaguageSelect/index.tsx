import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { ref, update, get } from "firebase/database";

import * as S from "./styled";

const languages = [
  { code: "pt-BR", name: "Português (Brasil)", flag: "/flags/br.png" },
  { code: "ko", name: "한국인", flag: "/flags/kr.png" },
];

type LanguageSelectorProps = {
  lang: string;
};

export default function LanguageSelector({ lang }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const [userConfig, setUserConfig] = useState<any>(null);

  const handleSelect = async (lang: any) => {
    setSelected(lang);

    const user = auth.currentUser;
    if (!user) return;

    const userRef = ref(db, `configUser/${user.uid}`);
    await update(userRef, {
      lang: lang.code,
    });

    setOpen(false);
  };

  useEffect(() => {
    handleSelect(lang);
  }, []);

  return (
    <S.Wrapper>
      <S.Selector onClick={() => setOpen(!open)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <S.Flag src={selected.flag} alt={selected.name} />
          {selected.name}
        </div>
        <span>▾</span>
      </S.Selector>
      {open && (
        <S.Options>
          {languages.map((lang) => (
            <S.Option key={lang.code} onClick={() => handleSelect(lang)}>
              <S.Flag src={lang.flag} alt={lang.name} />
              {lang.name}
            </S.Option>
          ))}
        </S.Options>
      )}
    </S.Wrapper>
  );
}
