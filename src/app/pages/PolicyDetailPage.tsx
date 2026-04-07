import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Star,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  TrendingUp,
  BarChart2,
  BookOpen,
  FileText,
  GitCompare,
  ShieldCheck,
  Zap,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  MinusCircle,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { policies } from "../data/policies";

/* ─────────────── config ─────────────── */
const tagConfig: Record<string, { bg: string; color: string; dot: string }> = {
  重大转向: { bg: "bg-red-500",     color: "text-white", dot: "🔴" },
  新表述:   { bg: "bg-orange-500",  color: "text-white", dot: "🟠" },
  延续:     { bg: "bg-blue-500",    color: "text-white", dot: "🔵" },
  边际强化: { bg: "bg-emerald-500", color: "text-white", dot: "🟢" },
};

const strengthConfig: Record<string, string> = {
  强: "bg-red-100 text-red-600 border-red-200",
  中: "bg-amber-100 text-amber-700 border-amber-200",
  弱: "bg-slate-100 text-slate-500 border-slate-200",
};

/* ─────────────── helpers ─────────────── */
function StarRating({ count, total = 5, size = 14 }: { count: number; total?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} size={size} className={i < count ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
      ))}
    </div>
  );
}

/** Generate mock T+1…T+20 trend data */
function genTrend(finalValue: number, seed: number) {
  const pts: { day: string; value: number }[] = [];
  for (let d = 1; d <= 20; d++) {
    const prog = d / 20;
    const noise = Math.sin(d * seed * 2.1) * Math.abs(finalValue) * 0.15;
    const val = d === 20 ? finalValue : finalValue * prog * (0.8 + 0.2 * Math.sin(d * seed)) + noise;
    pts.push({ day: `T+${d}`, value: parseFloat(val.toFixed(2)) });
  }
  return pts;
}

