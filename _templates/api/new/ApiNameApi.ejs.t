---
to: src/api/<%= domain %>/<%= name %>Api.ts
---
import I<%= name %>Api from './I<%= name %>Api';

export default class <%= name %>Api extends I<%= name %>Api {
  // 기본 생성 시 빈 구현 클래스로 생성합니다.
  // I<%= name %>Api에 메서드를 추가한 뒤 아래 예시처럼 구현하세요.
  //
  // async get<%= name %>List(): Promise<Get<%= name %>ListResult> {
  //   try {
  //     const response = await this.get('/<%= domain %>s');
  //
  //     return {
  //       success: true,
  //       message: null,
  //       data: (response.data as unknown[]).map((item: unknown) =>
  //         <%= name %>Entity.fromJson(item),
  //       ),
  //     };
  //   } catch (e) {
  //     return {
  //       success: false,
  //       message: this.extractErrorMessage(e),
  //       data: [],
  //     };
  //   }
  // }
}

