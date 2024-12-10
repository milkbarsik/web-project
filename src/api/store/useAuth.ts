import { create } from "zustand";
import AuthClass from "../auth/auth";
import { AxiosResponse } from "axios";
import { Tuser } from "../types";

type Tauth = {
	isAuth: boolean,
	user: Record<string, string>,
	setAuth: (value: boolean) => void;
	setUser: (value: any) => void;
	login: (username: string, password: string) => Promise<AxiosResponse>;
	registration: (username: string, password: string) => Promise<AxiosResponse>;
	getUser: () => Promise<AxiosResponse<Tuser> | undefined>;
	logOut: () => void;
}

export const useAuth = create<Tauth>((set) => ({

	isAuth: false,
	user: {},

	setAuth: (value: boolean) => 
		set((state) => ({...state, isAuth: value})),

	setUser: (value: any) => 
		set((state) => ({...state, user: value})),

	async login(username: string, password: string) {
			const res = await AuthClass.login(username, password);
			try {
				localStorage.setItem('token', res.data.access);
				set((state) => ({...state, isAuth: true}));
			} catch (e) {}
			return res;
	},

	async registration(username: string, password: string) {
		const res = await AuthClass.registration(username, password);
		try {
			localStorage.setItem('token', res.data.access);
			set((state) => ({...state, isAuth: true}));
		} catch (e) {
			console.log(e);
		}
		return res;
	},

	async getUser() {
		try {
			const res = await AuthClass.getUser();
			return res;
		} catch (e) {
			console.log(e);
		}
	},

	logOut() {
		set((state) => ({...state, isAuth: false}));
		localStorage.removeItem('token');
		setTimeout(() => {sessionStorage.clear();}, 0);
	}

}))