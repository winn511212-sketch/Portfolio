import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Github, ArrowUpRight } from 'lucide-react'
import Scene from './Scene.jsx'
import Cursor from './Cursor.jsx'
import Loader from './Loader.jsx'

const PROJECTS = [
  ['ASTRION', 'Kosmos va astronomiya haqida premium ta’lim platformasi.', 'https://astrion-1hm4.onrender.com'],
  ['SONIQ', 'Futuristik dizayndagi musiqa streaming platformasi.', 'https://soniq-aayc.onrender.com'],
  ['VYBE', 'Zamonaviy ijtimoiy tarmoq platformasi.', 'https://vybe-sed5.onrender.com'],
  ['TIXORA', 'Tadbirlar uchun chipta bron qilish platformasi.', 'https://tixora-9cqo.onrender.com'],
  ['WebForge', '3D hero’li veb-sayt yaratuvchi SaaS sahifasi.', 'https://webforge-xx6u.onrender.com'],
  ['NeoShop', 'Neumorphism uslubidagi internet-do‘kon.', 'https://neoshop-9f7w.onrender.com'],
  ['Nexora', 'Zamonaviy veb-loyiha.', 'https://nexora-ta9s.onrender.com'],
  ['TableX', 'Veb-ilova loyihasi.', 'https://tablex-wbvr.onrender.com'],
  ['Sayohat', 'Sayohat mavzusidagi veb-loyiha.', 'https://sayohat-loyiha-6f1m.onrender.com'],
  ['KitobSpace', 'Kitoblar mavzusidagi veb-loyiha.', 'https://kitobspace.onrender.com'],
  ['RejaFlow', 'Reja va vazifalar bilan ishlash loyihasi.', 'https://rejaflow-ddiw.onrender.com'],
  ['ITLive Academy', 'IT o‘quv markazi mavzusidagi veb-sayt.', 'https://itlive-academy.onrender.com'],
]
const SKILLS = [['HTML & CSS', 78, '78%'], ['JavaScript', 66, '66%'], ['C++', 60, '60%'], ['React', 59, '59%'], ['Tailwind CSS', 40, '40%']]
const WORDS = ['Frontend dasturchiman', 'chiroyli saytlar yarataman', 'React bilan ishlayman', 'har kuni o‘rganaman']

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}>
    {children}
  </motion.div>
)

function Typed() {
  const [text, setText] = useState('')
  const s = useRef({ w: 0, c: 0, del: false })
  useEffect(() => {
    let t
    const tick = () => {
      const st = s.current, word = WORDS[st.w]
      setText(word.slice(0, st.c))
      if (!st.del && st.c === word.length) { st.del = true; t = setTimeout(tick, 1500); return }
      if (st.del && st.c === 0) { st.del = false; st.w = (st.w + 1) % WORDS.length }
      st.c += st.del ? -1 : 1
      t = setTimeout(tick, st.del ? 35 : 75)
    }
    tick()
    return () => clearTimeout(t)
  }, [])
  return <span className="text-cy [text-shadow:0_0_14px_rgba(0,229,255,.6)]">{text}<i className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-1 animate-pulse bg-cy" /></span>
}

function Counter({ to, go }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!go) return
    let n = 0
    const id = setInterval(() => { n++; setV(n); if (n >= to) clearInterval(id) }, 110)
    return () => clearInterval(id)
  }, [to, go])
  return <>{v}</>
}

function Card({ i, p }) {
  const [t, setT] = useState({ rx: 0, ry: 0 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setT({ rx: ((e.clientY - r.top) / r.height - 0.5) * -9, ry: ((e.clientX - r.left) / r.width - 0.5) * 9 })
  }
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <a href={p[2]} target="_blank" rel="noopener noreferrer" data-hover onMouseMove={move} onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        className="neu neon group block p-7 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-cy">{String(i + 1).padStart(2, '0')}</span>
          <span className="neu-sm grid h-10 w-10 place-items-center text-cy transition group-hover:text-vi">
            <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
        <h3 className="mb-2 mt-5 font-display text-[26px] font-extrabold">{p[0]}</h3>
        <p className="min-h-[44px] text-sm text-mut">{p[1]}</p>
      </a>
    </Reveal>
  )
}

const Title = ({ children, sub }) => (
  <Reveal>
    <h2 className="font-display text-[clamp(34px,5vw,58px)] font-extrabold tracking-tight">{children}</h2>
    <p className="mb-10 mt-2 text-mut">{sub}</p>
  </Reveal>
)

