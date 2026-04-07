import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  ChevronRight,
  Star,
  TrendingUp,
  X,
  Check,
} from "lucide-react";
import { policies, hotWords, type Policy } from "../data/policies";

/* ─── tag config ─── */
const tagConfig: Record<string, { bg: string; color: string; dot: string }> = {
  重大转向: { bg: "bg-red-500",     color: "text-white", dot: "🔴" },
  新表述:   { bg: "bg-orange-500",  color: "text-white", dot: "🟠" },
  延续:     { bg: "bg-blue-500",    color: "text-white", dot: "🔵" },
  边际强化: { bg: "bg-emerald-500", color: "text-white", dot: "🟢" },
};

/* ─── word sizes ─── */
const wordStyle = {
  large:  { fontSize: "22px", color: "#f97316", activeRing: "ring-orange-400" },
  medium: { fontSize: "15px", color: "#d97706", activeRing: "ring-amber-400" },
  small:  { fontSize: "11px", color: "#94a3b8", activeRing: "ring-slate-300" },
};

/* ─── weekday → date colours ─── */
const dateColors: Record<number, { bg: string; text: string }> = {
  0: { bg: "from-orange-500 to-red-500",   text: "text-white" },   // tourism
  1: { bg: "from-blue-500 to-indigo-500",  text: "text-white" },   // medical
  2: { bg: "from-slate-600 to-slate-700",  text: "text-white" },   // fire
};

