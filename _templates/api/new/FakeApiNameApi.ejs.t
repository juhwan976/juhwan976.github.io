---
to: src/api/<%= domain %>/Fake<%= name %>Api.ts
---
import I<%= name %>Api from './I<%= name %>Api';

export default class Fake<%= name %>Api extends I<%= name %>Api {
  // 기본 생성 시 빈 Fake 구현 클래스로 생성합니다.
  // 실제 구현이 필요할 때 in-memory 데이터와 동일 Result 패턴을 추가하세요.
  //
  // 예시)
  // private fakeItems: unknown[] = [];
  //
  // async get<%= name %>List(): Promise<Get<%= name %>ListResult> {
  //   return {
  //     success: true,
  //     message: null,
  //     data: this.fakeItems.map((item) => <%= name %>Entity.fromJson(item)),
  //   };
  // }
}

