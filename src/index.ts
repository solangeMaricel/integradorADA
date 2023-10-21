import express, { json } from "express"
import { userRouter } from "./routes/user-router"
import { orderRouter } from "./routes/order-router"

const app = express()
const PORT = process.env.PORT ?? 45000

app.use(json())

app.get("/api", (req, res) => {
  res.status(200).json({
    name: "API gestión de Restaurante",
    version: "1.0.0",
    running: true,
  })
})

app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Resource not found.",
  })
})

app.listen(PORT, () => {
  console.log("Server listening on port", PORT)
})