function StarRating({ count, total = 5, size = 13 }: { count: number; total?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   WORD CLOUD — absolute-positioned within a container
───────────────────────────────────────────────────── */
function WordCloud({
  activeWord,
  onToggle,
}: {
  activeWord: string | null;
  onToggle: (w: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 320, h: 170 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 170 }}
    >
      {hotWords.map((word) => {
        const s = wordStyle[word.size];
        const isActive = activeWord === word.text;
        const x = (word.cx / 100) * size.w;
        const y = (word.cy / 100) * size.h;

        return (
          <motion.button
            key={word.text}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
            onClick={() => onToggle(word.text)}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${word.rotate ?? 0}deg)`,
              fontSize: s.fontSize,
              color: isActive ? "#fff" : s.color,
              fontWeight: word.size === "large" ? 700 : word.size === "medium" ? 600 : 500,
              background: isActive
                ? word.size === "large"
                  ? "#f97316"
                  : word.size === "medium"
                  ? "#d97706"
                  : "#94a3b8"
                : "transparent",
              borderRadius: 8,
              padding: "2px 6px",
              whiteSpace: "nowrap",
              lineHeight: 1.3,
              transition: "all 0.2s",
              zIndex: word.size === "large" ? 3 : word.size === "medium" ? 2 : 1,
            }}
          >
            {word.text}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   CALENDAR CARD
───────────────────────────────────────────────────── */
function CalendarCard({
  policy,
  index,
  isLast,
  onClick,
}: {
  policy: Policy;
  index: number;
  isLast: boolean;
  onClick: () => void;
}) {
  const tag = tagConfig[policy.tag];
  const colors = dateColors[index] ?? dateColors[0];
  const [month, day] = policy.date.split("-").slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="flex gap-0 relative"
    >
      {/* ── Left: timeline + calendar page ── */}
      <div className="flex flex-col items-center mr-3" style={{ minWidth: 52 }}>
        {/* Calendar page (torn-page style) */}
        <div
          className={`w-[52px] rounded-xl overflow-hidden shadow-md bg-gradient-to-b ${colors.bg} flex-shrink-0`}
        >
          {/* top strip — month */}
          <div className="text-center py-1" style={{ background: "rgba(0,0,0,0.18)" }}>
            <span className="text-[10px] font-semibold text-white/90 tracking-widest">
              {parseInt(month)}月
            </span>
          </div>
          {/* large day */}
          <div className="flex flex-col items-center justify-center py-1.5">
            <span className="text-[28px] font-black text-white leading-none">{parseInt(day)}</span>
            <span className="text-[10px] text-white/80 font-medium mt-0.5">{policy.weekday}</span>
          </div>
        </div>

        {/* Vertical connecting line */}
        {!isLast && (
          <div className="flex-1 flex flex-col items-center mt-1 mb-0" style={{ minHeight: 20 }}>
            <div className="w-px flex-1 border-l-2 border-dashed border-slate-200" />
          </div>
        )}
      </div>

      {/* ── Right: card content ── */}
      <div
        className="flex-1 mb-4 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer group hover:shadow-md hover:border-orange-100 transition-all duration-200 overflow-hidden"
        onClick={onClick}
      >
        {/* Card top color bar */}
        <div className={`h-1 bg-gradient-to-r ${colors.bg}`} />

        <div className="p-4">
          {/* Tags row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${tag.bg} ${tag.color}`}>
              {tag.dot} {policy.tag}
            </span>
            <span className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">
              {policy.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-slate-900 leading-snug line-clamp-2 mb-1.5 pr-6">{policy.title}</h3>

          {/* Org */}
          <p className="text-xs text-slate-400 mb-3">{policy.org}</p>

          {/* Sectors: two clearly separate rows */}
          <div className="space-y-1.5 mb-3">
            {policy.sectors.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                {/* Sector name (left, grey bg) */}
                <span className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-md px-2 py-0.5 flex-shrink-0">
                  {s.name}
                </span>
                {/* Divider arrow */}
                <ChevronRight size={10} className="text-slate-300 flex-shrink-0" />
                {/* Change (red) */}
                <span className="flex items-center gap-0.5 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-md px-2 py-0.5">
                  <TrendingUp size={10} />
                  {s.change}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">影响力</span>
              <StarRating count={policy.stars} />
            </div>
            <span className="flex items-center gap-0.5 text-xs text-orange-400 group-hover:text-orange-500 transition-colors">
              查看解读
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
const periodOptions = ["2026.03.10–03.20", "2026.02.24–03.07", "2026.02.10–02.21"];
const typeOptions = ["全部", "重大转向", "新表述", "延续", "边际强化"];

export function HomePage() {
  const navigate = useNavigate();
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [selectedType, setSelectedType] = useState(0);

  const filteredPolicies = activeWord
    ? policies.filter((p) => {
        const word = hotWords.find((w) => w.text === activeWord);
        return word?.policyIds.includes(p.id);
      })
    : policies;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f5f6f8]">

      {/* ── Hero Header ── */}
      <div className="relative bg-white overflow-hidden px-5 pt-14 pb-0">
        {/* Gradient blob decoration */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 220,
            height: 220,
            background: "radial-gradient(circle, rgba(251,146,60,0.18) 0%, rgba(239,68,68,0.10) 50%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: 140,
            height: 140,
            background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(-30%, 40%)",
          }}
        />

        <div className="relative flex items-start justify-between mb-5">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs text-slate-400 tracking-wider">POLICY WEEKLY</span>
            </div>
            <h1 className="text-slate-900 tracking-tight" style={{ fontSize: 30 }}>
              看懂政策
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">近期影响力政策一站追踪</p>
          </motion.div>

          <button
            className={`flex items-center gap-1.5 mt-2 rounded-xl px-3 py-2 border text-xs transition-all ${
              showFilter
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersHorizontal size={13} />
            <span>2026.03 第2期</span>
          </button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-2 font-medium">📅 切换周期</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {periodOptions.map((p, i) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPeriod(i)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedPeriod === i
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        {selectedPeriod === i && <Check size={10} className="inline mr-1" />}
                        {p}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">🏷 政策类型</p>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((t, i) => (
                      <button
                        key={t}
                        onClick={() => setSelectedType(i)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedType === i
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-slate-100" />
      </div>

      {/* ── Hot Word Cloud ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white mt-2 px-5 py-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-900">本期政策热词</h2>
          {activeWord && (
            <button
              onClick={() => setActiveWord(null)}
              className="flex items-center gap-1 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors"
            >
              <X size={11} />
              取消筛选
            </button>
          )}
        </div>

        {/* Cloud */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-50/60 via-white to-indigo-50/40 border border-slate-100 p-3 mb-3">
          <WordCloud
            activeWord={activeWord}
            onToggle={(w) => setActiveWord(activeWord === w ? null : w)}
          />
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#f97316", display: "inline-block" }} />
            大 = 影响高
          </span>
          <span className="flex items-center gap-1">
            <span style={{ width: 7, height: 7, borderRadius: 4, background: "#d97706", display: "inline-block" }} />
            中
          </span>
          <span className="flex items-center gap-1">
            <span style={{ width: 6, height: 6, borderRadius: 4, background: "#94a3b8", display: "inline-block" }} />
            小 = 影响低
          </span>
          <span className="ml-auto flex items-center gap-1 text-orange-400">点击词语筛选政策</span>
        </div>

        {activeWord && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2"
          >
            <span className="text-xs text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              已筛选：{activeWord}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* ── Policy List (Calendar Cards) ── */}
      <div className="mt-2 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between py-4"
        >
          <h2 className="text-slate-900">本期入选政策</h2>
          <span className="text-xs text-slate-400 bg-white border border-slate-100 rounded-full px-2.5 py-0.5">
            共 {filteredPolicies.length} 条
          </span>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div>
            {filteredPolicies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-400 text-sm"
              >
                <div className="text-4xl mb-3">🔍</div>
                暂无相关政策
              </motion.div>
            ) : (
              filteredPolicies.map((policy, i) => (
                <CalendarCard
                  key={policy.id}
                  policy={policy}
                  index={i}
                  isLast={i === filteredPolicies.length - 1}
                  onClick={() => navigate(`/policy/${policy.id}`)}
                />
              ))
            )}
          </div>
        </AnimatePresence>

        {/* Historical periods */}
        <div className="mt-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500">往期周刊</p>
          </div>
          {periodOptions.slice(1).map((period) => (
            <button
              key={period}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
            >
              <span className="text-sm text-slate-600">{period}</span>
              <ChevronRight size={14} className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Tag Legend ── */}
      <div className="mx-4 mb-10 p-4 bg-white rounded-2xl border border-slate-100">
        <p className="text-xs text-slate-500 mb-3 font-medium">政策标签体系</p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
          {Object.entries(tagConfig).map(([name, cfg]) => (
            <div key={name} className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                {cfg.dot} {name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-1">
          {[
            ["🔴", "重大转向", "方向根本改变，市场主线转向"],
            ["🟠", "新表述", "首次提出，信号意义强"],
            ["🔵", "延续", "主干延续，有细化"],
            ["🟢", "边际强化", "既有政策局部加码"],
          ].map(([dot, name, desc]) => (
            <p key={name} className="text-[11px] text-slate-400">
              {dot} <span className="text-slate-500">{name}</span> — {desc}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
