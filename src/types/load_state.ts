export const LOAD_STATES = {
  INITIAL_LOADING: 'initialLoading',
  ACTION_LOADING: 'actionLoading',
  IDLE: 'idle',
} as const;

export type LoadState = (typeof LOAD_STATES)[keyof typeof LOAD_STATES];

