import { useEffect, useRef, Suspense } from 'react'
import { gsap } from 'gsap'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, GradientTexture, Sphere, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

// 3D Abstract Scene
function FloatingOrb({ position, scale, color, speed = 1 }) {
    const meshRef = useRef()
    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    })
    return (
        <Float speed={1.5 * speed} rotationIntensity={0.5} floatIntensity={0.8}>
            <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.85}
                />
            </Sphere>
        </Float>
    )
}

function GlowRing({ position, rotation, color }) {
    const meshRef = useRef()
    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.4
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    })
    return (
        <Float speed={0.8} floatIntensity={0.5}>
            <Torus ref={meshRef} args={[1.2, 0.02, 32, 100]} position={position} rotation={rotation}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.6}
                />
            </Torus>
        </Float>
    )
}

function Particles() {
    const pointsRef = useRef()
    const count = 300

    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }

    useFrame((state) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
        pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#4f8fff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

function Scene() {
    const { mouse, viewport } = useThree()
    const groupRef = useRef()

    useFrame(() => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouse.x * 0.3,
            0.05
        )
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -mouse.y * 0.2,
            0.05
        )
    })

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#4f8fff" />
            <pointLight position={[-5, -5, -5]} intensity={1.5} color="#00d4ff" />
            <pointLight position={[0, 5, -5]} intensity={1} color="#8b5cf6" />

            {/* Main orb */}
            <FloatingOrb position={[0, 0, 0]} scale={1.4} color="#1a3a6e" speed={0.7} />
            {/* Secondary orbs */}
            <FloatingOrb position={[3.5, 1, -1]} scale={0.7} color="#0d2a5e" speed={1.2} />
            <FloatingOrb position={[-3, -1.5, -2]} scale={0.5} color="#0a1f4a" speed={0.9} />
            <FloatingOrb position={[2, -2.5, 1]} scale={0.4} color="#162d5a" speed={1.5} />

            {/* Glowing rings */}
            <GlowRing position={[0, 0, 0]} rotation={[0.8, 0, 0]} color="#4f8fff" />
            <GlowRing position={[1, 0.5, -1]} rotation={[0.3, 0.8, 0.2]} color="#00d4ff" />
            <GlowRing position={[-1, -0.5, 0]} rotation={[0.5, -0.5, 0.8]} color="#8b5cf6" />

            <Particles />
        </group>
    )
}

export default function Hero() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const subRef = useRef(null)
    const descRef = useRef(null)
    const ctaRef = useRef(null)
    const tagRef = useRef(null)
    const scrollRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 3.2 })

        tl.fromTo(tagRef.current,
            { opacity: 0, y: 20, letterSpacing: '0.3em' },
            { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.8, ease: 'power3.out' }
        )
            .fromTo(headingRef.current.querySelectorAll('.word'),
                { opacity: 0, y: 80, rotationX: -40 },
                { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }
            )
            .fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.4'
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                '-=0.4'
            )
            .fromTo(ctaRef.current.querySelectorAll('.cta-btn'),
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
                '-=0.3'
            )
            .fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: 'power3.inOut' },
                '-=0.6'
            )
            .fromTo(scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: 'power2.out' },
                '-=0.2'
            )

        return () => tl.kill()
    }, [])

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Background orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-arc/5 blur-[100px] orb-animate" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet/5 blur-[120px] orb-animate-2" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-pulse/5 blur-[80px] orb-animate-3" />

            {/* Grid */}
            <div className="absolute inset-0 grid-bg opacity-40" />

            {/* 3D Canvas — right side */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] opacity-80">
                <Canvas
                    camera={{ position: [0, 0, 7], fov: 60 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Left fade gradient */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-void via-void/90 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 container-max px-6 md:px-12 pt-24 pb-16">
                <div className="max-w-3xl">
                    {/* Tag */}
                    <div ref={tagRef} className="flex items-center gap-3 mb-8 opacity-0">
                        <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="font-mono text-xs text-silver tracking-[0.25em] uppercase">
              Available for new projects
            </span>
                    </div>

                    {/* Heading */}
                    <div
                        ref={headingRef}
                        className="overflow-hidden mb-6"
                        style={{ perspective: '1000px' }}
                    >
                        <h1 className="font-display font-bold leading-[0.9] text-[clamp(3.5rem,8vw,7rem)]">
                            <span className="word inline-block opacity-0 text-ice">Engineering</span>{' '}
                            <span className="word inline-block opacity-0 text-gradient">Secure</span>
                            <br />
                            <span className="word inline-block opacity-0 text-ice">Scalable</span>{' '}
                            <span className="word inline-block opacity-0 text-gradient">Platforms</span>
                            <br />
                            <span className="word inline-block opacity-0 text-ice">That</span>{' '}
                            <span className="word inline-block opacity-0 text-gradient">Deliver</span>
                        </h1>
                    </div>

                    {/* Subheading */}
                    <div ref={subRef} className="opacity-0 mb-5">
                        <p className="font-display text-xl md:text-2xl font-medium text-silver">
                            SaaS Systems Engineer & Systems Architect
                        </p>
                    </div>

                    {/* Description */}
                    <div ref={descRef} className="opacity-0 mb-10">
                        <p className="font-body text-base text-silver/80 leading-relaxed max-w-xl">
                            From immersive frontend experiences to intelligent backend systems — engineering scalable, secure,
                            and data-driven platforms powered by modern architectures, real-time systems, and machine learning.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">

                        {/* View Work */}
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="cta-btn opacity-0 group relative px-8 py-4 rounded-2xl bg-arc text-void font-display font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,143,255,0.4)]"
                        >
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-arc to-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        {/* Download Resume */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn opacity-0 group px-8 py-4 rounded-2xl glass border border-arc/20 text-frost font-display font-semibold text-sm tracking-wide transition-all duration-300 hover:border-arc/50 hover:bg-arc/10 flex items-center"
                        >
                            View Resume
                            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">↗</span>
                        </a>

                    </div>

                    {/* Divider line */}
                    <div
                        ref={lineRef}
                        className="origin-left h-px w-full max-w-xs bg-gradient-to-r from-arc/40 via-pulse/20 to-transparent scale-x-0"
                    />
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
                onClick={scrollToAbout}
            >
                <span className="font-mono text-xs text-silver/60 tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-arc/60 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-4 bg-arc animate-[slide-down_1.5s_ease-in-out_infinite]" />
                </div>
            </div>

            {/* Side text */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <div className="writing-mode-vertical font-mono text-xs text-silver/40 tracking-widest">
                    SCROLL TO EXPLORE · 2025
                </div>
            </div>
        </section>
    )
}