import { useLocation } from 'react-router-dom';
import './App.css'
import styles from './App.module.css';
import AppRouter from './components/appRouter/appRouter'
import Footer from './components/footer'
import Header from './components/header'
import { useEffect, useRef, useState } from 'react';
import { useQuizObject } from './context/quizContext';
import { useAuth } from './api/store/useAuth';
import { ConfigProvider } from 'antd';

function App() {
	const {wasRestarted} = useQuizObject();
	const location = useLocation();

	const wrapper = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (wrapper.current) {
      wrapper.current.scrollTo(0, 0);
    }
	}, [location, wasRestarted]);


	const {
		getUser,
		setAuth,
		setUser
	} = useAuth();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {

		const fetch = async () => {
			if(localStorage.getItem('token')) {
					const res = await getUser();
					if(res?.data.id) {
						setAuth(true);
						setUser(res.data?.username);
					}
			}
			setIsLoading(false);
		}

		fetch();
	}, [])

  return (
		<ConfigProvider
			theme={{
				token: {
					colorBorder: 'black',
					colorError: 'black',
				},
				components: {
					Input: {
						colorBgContainer: '#ffb0ff',
						colorText: 'black',
					},
					
				}
			}}
		>
			<div className={styles.wrapper} ref={wrapper}>
				<Header />
				<div className={styles.content}>
					<AppRouter isLoading={isLoading} />
				</div>
				<Footer />
			</div>
		</ConfigProvider>
  )
}

export default App
