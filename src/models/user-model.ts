import users from '../databases/users.json';
import { writeFile } from 'jsonfile';
import { randomUUID } from 'node:crypto';

abstract class UserModel {
    
    private static findUser(username: string) {
		return users.findIndex((user) => user.username === username);
	}

    private static async writeDB() {
		return writeFile('./src/databases/users.json', users);
	}

    static async login(userData: any) {
		const { username, password } = userData;

		const userFoundIndex = this.findUser(username);

		// Si no encuentra un user, devolvemos un 404 (recurso no encontrado)
		if (userFoundIndex == -1) return 404;

		// Si el password no coincide con la almacenada en la BBDD, devolvemos un 400 (solicitud mal)
		const userFound = users[userFoundIndex]
		if (userFound.password !== password) return 401;

		// Si encontró al usuario y los datos coinciden, entonces el logueo fue exitoso.
		// Para poder mejorar nuestro sistema de logueo, al loguearnos vamos a generar un token.
		// Así, vamos a solicitar ese token cada vez que se soliciten datos a los endpoints.
		const token = randomUUID();
		//console.log(token);
		
		//console.log(users);
		// Una vez generado el token, lo asociamos con el usuario y guardamos la base de datos.
		userFound.token = token;
		//console.log(users);
		await this.writeDB();

		return token;
	}

	
}

export default UserModel;