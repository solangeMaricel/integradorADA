import z from "zod"

const userSchema = z.object({
  username: z.string({
    required_error: "User is required",
    invalid_type_error: "Username must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(4, { message: "Must be 4 or more characters long" })
    .max(8, { message: "Must be 8 or fewer characters long" }),
})

const validateUser = (dataObj: any) => userSchema.safeParse(dataObj)

const validatePartialUser = (dataObj: any) =>
  userSchema.partial().safeParse(dataObj)

export { validateUser, validatePartialUser }
