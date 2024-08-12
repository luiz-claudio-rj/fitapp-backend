import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Teacher } from '@prisma/client';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }): Promise<Teacher> {
    return this.prisma.teacher.create({ data });
  }

  async findAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number): Promise<Teacher> {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; email?: string; password?: string }): Promise<Teacher> {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Teacher> {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
