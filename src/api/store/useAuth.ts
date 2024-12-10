import { create } from "zustand";
import AuthClass from "../auth/auth";
import { AxiosResponse } from "axios";
import { Tuser } from "../types";

type Tauth = {
	isAuth: boolean,
	username: string,
	setAuth: (value: boolean) => void;
	setUser: (username: string) => void;
	login: (username: string, password: string) => Promise<AxiosResponse>;
	registration: (username: string, password: string) => Promise<AxiosResponse>;
	getUser: () => Promise<AxiosResponse<Tuser> | undefined>;
	logOut: () => void;
}

export const useAuth = create<Tauth>((set) => ({

	isAuth: false,
	username: '',

	setAuth: (value: boolean) => 
		set((state) => ({...state, isAuth: value})),

	setUser: (username: string) => 
		set((state) => ({...state, username: username})),

	async login(username: string, password: string) {
			const res = await AuthClass.login(username, password);
			try {
				localStorage.setItem('token', res.data.access);
				set((state) => ({...state, isAuth: true, username: username}));
			} catch (e) {}
			return res;
	},

	async registration(username: string, password: string) {
		const res = await AuthClass.registration(username, password);
		try {
			localStorage.setItem('token', res.data.access);
			set((state) => ({...state, isAuth: true, username: username}));
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