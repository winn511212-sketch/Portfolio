import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Loader({ onEnter }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setP((v) => { if (v >= 100) { clearInterval(id); return 100 } return v + 1 }), 22)
    return () => clearInterval(id)
  }, [])
  const C = 2 * Math.PI * 54
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-bg/85 backdrop-blur-sm"
      exit={{ opacity: 0, scale: 1.7, filter: 'blur(16px)' }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="text-center">
        <div className="neu relative mx-auto grid h-44 w-44 place-items-center !rounded-full">
          <svg className="absolute inset-3 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1b2040" strokeWidth="4" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - p / 100)} style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }} />
          </svg>
          <span className="font-display text-4xl font-extrabold">{p}</span>
        </div>
        <p className="mt-8 font-display text-2xl font-extrabold tracking-[.35em] text-white/90">ALISHER</p>
        <p className="mt-1 text-sm text-mut">Portfolio yuklanmoqda…</p>
        <div className="mt-8 h-14">
          {p >= 100 && (
            <motion.button data-hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onClick={onEnter} className="btn-neon">
              Kirish <ArrowRight size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
