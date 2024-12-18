import React, { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from 'react'
import InputField from '../InputField'
import { useForm } from 'react-hook-form'
import { StudenSchema, studentSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createStudent } from '@/lib/actions'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'

const StudentForm = (
    {
        type,
        data,
        setOpen,
        relatedData
    }: {
        type: "create" | "update",
        data: any,
        setOpen: Dispatch<SetStateAction<boolean>>,
        relatedData: any
    }
) => {
    let {
        register,
        handleSubmit,
        watch,
        formState: { errors },

    } = useForm<StudenSchema>({
        resolver: zodResolver(studentSchema)
    })
    let { classes, grade, parents } = relatedData
    let [state,formAction]=useActionState(createStudent,{success:false,error:false})
//  let router=useRouter()
let router=useRouter()
    useEffect(()=>{
if (state.success) {
    setOpen(false)
    toast("student has been created! ")
router.refresh()
}
  },[state,setOpen])
    return (
        <div>
            <form className="flex flex-col gap-8" 
            onSubmit={handleSubmit((data) => {
                console.log('data',data)
                startTransition(()=>{
                    formAction(data)
                })
            },
            (error)=>{
                console.log(error)
            }
            )}>
                <h1 className="text-xl font-semibold">
                    {`${type} a Student`}
                </h1>
                <h1 className='font-semibold '>Personal information</h1>

                <div className='flex justify-around'>
                    <InputField
                        label='username'
                        register={register}
                        defaultValue={data?.username}
                        error={errors?.username}
                        name="username"
                    />
                    <InputField
                        label='email'
                        register={register}
                        defaultValue={data?.email}
                        error={errors?.email}
                        name="email"
                    />
                    <InputField
                        label='password'
                        register={register}
                        defaultValue={data?.password}
                        error={errors?.password}
                        name="password"
                    />
                </div>
                <h1 className='font-semibold'>student form</h1>

                <div className="flex justify-between flex-wrap gap-4">
                    <InputField
                        label='firstname'
                        register={register}
                        defaultValue={data?.name}
                        error={errors?.name}
                        name="name"
                    />
                    <InputField
                        label='lastname'
                        register={register}
                        defaultValue={data?.surname}
                        error={errors?.surname}
                        name="surname"
                    />
                    <InputField
                        label='phone'
                        register={register}
                        defaultValue={data?.phone}
                        error={errors?.phone}
                        name="phone"
                    />
                    <InputField
                        label='address'
                        register={register}
                        defaultValue={data?.address}
                        error={errors?.address}
                        name="address"
                    />
                    <InputField
                        label='bloodType'
                        register={register}
                        defaultValue={data?.bloodType}
                        error={errors?.bloodType}
                        name="bloodType"
                    />
                    <InputField
                        label='birthday'
                        register={register}
                        defaultValue={data?.birthday}
                        error={errors?.birthday}
                        name="birthday"
                        type='date'
                    />

                    <div className="flex flex-col gap-2 w-full md:w-1/4">

                        <label className='text-gray-500' htmlFor="">sex</label>

                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm flex-1 w-full"
                            {...register("sex")}
                            defaultValue={data?.sex}
                            name="sex" id="">

                            <option value="MALE">
                                male
                            </option>
                            <option value="FEMALE">
                                female
                            </option>
                        </select>
                        {errors.sex?.message &&
                            <span className="text-red-500">
                                {errors.sex?.message}
                            </span>
                        }
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className='text-gray-500' htmlFor="">class</label>

                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm flex-1 w-full"
                            {...register("classId")}
                            defaultValue={data?.classId}
                            name="classId" id={classes.id}>

                            {classes.map((classItem: { id: string, name: string, capacity: number, _count: { students: number } }) => (
                                <option value={classItem.id} key={classItem.id}>
                                    ({classItem.name} -{" "}
                                    {classItem._count.students + "/" + classItem.capacity}{" "}
                                    Capacity)
                                </option>
                            ))
                            }
                        </select>
                        {errors.classId?.message &&
                            <span className="text-red-500">
                                {errors.classId?.message}
                            </span>
                        }
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className='text-gray-500' htmlFor="">parents</label>

                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm flex-1 w-full"
                            {...register("parentId")}
                            defaultValue={data?.parentId}
                            name="parentId" id={data?.parentId}>

                            {parents.map((parents: { id: string, name: string }) => (
                                <option value={parents.id} key={parents.id}>
                                    {parents.name}
                                </option>
                            ))
                            }
                        </select>
                        {errors.parentId?.message &&
                            <span className="text-red-500">
                                {errors.parentId?.message}
                            </span>
                        }
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/4">

                        <label className='text-gray-500' htmlFor="">grade</label>

                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm flex-1 w-full"
                            {...register("gradeId")}
                            defaultValue={data?.gradeId}
                            name="gradeid" id={classes.gradeId}>

                            {grade.map((grade: { id: number, capacity: number }) => (
                                <option value={grade.id} key={grade.id}>
                                    {grade.capacity}
                                </option>
                            ))
                            }
                        </select>
                        {errors.gradeId?.message &&
                            <span className="text-red-500">
                                {errors.gradeId?.message}
                            </span>
                        }
                    </div>

                </div>
                <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
                    {type === "create" ? "Create" : "Update"}
                </button>
{
    state.error &&
    <span className="text-red-500">
        somthing went wrong
</span>
}
            </form>
        </div>
    )
}

export default StudentForm
