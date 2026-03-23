import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: 'WattNage',
        category: 'IoT + AI Platform',
        description: 'A smart power monitoring and prediction platform that combines IoT devices, real-time energy tracking, anomaly detection, and machine learning-based bill forecasting for practical electricity management.',
        tags: ['React', 'Node.js', 'MongoDB', 'ESP32', 'Machine Learning'],
        color: '#4f8fff',
        accent: '#00d4ff',
        year: '2026',
        status: 'Live',
        metrics: ['Real-time monitoring', 'Bill prediction', 'Anomaly detection'],
        gradient: 'from-arc/20 via-void to-pulse/10',
        image: null,
    },
    {
        id: 2,
        title: 'Cticket',
        category: 'Event Management Platform',
        description: 'A full-featured event booking and ticketing platform with event discovery, secure checkout, real-time ticket availability, admin management, and QR-based ticket verification.',
        tags: ['React', 'Vite', 'Node.js', 'MongoDB', 'Socket.IO'],
        color: '#8b5cf6',
        accent: '#c4b5fd',
        year: '2026',
        status: 'Live',
        metrics: ['Real-time ticketing', 'QR verification', 'Admin dashboard'],
        gradient: 'from-violet/20 via-void to-violet/5',
        image: null,
    },
    {
        id: 3,
        title: 'Cticket Scanner App',
        category: 'Mobile Application',
        description: 'A QR-based ticket verification mobile app developed for the Cticket platform, enabling real-time ticket validation, secure access control, and efficient event entry management.',
        tags: ['React Native', 'Expo', 'QR Scanning', 'API Integration', 'Authentication'],
        color: '#39ff9f',
        accent: '#00ff7f',
        year: '2026',
        status: 'Active',
        metrics: ['QR verification', 'Real-time validation', 'Event entry system'],
        gradient: 'from-neon/10 via-void to-neon/5',
        image: null,
    },
    {
        id: 4,
        title: 'Traffic Data Analysis System',
        category: 'Data Processing',
        description: 'A Python-based system for analyzing traffic flow using CSV datasets, enabling hourly vehicle distribution insights, filtering, and visualization through structured data processing techniques.',
        tags: ['Python', 'CSV Processing', 'Data Analysis', 'Tkinter', 'Visualization'],
        color: '#ff6b35',
        accent: '#ff9a56',
        year: '2025',
        status: 'Completed',
        metrics: ['Data filtering', 'Hourly insights', 'Visualization system'],
        gradient: 'from-ember/15 via-void to-ember/5',
        image: null,
    },
]

