import './App.css'
import styles from './App.module.css';
import AppRouter from './components/appRouter/appRouter'
import TeamCards from './components/card';
import Footer from './components/footer'
import Header from './components/header'

function App() {

  return (
    <div className={styles.wrapper}>
			<Header />
			<div className={styles.content}>
				<AppRouter />
				<TeamCards />
			</div>

			<Footer />
		</div>
  )
}

export default App
