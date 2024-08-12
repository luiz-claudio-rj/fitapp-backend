import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateStudentDto } from './dto/create-student.dto';
import { ResponseStudentDto } from './dto/response-student.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateStudentDto) {
    const { password, ...result } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prismaService.student.create({
      data: {
        ...result,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<ResponseStudentDto[]> {
    const students = await this.prismaService.student.findMany();
    return students.map((student) => plainToClass(ResponseStudentDto, student));
  }

  async findOne(id: number) {
    return this.prismaService.student.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: { name?: string; email?: string; password?: string },
  ) {
    const { password, ...result } = data;

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    return this.prismaService.student.update({
      where: { id },
      data: {
        ...result,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.student.delete({
      where: { id },
    });
  }
}
