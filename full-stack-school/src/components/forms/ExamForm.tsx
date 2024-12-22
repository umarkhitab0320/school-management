"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
    examSchema,
    ExamSchema
} from "@/lib/formValidationSchemas";
import {
    createClass,
    createExam,
    createSubject,
    updateClass,
    updateSubject,
} from "@/lib/actions";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Examform = ({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ExamSchema>({
        resolver: zodResolver(examSchema),
    });

    // AFTER REACT 19 IT'LL BE USEACTIONSTATE

    const [state, formAction, isLoading] = useActionState(
        createExam,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        startTransition(() =>
            formAction(data)
        )
    }, (err) => { console.log(err) });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { lessons } = relatedData;

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new class" : "Update the class"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">


                <InputField
                    label="Title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors?.title}
                />
                <InputField
                    label="StartTime"
                    name="startTime"
                    defaultValue={data?.startTime}
                    register={register}
                    type="datetime-local"
                    error={errors?.startTime}
                />
                <InputField
                    label="EndTime"
                    name="endTime"
                    defaultValue={data?.endTime}
                    register={register}
                    type="datetime-local"
                    error={errors?.endTime}
                />
                {data && (
                    <InputField
                        label="Id"
                        name="id"
                        defaultValue={data?.id}
                        register={register}
                        error={errors?.id}
                        hidden
                    />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Exam</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("lessonId")}
                        defaultValue={data?.lesson}
                    >
                        {lessons.map(
                            (lessons: { id: string; name: string; }) => (
                                <option
                                    value={lessons.id}
                                    key={lessons.id}
                                >
                                    {lessons.name}
                                </option>
                            )
                        )}
                    </select>
                    {errors.lessonId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.lessonId.message.toString()}
                        </p>
                    )}
                </div>

            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : isLoading ? "loading..." : "Update"}
            </button>
        </form>
    );
};

export default Examform;
