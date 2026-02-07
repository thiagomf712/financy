import type { MiddlewareFn } from 'type-graphql';
import type { GraphqlContext } from '../graphql/context/index';

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next
) => {
  if (!context.user) throw new Error('Usuário não autenticado!');

  return next();
};
