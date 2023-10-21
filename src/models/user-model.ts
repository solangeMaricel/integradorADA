import users from "../databases/employees.json"
import { writeFile } from "jsonfile"
import { randomUUID, createHash } from "node:crypto"

abstract class UserModel {
  private static hashedPassword(password: string) {
    const hash = createHash("sha256").update(password).digest("hex")
    return hash
  }
  private static compareHashPassword = (
    password: string,
    hashedPassword: string
  ) => {
    if (this.hashedPassword(password) === hashedPassword) {
      return 202
    } else {
      return 401
    }
  }
  private static findUser(username: string) {
    return users.findIndex((user) => user.username === username)
  }

  private static async writeDB() {
    return writeFile("./src/databases/employees.json", users)
  }

  static checkToken = async (token: string) =>
    users.find((user) => user.token === token)

  static async createUser(userData: any) {
    const { username, password, rol } = userData
    const hashedPasword = this.hashedPassword(password)
    const userExist = this.findUser(username)

    if (userExist != -1) return 400

    users.push({
      username,
      password: hashedPasword,
      token: "",
      rol,
    })

    await this.writeDB()

    return 201
  }

  static async login(userData: any) {
    const { username, password } = userData
    const userFoundIndex = this.findUser(username)
    const userFound = users[userFoundIndex]
    const hashedPassword = this.hashedPassword(password)
    this.compareHashPassword(password, hashedPassword)

    if (userFoundIndex == -1) return 404
    //if (userFound.password !== compareHash) return 401

    const token = randomUUID()

    userFound.token = token

    await this.writeDB()

    return token
  }

  static async logout(userData: any) {
    const { username } = userData
    const userFoundIndex = this.findUser(username)
    const userFound = users[userFoundIndex]

    if (userFoundIndex === -1) return 404
    userFound.token = ""

    await this.writeDB()

    return 200
  }

  static async deleteUser(userData: any) {
    const { username } = userData
    const userFoundIndex = this.findUser(username)

    if (userFoundIndex === -1) return 404
    users.splice(userFoundIndex, 1)

    await this.writeDB()

    return 200
  }

  static async updateUserData(userData: any) {
    const { username, password, rol } = userData
    const userFoundIndex = this.findUser(username)
    const userFound = users[userFoundIndex]
    const hashedPassword = this.hashedPassword(password)

    if (userFoundIndex === -1) return 404

    if (username) userFound.username = username
    if (password) userFound.password = hashedPassword
    if (rol) userFound.rol = rol
    // if (!username || !password || !rol) return 400;

    await this.writeDB()

    return userFound
  }
}

export default UserModel
