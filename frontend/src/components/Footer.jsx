import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'stack', label: 'Stack' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
]

const SOCIALS = [
    {
        name: 'GitHub',
        handle: '@Venuja2003',
        url: 'https://github.com/Venuja2003',
        abbr: 'GH',
        color: '#e8f0fd',
    },
    {
        name: 'LinkedIn',
        handle: 'in/venuja-ransika',
        url: 'https://www.linkedin.com/in/venuja-ransika-758807332/',
        abbr: 'LI',
        color: '#00d4ff',
    },
    {
        name: 'Facebook',
        handle: 'facebook.com/yourprofile',
        url: 'https://www.facebook.com/indrajith.nishantha.75',
        abbr: 'FB',
        color: '#4f8fff',
    },
    {
        name: 'Instagram',
        handle: '@yourinstagram',
        url: 'https://www.instagram.com/venuja_sad/',
        abbr: 'IG',
        color: '#8b5cf6',
    },
]

const MARQUEE_TECH = [
    'React',
    'JavaScript',
    'Node.js',
    'Express',
    'MongoDB',
    'Tailwind CSS',
    'GSAP',
    'React Native',
    'Firebase',
    'Python',
    'Machine Learning',
    'ESP32',
    'Socket.IO',
    'GitHub',
]

export default function Footer() {
    const footerRef = useRef(null)
    const logoRef = useRef(null)
    const marqRef = useRef(null)
    const topRef = useRef(null)

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                topRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
                }
            )

            gsap.fromTo(
                logoRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    delay: 0.2,
                    scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
                }
            )

            gsap.fromTo(
                footerRef.current.querySelectorAll('.footer-reveal'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
                }
            )

            if (marqRef.current) {
                const totalWidth = marqRef.current.scrollWidth / 2
                gsap.to(marqRef.current, {
                    x: -totalWidth,
                    duration: 28,
                    ease: 'none',
                    repeat: -1,
                })
            }
        }, footerRef)

        return () => ctx.revert()
    }, [])

    return (
        <footer ref={footerRef} className="relative overflow-hidden">
            {/* Marquee strip */}
            <div className="relative overflow-hidden py-5 border-y border-white/5">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030508] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030508] to-transparent z-10 pointer-events-none" />

                <div ref={marqRef} className="flex gap-8 whitespace-nowrap will-change-transform">
                    {[...Array(2)].map((_, setIdx) => (
                        <div key={setIdx} className="flex gap-8 items-center">
                            {MARQUEE_TECH.map((tech, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-silver/30 tracking-widest uppercase">
                                        {tech}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-arc/40 flex-shrink-0" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main footer content */}
            <div className="container-max px-6 md:px-12 py-16 md:py-20">
                {/* Top border */}
                <div
                    ref={topRef}
                    className="h-px w-full mb-14 origin-left"
                    style={{
                        background:
                            'linear-gradient(90deg, #4f8fff 0%, #00d4ff 40%, #8b5cf6 70%, transparent 100%)',
                    }}
                />

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand column */}
                    <div ref={logoRef} className="opacity-0 lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl border border-arc/30 flex items-center justify-center">
                                <span className="font-display font-bold text-sm text-gradient">VR</span>
                            </div>
                            <span className="font-display font-semibold text-frost text-lg">
                                Venuja Ransika
                            </span>
                        </div>

                        <p className="font-body text-sm text-silver/60 leading-relaxed max-w-xs">
                            Full-stack developer building secure, scalable, and data-driven digital
                            systems with modern web technologies, real-time architecture, and machine
                            learning.
                        </p>

                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-neon/20">
                            <span className="w-2 h-2 rounded-full bg-neon animate-pulse flex-shrink-0" />
                            <span className="font-mono text-xs text-neon tracking-widest uppercase">
                                Available for work
                            </span>
                        </div>

                        {/* Social icons */}
                        <div className="flex flex-wrap gap-3 pt-1">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    title={s.name}
                                    className="w-10 h-10 rounded-lg glass border border-white/5 hover:border-white/20 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ color: s.color }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = s.color + '15'
                                        e.currentTarget.style.borderColor = s.color + '40'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = ''
                                        e.currentTarget.style.borderColor = ''
                                    }}
                                >
                                    {s.abbr}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="footer-reveal opacity-0 lg:col-span-2 lg:col-start-6">
                        <h4 className="font-mono text-xs text-silver/40 tracking-widest uppercase mb-6">
                            Navigate
                        </h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollTo(link.id)}
                                        className="font-body text-sm text-silver/60 hover:text-arc transition-colors duration-300 group flex items-center gap-2"
                                    >
                                        <span className="w-0 h-px bg-arc transition-all duration-300 group-hover:w-3" />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + socials details */}
                    <div className="footer-reveal opacity-0 lg:col-span-4 space-y-8">

                        {/* Email */}
                        <div>
                            <h4 className="font-mono text-xs text-silver/40 tracking-widest uppercase mb-4">
                                Say Hello
                            </h4>
                            <a
                                href="mailto:venujaransika15@gmail.com"
                                className="group inline-flex items-center gap-2 font-display font-semibold text-frost hover:text-arc transition-colors duration-300 break-all"
                            >
                                venujaransika15@gmail.com
                                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 inline-block">
                ↗
            </span>
                            </a>
                        </div>

                        {/* CTA Card */}
                        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-arc/20 transition-colors duration-500 group">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-display font-semibold text-frost text-sm mb-1">
                                        Have a project in mind?
                                    </p>
                                    <p className="font-body text-xs text-silver/50">
                                        Let’s build something scalable, secure, and impactful.
                                    </p>
                                </div>

                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                    className="flex-shrink-0 px-4 py-2 rounded-xl bg-arc/10 border border-arc/30 text-arc text-xs font-body hover:bg-arc hover:text-void transition-all duration-300"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-reveal opacity-0 mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-xs text-silver/30 tracking-wide">
                        © {new Date().getFullYear()} Venuja Ransika. All rights reserved.
                    </span>

                    <div className="flex items-center gap-6">
                        <span className="font-mono text-xs text-silver/20">
                            Built with React, Tailwind CSS & GSAP
                        </span>

                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group flex items-center gap-2 font-mono text-xs text-silver/40 hover:text-arc transition-colors duration-300"
                        >
                            Back to top
                            <span className="w-6 h-6 rounded-full border border-white/10 group-hover:border-arc/40 flex items-center justify-center transition-colors duration-300">
                                ↑
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 100%, rgba(79,143,255,0.06) 0%, transparent 70%)',
                }}
            />
        </footer>
    )
}