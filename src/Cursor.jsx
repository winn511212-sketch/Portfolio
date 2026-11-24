import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(), ring = useRef()
  useEffect(() => {
    let mx = -100, my = -100, rx = -100, ry = -100, raf
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }
    const over = (e) => ring.current.classList.toggle('big', !!e.target.closest('a,button,[data-hover]'))
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15
      ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    loop()
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); cancelAnimationFrame(raf) }
  }, [])
  return (<><div ref={ring} className="cur-ring" /><div ref={dot} className="cur-dot" /></>)
}
