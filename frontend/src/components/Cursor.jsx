import { useEffect, useRef } from 'react'

export default function Cursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        let mouseX = 0, mouseY = 0
        let ringX = 0, ringY = 0
        let animFrame

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = mouseX + 'px'
            dot.style.top = mouseY + 'px'
        }

        const lerp = (a, b, t) => a + (b - a) * t

        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.12)
            ringY = lerp(ringY, mouseY, 0.12)
            ring.style.left = ringX + 'px'
            ring.style.top = ringY + 'px'
            animFrame = requestAnimationFrame(animate)
        }

        const onMouseEnterLink = () => ring.classList.add('hovering')
        const onMouseLeaveLink = () => ring.classList.remove('hovering')

        document.addEventListener('mousemove', onMouseMove)
        animFrame = requestAnimationFrame(animate)

        const addListeners = () => {
            const links = document.querySelectorAll('a, button, [data-cursor]')
            links.forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterLink)
                el.addEventListener('mouseleave', onMouseLeaveLink)
            })
        }

        addListeners()
        const interval = setInterval(addListeners, 2000)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(animFrame)
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}