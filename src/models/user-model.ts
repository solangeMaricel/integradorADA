import users from '../databases/employees.json';
import { writeFile } from 'jsonfile';
import { randomUUID } from 'node:crypto';

abstract class UserModel {
    
    private static findUser(username: string) {
		return users.findIndex((user) => user.username === username);
	}

    private static async writeDB() {
		return writeFile('./src/databases/employees.json', users);
	}

    static async login(userData: any) {
		const { username, password } = userData;

		const userFoundIndex = this.findUser(username);

		if (userFoundIndex == -1) return 404;

		const userFound = users[userFoundIndex]
		if (userFound.password !== password) return 401;

		const token = randomUUID();
		
		userFound.token = token;
		
		await this.writeDB();

		return token;
	}

	
}

export default UserModel;