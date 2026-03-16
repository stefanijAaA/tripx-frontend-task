import { TFunction } from './types';

export const createApiHandler = <
  TArgs extends unknown[],
  TResult,
  Q extends readonly unknown[],
>(
  handler: TFunction<TArgs, TResult>,
  queryKey: Q,
) => Object.assign(handler, { queryKey });
