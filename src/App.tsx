import './App.css'
import AppRouter from './components/appRouter/appRouter'
import Footer from './components/footer'
import Header from './components/header'
import Info from './components/info'

function App() {

  return (
    <div>
			<Header />
			<AppRouter />
			<Info />
			<Footer />
		</div>
  )
}

export default App
