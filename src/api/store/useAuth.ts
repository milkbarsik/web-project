import { create } from "zustand";
import AuthClass from "../auth/auth";
import { AxiosResponse } from "axios";
import { Tuser } from "../types";

type Tauth = {
	isAuth: boolean,
	user: Record<string, string>,
	setAuth: (value: boolean) => void;
	setUser: (value: any) => void;
	login: (username: string, password: string) => void;
	registration: (username: string, password: string) => void;
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
		try {
			const res = await AuthClass.login(username, password);
			localStorage.setItem('token', res.data.access);
			set((state) => ({...state, isAuth: true}));
		} catch (e) {
			console.log(e);
		}
	},

	async registration(username: string, password: string) {
		try {
			const res = await AuthClass.registration(username, password);
			localStorage.setItem('token', res.data.access);
			set((state) => ({...state, isAuth: true}));
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	},

	async getUser() {
		try {
			const res = await AuthClass.getUser();
			console.log(res);
			return res;
		} catch (e) {
			console.log(e);
		}
	},

	logOut() {
		localStorage.removeItem('token');
		sessionStorage.clear();
		set((state) => ({...state, isAuth: false}));
		window.location.reload();
	}

}))