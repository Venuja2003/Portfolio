import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─────────────────────────────────────────────────────────────────────────────
//  YOUR PROFILE IMAGE
//  Replace this import with your own photo inside src/assets/
//  e.g.  import profileImage from '../assets/profile.jpg'
//        import profileImage from '../assets/venuja.png'
//
//  Supported formats: .jpg  .jpeg  .png  .webp  .avif
// ─────────────────────────────────────────────────────────────────────────────
import profileImage from '../assets/venuja.png'

gsap.registerPlugin(ScrollTrigger)

const skills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'JavaScript', level: 88 },
    { name: 'Node.js / APIs', level: 85 },
    { name: 'UI / Motion Design', level: 90 },
    { name: 'Express.js / WebGL', level: 78 },
    { name: 'System Architecture', level: 80 },
]

const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '5++', label: 'Projects Shipped' },
    { value: '5++', label: 'Happy Clients' },
    { value: '∞', label: 'Lines of Code' },
]

export default function About() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const textRef   = useRef(null)
    const statsRef  = useRef(null)
    const skillsRef = useRef(null)
    const imageRef  = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            )

            gsap.fromTo(textRef.current.querySelectorAll('p'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
                }
            )

            statsRef.current.querySelectorAll('.stat-item').forEach((stat) => {
                gsap.fromTo(stat,
                    { opacity: 0, scale: 0.8, y: 30 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: stat, start: 'top 85%' }
                    }
                )
            })

            skillsRef.current.querySelectorAll('.skill-item').forEach((skill, i) => {
                const bar = skill.querySelector('.skill-bar')
                const width = bar.dataset.width
                gsap.fromTo(skill,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
                        scrollTrigger: { trigger: skillsRef.current, start: 'top 75%' }
                    }
                )
                gsap.fromTo(bar,
                    { width: '0%' },
                    {
                        width: width + '%', duration: 1.2, delay: 0.3 + i * 0.1, ease: 'power3.out',
                        scrollTrigger: { trigger: skillsRef.current, start: 'top 75%' }
                    }
                )
            })

            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 60, scale: 0.95 },
                {
                    opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: imageRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
            {/* BG effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-arc/3 blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet/3 blur-[120px]" />

            <div className="container-max px-6 md:px-12">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="font-mono text-xs text-arc tracking-widest uppercase">01. About</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-arc/30 to-transparent" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left: Story + Skills */}
                    <div>
                        <div ref={headingRef} className="mb-8">
                            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-ice leading-tight">
                                Building real-world<br />
                                <span className="text-gradient">digital systems</span><br />
                                that scale & perform
                            </h2>
                        </div>

                        <div ref={textRef} className="space-y-5 mb-12">

                            <p className="font-body text-silver leading-relaxed">
                                I'm a SaaS Systems Engineer focused on building production-grade systems — from scalable web applications to intelligent IoT-powered platforms. My work is driven by performance, security, and real-world impact.
                            </p>

                            <p className="font-body text-silver/80 leading-relaxed">
                                I’ve engineered complete solutions including event platforms, real-time systems, and smart power monitoring applications powered by machine learning. From frontend architecture to backend systems and deployment, I build everything end-to-end.
                            </p>

                            <p className="font-body text-silver/70 leading-relaxed">
                                I’m constantly exploring modern technologies, system design patterns, and cloud infrastructure — with a focus on creating scalable, reliable, and future-ready digital products.
                            </p>

                        </div>

                        {/* Skills */}
                        <div ref={skillsRef} className="space-y-4">
                            <h3 className="font-display font-semibold text-frost text-sm tracking-widest uppercase mb-6">
                                Core Capabilities
                            </h3>
                            {skills.map((skill) => (
                                <div key={skill.name} className="skill-item opacity-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-body text-sm text-silver">{skill.name}</span>
                                        <span className="font-mono text-xs text-arc">{skill.level}%</span>
                                    </div>
                                    <div className="h-px bg-ghost rounded-full overflow-hidden">
                                        <div
                                            className="skill-bar h-full bg-gradient-to-r from-arc to-pulse rounded-full"
                                            data-width={skill.level}
                                            style={{ width: '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Portrait card + Stats */}
                    <div ref={imageRef} className="opacity-0">

                        {/* ── Portrait card ── */}
                        <div className="relative mb-8">
                            <div className="glass rounded-3xl overflow-hidden border border-white/5 aspect-[4/3]">

                                {/* ── Profile image ── */}
                                <img
                                    src={profileImage}
                                    alt="Venuja Ransika"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    /*
                                     * object-top keeps your face visible.
                                     * Change to object-center if a centered crop looks better
                                     * for your specific photo.
                                     */
                                />

                                {/* Subtle dark gradient at the bottom so badges stay readable */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            'linear-gradient(to bottom, transparent 50%, rgba(3,5,8,0.7) 100%)',
                                    }}
                                />

                                {/* "Open to work" badge — top-right */}
                                <div className="absolute top-4 right-4 glass-strong rounded-xl px-3 py-2 border border-neon/20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                                        <span className="font-mono text-xs text-neon">Open to work</span>
                                    </div>
                                </div>

                                {/* Location badge — bottom-left */}
                                <div className="absolute bottom-4 left-4 glass-strong rounded-xl px-3 py-2">
                                    <span className="font-mono text-xs text-silver">📍 Ragama, Gampaha</span>
                                </div>
                            </div>

                            {/* Glow behind the card */}
                            <div className="absolute inset-0 rounded-3xl bg-arc/5 blur-xl -z-10" />
                        </div>

                        {/* Stats grid */}
                        <div ref={statsRef} className="grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="stat-item opacity-0 glass rounded-2xl p-5 border border-white/5 hover:border-arc/20 transition-colors duration-300 group"
                                >
                                    <div className="font-display font-bold text-3xl text-gradient mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                                        {stat.value}
                                    </div>
                                    <div className="font-body text-xs text-silver">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}