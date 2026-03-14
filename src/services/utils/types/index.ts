export type TFunction<
  TArgs extends unknown[] = unknown[],
  TResult = unknown,
> = (...args: TArgs) => TResult;
