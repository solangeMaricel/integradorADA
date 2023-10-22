import z from "zod"

const menuSchema = z.object({
  idProduct: z
    .number({
      invalid_type_error: "the idProduct must be a number",
      required_error: "idProduct is required",
    })
    .int()
    .positive(),
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
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
      required_error: "Quantity is required",
    })
    .int()
    .positive(),
})

const validateMenu = (object: any) => menuSchema.safeParse(object)

export { validateMenu }
