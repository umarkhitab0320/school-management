import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export let studentSchema= z.object({
  id: z.coerce.string().optional(),
  username:z.string().min(1,"username is required!").toLowerCase(),
  name:z.string().min(1,{message:"first name is required!"}),
  surname:z.string().min(1,{message:"last name is required!"}),
  email: z
  .string()
  .email().min(1,{ message: "Invalid email address!" })
  .optional()
  .or(z.literal('')),
  password: z
  .string().min(1,{ message: "password is required!" })
  .optional()
  .or(z.literal("")),
  phone:z.string().optional(),
  address:z.string().min(1,{message:'address is required!'}),
  img:z.string().optional(),
  bloodType:z.string().min(1,"bloodtype is required!"),
  sex:z.enum(["MALE","FEMALE"],{message:"sex is required!"}),
  parentId:z.string().min(1,{message:"parentId is required"}),
  classId:z.coerce.number().min(1,{message:"classId is required"}),
  gradeId:z.coerce.number().min(1,{message:"gradeId is required"}),
  birthday:z.coerce.date({message:"birthday is required!"}),


})
export type StudenSchema=z.infer<typeof studentSchema>