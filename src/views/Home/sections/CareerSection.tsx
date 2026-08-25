import { SectionLabel } from '@/components/ui/primitives';
import { careerCompanies } from '@/content/career';
import { siteConfig } from '@/content/site';
import { IMAGE_PLACEHOLDER } from '@/content/types';
import S from '@/views/Home/sections/CareerSection.styles';

const parseYearMonth = (value: string): { year: number; month: number } => {
  const [year = 0, month = 0] = value.split('.').map(Number);
  return { year, month };
};

// 재직 기간을 "N년 M개월"로 계산한다. end가 없으면 현재 시점 기준.
const formatTenure = (start: string, end?: string): string => {
  const from = parseYearMonth(start);
  const now = new Date();
  const to = end
    ? parseYearMonth(end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };
  const months = (to.year - from.year) * 12 + (to.month - from.month);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  if (rest === 0) return `${years}년`;
  return `${years}년 ${rest}개월`;
};

// 이니셜 박스용 글자 — "주식회사" 같은 법인 접두어를 피해 마지막 단어에서 딴다.
const companyInitial = (name: string): string =>
  name.split(' ').at(-1)?.charAt(0) ?? name.charAt(0);

// Career — 회사 단위 블록. 재직 기간과 역임한 역할만 보여준다.
// 프로젝트별 문제 해결 서사는 Work에 있으므로 여기서는 다루지 않는다.
export default function CareerSection(): React.ReactNode {
  return (
    <S.Section id="career" aria-label="Career">
      <SectionLabel>Career</SectionLabel>
      {careerCompanies.map((company) => (
        <S.Company key={company.id}>
          <S.CompanyHeader>
            {company.logo === IMAGE_PLACEHOLDER ? (
              <S.LogoBox aria-hidden="true">
                {companyInitial(company.name)}
              </S.LogoBox>
            ) : (
              <S.Logo
                src={company.logo}
                alt={`${company.name} 로고`}
                loading="lazy"
              />
            )}
            <S.CompanyName>{company.name}</S.CompanyName>
            <S.CompanyPeriod>
              {company.start} - {company.end ?? '현재'} ·{' '}
              {formatTenure(company.start, company.end)}
            </S.CompanyPeriod>
          </S.CompanyHeader>
          {company.roles.map((role) => (
            <S.RoleRow key={role.id} $current={role.current === true}>
              <S.RolePeriod>{role.period}</S.RolePeriod>
              <S.RoleBody>
                <h4>
                  {role.title} · {role.team}
                </h4>
                <p>{role.summary}</p>
              </S.RoleBody>
            </S.RoleRow>
          ))}
        </S.Company>
      ))}
      <S.ResumeLink href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
        View Full Résumé ↗
      </S.ResumeLink>
    </S.Section>
  );
}
