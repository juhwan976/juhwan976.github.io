---
inject: true
to: src/api/ApiProvider.tsx
before: "];"
skip_if: "  <%= name %>ApiProvider,"
---
  <%= name %>ApiProvider,

