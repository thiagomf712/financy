import { prismaClient } from '../../prisma/prisma';
import type { UpdateUserInput } from '../dtos/inputs/user.input';

export class UserService {
  async update(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error('Usuário não cadastrado!');

    return await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: data.name || user.name,
      },
    });
  }
}
