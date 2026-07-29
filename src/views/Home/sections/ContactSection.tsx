import { SectionLabel } from "@/components/ui/primitives";
import { siteConfig } from "@/content/site";
import S from "@/views/Home/sections/ContactSection.styles";

const GITHUB_PLACEHOLDER = "GITHUB_URL_PLACEHOLDER";

// Contact — 이름, 직무, 이메일, 이력서, GitHub만 표시한다.
// 감성적인 마무리 문장은 넣지 않는다.
export default function ContactSection(): React.ReactNode {
  const hasGithub = siteConfig.githubUrl !== GITHUB_PLACEHOLDER;

  return (
    <S.Section id="contact" aria-label="Contact">
      <SectionLabel>Contact</SectionLabel>
      <S.Identity>
        {siteConfig.name} <span>{siteConfig.role}</span>
      </S.Identity>
      <S.Links>
        <li>
          <S.ContactLink href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </S.ContactLink>
        </li>
        {/* 이력서 다운로드 기능은 당분간 사용하지 않는다.
        <li>
          <S.ContactLink
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer"
            $accent
          >
            이력서 보기 (PDF) ↗
          </S.ContactLink>
        </li>
        */}
        {hasGithub && (
          <li>
            <S.ContactLink
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </S.ContactLink>
          </li>
        )}
      </S.Links>
      <S.Watermark aria-hidden>{siteConfig.nameEn}</S.Watermark>
      <S.Footer>
        <p>© 2026 {siteConfig.name}</p>
        <p>React · TypeScript</p>
      </S.Footer>
    </S.Section>
  );
}
