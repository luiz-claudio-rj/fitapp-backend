import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Lesson } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; description: string; videoUrl: string; teacherId: number }): Promise<Lesson> {
    return this.prisma.lesson.create({ data });
  }

  async findAll(): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      include: { teacher: true },
    });
  }

  async findOne(id: number): Promise<Lesson> {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { teacher: true },
    });
  }

  async findByTeacher(teacherId: number): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      where: { teacherId },
      include: { teacher: true },
    });
  }

  async update(id: number, data: { title?: string; description?: string; videoUrl?: string }): Promise<Lesson> {
    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Lesson> {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
