import React from 'react';
import MainPage from './src/components/main-page';
import Quiz from './src/components/quiz';

type Troutes = {
	Component: React.FC<any>;
	path: string;
}

export const routes:Troutes[] = [
	{
		Component: MainPage,
		path: '/'
	},
	{
		Component: Quiz,
		path: '/quiz/:name',
	}
]
