import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('hero')
    const appRef = useRef(null)

    useEffect(() => {
        // Loader timeout
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2800)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (loading) return

        // Smooth scroll setup
        const sections = document.querySelectorAll('section[id]')
        const observers = []

        sections.forEach((section) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section.id)
                    }
                },
                { threshold: 0.4 }
            )
            observer.observe(section)
            observers.push(observer)
        })

        return () => observers.forEach((obs) => obs.disconnect())
    }, [loading])

    return (
        <>
            <Cursor />
            {loading && <Loader />}
            <div
                ref={appRef}
                className={`noise-bg transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
            >
                <Navbar activeSection={activeSection} />
                <main>
                    <Hero />
                    <About />
                    <Projects />
                    <TechStack />
                    <Experience />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    )
}