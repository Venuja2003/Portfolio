import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techGroups = [
    {
        category: 'Frontend',
        color: '#4f8fff',
        items: [
            { name: 'React', level: 'Advanced', icon: '⚛' },
            { name: 'JavaScript (ES6+)', level: 'Advanced', icon: 'JS' },
            { name: 'HTML5', level: 'Advanced', icon: 'H5' },
            { name: 'CSS3', level: 'Advanced', icon: 'C3' },
            { name: 'Tailwind CSS', level: 'Advanced', icon: 'TW' },
            { name: 'Vite', level: 'Advanced', icon: 'V' },
        ],
    },
    {
        category: 'Backend',
        color: '#39ff9f',
        items: [
            { name: 'Node.js', level: 'Advanced', icon: 'N' },
            { name: 'Express.js', level: 'Advanced', icon: 'EX' },
            { name: 'MongoDB', level: 'Advanced', icon: 'DB' },
            { name: 'JWT Authentication', level: 'Advanced', icon: 'JWT' },
            { name: 'REST APIs', level: 'Advanced', icon: 'API' },
            { name: 'Socket.IO', level: 'Intermediate', icon: 'WS' },
        ],
    },
    {
        category: 'Mobile & Realtime',
        color: '#8b5cf6',
        items: [
            { name: 'React Native', level: 'Intermediate', icon: 'RN' },
            { name: 'Expo', level: 'Intermediate', icon: 'EXPO' },
            { name: 'QR Scanning', level: 'Intermediate', icon: 'QR' },
            { name: 'Real-time Systems', level: 'Intermediate', icon: 'RT' },
            { name: 'WebSockets', level: 'Intermediate', icon: 'WS' },
        ],
    },
    {
        category: 'Data, ML & IoT',
        color: '#ff6b35',
        items: [
            { name: 'Python', level: 'Intermediate', icon: 'PY' },
            { name: 'Machine Learning', level: 'Intermediate', icon: 'ML' },
            { name: 'LightGBM / XGBoost', level: 'Intermediate', icon: 'AI' },
            { name: 'CSV Data Processing', level: 'Advanced', icon: 'CSV' },
            { name: 'ESP32', level: 'Intermediate', icon: 'IoT' },
            { name: 'Sensor Integration', level: 'Intermediate', icon: 'SEN' },
        ],
    },
    {
        category: 'Cloud & Tools',
        color: '#00d4ff',
        items: [
            { name: 'Git & GitHub', level: 'Advanced', icon: 'GH' },
            { name: 'Firebase', level: 'Intermediate', icon: 'FB' },
            { name: 'PayHere / OnePay', level: 'Intermediate', icon: 'PAY' },
            { name: 'Cloudinary', level: 'Intermediate', icon: 'CLD' },
            { name: 'Linux Server (Ubuntu)', level: 'Intermediate', icon: 'LINUX' },
            { name: 'Deployment & CI/CD', level: 'Intermediate', icon: 'CI' },
        ],
    },
]

const levelColors = {
    Expert: '#39ff9f',
    Advanced: '#4f8fff',
    Intermediate: '#8b5cf6',
}

function TechItem({ item, color, index }) {
    const itemRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(itemRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)',
                delay: index * 0.06,
                scrollTrigger: { trigger: itemRef.current, start: 'top 90%' }
            }
        )
    }, [index])

    return (
        <div
            ref={itemRef}
            className="opacity-0 group relative glass rounded-xl p-3 border border-white/5
        hover:border-opacity-40 transition-all duration-300 cursor-default
        hover:scale-105 hover:-translate-y-0.5"
            style={{ '--hover-color': color }}
            onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { borderColor: color + '40', duration: 0.3 })
            }}
            onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.05)', duration: 0.3 })
            }}
        >
            {/* Icon */}
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-sm font-mono font-bold transition-all duration-300 group-hover:scale-110"
                style={{ background: color + '15', color: color }}
            >
                {item.icon}
            </div>

            <div className="font-body text-xs text-frost font-medium">{item.name}</div>

            <div className="flex items-center gap-1 mt-1">
                <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: levelColors[item.level] }}
                />
                <span className="font-mono text-[10px]" style={{ color: levelColors[item.level] + 'aa' }}>
          {item.level}
        </span>
            </div>

            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${color}08, transparent)` }}
            />
        </div>
    )
}

export default function TechStack() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const marqueeRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            )

            // Marquee animation
            if (marqueeRef.current) {
                const items = marqueeRef.current.children
                const totalWidth = marqueeRef.current.scrollWidth / 2

                gsap.to(marqueeRef.current, {
                    x: -totalWidth,
                    duration: 25,
                    ease: 'none',
                    repeat: -1,
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const allTech = techGroups.flatMap(g => g.items.map(i => ({ ...i, color: g.color })))
    const marqueeItems = [...allTech, ...allTech]

    return (
        <section id="stack" ref={sectionRef} className="section-padding relative overflow-hidden">
            {/* BG */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet/4 blur-[150px]" />

            <div className="container-max px-6 md:px-12 mb-12">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="font-mono text-xs text-arc tracking-widest uppercase">03. Stack</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-arc/30 to-transparent" />
                </div>

                <div ref={headingRef} className="opacity-0 mb-16">
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-ice leading-tight">
                        Tools &<br />
                        <span className="text-gradient">Technologies</span>
                    </h2>
                </div>

                {/* Tech groups */}
                <div className="space-y-12">
                    {techGroups.map((group) => (
                        <div key={group.category}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                                <span
                                    className="font-mono text-xs tracking-widest uppercase"
                                    style={{ color: group.color }}
                                >
                  {group.category}
                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {group.items.map((item, i) => (
                                    <TechItem
                                        key={item.name}
                                        item={item}
                                        color={group.color}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee strip */}
            <div className="relative mt-12 overflow-hidden py-6 border-y border-white/5">
                <div
                    ref={marqueeRef}
                    className="flex gap-8 whitespace-nowrap"
                    style={{ width: 'max-content' }}
                >
                    {marqueeItems.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/5 flex-shrink-0"
                        >
              <span
                  className="font-mono text-xs font-bold"
                  style={{ color: item.color }}
              >
                {item.icon}
              </span>
                            <span className="font-body text-xs text-silver">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    )
}