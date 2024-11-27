import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo4ODEzMjU1NzkwNiwiaWF0IjoxNzMyNTU3OTA2LCJqdGkiOiJlZTAyZDdiMDFhOTI0ZTY3YTkzMzQwNTI4YWM1ZWZmOCIsInVzZXJfaWQiOjF9.xfLkyyAh224nz9-YEnefJoJO4e2G2WjXLBMf0ceeFHo'

export default class QuizApi {

	static async getQuizes () {
		const res = await axios.get('http://91.197.96.178/main/quiz', {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return res.data;
	}

	static async postAnswer (id: number, answers: Record<string | number, string>):Promise<number> {
		const data = {
			quiz: id,
			...answers,
		}
		const res = await axios.post('http://91.197.96.178/main/quiz', data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
		});
		return res.data.res;
	}

	static async getQuestions (id: number) {
		const res = await axios.get(`http://91.197.96.178/main/question/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	}
}