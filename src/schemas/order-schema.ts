import z from "zod"

const orderSchema = z.object({
  idOrder: z.number().int().positive(),
  username: z.string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required",
  }),
  orderType: z.string({
    invalid_type_error: "The order type must be a string",
    required_error: "The order type is required",
  }),
  description: z.string({
    invalid_type_error: "The description must be a string",
    required_error: "The description is required",
  }),
  dateOrder: z.string().datetime(),
  detail: z.array(
    z.object({
      idProduct: z.number().int().positive(),
      product: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
    })
  ),
})

const validateOrder = (object: any) => orderSchema.safeParse(object)

export { validateOrder }
