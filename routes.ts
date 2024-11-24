import React from 'react';
import MainPage from './src/components/main-page';

type Troutes = {
	Component: React.FC;
	path: string;
}

export const routes:Troutes[] = [
	{
		Component: MainPage,
		path: '/'
	},
	
]
