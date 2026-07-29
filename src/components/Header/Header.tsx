import { useCallback, useEffect, useState } from "react";
import S from "@/components/Header/Header.styles";
import { siteConfig } from "@/content/site";

const MENU_ID = "header-mobile-menu";

// 메인 페이지 상단 고정 내비게이션.
// 데스크톱은 섹션 앵커를 그대로 노출하고,
// 모바일은 햄버거 메뉴로 접되 Resume 링크는 항상 보여준다.
export default function Header(): React.ReactNode {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // 메뉴가 열린 동안 Escape로 닫을 수 있게 한다.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <S.Bar>
      <S.Inner>
        <S.Brand href="#top" aria-label="맨 위로 이동" onClick={closeMenu}>
          {siteConfig.pageTitle}
        </S.Brand>
        <S.Nav aria-label="섹션 이동">
          {siteConfig.nav.map((item) => (
            <S.NavLink key={item.id} href={`#${item.id}`}>
              {item.label}
            </S.NavLink>
          ))}
          {/* 이력서 다운로드 기능은 당분간 사용하지 않는다.
          <S.ResumeLink
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume ↗
          </S.ResumeLink>
          */}
          <S.MenuButton
            type="button"
            $open={menuOpen}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={toggleMenu}
          >
            <span aria-hidden="true" />
          </S.MenuButton>
        </S.Nav>
      </S.Inner>
      {menuOpen && (
        <S.MobileMenu id={MENU_ID} aria-label="섹션 이동 (모바일)">
          {siteConfig.nav.map((item) => (
            <S.MobileMenuLink
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
            >
              {item.label}
            </S.MobileMenuLink>
          ))}
        </S.MobileMenu>
      )}
    </S.Bar>
  );
}
