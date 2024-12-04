import './App.css'
import styles from './App.module.css';
import AppRouter from './components/appRouter/appRouter'
import Footer from './components/footer'
import Header from './components/header'

function App() {

  return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.parallaxWrapper}>
				<div className={styles.content}>
					<AppRouter />
				</div>
			</div>
			<Footer />
		</div>
  )
}

export default App
