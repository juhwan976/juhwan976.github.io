import 'styled-components';
import type { AppTheme } from '@/styles/theme';

declare module 'styled-components' {
  // styled-components DefaultTheme을 앱 테마로 고정한다.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
