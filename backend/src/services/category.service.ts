import { prismaClient } from '../../prisma/prisma';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/inputs/category.input';
import type { CategoryModel } from '../models/category.model';

export class CategoryService {
  async create(
    data: CreateCategoryInput,
    userId: string
  ): Promise<CategoryModel> {
    return prismaClient.category.create({
      data: {
        title: data.title,
        colorHex: data.colorHex,
        iconName: data.iconName,
        description: data.description,
        userId,
      },
    });
  }

  async findAllByUser(userId: string): Promise<CategoryModel[]> {
    return prismaClient.category.findMany({
      where: { userId },
    });
  }

  async getById(id: string, userId: string): Promise<CategoryModel> {
    const category = await prismaClient.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return category;
  }

  async update(
    id: string,
    data: UpdateCategoryInput,
    userId: string
  ): Promise<CategoryModel> {
    var category = await prismaClient.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return prismaClient.category.update({
      where: { id: id },
      data: {
        title: data.title ?? category.title,
        description: data.description ?? category.description,
        iconName: data.iconName ?? category.iconName,
        colorHex: data.colorHex ?? category.colorHex,
      },
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    var category = await prismaClient.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    await prismaClient.category.delete({
      where: { id },
    });

    return true;
  }
}
