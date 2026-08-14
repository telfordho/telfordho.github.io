/**
 * Style reminder — 活版節拍：瑞士編輯設計、非對稱排版、暖白與炭黑底色，活字橘只用於互動焦點。
 * 動態服務閱讀與導覽：保留可見的節奏、短促回饋與 reduced-motion 支援。
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Layers3,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type ConceptKey = "field" | "atlas";

const concepts: Record<
  ConceptKey,
  {
    index: string;
    name: string;
    english: string;
    headline: string;
    summary: string;
    image: string;
    imageAlt: string;
    mode: string;
    action: string;
    interaction: string;
    motion: string;
    accent: string;
  }
> = {
  field: {
    index: "01",
    name: "磁場首頁",
    english: "SIGNAL FIELD",
    headline: "把游標放上來，\n讓畫面替我說明。",
    summary:
      "以游標驅動的視差、漂移與縮放，將第一眼的自我介紹變成一個可探索的視覺空間。",
    image: "/manus-storage/editorial-signal-hero_14ece049.png",
    imageAlt: "暖白、橘色與黑色元素組成的抽象編輯設計作品",
    mode: "CURSOR-LED",
    action: "啟動磁場",
    interaction: "移動游標，觀察主視覺層次如何錯位與聚焦。",
    motion: "滑鼠視差 · 作品卡 hover · 游標磁吸",
    accent: "#FF5B2E",
  },
  atlas: {
    index: "02",
    name: "流程展開",
    english: "PROCESS ATLAS",
    headline: "不是展示結果；\n是邀請你走進決策過程。",
    summary:
      "把作品的背景、取捨與成果拆成可逐層展開的敘事。每一下點擊都讓畫面向下一個決策前進。",
    image: "/manus-storage/process-atlas-hero_b20a56cf.png",
    imageAlt: "銀色、橘色、黑色和半透明材質組成的抽象編輯工作檯",
    mode: "NARRATIVE-LED",
    action: "展開流程",
    interaction: "點擊按鈕，讓設計脈絡逐段編排到你的眼前。",
    motion: "內容揭露 · 版面重排 · 進度推進",
    accent: "#FF5B2E",
  },
};

const processSteps = [
  { number: "01", label: "Context", copy: "先理解人與情境。" },
  { number: "02", label: "Tension", copy: "找出最需要被推動的一點。" },
  { number: "03", label: "Shift", copy: "用能被感受的改變完成收束。" },
];

function ProgressRail({ active }: { active: ConceptKey }) {
  return (
    <aside className="progress-rail" aria-label="概念選擇">
      <span className="rail-label">CHAPTER</span>
      <div className="rail-line" aria-hidden="true">
        <motion.div
          className="rail-fill"
          animate={{ height: active === "field" ? "39%" : "77%" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
      <span className="rail-number">0{active === "field" ? "1" : "2"}</span>
    </aside>
  );
}

function HeroArt({
  concept,
  pointer,
  isPaused,
}: {
  concept: (typeof concepts)[ConceptKey];
  pointer: { x: number; y: number };
  isPaused: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const movement = shouldReduce || isPaused ? 0 : 1;

  return (
    <motion.div
      className="hero-art"
      layout
      animate={isPaused || shouldReduce ? { y: 0 } : { y: [-12, 12, -12] }}
      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="hero-art-shadow"
        animate={{ x: pointer.x * -48 * movement, y: pointer.y * -35 * movement, rotate: pointer.x * -4 * movement }}
        transition={{ type: "spring", stiffness: 92, damping: 16 }}
      />
      <motion.div
        className="hero-art-frame"
        animate={{
          x: pointer.x * 74 * movement,
          y: pointer.y * 52 * movement,
          rotate: pointer.x * 5.5 * movement,
          scale: isPaused ? 1 : 1.065,
        }}
        transition={{ type: "spring", stiffness: 86, damping: 15 }}
      >
        <motion.img
          key={concept.image}
          src={concept.image}
          alt={concept.imageAlt}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
      <motion.div
        className="art-stamp"
        animate={{ x: pointer.x * -84 * movement, y: pointer.y * 60 * movement, rotate: -8 + pointer.x * -8 * movement }}
        transition={{ type: "spring", stiffness: 106, damping: 17 }}
      >
        <span>MOVE</span>
        <ArrowUpRight size={18} strokeWidth={2.4} />
      </motion.div>
      <div className="art-index" aria-hidden="true">
        <span>PORTFOLIO</span>
        <span>{concept.index} / 02</span>
      </div>
    </motion.div>
  );
}

function ProcessDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shouldReduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="process-drawer"
          aria-label="流程展開示範"
          initial={shouldReduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
          animate={shouldReduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
          exit={shouldReduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="drawer-topline">
            <span>INTERACTION / 02</span>
            <button className="icon-button" onClick={onClose} aria-label="關閉流程展開">
              <X size={20} />
            </button>
          </div>
          <div className="drawer-title-wrap">
            <p>點擊後，不只是彈出視窗。</p>
            <h2>內容順著<br />決策展開。</h2>
          </div>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <motion.article
                className="process-step"
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              >
                <span>{step.number}</span>
                <div>
                  <h3>{step.label}</h3>
                  <p>{step.copy}</p>
                </div>
                <ChevronRight size={18} />
              </motion.article>
            ))}
          </div>
          <p className="drawer-note">這是一種讓訪客主動探索作品過程的互動示範。</p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [active, setActive] = useState<ConceptKey>("field");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -120, y: -120, visible: false });
  const [pianoPointer, setPianoPointer] = useState({ x: 0, y: 0, active: false });
  const shouldReduce = useReducedMotion();
  const concept = concepts[active];

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleStageMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const switchConcept = (key: ConceptKey) => {
    setActive(key);
    setDrawerOpen(false);
    setPointer({ x: 0, y: 0 });
  };

  const activateExperience = () => {
    if (active === "atlas") {
      setDrawerOpen(true);
    } else {
      setIsPaused(false);
      setPointer({ x: 0.33, y: -0.18 });
    }
  };

  const handlePianoMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPianoPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
      active: true,
    });
  };

  return (
    <main className="portfolio-shell">
      <motion.div
        className={`custom-cursor ${cursor.visible ? "is-visible" : ""}`}
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: "spring", stiffness: 660, damping: 38, mass: 0.42 }}
        aria-hidden="true"
      >
        <span />
      </motion.div>

      <ProgressRail active={active} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回頁面頂部">
          <img src="/manus-storage/typeset-orange-mark_4254977e.png" alt="" />
          <span className="brand-word"><i />STUDIO<br />NOTE</span>
        </a>
        <div className="header-meta">
          <span>PORTFOLIO STUDY</span>
          <span className="dot-separator" />
          <span>2026</span>
        </div>
        <a className="header-link" href="#comparison">
          看互動說明 <ArrowDown size={15} />
        </a>
      </header>

      <section className="concept-nav" aria-label="示範選擇">
        {(Object.keys(concepts) as ConceptKey[]).map((key) => (
          <button
            key={key}
            className={`concept-tab ${active === key ? "is-active" : ""}`}
            onClick={() => switchConcept(key)}
            aria-pressed={active === key}
          >
            <span>{concepts[key].index}</span>
            <strong>{concepts[key].name}</strong>
            <em>{concepts[key].english}</em>
          </button>
        ))}
      </section>

      <section
        id="top"
        className="hero-stage"
        onMouseMove={handleStageMove}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            key={concept.mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CircleDot size={14} /> {concept.mode}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={concept.headline}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -22, clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 0.62, ease: [0.77, 0, 0.175, 1] }}
            >
              <h1>{concept.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{concept.summary}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero-actions">
            <button className="primary-action" onClick={activateExperience}>
              <span>{concept.action}</span>
              <ArrowUpRight size={19} />
            </button>
            <button
              className="pause-action"
              onClick={() => setIsPaused((current) => !current)}
              aria-pressed={isPaused}
            >
              {isPaused ? <Play size={15} /> : <Pause size={15} />}
              {isPaused ? "恢復動態" : "暫停動態"}
            </button>
          </div>
        </div>

        <HeroArt concept={concept} pointer={pointer} isPaused={isPaused} />

        <motion.div
          className="hero-orbit orbit-a"
          animate={isPaused || shouldReduce ? {} : { rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
          aria-hidden="true"
        >
          <span />
        </motion.div>
        <motion.div
          className="hero-orbit orbit-b"
          animate={isPaused || shouldReduce ? {} : { rotate: -360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
          aria-hidden="true"
        >
          <span />
        </motion.div>
      </section>

      <section id="comparison" className="interaction-notes">
        <div className="notes-label">
          <span>INTERACTION<br />NOTES</span>
          <MousePointer2 size={18} />
        </div>
        <div className="notes-content">
          <p className="notes-kicker">正在剪接的段落 / {concept.index}</p>
          <h2>{concept.name}</h2>
          <p>{concept.interaction}</p>
        </div>
        <div className="notes-motion">
          <Sparkles size={16} />
          <span>{concept.motion}</span>
        </div>
      </section>

      <section className="sample-projects" aria-label="互動細節示範">
        <article
          className={`project-card detail-card ${pianoPointer.active ? "is-exploring" : ""}`}
          onMouseMove={handlePianoMove}
          onMouseLeave={() => setPianoPointer({ x: 0, y: 0, active: false })}
        >
          <div className="card-caption">
            <span>MICRO / 01</span>
            <h2>Hover，讓琴鍵<br />向你靠近。</h2>
            <p>游標在左，琴鍵往左傾；游標靠近，鏡頭立刻推進。讓縮放本身成為作品的節奏。</p>
            <button onClick={() => setPianoPointer({ x: 0.42, y: -0.18, active: true })}>推近琴鍵 <ChevronRight size={16} /></button>
          </div>
          <motion.div
            className="detail-image-wrap piano-image-wrap"
            animate={{
              x: pianoPointer.x * 43,
              y: pianoPointer.y * 25,
              rotate: 4 + pianoPointer.x * 10,
              scale: pianoPointer.active ? 1.16 + Math.abs(pianoPointer.x) * 0.11 : 1,
            }}
            transition={{ type: "spring", stiffness: 155, damping: 16, mass: 0.7 }}
          >
            <motion.img
              src="/manus-storage/piano-editorial-hover_6296c54f.png"
              alt="以近距離廣角拍攝、具有強烈景深的黑色三角鋼琴琴鍵"
              animate={{
                scale: pianoPointer.active ? 1.22 + Math.abs(pianoPointer.y) * 0.16 : 1.05,
                x: pianoPointer.x * -38,
                y: pianoPointer.y * -24,
              }}
              transition={{ type: "spring", stiffness: 145, damping: 17, mass: 0.72 }}
            />
            <span className="image-label">PIANO / DEPTH</span>
            <span className="piano-focus">FOCUS {Math.round((pianoPointer.x + 0.5) * 99).toString().padStart(2, "0")}</span>
          </motion.div>
        </article>
        <article className="project-card control-card">
          <div className="control-topline">
            <span>CONTROL / 02</span>
            <Layers3 size={18} />
          </div>
          <h2>把動態的主導權<br />交回訪客。</h2>
          <p>想靜下來？一鍵停下非必要動態。系統偏好降低動態時，畫面亦會自動收斂。</p>
          <div className="control-buttons">
            <button className={isPaused ? "active" : ""} onClick={() => setIsPaused(true)}><Pause size={15} /> 暫停</button>
            <button className={!isPaused ? "active" : ""} onClick={() => setIsPaused(false)}><Play size={15} /> 播放</button>
            <button onClick={() => setPointer({ x: 0, y: 0 })}><RotateCcw size={15} /> 重置</button>
          </div>
          <p className="margin-note">MARGIN NOTE / 動態不是強迫觀看，而是讓內容有被推進的理由。</p>
        </article>
      </section>

      <footer className="site-footer">
        <p>兩種動態語言，哪一種更像你？</p>
        <a href="#top">回到頂部 <ArrowUpRight size={17} /></a>
      </footer>

      <ProcessDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
