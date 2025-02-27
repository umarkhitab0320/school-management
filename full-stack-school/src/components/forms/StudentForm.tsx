import React, { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from 'react'
import InputField from '../InputField'
import { useForm } from 'react-hook-form'
import { StudenSchema, studentSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createStudent, updateStudent } from '@/lib/actions'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import { CldUploadWidget,getCldImageUrl } from 'next-cloudinary'

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
    let [state, formAction, isLoading] = useActionState(type === "create" ? createStudent : updateStudent, { success: false, error: false })
    //  let router=useRouter()
    
    let [img, setImg] = useState<any>()
   
    let router = useRouter()
    useEffect(() => {
        if (state.success) {
            setOpen(false)
            toast(`student has been ${type} created! `)
            router.refresh()
        }
    }, [state, setOpen])
    return (
        <div>
            <form className="flex flex-col gap-8"
                onSubmit={handleSubmit((data) => {
                    startTransition(() => {
                        formAction({...data, img: img?.secure_url})
                    })
                },
                    (error) => {
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
                <CldUploadWidget
                        uploadPreset="school"
                        onSuccess={(result, { widget }) => {
                            setImg(result.info);
                            widget.close();
                        }}
                    >
                        {
                            ({ open }) => {
                                return (
                                    <div
                                        className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                                        onClick={() => open()}
                                    >
                                        <img src="/upload.png" alt="" width={28} height={28} />
                                        <span>Upload a photo</span>
                                    </div>
                                )
                            }
                        }

                    </CldUploadWidget>
                    {
                        errors.img?.message &&
                        <span className="text-red-500">
                            {errors.img?.message}
                        </span>
                    }
                <div className="flex justify-between flex-wrap gap-4">
                    
                    <InputField
                        label='firstname'
                        register={register}
                        defaultValue={data?.name}
                        error={errors?.name}
                        name="name"
                    />
                    {data && <InputField
                        label='id'
                        register={register}
                        defaultValue={data.id}
                        error={errors?.id}
                        name="id"
                    />}
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
                        defaultValue={data?.birthday.toISOString().split("T")[0]}
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
                    
                    {/* {
                        img &&
                        <img src={getCldImageUrl(img.secure_url)} alt="" />
                    } */}
                </div>
                <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
                    {type === "create" ? "Create" : isLoading ? "loaging..." : "Update"}
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
