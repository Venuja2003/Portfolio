import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'stack', label: 'Stack' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection }) {
    const navRef = useRef(null)
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 3, ease: 'power3.out' }
        )
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
                    scrolled ? 'py-3' : 'py-5'
                }`}
            >
                <div
                    className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
                        scrolled ? 'glass rounded-2xl mx-4 px-6 py-3' : ''
                    }`}
                >
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('hero')}
                        className="relative group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg border border-arc/30 flex items-center justify-center group-hover:border-arc/70 transition-colors duration-300">
                                <span className="font-display font-bold text-sm text-gradient">VR</span>
                            </div>
                            <span className="font-display font-semibold text-frost hidden sm:block">
                Venuja Ransika
              </span>
                        </div>
                    </button>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                className={`relative px-4 py-2 font-body text-sm transition-colors duration-300 rounded-lg group ${
                                    activeSection === link.id
                                        ? 'text-ice'
                                        : 'text-silver hover:text-frost'
                                }`}
                            >
                                {activeSection === link.id && (
                                    <span className="absolute inset-0 rounded-lg bg-arc/10 border border-arc/20" />
                                )}
                                <span className="relative">{link.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/venuja-ransika-758807332/"
                            className="px-5 py-2 rounded-xl bg-arc/10 border border-arc/30 text-arc text-sm font-body hover:bg-arc/20 hover:border-arc/60 transition-all duration-300"
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className={`block h-px w-6 bg-frost transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-px w-6 bg-frost transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-px w-6 bg-frost transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-[850] glass-strong flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {NAV_LINKS.map((link, i) => (
                    <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        className="font-display text-4xl font-bold text-frost hover:text-arc transition-colors duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </>
    )
}