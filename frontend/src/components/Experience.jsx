import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
    {
        year: '2026 — Present',
        role: 'Partner & Full-Stack Developer',
        company: 'TSSC Hosting Solutions',
        type: 'Partnership',
        description: 'Working as a technology partner delivering scalable web applications, cloud infrastructure, and secure deployment solutions for clients.',
        highlights: ['Web & Cloud Solutions', 'Server Deployment', 'Client Projects'],
        color: '#00d4ff',
    },
    {
        year: '2025 — Present',
        role: 'SaaS Systems Developer & Systems Builder',
        company: 'Independent / Freelance',
        type: 'Self-driven',
        description: 'Building and deploying full-stack web applications and intelligent systems for real-world use cases. Focused on scalable architecture, security, and production-ready solutions.',
        highlights: ['React + Node.js', 'MongoDB + Cloud Deployment', 'JWT Auth & Security'],
        color: '#4f8fff',
    },
    {
        year: '2025 — Present',
        role: 'Founder & Lead Developer',
        company: 'WattNage',
        type: 'IoT + AI Project',
        description: 'Developing a smart power monitoring and prediction system using IoT devices and machine learning. Processes real-time electricity data to detect anomalies and estimate monthly bills.',
        highlights: ['ESP32 + Sensors', 'ML Models (LightGBM, Prophet)', 'Real-time Data Processing'],
        color: '#8b5cf6',
    },
    {
        year: '2025 — Present',
        role: 'Lead Developer & Quality Analyst',
        company: 'Cticket Platform',
        type: 'Web Application',
        description: 'Designed and developed a complete event management and ticket booking platform with real-time availability, secure payments, and QR-based ticket verification system.',
        highlights: ['React + Vite + Tailwind', 'Node.js + Express + MongoDB', 'One pay + Socket.IO'],
        color: '#39ff9f',
    },
    {
        year: '2024 — Present',
        role: 'Computer Science Undergraduate',
        company: 'Informatics Institute of Technology (IIT)',
        type: 'Education',
        description: 'Pursuing BSc (Hons) in Computer Science while building real-world projects in full-stack development, IoT systems, and machine learning.',
        highlights: ['Computer Science', 'Advanced Client-side Development', 'Server-side Development'],
        color: '#ff6b35',
    }
]

export default function Experience() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const timelineRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            )

            // Animate timeline line
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1, duration: 2, ease: 'power3.out',
                    scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' }
                }
            )

            // Stagger each experience card
            timelineRef.current.querySelectorAll('.exp-card').forEach((card, i) => {
                const isLeft = i % 2 === 0
                gsap.fromTo(card,
                    { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
                    {
                        opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 85%' }
                    }
                )
            })

            // Animate dots
            timelineRef.current.querySelectorAll('.timeline-dot').forEach((dot, i) => {
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
                        delay: 0.2,
                        scrollTrigger: { trigger: dot, start: 'top 85%' }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
            {/* BG */}
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pulse/4 blur-[150px]" />

            <div className="container-max px-6 md:px-12">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="font-mono text-xs text-arc tracking-widest uppercase">04. Journey</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-arc/30 to-transparent" />
                </div>

                <div ref={headingRef} className="opacity-0 mb-16">
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-ice leading-tight">
                        Career<br />
                        <span className="text-gradient">Timeline</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ghost -translate-x-1/2 hidden md:block">
                        <div
                            ref={lineRef}
                            className="absolute inset-0 origin-top bg-gradient-to-b from-arc/50 via-violet/30 to-transparent"
                            style={{ scaleY: 0 }}
                        />
                    </div>

                    <div className="space-y-12 md:space-y-0">
                        {experiences.map((exp, i) => {
                            const isLeft = i % 2 === 0
                            return (
                                <div
                                    key={i}
                                    className={`exp-card opacity-0 relative md:grid md:grid-cols-2 md:gap-8 md:mb-12 group`}
                                >
                                    {/* Content */}
                                    <div className={`${isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                                        <div
                                            className={`glass rounded-2xl p-6 border border-white/5 
                        hover:border-opacity-40 transition-all duration-500 cursor-default
                        group-hover:scale-[1.01]`}
                                            style={{ '--hover-color': exp.color }}
                                            onMouseEnter={(e) => {
                                                gsap.to(e.currentTarget, {
                                                    borderColor: exp.color + '30',
                                                    boxShadow: `0 0 30px ${exp.color}10`,
                                                    duration: 0.3
                                                })
                                            }}
                                            onMouseLeave={(e) => {
                                                gsap.to(e.currentTarget, {
                                                    borderColor: 'rgba(255,255,255,0.05)',
                                                    boxShadow: 'none',
                                                    duration: 0.3
                                                })
                                            }}
                                        >
                                            {/* Year badge */}
                                            <div className={`flex ${isLeft ? 'md:justify-end' : ''} mb-4`}>
                                                <div
                                                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border"
                                                    style={{
                                                        background: exp.color + '10',
                                                        borderColor: exp.color + '30',
                                                    }}
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                                                    <span className="font-mono text-xs" style={{ color: exp.color }}>
                            {exp.year}
                          </span>
                                                </div>
                                            </div>

                                            <div className="mb-1">
                        <span className="font-mono text-xs text-silver/60 tracking-widest uppercase">
                          {exp.type}
                        </span>
                                            </div>
                                            <h3 className="font-display font-bold text-xl text-ice mb-1">
                                                {exp.role}
                                            </h3>
                                            <p className="font-body text-sm font-medium mb-3" style={{ color: exp.color }}>
                                                {exp.company}
                                            </p>
                                            <p className="font-body text-sm text-silver/70 leading-relaxed mb-4">
                                                {exp.description}
                                            </p>

                                            {/* Highlights */}
                                            <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                                                {exp.highlights.map((h) => (
                                                    <span
                                                        key={h}
                                                        className="font-mono text-xs px-2.5 py-1 rounded-lg"
                                                        style={{
                                                            background: exp.color + '10',
                                                            color: exp.color + 'bb',
                                                        }}
                                                    >
                            {h}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                                        <div
                                            className="timeline-dot w-4 h-4 rounded-full border-2 border-void scale-0"
                                            style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}