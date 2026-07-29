---
to: src/api/<%= domain %>/I<%= name %>Api.ts
---
import IApi from '@/api/IApi';

export default abstract class I<%= name %>Api extends IApi {
  // 기본 생성 시 빈 추상 클래스로 생성합니다.
  // 메서드가 확정되면 아래 예시처럼 선언하세요.
  //
  // abstract get<%= name %>List(): Promise<Get<%= name %>ListResult>;
  //
  // abstract get<%= name %>ById(
  //   params: Get<%= name %>ByIdParams,
  // ): Promise<Get<%= name %>ByIdResult>;
  //
  // abstract create<%= name %>(
  //   params: Create<%= name %>Params,
  // ): Promise<Create<%= name %>Result>;
  //
  // abstract update<%= name %>(
  //   params: Update<%= name %>Params,
  // ): Promise<Update<%= name %>Result>;
  //
  // abstract delete<%= name %>(
  //   params: Delete<%= name %>Params,
  // ): Promise<Delete<%= name %>Result>;
}

