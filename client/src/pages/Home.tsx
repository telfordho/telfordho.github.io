/**
 * Style reminder — 靜景動態：黑白、寬闊留白、去飽和風景與極少元素。
 * 保留明顯的游標推近與視差，但令每一下移動像鏡頭慢慢靠近靜物，而非裝飾性特效；每段均保留出版物式邊註或頁碼軌。
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronRight, Move, Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";

const GALLERY = [
  {
    id: "01",
    name: "Music Project",
    label: "NODE.JS / FULL-STACK",
    copy: "一個以 Node.js 建構的音樂專案，涵蓋登入、路由、上載、資料庫初始化與 session 設定。",
    url: "https://github.com/telfordho/Music-Project",
    action: "查看 Music Project",
  },
  {
    id: "02",
    name: "Tic-tac-toe",
    label: "TYPESCRIPT / INTERACTION",
    copy: "以 TypeScript 製作的公開互動練習，聚焦清晰的前端狀態與遊戲邏輯。",
    url: "https://github.com/telfordho/Tic-tac-toe",
    action: "查看 Tic-tac-toe",
  },
];

function DetailPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="detail-panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 0.52, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="panel-bar">
            <span>02 — 走進作品</span>
            <button onClick={onClose} aria-label="關閉作品段落"><X size={19} /></button>
          </div>
          <div className="panel-copy">
            <p>我的工作方式</p>
            <h2>由需求開始，<br /><em>以清晰交付。</em></h2>
          </div>
          <div className="panel-steps">
            {[
              ["01", "對齊", "理解業務目標、使用者與限制。"],
              ["02", "建構", "以可維護的前後端方案完成系統。"],
              ["03", "加速", "把 AI 工具納入工程流程，提升交付效率。"],
            ].map(([number, title, copy], index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + index * 0.11, duration: 0.42 }}
              >
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <ChevronRight size={18} />
              </motion.article>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const [guitarPointer, setGuitarPointer] = useState({ x: 0, y: 0, active: false });
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, visible: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHeroPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  const onGuitarMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGuitarPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5, active: true });
  };

  const motionLevel = reduceMotion || isPaused ? 0 : 1;

  return (
    <main className="quiet-site">
      <motion.div
        className={`quiet-cursor ${cursor.visible ? "visible" : ""}`}
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: "spring", mass: 0.24, stiffness: 580, damping: 30 }}
        aria-hidden="true"
      ><span /></motion.div>

      <header className="quiet-header">
        <a href="#home" className="quiet-brand" aria-label="返回首頁">
          <span className="brand-mark"><i /><b /></span>
          <span className="brand-name">TELFORD<br />HO</span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="header-year">2026</span>
      </header>

      <section
        id="home"
        className="still-hero"
        onMouseMove={onHeroMove}
        onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}
      >
        <motion.div
          className="still-photo"
          animate={{
            x: heroPointer.x * -72 * motionLevel,
            y: heroPointer.y * -38 * motionLevel,
            scale: 1.04 + Math.abs(heroPointer.x) * 0.12 * motionLevel,
          }}
          transition={{ type: "spring", stiffness: 72, damping: 18 }}
        >
          <img src="/manus-storage/monochrome-stillscape-hero_4a8463f6.png" alt="寧靜住宅街景與電線桿的黑白攝影" />
        </motion.div>
        <motion.div
          className="hero-weather-line"
          animate={{ x: heroPointer.x * 114 * motionLevel, y: heroPointer.y * 55 * motionLevel }}
          transition={{ type: "spring", stiffness: 95, damping: 17 }}
        />
        <div className="hero-title">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>TELFORD HO / SYSTEM ANALYST &amp; FULL-STACK ENGINEER</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 46 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.23, 1, 0.32, 1] }}>
            把複雜系統，<br /><em>變成清楚體驗。</em>
          </motion.h1>
          <motion.span
            className="hero-motion-note"
            animate={isPaused || reduceMotion ? { opacity: .58 } : { y: [-3, 5, -3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >5+ 年全端開發、系統設計及 AI 工程流程經驗。</motion.span>
        </div>
        <aside className="hero-rail"><span>01</span><i /><small>LOOK / MOVE / NOTICE</small></aside>
        <div className="hero-side-note">SYSTEM DESIGN<br />WITH CLARITY</div>
        <div className="hero-controls">
          <button className="inverse-button" onClick={() => setDrawerOpen(true)}>了解工作方式 <ArrowUpRight size={16} /></button>
          <button className="ghost-button" onClick={() => setIsPaused((value) => !value)}>
            {isPaused ? <Play size={14} /> : <Pause size={14} />}{isPaused ? "播放動態" : "暫停動態"}
          </button>
        </div>
        <a className="hero-scroll" href="#work">SCROLL <ArrowDown size={14} /></a>
      </section>

      <section id="work" className="work-sheet">
        <div className="sheet-topline">
          <span>projects.</span>
          <span>公開程式碼與前端互動。<br />一次看一個實作方向。</span>
        </div>
        <aside className="sheet-rail"><span>02</span><i /><small>PROJECT / READING MODES</small></aside>
        <div className="gallery-tabs" role="tablist" aria-label="互動示範選擇">
          {GALLERY.map((item, index) => (
            <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? "selected" : ""} onClick={() => setActive(index)}>
              <span>{item.id}</span><strong>{item.name}</strong><em>{item.label}</em>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="gallery-copy"
            key={active}
            initial={{ opacity: 0, y: 19 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: .36 }}
          >
            <span>{GALLERY[active].label}</span>
            <h2>{GALLERY[active].name}</h2>
            <p>{GALLERY[active].copy}</p>
            <div className="reading-ledger"><span>REPOSITORY {active + 1} / 2</span><span>{active === 0 ? "Node.js、OAuth、Redis、Database。" : "TypeScript 互動與狀態邏輯。"}</span></div>
          </motion.div>
        </AnimatePresence>

        <article
          className={`guitar-piece mode-${active} ${guitarPointer.active ? "is-close" : ""}`}
          onMouseMove={onGuitarMove}
          onMouseLeave={() => setGuitarPointer({ x: 0, y: 0, active: false })}
        >
          <motion.div
            className="guitar-picture"
            animate={{
              x: guitarPointer.x * 70,
              y: guitarPointer.y * 38,
              rotateZ: guitarPointer.x * 7,
              rotateY: guitarPointer.x * 14,
              rotateX: guitarPointer.y * -10,
              scale: guitarPointer.active ? 1.21 + Math.abs(guitarPointer.x) * .14 : 1,
            }}
            transition={{ type: "spring", stiffness: 142, damping: 16, mass: .72 }}
          >
            <motion.img
              src="/manus-storage/monochrome-guitar-depth_6637baf4.png"
              alt="近距離拍攝的黑白木結他琴弦與指板"
              animate={{ x: guitarPointer.x * -56, y: guitarPointer.y * -31, scale: guitarPointer.active ? 1.25 : 1.06 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            />
            <span className="guitar-label">GUITAR / INTERACTION STUDY</span>
            <span className="focus-mark">FOCUS {Math.round((guitarPointer.x + .5) * 100).toString().padStart(2, "0")}</span>
            <span className="guitar-folio">PUBLIC REPOSITORY</span>
          </motion.div>
          <div className="guitar-note">
            <Move size={15} />
            <span>互動示範：游標推近時，鏡頭會跟隨焦點。</span>
          </div>
          <a className="repository-link" href={GALLERY[active].url} target="_blank" rel="noreferrer"><span>{GALLERY[active].action}</span><ArrowUpRight size={14} /></a>
        </article>
      </section>

      <section className="landscape-break" aria-label="山景分隔圖">
        <motion.img
          src="/manus-storage/monochrome-hills-divider_c29a134b.png"
          alt="雲霧下的黑白山坡"
          animate={isPaused || reduceMotion ? {} : { scale: [1.02, 1.09, 1.02], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <p>留一段空白，讓目光回來。</p>
      </section>

      <section id="about" className="about-sheet">
        <p className="section-tag">about.</p>
        <aside className="about-rail"><span>03</span><i /><small>WHY THIS MOVES</small></aside>
        <div>
          <h2>系統設計，<br /><em>由需求走到交付。</em></h2>
          <p>現任 FWD Insurance System Analyst，專注把業務需求與監管考量轉化為可擴展的技術方案。過去逾五年，我在 Angular、React、Node.js 及企業系統開發中累積全端經驗，也持續把生成式 AI 整合到工程流程。</p>
        </div>
      </section>

      <section className="career-sheet" aria-label="工作經歷與技術能力">
        <div className="career-intro"><span>EXPERIENCE / SKILLS</span><h2>工程能力，<br />不止寫程式。</h2></div>
        <div className="career-list">
          <article><span>2021 — NOW</span><div><h3>FWD Insurance</h3><p>System Analyst；曾任 Senior Analyst Programmer 及 Analyst Programmer。負責保險系統設計、Angular 前後端優化、程式碼審查與生成式 AI 開發流程整合。</p></div></article>
          <article><span>2019 — 2021</span><div><h3>dRoW Limited</h3><p>Software Engineer。以 Angular 建立流動響應式介面，並以 Node.js 及 SendGrid 建立自動電郵派發系統。</p></div></article>
          <article><span>2018 — 2019</span><div><h3>ICW</h3><p>Software Engineer。以 ReactJS 建立具可重用性及流動兼容性的前端元件。</p></div></article>
        </div>
        <div className="skills-line"><span>CORE STACK</span><p>TypeScript · Angular · React · Node.js · Express · PostgreSQL · MongoDB · Azure · Generative AI Integration</p><span>AZURE AI FUNDAMENTALS / AZURE FUNDAMENTALS</span></div>
      </section>

      <footer id="contact" className="quiet-footer">
        <p>contact.</p>
        <div className="footer-links"><a href="mailto:telfordho@gmail.com">telfordho@gmail.com <ArrowUpRight size={18} /></a><a href="https://github.com/telfordho" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/tingfungho" target="_blank" rel="noreferrer">LinkedIn</a></div>
        <span className="footer-folio">04 / © 2026</span>
      </footer>

      <DetailPanel open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
