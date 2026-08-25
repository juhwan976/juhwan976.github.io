import { SectionLabel } from "@/components/ui/primitives";
import { siteConfig } from "@/content/site";
import S from "@/views/Home/sections/ContactSection.styles";

// url이 아직 확정되지 않은 소셜 링크는 노출하지 않는다.
const isPlaceholderUrl = (url: string): boolean => url.endsWith("_PLACEHOLDER");

// Contact — 이름, 직무, 이메일, 소셜 바로가기만 표시한다.
// 감성적인 마무리 문장은 넣지 않는다.
export default function ContactSection(): React.ReactNode {
  const socials = siteConfig.socials.filter(
    (social) => !isPlaceholderUrl(social.url),
  );

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
        {socials.map((social) => (
          <li key={social.id}>
            <S.ContactLink href={social.url} target="_blank" rel="noreferrer">
              {social.label} ↗
            </S.ContactLink>
          </li>
        ))}
      </S.Links>
      <S.Watermark aria-hidden>{siteConfig.nameEn}</S.Watermark>
      <S.Footer>
        <p>© 2026 {siteConfig.name}</p>
        <p>React · TypeScript</p>
      </S.Footer>
    </S.Section>
  );
}
