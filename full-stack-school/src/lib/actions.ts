"use server";

import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  ClassSchema,
  ExamSchema,
  StudenSchema,
  // ExamSchema,
  // StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const client = await clerkClient()
    let user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" }
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const client = await clerkClient()
    await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient()
    client.users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export let createStudent = async (
  currentState: CurrentState,
  data: StudenSchema
) => {
  try {
    let client = await clerkClient();
    let user = await client.users.createUser({
      username: data.username,
      firstName: data.name,
      lastName: data.surname,
      password: data.password,
      publicMetadata: { role: 'student' },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        parentId: data.parentId,
        classId: data.classId,
        gradeId: data.gradeId,
        birthday: data.birthday,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    // Handle Prisma errors based on their codes
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint violation
        console.log('A unique constraint was violated (e.g., username or email already exists')
        return {
          success: false,
          error: true,
          message: 'A unique constraint was violated (e.g., username or email already exists).',
          meta: error.meta, // Contains details about which field violated the constraint
        };
      }
      if (error.code === 'P2003') {
        // Foreign key constraint violation
        console.log("'message: 'A foreign key constraint was violated (e.g., parentId, classId, or gradeId)")
        return {
          success: false,
          error: true,
          message: 'A foreign key constraint was violated (e.g., parentId, classId, or gradeId).',
          meta: error.meta,
        };
      }
      // Handle other known Prisma errors
    }
    console.log("An unknown error occurred.")
    // Handle generic errors (e.g., from Clerk or other parts of the code)
    return {
      success: false,
      error: true,
      message: error.message || 'An unknown error occurred.',
    };
  }
};
export let updateStudent = async (
  currentState: CurrentState,
  data: StudenSchema
) => {
  try {
    console.log('data.id', data)

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        img: data.img || null,
        sex: data.sex,
        parentId: data.parentId,
        classId: data.classId,
        gradeId: data.gradeId,
        birthday: data.birthday,
      }
    })
    return { success: true, error: false }

  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    } else if (error.errors) {
      console.log(error.errors);
    } else {
      console.log(error);
    }
    return { success: false, error: true }

  }

}

export let deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  try {
    let id = data.get('id') as string


    // 

    await prisma.student.delete({
      where: {
        id: id
      }
    })
    let client = await clerkClient()

    await client.users.deleteUser(id)

    return { success: true, error: false }

  } catch (error) {
    return { success: false, error: true }
  }
}

export let createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  try {
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      }
    })
    return { success: true, error: false }
  } catch (error) {
    return { success: false, error: true }
  }
}
