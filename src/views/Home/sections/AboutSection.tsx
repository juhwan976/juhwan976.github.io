import { SectionLabel } from '@/components/ui/primitives';
import { siteConfig } from '@/content/site';
import S from '@/views/Home/sections/AboutSection.styles';

// About — 개발을 시작한 계기와 현재의 기준. 한 화면 안에서 끝낸다.
export default function AboutSection(): React.ReactNode {
  return (
    <S.Section id="about" aria-label="About">
      <SectionLabel>About</SectionLabel>
      <div>
        <S.Title>{siteConfig.about.title}</S.Title>
        <S.Body>
          {siteConfig.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </S.Body>
      </div>
    </S.Section>
  );
}
