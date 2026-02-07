import { createParameterDecorator, type ResolverData } from 'type-graphql';
import { prismaClient } from '../../../prisma/prisma';
import type { UserModel } from '../../models/user.model';
import type { GraphqlContext } from '../context/index';

export const GqlUser = () => {
  return createParameterDecorator(
    async ({
      context,
    }: ResolverData<GraphqlContext>): Promise<UserModel | null> => {
      if (!context || !context.user) return null;

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user,
          },
        });

        if (!user) throw new Error('Usuário não encontrado');

        return user;
      } catch (_) {
        console.log('Error ao instanciar o gqluser');
      }

      return null;
    }
  );
};
