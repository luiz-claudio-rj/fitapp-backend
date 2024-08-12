// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar Teachers
  const teachers = [];
  for (let i = 0; i < 5; i++) {
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);
    const teacher = await prisma.teacher.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    teachers.push(teacher);
  }

  // Criar Students
  const students = [];
  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

    const student = await prisma.student.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    students.push(student);
  }

  // Criar Lessons
  for (let i = 0; i < 10; i++) {
    await prisma.lesson.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        videoUrl: faker.internet.url(),
        teacherId: teachers[Math.floor(Math.random() * teachers.length)].id,
        students: {
          connect: students
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * students.length))
            .map((student) => ({ id: student.id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
