---
to: src/api/<%= domain %>/<%= name %>ApiProvider.tsx
---
import { useMemo, type ReactNode } from 'react';
import { API_CONFIG } from '@/constants/api_config';
import Fake<%= name %>Api from './Fake<%= name %>Api';
import <%= name %>Api from './<%= name %>Api';
import <%= name %>ApiContext from './<%= name %>ApiContext';

interface <%= name %>ApiProviderProps {
  children: ReactNode;
}

export default function <%= name %>ApiProvider({
  children,
}: <%= name %>ApiProviderProps): ReactNode {
  const api = useMemo(() => {
    if (API_CONFIG.USE_FAKE) {
      return new Fake<%= name %>Api();
    }

    return new <%= name %>Api('/api');
  }, []);

  return (
    <<%= name %>ApiContext.Provider value={api}>
      {children}
    </<%= name %>ApiContext.Provider>
  );
}

