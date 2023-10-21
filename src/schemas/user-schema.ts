import z from "zod"

const userSchema = z.object({
  username: z.string({
    required_error: "User is required",
    invalid_type_error: "Username must be a string",
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
})

const validateUser = (dataObj: any) => userSchema.safeParse(dataObj)

const validatePartialUser = (dataObj: any) =>
  userSchema.partial().safeParse(dataObj)

export { validateUser, validatePartialUser }
