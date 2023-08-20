import { z } from "zod";

const create = z.object({
    body:z.object({
        year:z.number({
            required_error:"Year is require!"
        }),
        title:z.string({
            required_error:"Title is require!"
        }),
        code:z.string({
            required_error:"Code is require!"
        }),
        startMonth:z.string({
            required_error:"Start Month is require!"
        }),
        endMonth:z.string({
            required_error:"End Month is require!"
        }),
    })
})

export const AcademicSemesterValidation ={
    create
}