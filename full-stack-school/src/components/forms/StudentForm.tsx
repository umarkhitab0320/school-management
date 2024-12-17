import React, { Dispatch, SetStateAction } from 'react'
import InputField from '../InputField'
import { useForm } from 'react-hook-form'
import { TeacherSchema, teacherSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'

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

    } = useForm<TeacherSchema>({
        resolver: zodResolver(teacherSchema)
    })
    return (
        <div>
            <form className="flex flex-col gap-8">
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
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("sex")}
                        defaultValue={data?.sex}
                        name="" id="">
                        <option value="MALE">
                            male
                        </option>
                        <option value="FEMALE">
                            female
                        </option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default StudentForm
