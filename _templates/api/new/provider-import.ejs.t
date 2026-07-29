---
inject: true
to: src/api/ApiProvider.tsx
before: "type ProviderComponent = React.ComponentType<{ children: ReactNode }>;"
skip_if: import <%= name %>ApiProvider
---
import <%= name %>ApiProvider from './<%= domain %>/<%= name %>ApiProvider';

