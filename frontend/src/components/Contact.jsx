import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socials = [
    { name: 'GitHub', handle: '@Venuja2003', url: 'https://github.com/Venuja2003', icon: 'GH', color: '#e8f0fd' },
    { name: 'LinkedIn', handle: 'in/venuja-ransika', url: 'https://www.linkedin.com/in/venuja-ransika-758807332/', icon: 'LI', color: '#00d4ff' },
]

export default function Contact() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const formRef = useRef(null)
    const socialsRef = useRef(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: '',
        message: ''
    })

    const [focused, setFocused] = useState(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            )

            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    delay: 0.2,
                    scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
                }
            )

            gsap.fromTo(
                socialsRef.current.querySelectorAll('.social-item'),
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: socialsRef.current, start: 'top 85%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)

        const body = encodeURIComponent(
            `Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.project}

Message:
${formData.message}`
        )

        window.location.href = `mailto:venujaransika15@gmail.com?subject=${subject}&body=${body}`
    }

    const inputClass = (name) => `
        w-full bg-transparent font-body text-frost text-sm 
        border-b transition-all duration-300 py-3 outline-none
        placeholder:text-silver/30
        ${focused === name
        ? 'border-arc'
        : 'border-white/10 hover:border-white/20'
    }
    `

    return (
        <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-arc/4 blur-[200px] pointer-events-none" />
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="container-max px-6 md:px-12">
                <div className="flex items-center gap-4 mb-16">
                    <span className="font-mono text-xs text-arc tracking-widest uppercase">05. Contact</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-arc/30 to-transparent" />
                </div>

                <div ref={headingRef} className="opacity-0 text-center mb-16">
                    <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-ice leading-tight mb-4">
                        Let&apos;s build something<br />
                        <span className="text-gradient">extraordinary</span>
                    </h2>
                    <p className="font-body text-silver/70 max-w-lg mx-auto">
                        Have a project in mind? Reach out and let&apos;s discuss how to bring it to life.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    <div ref={formRef} className="opacity-0 lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="glass rounded-3xl p-8 md:p-10 border border-white/5 space-y-8"
                        >
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="font-mono text-xs text-silver/50 tracking-widest uppercase block mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className={inputClass('name')}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="font-mono text-xs text-silver/50 tracking-widest uppercase block mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className={inputClass('email')}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-mono text-xs text-silver/50 tracking-widest uppercase block mb-2">
                                    Project Type
                                </label>
                                <input
                                    type="text"
                                    placeholder="Web App, Mobile App, Dashboard..."
                                    className={inputClass('project')}
                                    value={formData.project}
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                    onFocus={() => setFocused('project')}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>

                            <div>
                                <label className="font-mono text-xs text-silver/50 tracking-widest uppercase block mb-2">
                                    Tell me about your project
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your project..."
                                    className={`${inputClass('message')} resize-none`}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="group w-full py-4 rounded-2xl font-display font-bold text-sm tracking-wide transition-all duration-300 relative overflow-hidden bg-arc text-void hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(79,143,255,0.4)]"
                            >
                                <span className="relative z-10">Send Message →</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-arc to-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </form>
                    </div>

                    <div ref={socialsRef} className="lg:col-span-2 space-y-8">
                        <div className="glass rounded-2xl p-6 border border-neon/15">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-neon animate-pulse" />
                                <span className="font-mono text-xs text-neon tracking-widest uppercase">
                                    Available Now
                                </span>
                            </div>
                            <p className="font-body text-sm text-silver/70 leading-relaxed">
                                Currently open to freelance work, collaborations, and new project opportunities.
                            </p>
                        </div>

                        <div>
                            <div className="font-mono text-xs text-silver/50 tracking-widest uppercase mb-3">
                                Direct Email
                            </div>
                            <a
                                href="mailto:venujaransika15@gmail.com"
                                className="font-display font-semibold text-lg text-frost hover:text-arc transition-colors duration-300 group flex items-center gap-2"
                            >
                                venujaransika15@gmail.com
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                            </a>
                        </div>

                        <div>
                            <div className="font-mono text-xs text-silver/50 tracking-widest uppercase mb-4">
                                Find Me Online
                            </div>
                            <div className="space-y-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-item opacity-0 group flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                                            style={{ background: social.color + '15', color: social.color }}
                                        >
                                            {social.icon}
                                        </div>
                                        <div>
                                            <div className="font-body text-sm text-frost font-medium">{social.name}</div>
                                            <div className="font-mono text-xs text-silver/50">{social.handle}</div>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-silver/50 text-sm">↗</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}