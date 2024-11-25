import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo4ODEzMjU0NjU4OSwiaWF0IjoxNzMyNTQ2NTg5LCJqdGkiOiJiYmJjMjNmYTgwYmQ0YWQ4YjQ0OTUyOWUxYWFiYzQ5NyIsInVzZXJfaWQiOjJ9.F2cpJ5gNogjdQ7KpRyD11YndFr3j_xUJr9KIdll4Xd4'

export default class QuizApi {

	static async getQuizes () {
		const data = await axios.get('http://91.197.96.178/main/quiz', {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return data;
	}

}