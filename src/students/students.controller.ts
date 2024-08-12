import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from '@prisma/client';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ResponseStudentDto } from './dto/response-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<ResponseStudentDto[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<Student> {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Student> {
    return this.studentsService.remove(+id);
  }
}
