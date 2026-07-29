import { ROUTE_PATHS } from '@/constants/route_paths';
import S from '@/views/common/NotFoundPage.styles';

export default function NotFoundPage(): React.ReactNode {
  return (
    <S.Page>
      <S.Code>404</S.Code>
      <S.Title>페이지를 찾을 수 없습니다.</S.Title>
      <S.HomeLink to={ROUTE_PATHS.ROOT}>메인으로 돌아가기 →</S.HomeLink>
    </S.Page>
  );
}
