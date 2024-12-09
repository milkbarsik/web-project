import $api from "../http";

export default class QuizApi {

	static async getQuizes () {
		const res = await $api.get('/main/quiz');
		return res.data;
	}

	static async postAnswer (id: number, answers: Record<string | number, string>):Promise<number> {
		const data = {
			quiz: id,
			...answers,
		}
		const res = await $api.post('/main/quiz', data);
		return res.data.res;
	}

	static async getQuestions (id: number) {
		const res = await $api.get(`/main/question/${id}`);
		return res.data;
	}
}