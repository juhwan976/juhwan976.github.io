---
inject: true
to: src/api/index.ts
append: true
skip_if: use<%= name %>Api
---
export { default as use<%= name %>Api } from './<%= domain %>/use<%= name %>Api';

