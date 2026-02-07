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

  async findById(id: string, userId: string): Promise<CategoryModel> {
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
    // Ensure ownership before updating
    await this.findById(id, userId);

    return prismaClient.category.update({
      where: { id: id },
      data: {
        title: data.title ?? undefined,
        description: data.description ?? undefined,
        iconName: data.iconName ?? undefined,
        colorHex: data.colorHex ?? undefined,
      },
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    // Ensure ownership before deleting
    await this.findById(id, userId);

    await prismaClient.category.delete({
      where: { id },
    });

    return true;
  }
}