export default function App() {
  const [entered, setEntered] = useState(false)
  useEffect(() => { document.documentElement.style.overflow = entered ? '' : 'hidden' }, [entered])
  const up = (d) => ({
    initial: { opacity: 0, y: 50, filter: 'blur(10px)' },
    animate: entered ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, delay: 0.5 + d, ease: [0.2, 0.8, 0.2, 1] },
  })
  const links = [['about', 'Men haqimda'], ['skills', 'Ko‘nikmalar'], ['projects', 'Loyihalar'], ['contact', 'Aloqa']]

  return (
    <>
      <Cursor />
      <Scene entered={entered} />
      <AnimatePresence>{!entered && <Loader onEnter={() => setEntered(true)} />}</AnimatePresence>

      <motion.nav initial={{ y: -90, opacity: 0 }} animate={entered ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, delay: 0.4 }}
        className="neu-sm fixed left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-1 !rounded-full px-3 py-2">
        <span className="px-4 font-display text-lg font-extrabold">A<span className="text-cy">.</span></span>
        {links.map(([id, l], i) => (
          <a key={id} href={`#${id}`} className={`rounded-full px-4 py-2 text-sm text-mut transition hover:text-cy ${i === 3 ? '' : 'hidden sm:block'}`}>{l}</a>
        ))}
      </motion.nav>

      <main className="mx-auto max-w-[1150px] px-[6vw]">
        {/* HERO */}
        <section className="flex min-h-screen flex-col justify-center pt-24">
          <motion.span {...up(0)} className="neu-sm w-fit px-5 py-2 text-[13px] text-mut">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />Frontend Developer
          </motion.span>
          <motion.h1 {...up(0.15)} className="my-6 font-display text-[clamp(64px,14vw,170px)] font-extrabold leading-[.92] tracking-tighter">
            <span className="glow-text">Alisher</span>
          </motion.h1>
          <motion.p {...up(0.3)} className="text-[clamp(18px,2.6vw,28px)] text-mut">Men <Typed /></motion.p>
          <motion.p {...up(0.4)} className="mt-4 max-w-md text-mut">7 oy ichida 13 ta jonli veb-loyiha yaratdim.</motion.p>
          <motion.div {...up(0.5)} className="mt-9 flex flex-wrap gap-5">
            <a href="#projects" className="btn-neon">Loyihalarimni ko‘rish</a>
            <a href="#contact" className="btn-neon vi">Bog‘lanish</a>
          </motion.div>
          <motion.div {...up(0.65)} className="mt-14 grid max-w-xl grid-cols-3 gap-5">
            {[[13, 'Loyiha'], [7, 'Oy'], [6, 'Texnologiya']].map(([n, l]) => (
              <div key={l} className="neu-sm p-5 text-center">
                <b className="block font-display text-4xl text-cy [text-shadow:0_0_16px_rgba(0,229,255,.5)]"><Counter to={n} go={entered} /></b>
                <span className="text-xs text-mut">{l}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ABOUT + SKILLS */}
        <section id="about" className="pt-28">
          <Title sub="Qisqacha tanishuv">Men haqimda</Title>
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <Reveal className="neu p-9">
              <p>Salom! Mening to‘liq ismim <b className="text-cy">Muhammadaliyev Alisher</b>. Men frontend yo‘nalishini tugatgan dasturchiman. IT sohasida atigi 7 oydan beri o‘qiyman, lekin shu qisqa vaqt ichida 13 ta jonli veb-loyiha yaratib, internetga joylab ulgurdim.</p>
              <p className="mt-5 text-mut">Menga chiroyli, tez va qulay saytlar yaratish yoqadi: animatsiyalar, zamonaviy dizayn va foydalanuvchiga qulay interfeys — mening asosiy qiziqishlarim.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'C++'].map((s) => (
                  <span key={s} className="neu-in px-4 py-2 text-sm text-cy">{s}</span>
                ))}
              </div>
            </Reveal>
            <Reveal className="neu p-9">
              <h3 id="skills" className="mb-7 font-display text-[28px] font-extrabold">Ko‘nikmalar</h3>
              {SKILLS.map(([name, w, label], i) => (
                <div key={name} className="mb-5">
                  <div className="mb-2 flex justify-between text-sm"><span>{name}</span><b className="text-cy">{label}</b></div>
                  <div className="neu-in h-3 p-[3px]">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-cy to-vi shadow-[0_0_12px_#00e5ff]"
                      initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }} />
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="pt-28">
          <Title sub="Barchasi jonli — bosib, o‘zingiz sinab ko‘ring.">Loyihalarim</Title>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <Card key={p[0]} i={i} p={p} />)}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pb-10 pt-28 text-center">
          <Reveal className="neu px-6 py-16">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight">Birgalikda ishlaymizmi?</h2>
            <p className="mx-auto mb-9 mt-3 max-w-md text-mut">Savol yoki taklifingiz bo‘lsa, yozing — mamnuniyat bilan javob beraman.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="https://t.me/winn_51" target="_blank" rel="noopener noreferrer" className="btn-neon"><Send size={18} /> Telegram: @winn_51</a>
              <a href="https://github.com/winn511212-sketch" target="_blank" rel="noopener noreferrer" className="btn-neon vi"><Github size={18} /> GitHub: winn51212</a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="px-[5vw] pb-12 pt-8 text-center text-[13px] text-mut">© 2026 Alisher · Qalb va kod bilan yaratildi</footer>
    </>
  )
}
