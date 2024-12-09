import React from 'react';
import MainPage from '../main-page';
import Quiz from '../quiz';
import Modal from '../loginForm';

type Troutes = {
	Component: React.FC<any>;
	path: string;
}

export const authRoutes:Troutes[] = [
	{
		Component: MainPage,
		path: '/'
	},
	{
		Component: Quiz,
		path: '/quiz/:name',
	},
]

export const notAuthRoutes:Troutes[] = [
	{
		Component: MainPage,
		path: '/'
	},
	{
		Component: Modal,
		path: '/auth'
	}
]