// ─── Card header: image or abstract fallback ────────────────────────────────
function CardVisual({ project, hovered }) {
    const [imgError, setImgError] = useState(false)
    const showImage = project.image && !imgError

    return (
        <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
            {showImage ? (
                <>
                    {/* Project screenshot */}
                    <img
                        src={project.image}
                        alt={project.title}
                        onError={() => setImgError(true)}
                        className={`
                            absolute inset-0 w-full h-full object-cover object-top
                            transition-all duration-700 ease-out
                            ${hovered ? 'scale-105 brightness-90' : 'scale-100 brightness-75'}
                        `}
                    />
                    {/* Gradient overlay so text/pills remain readable */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom,
                                rgba(3,5,8,0.15) 0%,
                                rgba(3,5,8,0.05) 40%,
                                rgba(3,5,8,0.55) 100%)`
                        }}
                    />
                    {/* Subtle color tint that matches project palette */}
                    <div
                        className="absolute inset-0 opacity-20 mix-blend-color"
                        style={{ background: project.color }}
                    />
                </>
            ) : (
                /* ── Original abstract fallback ── */
                <>
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"
                        style={{ background: project.color + '20' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-24 h-24">
                            <div
                                className="absolute inset-0 rounded-2xl border opacity-30 group-hover:rotate-12 transition-transform duration-700"
                                style={{ borderColor: project.color }}
                            />
                            <div
                                className="absolute inset-2 rounded-xl border opacity-20 group-hover:-rotate-6 transition-transform duration-700"
                                style={{ borderColor: project.accent }}
                            />
                            <div
                                className="absolute inset-4 rounded-lg opacity-30 group-hover:scale-110 transition-transform duration-500"
                                style={{ background: `radial-gradient(circle, ${project.color}40, transparent)` }}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Status pill — always visible */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 glass-strong rounded-full px-3 py-1.5">
                    <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: project.color }}
                    />
                    <span className="font-mono text-xs" style={{ color: project.color }}>
                        {project.status}
                    </span>
                </div>
            </div>

            {/* Year — always visible */}
            <div className="absolute top-4 right-4 z-10">
                <span className="font-mono text-xs text-silver/60">{project.year}</span>
            </div>
        </div>
    )
}

// ─── Project card ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
    const cardRef = useRef(null)
    const innerRef = useRef(null)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 80, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
                delay: index * 0.15,
                scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
            }
        )
    }, [index])

    const onMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(innerRef.current, {
            rotationY: x * 0.02,
            rotationX: -y * 0.02,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        })
    }

    const onMouseLeave = () => {
        setHovered(false)
        gsap.to(innerRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
        })
    }

    return (
        <div
            ref={cardRef}
            className="opacity-0 project-card"
            onMouseMove={onMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onMouseLeave}
        >
            <div
                ref={innerRef}
                className={`glass rounded-3xl border border-white/5 overflow-hidden
                    transition-all duration-500 group cursor-pointer
                    ${hovered ? 'glow-arc' : ''}`}
                style={{ borderColor: hovered ? project.color + '30' : undefined }}
            >
                {/* Card visual header (image or abstract) */}
                <CardVisual project={project} hovered={hovered} />

                {/* Card body */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <span
                                className="font-mono text-xs tracking-widest uppercase mb-1 block"
                                style={{ color: project.color }}
                            >
                                {project.category}
                            </span>
                            <h3 className="font-display font-bold text-2xl text-ice group-hover:text-gradient transition-all duration-300">
                                {project.title}
                            </h3>
                        </div>
                        <div
                            className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                            style={{ borderColor: project.color + '40', background: project.color + '10' }}
                        >
                            <span className="text-sm" style={{ color: project.color }}>↗</span>
                        </div>
                    </div>

                    <p className="font-body text-sm text-silver/80 leading-relaxed mb-5">
                        {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-3 mb-5 flex-wrap">
                        {project.metrics.map((metric) => (
                            <div key={metric} className="glass rounded-lg px-3 py-1.5 border border-white/5">
                                <span className="font-mono text-xs text-silver">{metric}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-xs px-2.5 py-1 rounded-lg border transition-colors duration-300 group-hover:border-opacity-40"
                                style={{
                                    borderColor: project.color + '25',
                                    color: project.color + 'cc',
                                    background: project.color + '08',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
            {/* BG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-arc/3 blur-[200px] pointer-events-none" />

            <div className="container-max px-6 md:px-12">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="font-mono text-xs text-arc tracking-widest uppercase">02. Work</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-arc/30 to-transparent" />
                </div>

                <div ref={headingRef} className="opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-ice leading-tight">
                            Selected<br />
                            <span className="text-gradient">Projects</span>
                        </h2>
                    </div>
                    <p className="font-body text-silver/70 max-w-sm text-sm leading-relaxed">
                        A curated selection of work that represents the range of my capabilities
                        — from complex SaaS platforms to creative experiments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* View all CTA */}
                <div className="flex justify-center mt-12">
                    <button className="group px-8 py-4 glass rounded-2xl border border-white/10 font-display font-semibold text-frost hover:border-arc/30 hover:bg-arc/5 transition-all duration-300">
                        View All Projects
                        <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                </div>
            </div>
        </section>
    )
}