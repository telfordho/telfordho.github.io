/**
 * Style reminder — 靜景動態：黑白、寬闊留白、去飽和風景與極少元素。
 * 中英切換沿用出版物式細框與單色反轉，不增加額外色彩或干擾動態節奏。
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

type Language = "zh" | "en";
type Symbol = "circle" | "cross" | null;

const CONTENT = {
  zh: {
    nav: { projects: "作品", about: "關於", contact: "聯絡" },
    languageLabel: "切換網站語言",
    hero: {
      role: "TELFORD HO / SYSTEM ANALYST & FULL-STACK ENGINEER",
      lead: "化繁為簡，",
      focus: "從零開始入手。",
      note: "5+ 年全端開發、系統設計及 AI 工程流程經驗。",
      rail: "觀看 / 移動 / 留意",
      side: ["系統設計", "清晰體驗"],
      contact: "聯絡我",
      pause: "暫停動態",
      play: "播放動態",
      scroll: "向下瀏覽",
      imageAlt: "寧靜住宅街景與電線桿的黑白攝影",
    },
    work: {
      title: "作品。",
      intro: ["公開程式碼與前端互動。", "一次看一個實作方向。"],
      rail: "作品 / 閱讀模式",
      tabsLabel: "作品選擇",
      repository: "程式庫",
      musicLedger: "Node.js、OAuth、Redis、資料庫。",
      gameLedger: "TypeScript 互動與狀態邏輯。",
      music: {
        name: "Music Project",
        label: "NODE.JS / FULL-STACK",
        copy: "一個以 Node.js 建構的音樂專案，涵蓋登入、路由、上載、資料庫初始化與 session 設定。",
        action: "查看 Music Project",
        url: "https://github.com/telfordho/Music-Project",
      },
      game: {
        name: "Tic-tac-toe",
        label: "TYPESCRIPT / INTERACTION",
        copy: "以 TypeScript 製作的公開互動練習，聚焦清晰的前端狀態與遊戲邏輯。",
        action: "查看 Tic-tac-toe",
        url: "https://github.com/telfordho/Tic-tac-toe",
      },
      guitarLabel: "音樂 / 互動研究",
      guitarAlt: "近距離拍攝的黑白木結他琴弦與指板",
      repositoryLabel: "公開程式庫",
      gameTechnology: "REACT / TYPESCRIPT",
      gameTurn: "先行",
      gameWon: "獲勝",
      gameDraw: "平手",
      reset: "重設",
      openRepository: "開啟程式庫",
      playground: "遊戲區 / 3 × 3",
      boardLabel: "Tic-tac-toe 遊戲棋盤",
      cellLabel: "第",
      cellSuffix: "格",
    },
    landscape: { text: "留白，驀然回首", alt: "雲霧下的黑白山坡" },
    about: {
      tag: "關於。",
      rail: "為何移動",
      lead: "從零到一，",
      focus: "建構無限。",
      copy: "現任 FWD Insurance System Analyst，專注把業務需求與監管考量轉化為可擴展的技術方案。過去逾五年，我在 Angular、React、Node.js 及企業系統開發中累積全端經驗，也持續把生成式 AI 整合到工程流程。",
    },
    career: {
      eyebrow: "經驗 / 技術",
      lead: "就聽，",
      focus: "你想要什麼",
      entries: [
        ["2021 — 現在", "FWD Insurance", "System Analyst；曾任 Senior Analyst Programmer 及 Analyst Programmer。負責保險系統設計、Angular 前後端優化、程式碼審查與生成式 AI 開發流程整合。"],
        ["2019 — 2021", "dRoW Limited", "Software Engineer。以 Angular 建立流動響應式介面，並以 Node.js 及 SendGrid 建立自動電郵派發系統。"],
        ["2018 — 2019", "ICW", "Software Engineer。以 ReactJS 建立具可重用性及流動兼容性的前端元件。"],
      ],
      stack: "核心技術",
      certifications: "AZURE AI FUNDAMENTALS / AZURE FUNDAMENTALS",
    },
    footer: { contact: "聯絡。", github: "GitHub", linkedin: "LinkedIn" },
  },
  en: {
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    languageLabel: "Switch site language",
    hero: {
      role: "TELFORD HO / SYSTEM ANALYST & FULL-STACK ENGINEER",
      lead: "Make it simple,",
      focus: "from zero to hero.",
      note: "5+ years in full-stack engineering, system design, and AI-enabled delivery.",
      rail: "LOOK / MOVE / NOTICE",
      side: ["SYSTEM DESIGN", "WITH CLARITY"],
      contact: "Get in touch",
      pause: "Pause motion",
      play: "Play motion",
      scroll: "Scroll",
      imageAlt: "A monochrome residential street scene with utility poles",
    },
    work: {
      title: "projects.",
      intro: ["Public code and front-end interaction.", "One implementation at a time."],
      rail: "PROJECT / READING MODES",
      tabsLabel: "Project selection",
      repository: "REPOSITORY",
      musicLedger: "Node.js, OAuth, Redis, database.",
      gameLedger: "TypeScript interaction and state logic.",
      music: {
        name: "Music Project",
        label: "NODE.JS / FULL-STACK",
        copy: "A Node.js music project covering login, routing, uploads, database initialization, and session configuration.",
        action: "View Music Project",
        url: "https://github.com/telfordho/Music-Project",
      },
      game: {
        name: "Tic-tac-toe",
        label: "TYPESCRIPT / INTERACTION",
        copy: "A public TypeScript interaction exercise focused on clear front-end state and game logic.",
        action: "View Tic-tac-toe",
        url: "https://github.com/telfordho/Tic-tac-toe",
      },
      guitarLabel: "MUSIC / INTERACTION STUDY",
      guitarAlt: "A monochrome close-up of acoustic guitar strings and fretboard",
      repositoryLabel: "PUBLIC REPOSITORY",
      gameTechnology: "REACT / TYPESCRIPT",
      gameTurn: "to play",
      gameWon: "won",
      gameDraw: "Draw",
      reset: "Reset",
      openRepository: "Open repository",
      playground: "PLAYGROUND / 3 × 3",
      boardLabel: "Tic-tac-toe game board",
      cellLabel: "Cell",
      cellSuffix: "",
    },
    landscape: { text: "Leave space. Look back.", alt: "Monochrome hills beneath mist" },
    about: {
      tag: "about.",
      rail: "WHY THIS MOVES",
      lead: "From zero to one,",
      focus: "build without limits.",
      copy: "I am a System Analyst at FWD Insurance, focused on turning business needs and regulatory considerations into scalable technical solutions. Over five years of experience across Angular, React, Node.js, and enterprise systems have also led me to integrate generative AI into engineering workflows.",
    },
    career: {
      eyebrow: "EXPERIENCE / SKILLS",
      lead: "Let me hear",
      focus: "what you need",
      entries: [
        ["2021 — NOW", "FWD Insurance", "System Analyst; previously Senior Analyst Programmer and Analyst Programmer. Responsible for insurance system design, Angular full-stack optimization, code reviews, and generative AI workflow integration."],
        ["2019 — 2021", "dRoW Limited", "Software Engineer. Built responsive interfaces with Angular and an automated email dispatch system using Node.js and SendGrid."],
        ["2018 — 2019", "ICW", "Software Engineer. Built reusable, mobile-compatible front-end components with ReactJS."],
      ],
      stack: "CORE STACK",
      certifications: "AZURE AI FUNDAMENTALS / AZURE FUNDAMENTALS",
    },
    footer: { contact: "contact.", github: "GitHub", linkedin: "LinkedIn" },
  },
};

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board: Symbol[]) {
  for (const [first, second, third] of WINNING_LINES) {
    if (board[first] && board[first] === board[second] && board[first] === board[third]) return board[first];
  }
  return null;
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "zh";
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "zh") return requestedLanguage;
    return "en";
  });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const [guitarPointer, setGuitarPointer] = useState({ x: 0, y: 0, active: false });
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const [board, setBoard] = useState<Symbol[]>(Array(9).fill(null));
  const content = CONTENT[language];
  const projects = [content.work.music, content.work.game];

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, visible: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";
  }, [language]);

  const onHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHeroPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  const onGuitarMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGuitarPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5, active: true });
  };

  const motionLevel = reduceMotion || isPaused ? 0 : 1;
  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const nextSymbol: Exclude<Symbol, null> = board.filter(Boolean).length % 2 === 0 ? "circle" : "cross";
  const gameStatus = winner
    ? `${winner === "circle" ? "O" : "X"} ${content.work.gameWon}`
    : isDraw
      ? content.work.gameDraw
      : `${nextSymbol === "circle" ? "O" : "X"} ${content.work.gameTurn}`;
  const placeSymbol = (index: number) => {
    if (board[index] || winner || isDraw) return;
    setBoard((current) => current.map((value, cellIndex) => cellIndex === index ? nextSymbol : value));
  };
  const resetGame = () => setBoard(Array(9).fill(null));

  return (
    <main className="quiet-site" data-language={language}>
      <motion.div className={`quiet-cursor ${cursor.visible ? "visible" : ""}`} animate={{ x: cursor.x, y: cursor.y }} transition={{ type: "spring", mass: 0.24, stiffness: 580, damping: 30 }} aria-hidden="true"><span /></motion.div>

      <header className="quiet-header">
        <a href="#home" className="quiet-brand" aria-label="Telford Ho">
          <span className="brand-mark"><i /><b /></span>
          <span className="brand-name">TELFORD<br />HO</span>
        </a>
        <nav aria-label={content.nav.projects}>
          <a href="#work">{content.nav.projects}</a>
          <a href="#about">{content.nav.about}</a>
          <a href="#contact">{content.nav.contact}</a>
        </nav>
        <div className="header-tools">
          <div className="language-switch" role="group" aria-label={content.languageLabel}>
            <button className={language === "zh" ? "is-active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中</button>
            <button className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <span className="header-year">2026</span>
        </div>
      </header>

      <section id="home" className="still-hero" onMouseMove={onHeroMove} onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}>
        <motion.div className="still-photo" animate={{ x: heroPointer.x * -72 * motionLevel, y: heroPointer.y * -38 * motionLevel, scale: 1.04 + Math.abs(heroPointer.x) * 0.12 * motionLevel }} transition={{ type: "spring", stiffness: 72, damping: 18 }}>
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663736439775/avceNgKyrvxgJQGS.png" alt={content.hero.imageAlt} />
        </motion.div>
        <motion.div className="hero-weather-line" animate={{ x: heroPointer.x * 114 * motionLevel, y: heroPointer.y * 55 * motionLevel }} transition={{ type: "spring", stiffness: 95, damping: 17 }} />
        <div className="hero-title">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>{content.hero.role}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 46 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.23, 1, 0.32, 1] }}>
            <span className="headline-lead">{content.hero.lead}</span><br /><em className="headline-focus">{content.hero.focus}</em>
          </motion.h1>
          <motion.span className="hero-motion-note" animate={isPaused || reduceMotion ? { opacity: .58 } : { y: [-3, 5, -3] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>{content.hero.note}</motion.span>
        </div>
        <aside className="hero-rail"><span>01</span><i /><small>{content.hero.rail}</small></aside>
        <div className="hero-side-note">{content.hero.side[0]}<br />{content.hero.side[1]}</div>
        <div className="hero-controls">
          <a className="inverse-button" href="#contact">{content.hero.contact} <ArrowDown size={16} /></a>
          <button className="ghost-button" onClick={() => setIsPaused((value) => !value)}>{isPaused ? <Play size={14} /> : <Pause size={14} />}{isPaused ? content.hero.play : content.hero.pause}</button>
        </div>
        <a className="hero-scroll" href="#work">{content.hero.scroll} <ArrowDown size={14} /></a>
      </section>

      <section id="work" className="work-sheet">
        <div className="sheet-topline"><span>{content.work.title}</span><span>{content.work.intro[0]}<br />{content.work.intro[1]}</span></div>
        <aside className="sheet-rail"><span>02</span><i /><small>{content.work.rail}</small></aside>
        <div className="gallery-tabs" role="tablist" aria-label={content.work.tabsLabel}>
          {projects.map((item, index) => <button key={item.name} role="tab" aria-selected={active === index} className={active === index ? "selected" : ""} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><em>{item.label}</em></button>)}
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="gallery-copy" key={`${language}-${active}`} initial={{ opacity: 0, y: 19 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: .36 }}>
            <span>{projects[active].label}</span><h2>{projects[active].name}</h2><p>{projects[active].copy}</p>
            <div className="reading-ledger"><span>{content.work.repository} {active + 1} / 2</span><span>{active === 0 ? content.work.musicLedger : content.work.gameLedger}</span></div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {active === 0 ? (
            <motion.article key={`music-${language}`} className={`guitar-piece ${guitarPointer.active ? "is-close" : ""}`} onMouseMove={onGuitarMove} onMouseLeave={() => setGuitarPointer({ x: 0, y: 0, active: false })} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .38 }}>
              <motion.div className="guitar-picture" animate={{ x: guitarPointer.x * 70, y: guitarPointer.y * 38, rotateZ: guitarPointer.x * 7, rotateY: guitarPointer.x * 14, rotateX: guitarPointer.y * -10, scale: guitarPointer.active ? 1.21 + Math.abs(guitarPointer.x) * .14 : 1 }} transition={{ type: "spring", stiffness: 142, damping: 16, mass: .72 }}>
                <motion.img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663736439775/zBVkVlYYqwxeegoM.png" alt={content.work.guitarAlt} animate={{ x: guitarPointer.x * -56, y: guitarPointer.y * -31, scale: guitarPointer.active ? 1.25 : 1.06 }} transition={{ type: "spring", stiffness: 150, damping: 18 }} />
                <span className="guitar-label">{content.work.guitarLabel}</span><span className="focus-mark">FOCUS {Math.round((guitarPointer.x + .5) * 100).toString().padStart(2, "0")}</span><span className="guitar-folio">{content.work.repositoryLabel}</span>
              </motion.div>
              <a className="repository-link" href={projects[active].url} target="_blank" rel="noreferrer"><span>{projects[active].action}</span><ArrowUpRight size={14} /></a>
            </motion.article>
          ) : (
            <motion.article key={`game-${language}`} className="tictactoe-stage" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .38 }}>
              <div className="game-heading"><span>{content.work.gameTechnology}</span><p>{gameStatus}</p></div>
              <div className="tictactoe-board" aria-label={content.work.boardLabel}>{board.map((symbol, index) => <button key={index} onClick={() => placeSymbol(index)} aria-label={`${content.work.cellLabel} ${index + 1}${content.work.cellSuffix}${symbol ? `: ${symbol === "circle" ? "O" : "X"}` : ""}`} disabled={Boolean(symbol || winner || isDraw)}>{symbol === "circle" ? "O" : symbol === "cross" ? "X" : ""}</button>)}</div>
              <div className="game-actions"><button onClick={resetGame}><RotateCcw size={14} /> {content.work.reset}</button><a href={projects[active].url} target="_blank" rel="noreferrer">{content.work.openRepository} <ArrowUpRight size={14} /></a></div>
              <span className="game-folio">{content.work.playground}</span>
            </motion.article>
          )}
        </AnimatePresence>
      </section>

      <section className="landscape-break" aria-label={content.landscape.alt}><motion.img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663736439775/ZvenBXRPcYEOQcJG.png" alt={content.landscape.alt} animate={isPaused || reduceMotion ? {} : { scale: [1.02, 1.09, 1.02], x: [0, -12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} /><p>{content.landscape.text}</p></section>

      <section id="about" className="about-sheet"><p className="section-tag">{content.about.tag}</p><aside className="about-rail"><span>03</span><i /><small>{content.about.rail}</small></aside><div><h2><span className="headline-lead">{content.about.lead}</span><br /><em className="headline-focus">{content.about.focus}</em></h2><p>{content.about.copy}</p></div></section>

      <section className="career-sheet" aria-label={content.career.eyebrow}>
        <div className="career-intro"><span>{content.career.eyebrow}</span><h2><span className="headline-lead">{content.career.lead}</span><br />{content.career.focus}</h2></div>
        <div className="career-list">{content.career.entries.map(([period, company, description]) => <article key={company}><span>{period}</span><div><h3>{company}</h3><p>{description}</p></div></article>)}</div>
        <div className="skills-line"><span>{content.career.stack}</span><p>TypeScript · Angular · React · Node.js · Express · PostgreSQL · MongoDB · Azure · Generative AI Integration</p><span>{content.career.certifications}</span></div>
      </section>

      <footer id="contact" className="quiet-footer"><p>{content.footer.contact}</p><div className="footer-links"><a href="mailto:telfordho@gmail.com">telfordho@gmail.com <ArrowUpRight size={18} /></a><a href="https://github.com/telfordho" target="_blank" rel="noreferrer">{content.footer.github}</a><a href="https://www.linkedin.com/in/tingfungho" target="_blank" rel="noreferrer">{content.footer.linkedin}</a></div><span className="footer-folio">04 / © 2026</span></footer>
    </main>
  );
}