/* ─────────────── Tab 1 — 政策说了什么 ─────────────── */
function Tab1({ policy }: { policy: (typeof policies)[0] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-4 pb-10">
      {/* Key Points */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <FileText size={15} className="text-orange-500" />
          <h3 className="text-slate-900">核心要点</h3>
          <span className="ml-auto text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{policy.points.length} 条</span>
        </div>
        {policy.points.map((point, i) => (
          <div key={i} className="border-b border-slate-50 last:border-0">
            <button
              className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-slate-50 transition-colors"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[11px] flex items-center justify-center font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-slate-700 leading-relaxed">{point.text}</span>
              <span className="flex-shrink-0 flex items-center gap-1 mt-0.5 text-[11px] font-medium text-orange-500">
                {expanded === i ? "收起" : "查看原文"}
                {expanded === i ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </span>
            </button>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 ml-8">
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                      <p className="text-[11px] text-amber-700 font-medium mb-1.5 flex items-center gap-1">
                        <FileText size={11} /> 原文摘录
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{point.originalText}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Keywords horizontal scroll */}
      <div className="bg-white rounded-2xl px-5 py-4">
        <h3 className="text-slate-900 mb-3">政策关键词</h3>
        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <div className="flex gap-2.5 w-max">
            {policy.keywords.map((kw, i) => (
              <span
                key={kw}
                className={`flex-shrink-0 px-3.5 py-2 rounded-full border font-medium whitespace-nowrap ${
                  i === 0
                    ? "text-[18px] bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100"
                    : i === 1
                    ? "text-[15px] bg-orange-50 text-orange-600 border-orange-200"
                    : i === 2
                    ? "text-[13px] bg-amber-50 text-amber-700 border-amber-200"
                    : "text-[12px] bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">← 左右滑动查看全部</p>
      </div>

      {/* Sectors — 关联强度 and 板块涨幅 visually separated */}
      <div className="bg-white rounded-2xl px-5 py-4">
        <h3 className="text-slate-900 mb-1">关联行业板块</h3>
        <p className="text-xs text-slate-400 mb-4">基于政策内容的行业关联程度分析（≠ 行情预测）</p>
        <div className="space-y-5">
          {policy.sectors.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Sector name */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-800">{s.name}</span>
                </div>
                {/* ① 关联强度 — orange badge */}
                <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5">
                  关联 {s.relevance}%
                </span>
              </div>

              {/* Progress bar for relevance */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.relevance}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-400 mb-2">{s.relevanceDesc}</p>

              {/* ② 板块涨幅 — clearly separated red row */}
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                <TrendingUp size={13} className="text-red-500 flex-shrink-0" />
                <span className="text-xs text-slate-500">发布后板块表现</span>
                <span className="ml-auto text-sm font-black text-red-500">{s.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-slate-300 mt-4 text-center">板块涨幅仅反映政策发布后近期走势，不构成投资建议</p>
      </div>
    </div>
  );
}

/* ─────────────── Tab 2 — 力度强不强 ─────────────── */
function Tab2({ policy }: { policy: (typeof policies)[0] }) {
  const radarData = policy.radarScores.map((r) => ({ subject: r.subject, A: r.score }));

  const dimensions = [
    {
      icon: ShieldCheck,
      label: "发布主体权威度",
      stars: policy.authorityStars,
      note: policy.authorityNote,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      icon: Zap,
      label: "政策工具效力",
      stars: policy.toolStars,
      note: policy.toolNote,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      icon: Lightbulb,
      label: "政策创新性",
      stars: policy.innovationStars,
      note: policy.innovationNote,
      color: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
  ];

  return (
    <div className="space-y-4 pb-10">
      {/* Verdict card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl px-5 py-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <BarChart2 size={16} className="text-white/80" />
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">发力强度研判</p>
            <p className="text-white font-medium leading-snug">这条政策的推力，能到几成？</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-3 mb-3">
          <p className="text-white/90 text-sm leading-relaxed">{policy.policyVerdict}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">综合评分</span>
          <div className="flex-1 bg-white/10 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${policy.overallScore}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
            />
          </div>
          <span className="text-orange-300 font-bold text-sm">{policy.overallScore}</span>
          <span className="text-white/40 text-xs">/ 100</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs bg-orange-500/30 text-orange-300 px-3 py-0.5 rounded-full font-medium border border-orange-400/30">
            {policy.verdictLabel}
          </span>
          <span className="text-xs text-white/40">{policy.overallDesc}</span>
        </div>
      </div>

      {/* Three dimension ratings */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <h3 className="text-slate-900">三维评估体系</h3>
          <span className="ml-auto text-[11px] text-slate-400">各维度满分 5 星</span>
        </div>
        {dimensions.map((d, idx) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="px-5 py-4 border-b border-slate-50 last:border-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${d.bg} border ${d.border}`}>
                  <Icon size={15} className={d.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{d.label}</span>
                    <StarRating count={d.stars} size={15} />
                  </div>
                </div>
              </div>
              <div className={`${d.bg} border ${d.border} rounded-xl px-3 py-2.5`}>
                <p className="text-xs text-slate-600 leading-relaxed">{d.note}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Radar chart */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-slate-900 mb-1">四维雷达图</h3>
        <p className="text-xs text-slate-400 mb-3">从权威度、覆盖面、表述强度、创新性四维度综合评估</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 35, bottom: 10, left: 35 }}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <Radar name="得分" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.18} strokeWidth={2} />
              <Tooltip
                formatter={(v: number) => [`${v} 分`, "得分"]}
                contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #fed7aa" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-2">
          {policy.radarScores.map((r, i) => (
            <div key={r.subject}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600">{r.subject}</span>
                <span className="text-xs font-bold text-orange-500">{r.score}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.score}%` }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="bg-orange-400 h-1.5 rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wording analysis */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-slate-900 mb-3">措辞力度拆解</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {policy.wordingAnalysis.map((w) => (
            <span key={w.word} className={`px-3 py-1.5 rounded-full text-sm border font-medium ${strengthConfig[w.strength]}`}>
              {w.word}
              <span className="ml-1.5 text-[11px] opacity-60 border-l border-current pl-1.5">{w.strength}</span>
            </span>
          ))}
        </div>
        <div className="flex gap-3 text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />强 = 命令/禁止</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />中 = 建议/引导</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />弱 = 鼓励/探索</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-medium text-slate-700">📊 措辞总结：</span>
            {policy.wordingConclusion}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Tab 3 — 新旧对比看影响 ─────────────── */
function Tab3({
  policy,
  unlocked,
  onUnlock,
}: {
  policy: (typeof policies)[0];
  unlocked: boolean;
  onUnlock: () => void;
}) {
  // index of the first compare row that has a sectorTrend (for showing CTA once)
  const firstTrendIdx = policy.compareRows.findIndex((r) => r.sectorTrend);

  return (
    <div className="space-y-4 pb-10">

      {/* ── SECTION 1 (FREE): 定性总述 ── */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <GitCompare size={15} className="text-orange-500" />
          <h3 className="text-slate-900">新旧政策定性</h3>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-start gap-3 mb-4">
            <span className={`flex-shrink-0 text-xs text-white font-bold px-3 py-1.5 rounded-full mt-0.5 ${policy.changeRelationColor}`}>
              {policy.changeRelation}
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{policy.changeConclusion}</p>
          </div>
          <div className="space-y-2.5">
            {policy.changeSummaryPoints.map((pt, i) => {
              const isNew = pt.startsWith("新增") || pt.startsWith("首次");
              const isDiff = !isNew && !pt.startsWith("核心") && !pt.startsWith("整体");
              return (
                <div key={i} className="flex items-start gap-2.5">
                  {isNew ? (
                    <AlertCircle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  ) : isDiff ? (
                    <MinusCircle size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 size={15} className="text-slate-300 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm leading-relaxed ${isNew ? "text-orange-700 font-medium" : "text-slate-600"}`}>
                    {pt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION 2 (FREE): 历史相似政策 ── */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-slate-900 mb-3">参照历史政策</h3>
        <div className="space-y-3">
          {policy.historyPolicies.map((hp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-slate-100 rounded-xl p-4"
            >
              <p className="text-sm text-slate-700 leading-snug mb-2">{hp.title}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{hp.year}</span>
                <span className="text-xs text-slate-400">{hp.org}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${hp.similarity}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                  />
                </div>
                <span className="text-xs font-bold text-orange-500 flex-shrink-0">相似度 {hp.similarity}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: 关键条款对比 + 内嵌行情走势 ── */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-slate-900 mb-1">关键条款对比 · 关联行情</h3>
        <p className="text-xs text-slate-400 mb-1">
          <span className="inline-block bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[11px] mr-1">有差异</span>
          条款下方附历史相似政策发布后的关联板块走势
        </p>
        {!unlocked && firstTrendIdx >= 0 && (
          <div className="flex items-center gap-2 mb-4 mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
            <Lock size={12} className="text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 flex-1">行情走势数据需解锁查看</p>
            <button
              onClick={onUnlock}
              className="flex-shrink-0 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-full font-medium"
            >
              解锁
            </button>
          </div>
        )}
        {unlocked && (
          <div className="flex items-center gap-2 mb-4 mt-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
            <Unlock size={12} className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700">已解锁 · 行情走势可见</p>
          </div>
        )}

        <div className="space-y-4">
          {policy.compareRows.map((row, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden ${row.hasDiff ? "border-orange-200" : "border-slate-100"}`}
            >
              {/* Dimension header */}
              <div className={`px-3 py-2 flex items-center justify-between ${row.hasDiff ? "bg-orange-50 border-b border-orange-100" : "bg-slate-50 border-b border-slate-100"}`}>
                <span className={`text-xs font-bold ${row.hasDiff ? "text-orange-700" : "text-slate-600"}`}>
                  {row.dimension}
                </span>
                {row.hasDiff && (
                  <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
                    有差异
                  </span>
                )}
              </div>

              {/* Comparison text */}
              <div className="p-3 space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="flex-shrink-0 text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-medium mt-0.5 whitespace-nowrap">
                    历史
                  </span>
                  <p className={`text-xs leading-relaxed ${row.hasDiff ? "text-slate-400 line-through decoration-slate-300" : "text-slate-500"}`}>
                    {row.historical}
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="flex-shrink-0 text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium mt-0.5 whitespace-nowrap">
                    当前
                  </span>
                  <p className={`text-xs leading-relaxed font-medium ${row.hasDiff ? "text-slate-800" : "text-slate-600"}`}>
                    {row.current}
                  </p>
                </div>
                {row.hasDiff && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-700 leading-relaxed">💡 {row.diff}</p>
                  </div>
                )}
              </div>

              {/* ── Inline sector trend (paywalled) ── */}
              {row.sectorTrend && (
                <div className="border-t border-dashed border-slate-200 mx-3 mb-3">
                  {/* Trend header — always visible */}
                  <div className="flex items-center gap-2 pt-3 pb-2">
                    <TrendingUp size={12} className="text-slate-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-400">参考历史走势 · 关联板块</span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full ml-1">
                      {row.sectorTrend.sector}
                    </span>
                    <span className={`ml-auto text-[13px] font-black flex-shrink-0 ${row.sectorTrend.t20Num >= 0 ? "text-red-500" : "text-emerald-600"}`}>
                      {row.sectorTrend.t20}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{row.sectorTrend.description}</p>

                  {/* Chart — locked or unlocked */}
                  {unlocked ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-28 rounded-xl overflow-hidden bg-slate-50"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={genTrend(row.sectorTrend.t20Num, 1.3 + i * 0.7)}
                          margin={{ top: 6, right: 8, bottom: 0, left: -22 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#cbd5e1" }} tickLine={false} axisLine={false} interval={4} />
                          <YAxis tick={{ fontSize: 9, fill: "#cbd5e1" }} tickLine={false} axisLine={false} />
                          <ReferenceLine y={0} stroke="#e2e8f0" strokeDasharray="3 3" />
                          <Tooltip
                            contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0", padding: "4px 8px" }}
                            formatter={(v: number) => [`${v}%`, row.sectorTrend!.sector]}
                            labelStyle={{ color: "#94a3b8" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={row.sectorTrend.t20Num >= 0 ? "#ef4444" : "#22c55e"}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  ) : (
                    <div className="relative h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                      {/* blurred fake bars */}
                      <div className="absolute inset-0 flex items-end gap-1 px-3 pb-2 opacity-30 blur-sm pointer-events-none">
                        {[30, 45, 38, 60, 55, 72, 68, 80, 75, 85].map((h, k) => (
                          <div key={k} className="flex-1 bg-red-300 rounded-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                        <Lock size={13} className="text-slate-400" />
                        <span className="text-xs text-slate-400">解锁后查看完整走势</span>
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-300 text-center mt-1.5">历史数据仅供参考，不构成投资建议</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unlock CTA at bottom if still locked and there are trends */}
        {!unlocked && firstTrendIdx >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-center"
          >
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={18} className="text-orange-300" />
            </div>
            <p className="text-white font-medium mb-1">解锁全部关联板块走势</p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              查看上方每条差异条款，在历史相似政策发布后 T+20 交易日内的完整板块走势图
            </p>
            <button
              onClick={onUnlock}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold shadow-md shadow-orange-900/30 active:scale-[0.98] transition-transform text-sm"
            >
              立即开通 · 查看完整解读
            </button>
            <p className="text-[10px] text-white/30 mt-2">（原型演示：点击即可解锁预览）</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Page ─────────────── */
export function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [tab3Unlocked, setTab3Unlocked] = useState(false);
  const [showFullTitle, setShowFullTitle] = useState(false);

  const policy = policies.find((p) => p.id === id);
  if (!policy) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">政策不存在</p>
      </div>
    );
  }

  const tag = tagConfig[policy.tag];
  const tabs = [
    { label: "政策说了什么？", icon: BookOpen },
    { label: "力度强不强？",  icon: BarChart2 },
    { label: "新旧对比看影响", icon: GitCompare },
  ];

  return (
    <div className="max-w-md mx-auto bg-[#f5f6f8] min-h-screen">
      {/* ── Sticky Header ── */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-4 pt-12 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-slate-500 mb-3 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">返回周刊</span>
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${tag.bg} ${tag.color}`}>
              {tag.dot} {policy.tag}
            </span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{policy.level}</span>
          </div>

          <button className="text-left w-full" onClick={() => setShowFullTitle(!showFullTitle)}>
            <h2 className={`text-slate-900 leading-snug ${showFullTitle ? "" : "line-clamp-2"}`}>
              {showFullTitle ? policy.fullTitle : policy.title}
            </h2>
            <span className="text-[11px] text-orange-400 mt-0.5 inline-flex items-center gap-0.5">
              {showFullTitle ? <>收起 <ChevronUp size={11} /></> : <>查看全称 <ChevronDown size={11} /></>}
            </span>
          </button>

          <p className="text-xs text-slate-400 mt-1.5">{policy.date} {policy.weekday} | {policy.org}</p>

          <div className="mt-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
            <p className="text-sm text-orange-700 leading-relaxed">
              <span className="font-medium">📌 </span>{policy.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2.5">
            <span className="text-xs text-slate-400">影响力</span>
            <StarRating count={policy.stars} size={14} />
            <span className="text-xs text-slate-400 ml-1">{policy.overallDesc}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-slate-100">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 relative flex flex-col items-center justify-center gap-0.5 py-3 text-[11px] font-medium transition-colors ${
                  isActive ? "text-orange-500" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon size={14} />
                <span className="leading-tight text-center px-1">{tab.label}</span>
                {i === 2 && (
                  <span className="absolute top-2 right-2">
                    {tab3Unlocked
                      ? <Unlock size={9} className="text-orange-400" />
                      : <Lock size={9} className="text-slate-300" />}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="px-4 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div key="t0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }}>
              <Tab1 policy={policy} />
            </motion.div>
          )}
          {activeTab === 1 && (
            <motion.div key="t1" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }}>
              <Tab2 policy={policy} />
            </motion.div>
          )}
          {activeTab === 2 && (
            <motion.div key="t2" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }}>
              <Tab3 policy={policy} unlocked={tab3Unlocked} onUnlock={() => setTab3Unlocked(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}