import './App.css'
import AppRouter from './components/appRouter/appRouter'
import Footer from './components/footer'
import Header from './components/header'
import TeamCards from './components/card/card'

function App() {

  return (
    <div>
			<Header />
			<AppRouter />
			<Footer />
			<TeamCards />
		</div>
  )
}

export default App
