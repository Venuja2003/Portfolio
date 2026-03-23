import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
    const loaderRef = useRef(null)
    const progressRef = useRef(null)
    const textRef = useRef(null)
    const counterRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()

        // Animate progress bar
        tl.to(progressRef.current, {
            width: '100%',
            duration: 2.2,
            ease: 'power2.inOut',
        })

        // Animate counter
        let count = { val: 0 }
        tl.to(count, {
            val: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = Math.round(count.val).toString().padStart(3, '0')
                }
            },
        }, 0)

        // Fade out loader
        tl.to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
        })

        tl.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
        })

        return () => tl.kill()
    }, [])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-void"
        >
            <div
                ref={overlayRef}
                className="absolute inset-0 z-10 bg-void"
            />

            {/* Grid background */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-arc/5 blur-3xl" />

            <div ref={textRef} className="relative z-20 flex flex-col items-center gap-8">
                {/* Logo mark */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-xl border border-arc/30 flex items-center justify-center glow-arc">
                        <span className="font-display font-bold text-2xl text-gradient">VR</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl animated-border opacity-20 blur-sm" />
                </div>

                {/* Counter */}
                <div className="flex items-end gap-1">
          <span
              ref={counterRef}
              className="font-mono text-6xl font-light text-ice tabular-nums"
          >000</span>
                    <span className="font-mono text-xl text-silver mb-2">%</span>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-px bg-ghost relative overflow-hidden loader-bar">
                    <div
                        ref={progressRef}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-arc to-pulse"
                        style={{ width: '0%' }}
                    />
                </div>

                <p className="font-body text-silver text-sm tracking-widest uppercase">
                    Loading Experience
                </p>
            </div>
        </div>
    )
}