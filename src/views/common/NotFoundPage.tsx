import { ROUTE_PATHS } from '@/constants/route_paths';
import { siteConfig } from '@/content/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import S from '@/views/common/NotFoundPage.styles';

export default function NotFoundPage(): React.ReactNode {
  // 상세 페이지에서 넘어온 경우 이전 제목이 남지 않도록 기본 제목으로 되돌린다.
  useDocumentTitle(siteConfig.documentTitle);

  return (
    <S.Page>
      <S.Code>404</S.Code>
      <S.Title>페이지를 찾을 수 없습니다.</S.Title>
      <S.HomeLink to={ROUTE_PATHS.ROOT}>메인으로 돌아가기 →</S.HomeLink>
    </S.Page>
  );
}
