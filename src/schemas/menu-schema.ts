import z from "zod"

const menuSchema = z.object({
  product: z.string({
    invalid_type_error: "Product must be a string",
    required_error: "Product is required",
  }),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .positive(),
  category: z.string({
    invalid_type_error: "Product must be a string",
    required_error: "Category is required",
  }),
})

const validateMenu = (object: any) => menuSchema.safeParse(object)

export { validateMenu }
