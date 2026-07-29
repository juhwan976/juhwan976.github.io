---
to: src/api/<%= domain %>/<%= name %>ApiContext.ts
---
import { createContext } from 'react';
import type I<%= name %>Api from './I<%= name %>Api';

const <%= name %>ApiContext = createContext<I<%= name %>Api | null>(null);

export default <%= name %>ApiContext;

