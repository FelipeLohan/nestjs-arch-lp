import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { QuickStart } from './components/QuickStart'
import { HowItWorks } from './components/HowItWorks'
import { Configuration } from './components/Configuration'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <QuickStart />
        <HowItWorks />
        <Configuration />
      </main>
      <Footer />
    </>
  )
}

export default App
