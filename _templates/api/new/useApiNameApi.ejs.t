---
to: src/api/<%= domain %>/use<%= name %>Api.ts
---
import { useContext } from 'react';
import type I<%= name %>Api from './I<%= name %>Api';
import <%= name %>ApiContext from './<%= name %>ApiContext';

export default function use<%= name %>Api(): I<%= name %>Api {
  const context = useContext(<%= name %>ApiContext);

  if (context === null) {
    throw new Error(
      'use<%= name %>Api must be used within a <%= name %>ApiProvider',
    );
  }

  return context;
}

