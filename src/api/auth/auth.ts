import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse, Tuser } from "../types";

export default class AuthClass {

	static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		try {
			const res = await $api.post<AuthResponse>('/auth/login', {username, password});
			return res;
		} catch (e: any) {
			return e;
		}
	}

	static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		try {
			const res = await $api.post<AuthResponse>('/auth/user', {username, password});
			return res;
		} catch (e: any) {
			return e
		}
	}

	static async getUser(): Promise<AxiosResponse> {
		const res = await $api.get<Tuser>('/auth/user');
		return res;
	}
}