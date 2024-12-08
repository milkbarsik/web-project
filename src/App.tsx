import { useLocation } from 'react-router-dom';
import './App.css'
import styles from './App.module.css';
import AppRouter from './components/appRouter/appRouter'
import Footer from './components/footer'
import Header from './components/header'
import { useEffect, useRef } from 'react';
import { useQuizObject } from './context/quizContext';

function App() {
	const {wasRestarted} = useQuizObject();
	const location = useLocation();

	const wrapper = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (wrapper.current) {
      wrapper.current.scrollTo(0, 0);
    }
	}, [location, wasRestarted]);

  return (
		<div className={styles.wrapper} ref={wrapper}>
			<Header />
			<div className={styles.content}>
				<AppRouter />
			</div>
			<Footer />
		</div>
  )
}

export default App
