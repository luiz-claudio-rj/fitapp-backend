import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { LessonsModule } from './lessons/lessons.module';
@Module({
  imports: [PrismaModule, StudentsModule, TeachersModule, LessonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
