import { useState, useEffect } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const DATA = {
  domestic: {
    hot: [
      { rank:1, name:"삼성전자",       code:"005930", price:"78,400",  change:"+4.23%", theme:"반도체",  mention:4821, up:true  },
      { rank:2, name:"SK하이닉스",     code:"000660", price:"198,500", change:"+3.87%", theme:"AI·HBM", mention:3902, up:true  },
      { rank:3, name:"POSCO홀딩스",    code:"005490", price:"312,000", change:"+2.14%", theme:"이차전지",mention:2751, up:true  },
      { rank:4, name:"카카오",          code:"035720", price:"41,250",  change:"-1.32%", theme:"플랫폼",  mention:2310, up:false },
      { rank:5, name:"현대차",          code:"005380", price:"223,000", change:"+1.75%", theme:"전기차",  mention:2198, up:true  },
      { rank:6, name:"LG에너지솔루션", code:"373220", price:"380,500", change:"+0.93%", theme:"배터리",  mention:1887, up:true  },
      { rank:7, name:"NAVER",           code:"035420", price:"172,300", change:"-0.58%", theme:"AI검색",  mention:1654, up:false },
      { rank:8, name:"두산에너빌리티", code:"034020", price:"24,850",  change:"+5.31%", theme:"원전",    mention:1543, up:true  },
      { rank:9, name:"한화에어로",      code:"012450", price:"289,000", change:"+3.62%", theme:"방산",    mention:1401, up:true  },
      { rank:10,name:"셀트리온",        code:"068270", price:"157,800", change:"-2.11%", theme:"바이오",  mention:1287, up:false },
    ],
    volume: [
      { rank:1, name:"삼성전자",       code:"005930", price:"78,400",  change:"+4.23%", theme:"반도체",  volume:"4조 2,100억", up:true  },
      { rank:2, name:"SK하이닉스",     code:"000660", price:"198,500", change:"+3.87%", theme:"AI·HBM", volume:"2조 8,700억", up:true  },
      { rank:3, name:"카카오",          code:"035720", price:"41,250",  change:"-1.32%", theme:"플랫폼",  volume:"1조 9,450억", up:false },
      { rank:4, name:"현대차",          code:"005380", price:"223,000", change:"+1.75%", theme:"전기차",  volume:"1조 3,200억", up:true  },
      { rank:5, name:"두산에너빌리티", code:"034020", price:"24,850",  change:"+5.31%", theme:"원전",    volume:"9,870억",     up:true  },
      { rank:6, name:"NAVER",           code:"035420", price:"172,300", change:"-0.58%", theme:"AI검색",  volume:"8,540억",     up:false },
      { rank:7, name:"셀트리온",        code:"068270", price:"157,800", change:"-2.11%", theme:"바이오",  volume:"7,230억",     up:false },
      { rank:8, name:"한화에어로",      code:"012450", price:"289,000", change:"+3.62%", theme:"방산",    volume:"6,910억",     up:true  },
      { rank:9, name:"LG화학",          code:"051910", price:"298,500", change:"+1.12%", theme:"화학",    volume:"5,780억",     up:true  },
      { rank:10,name:"포스코퓨처엠",   code:"003670", price:"187,200", change:"+2.45%", theme:"이차전지",volume:"5,120억",     up:true  },
    ],
    yearReturn: [
      { rank:1, name:"두산에너빌리티", code:"034020", price:"24,850",  change:"+5.31%", theme:"원전",    returnVal:"+187.3%", up:true  },
      { rank:2, name:"한화에어로",      code:"012450", price:"289,000", change:"+3.62%", theme:"방산",    returnVal:"+142.8%", up:true  },
      { rank:3, name:"SK하이닉스",     code:"000660", price:"198,500", change:"+3.87%", theme:"AI·HBM", returnVal:"+118.4%", up:true  },
      { rank:4, name:"POSCO홀딩스",    code:"005490", price:"312,000", change:"+2.14%", theme:"이차전지",returnVal:"+97.2%",  up:true  },
      { rank:5, name:"LG에너지솔루션", code:"373220", price:"380,500", change:"+0.93%", theme:"배터리",  returnVal:"+76.5%",  up:true  },
      { rank:6, name:"삼성전자",       code:"005930", price:"78,400",  change:"+4.23%", theme:"반도체",  returnVal:"+54.1%",  up:true  },
      { rank:7, name:"현대차",          code:"005380", price:"223,000", change:"+1.75%", theme:"전기차",  returnVal:"+38.9%",  up:true  },
      { rank:8, name:"셀트리온",        code:"068270", price:"157,800", change:"-2.11%", theme:"바이오",  returnVal:"+22.3%",  up:true  },
      { rank:9, name:"NAVER",           code:"035420", price:"172,300", change:"-0.58%", theme:"AI검색",  returnVal:"-8.7%",   up:false },
      { rank:10,name:"카카오",          code:"035720", price:"41,250",  change:"-1.32%", theme:"플랫폼",  returnVal:"-21.4%",  up:false },
    ],
    monthReturn: [
      { rank:1, name:"두산에너빌리티", code:"034020", price:"24,850",  change:"+5.31%", theme:"원전",    returnVal:"+38.2%",  up:true  },
      { rank:2, name:"한화에어로",      code:"012450", price:"289,000", change:"+3.62%", theme:"방산",    returnVal:"+24.7%",  up:true  },
      { rank:3, name:"포스코퓨처엠",   code:"003670", price:"187,200", change:"+2.45%", theme:"이차전지",returnVal:"+19.3%",  up:true  },
      { rank:4, name:"SK하이닉스",     code:"000660", price:"198,500", change:"+3.87%", theme:"AI·HBM", returnVal:"+15.8%",  up:true  },
      { rank:5, name:"삼성전자",       code:"005930", price:"78,400",  change:"+4.23%", theme:"반도체",  returnVal:"+12.4%",  up:true  },
      { rank:6, name:"현대차",          code:"005380", price:"223,000", change:"+1.75%", theme:"전기차",  returnVal:"+8.9%",   up:true  },
      { rank:7, name:"LG에너지솔루션", code:"373220", price:"380,500", change:"+0.93%", theme:"배터리",  returnVal:"+5.2%",   up:true  },
      { rank:8, name:"셀트리온",        code:"068270", price:"157,800", change:"-2.11%", theme:"바이오",  returnVal:"-3.1%",   up:false },
      { rank:9, name:"NAVER",           code:"035420", price:"172,300", change:"-0.58%", theme:"AI검색",  returnVal:"-6.8%",   up:false },
      { rank:10,name:"카카오",          code:"035720", price:"41,250",  change:"-1.32%", theme:"플랫폼",  returnVal:"-11.2%",  up:false },
    ],
    pension: [
      { rank:1,  name:"TIGER 미국S&P500",      code:"360750", price:"18,245", change:"+0.82%", theme:"ETF·미국",   pensionBuyers:142300, up:true  },
      { rank:2,  name:"KODEX 삼성그룹",         code:"102110", price:"9,870",  change:"+1.23%", theme:"ETF·국내",   pensionBuyers:118700, up:true  },
      { rank:3,  name:"TIGER 나스닥100",        code:"133690", price:"102,350",change:"+1.05%", theme:"ETF·미국",   pensionBuyers:97400,  up:true  },
      { rank:4,  name:"삼성전자",                code:"005930", price:"78,400", change:"+4.23%", theme:"반도체",     pensionBuyers:89200,  up:true  },
      { rank:5,  name:"KODEX 200",              code:"069500", price:"38,120", change:"+0.61%", theme:"ETF·국내",   pensionBuyers:76500,  up:true  },
      { rank:6,  name:"TIGER 글로벌리츠",       code:"182480", price:"5,430",  change:"-0.37%", theme:"ETF·리츠",   pensionBuyers:64300,  up:false },
      { rank:7,  name:"KODEX 미국채울트라30년", code:"304660", price:"7,820",  change:"-0.25%", theme:"ETF·채권",   pensionBuyers:58700,  up:false },
      { rank:8,  name:"SK하이닉스",             code:"000660", price:"198,500",change:"+3.87%", theme:"AI·HBM",    pensionBuyers:51200,  up:true  },
      { rank:9,  name:"TIGER 2차전지테마",      code:"305720", price:"11,230", change:"+2.14%", theme:"ETF·배터리", pensionBuyers:44800,  up:true  },
      { rank:10, name:"KODEX 골드선물(H)",      code:"132030", price:"14,560", change:"+0.43%", theme:"ETF·금",     pensionBuyers:38600,  up:true  },
    ],
  },
  overseas: {
    hot: [
      { rank:1, name:"NVIDIA",      code:"NVDA",  price:"$875.40", change:"+6.12%", theme:"AI칩",    mention:9230, up:true  },
      { rank:2, name:"Apple",       code:"AAPL",  price:"$213.07", change:"+1.44%", theme:"빅테크",  mention:7410, up:true  },
      { rank:3, name:"Tesla",       code:"TSLA",  price:"$177.90", change:"-2.88%", theme:"전기차",  mention:6872, up:false },
      { rank:4, name:"Microsoft",   code:"MSFT",  price:"$415.20", change:"+0.97%", theme:"클라우드",mention:5640, up:true  },
      { rank:5, name:"Meta",        code:"META",  price:"$502.30", change:"+3.21%", theme:"AI·소셜", mention:4921, up:true  },
      { rank:6, name:"Amazon",      code:"AMZN",  price:"$188.40", change:"+1.83%", theme:"이커머스",mention:4103, up:true  },
      { rank:7, name:"Palantir",    code:"PLTR",  price:"$24.80",  change:"+8.45%", theme:"AI·방산", mention:3870, up:true  },
      { rank:8, name:"AMD",         code:"AMD",   price:"$162.70", change:"-1.20%", theme:"반도체",  mention:3412, up:false },
      { rank:9, name:"Alphabet",    code:"GOOGL", price:"$171.95", change:"+2.05%", theme:"AI검색",  mention:3201, up:true  },
      { rank:10,name:"Super Micro", code:"SMCI",  price:"$87.30",  change:"+11.20%",theme:"AI서버",  mention:2987, up:true  },
    ],
    volume: [
      { rank:1, name:"NVIDIA",      code:"NVDA",  price:"$875.40", change:"+6.12%", theme:"AI칩",    volume:"$48.2B", up:true  },
      { rank:2, name:"Tesla",       code:"TSLA",  price:"$177.90", change:"-2.88%", theme:"전기차",  volume:"$32.7B", up:false },
      { rank:3, name:"Apple",       code:"AAPL",  price:"$213.07", change:"+1.44%", theme:"빅테크",  volume:"$28.1B", up:true  },
      { rank:4, name:"AMD",         code:"AMD",   price:"$162.70", change:"-1.20%", theme:"반도체",  volume:"$19.4B", up:false },
      { rank:5, name:"Palantir",    code:"PLTR",  price:"$24.80",  change:"+8.45%", theme:"AI·방산", volume:"$15.8B", up:true  },
      { rank:6, name:"Meta",        code:"META",  price:"$502.30", change:"+3.21%", theme:"AI·소셜", volume:"$12.3B", up:true  },
      { rank:7, name:"Microsoft",   code:"MSFT",  price:"$415.20", change:"+0.97%", theme:"클라우드",volume:"$10.9B", up:true  },
      { rank:8, name:"Super Micro", code:"SMCI",  price:"$87.30",  change:"+11.20%",theme:"AI서버",  volume:"$9.7B",  up:true  },
      { rank:9, name:"Amazon",      code:"AMZN",  price:"$188.40", change:"+1.83%", theme:"이커머스",volume:"$8.4B",  up:true  },
      { rank:10,name:"Alphabet",    code:"GOOGL", price:"$171.95", change:"+2.05%", theme:"AI검색",  volume:"$7.2B",  up:true  },
    ],
    yearReturn: [
      { rank:1, name:"Super Micro", code:"SMCI",  price:"$87.30",  change:"+11.20%",theme:"AI서버",  returnVal:"+246.8%", up:true  },
      { rank:2, name:"Palantir",    code:"PLTR",  price:"$24.80",  change:"+8.45%", theme:"AI·방산", returnVal:"+198.3%", up:true  },
      { rank:3, name:"NVIDIA",      code:"NVDA",  price:"$875.40", change:"+6.12%", theme:"AI칩",    returnVal:"+167.4%", up:true  },
      { rank:4, name:"Meta",        code:"META",  price:"$502.30", change:"+3.21%", theme:"AI·소셜", returnVal:"+112.6%", up:true  },
      { rank:5, name:"Microsoft",   code:"MSFT",  price:"$415.20", change:"+0.97%", theme:"클라우드",returnVal:"+58.2%",  up:true  },
      { rank:6, name:"Apple",       code:"AAPL",  price:"$213.07", change:"+1.44%", theme:"빅테크",  returnVal:"+42.1%",  up:true  },
      { rank:7, name:"Alphabet",    code:"GOOGL", price:"$171.95", change:"+2.05%", theme:"AI검색",  returnVal:"+31.7%",  up:true  },
      { rank:8, name:"Amazon",      code:"AMZN",  price:"$188.40", change:"+1.83%", theme:"이커머스",returnVal:"+18.9%",  up:true  },
      { rank:9, name:"AMD",         code:"AMD",   price:"$162.70", change:"-1.20%", theme:"반도체",  returnVal:"-12.4%",  up:false },
      { rank:10,name:"Tesla",       code:"TSLA",  price:"$177.90", change:"-2.88%", theme:"전기차",  returnVal:"-28.7%",  up:false },
    ],
    monthReturn: [
      { rank:1, name:"Super Micro", code:"SMCI",  price:"$87.30",  change:"+11.20%",theme:"AI서버",  returnVal:"+52.3%",  up:true  },
      { rank:2, name:"Palantir",    code:"PLTR",  price:"$24.80",  change:"+8.45%", theme:"AI·방산", returnVal:"+34.8%",  up:true  },
      { rank:3, name:"NVIDIA",      code:"NVDA",  price:"$875.40", change:"+6.12%", theme:"AI칩",    returnVal:"+22.1%",  up:true  },
      { rank:4, name:"Meta",        code:"META",  price:"$502.30", change:"+3.21%", theme:"AI·소셜", returnVal:"+14.7%",  up:true  },
      { rank:5, name:"Alphabet",    code:"GOOGL", price:"$171.95", change:"+2.05%", theme:"AI검색",  returnVal:"+9.3%",   up:true  },
      { rank:6, name:"Apple",       code:"AAPL",  price:"$213.07", change:"+1.44%", theme:"빅테크",  returnVal:"+6.8%",   up:true  },
      { rank:7, name:"Amazon",      code:"AMZN",  price:"$188.40", change:"+1.83%", theme:"이커머스",returnVal:"+4.2%",   up:true  },
      { rank:8, name:"Microsoft",   code:"MSFT",  price:"$415.20", change:"+0.97%", theme:"클라우드",returnVal:"+2.1%",   up:true  },
      { rank:9, name:"AMD",         code:"AMD",   price:"$162.70", change:"-1.20%", theme:"반도체",  returnVal:"-5.4%",   up:false },
      { rank:10,name:"Tesla",       code:"TSLA",  price:"$177.90", change:"-2.88%", theme:"전기차",  returnVal:"-14.2%",  up:false },
    ],
    pension: [
      { rank:1,  name:"SCHD",        code:"SCHD",  price:"$28.40",  change:"+0.53%", theme:"ETF·배당",   pensionBuyers:98400,  up:true  },
      { rank:2,  name:"VOO",         code:"VOO",   price:"$512.30", change:"+0.79%", theme:"ETF·S&P500", pensionBuyers:87200,  up:true  },
      { rank:3,  name:"QQQ",         code:"QQQ",   price:"$480.15", change:"+1.02%", theme:"ETF·나스닥", pensionBuyers:76500,  up:true  },
      { rank:4,  name:"JEPI",        code:"JEPI",  price:"$57.80",  change:"+0.31%", theme:"ETF·커버드콜",pensionBuyers:64300, up:true  },
      { rank:5,  name:"NVDA",        code:"NVDA",  price:"$875.40", change:"+6.12%", theme:"AI칩",       pensionBuyers:58700,  up:true  },
      { rank:6,  name:"VTI",         code:"VTI",   price:"$268.90", change:"+0.67%", theme:"ETF·전체시장",pensionBuyers:51200, up:true  },
      { rank:7,  name:"TIGER 미국배당다우존스", code:"458730", price:"13,240", change:"+0.48%", theme:"ETF·배당", pensionBuyers:44600, up:true },
      { rank:8,  name:"TLT",         code:"TLT",   price:"$88.20",  change:"-0.41%", theme:"ETF·채권",   pensionBuyers:38900,  up:false },
      { rank:9,  name:"MSFT",        code:"MSFT",  price:"$415.20", change:"+0.97%", theme:"클라우드",   pensionBuyers:32100,  up:true  },
      { rank:10, name:"AAPL",        code:"AAPL",  price:"$213.07", change:"+1.44%", theme:"빅테크",     pensionBuyers:28400,  up:true  },
    ],
  },
};

const CATEGORIES = [
  { id:"aiPick",      label:"✨ 종합 Pick", short:"AI 종합 Pick", desc:"4개 카테고리 종합 분석 · AI 선정" },
  { id:"hot",         label:"🔥 인기",      short:"인기 종목",    desc:"Reddit·종토방·X 언급량 기준" },
  { id:"volume",      label:"💰 거래대금",  short:"거래대금",     desc:"오늘 기준 거래대금 순위" },
  { id:"monthReturn", label:"🗓 이달 수익", short:"이달 수익률",  desc:"이번 달 기준 수익률" },
  { id:"yearReturn",  label:"📅 올해 수익", short:"올해 수익률",  desc:"2026년 연초 대비 수익률" },
  { id:"pension",     label:"🏦 연금계좌",  short:"연금계좌 인기", desc:"IRP·퇴직연금·개인연금 계좌 순매수 기준" },
];

const HOT_KEYWORDS = ["HBM 수혜주 급등", "NVDA 사상최고가", "원전 르네상스", "Palantir AI 계약", "코스피 반등"];

// ── SUB COMPONENTS ──────────────────────────────────────────────────────────

function RankBadge({ rank }) {
  const bg = rank === 1 ? "#F59E0B" : rank === 2 ? "#94A3B8" : rank === 3 ? "#B45309" : "#F1F5F9";
  const color = rank <= 3 ? "#fff" : "#64748B";
  return (
      <span style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        width:26, height:26, borderRadius:6, background:bg, color,
        fontSize:12, fontWeight:800, flexShrink:0, fontFamily:"monospace",
      }}>{rank}</span>
  );
}

function MentionBar({ value, max, accent }) {
  const pct = Math.round((value / max) * 100);
  return (
      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
        <div style={{ flex:1, height:3, background:"#F1F5F9", borderRadius:99, overflow:"hidden" }}>
          <div style={{ width:`${pct}%`, height:"100%", background:accent, borderRadius:99, transition:"width 0.8s ease" }} />
        </div>
        <span style={{ fontSize:10, color:"#94A3B8", fontFamily:"monospace", flexShrink:0 }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      </div>
  );
}

function ReturnPill({ value, up }) {
  return (
      <span style={{
        display:"inline-block", padding:"2px 8px", borderRadius:99,
        background: up ? "#ECFDF5" : "#FEF2F2",
        color: up ? "#059669" : "#EF4444",
        fontSize:13, fontWeight:800, fontFamily:"monospace",
      }}>{value}</span>
  );
}

function StockCard({ stock, catId, maxVal, onClick, selected, accent }) {
  const sub = catId === "volume"
      ? stock.volume
      : catId === "yearReturn" || catId === "monthReturn"
          ? null
          : stock.mention;

  return (
      <div onClick={() => onClick(stock)} style={{
        display:"flex", alignItems:"center", gap:12, padding:"14px 16px",
        background: selected ? "#F0F9FF" : "#fff",
        borderBottom:"1px solid #F8FAFC", cursor:"pointer", transition:"background 0.15s",
        borderLeft: selected ? `3px solid ${accent}` : "3px solid transparent",
      }}>
        <RankBadge rank={stock.rank} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
            <span style={{ fontSize:15, fontWeight:700, color:"#0F172A" }}>{stock.name}</span>
            <span style={{ fontSize:10, fontWeight:600, padding:"2px 6px", borderRadius:99, background:"#F5F3FF", color:"#7C3AED" }}>
            {stock.theme}
          </span>
          </div>
          {catId === "hot" && (
              <MentionBar value={stock.mention} max={maxVal} accent={accent} />
          )}
          {catId === "volume" && (
              <div style={{ fontSize:11, color:"#94A3B8", marginTop:3, fontFamily:"monospace" }}>{stock.volume}</div>
          )}
          {(catId === "yearReturn" || catId === "monthReturn") && (
              <div style={{ marginTop:4 }}>
                <ReturnPill value={stock.returnVal} up={stock.up} />
              </div>
          )}
          {catId === "pension" && (
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                <span style={{ fontSize:10, color:"#fff", background:"#8B5CF6", padding:"1px 7px", borderRadius:99, fontWeight:700 }}>연금</span>
                <span style={{ fontSize:11, color:"#8B5CF6", fontWeight:700, fontFamily:"monospace" }}>
              {stock.pensionBuyers?.toLocaleString()}명 보유
            </span>
              </div>
          )}
          {catId === "aiPick" && (
              <div style={{ marginTop:4, display:"flex", alignItems:"flex-start", gap:4 }}>
                <span style={{ fontSize:10, flexShrink:0, marginTop:1 }}>✨</span>
                <span style={{ fontSize:11, color:"#6366F1", lineHeight:1.5, fontWeight:500 }}>
              {stock.reason || `종합점수 ${stock.score}점`}
            </span>
              </div>
          )}
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#0F172A", fontFamily:"monospace" }}>{stock.price}</div>
          <div style={{ fontSize:12, fontWeight:700, color: stock.up ? "#10B981" : "#EF4444", fontFamily:"monospace" }}>
            {stock.change}
          </div>
        </div>
      </div>
  );
}

function DetailSheet({ stock, catId, onClose, accent }) {
  if (!stock) return null;
  const extraLabel = catId === "hot" ? "SNS 언급"
      : catId === "volume" ? "거래대금"
          : catId === "yearReturn" ? "올해 수익률"
              : catId === "monthReturn" ? "이달 수익률"
                  : catId === "pension" ? "연금 보유자"
                      : "종합 점수";
  const extraVal = catId === "hot" ? (stock.mention?.toLocaleString() + "회")
      : catId === "volume" ? stock.volume
          : catId === "aiPick" ? `${stock.score}점`
              : catId === "pension" ? (stock.pensionBuyers?.toLocaleString() + "명")
                  : stock.returnVal;

  return (
      <div style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:430,
        background:"#fff", borderRadius:"20px 20px 0 0",
        boxShadow:"0 -8px 40px rgba(0,0,0,0.12)",
        padding:"20px 20px 44px", zIndex:100,
        animation:"slideUp 0.25s ease",
      }}>
        <div style={{ width:40, height:4, background:"#E2E8F0", borderRadius:99, margin:"0 auto 20px" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800, color:"#0F172A" }}>{stock.name}</div>
            <div style={{ fontSize:13, color:"#94A3B8", marginTop:2 }}>{stock.code} · {stock.theme}</div>
          </div>
          <button onClick={onClose} style={{ background:"#F1F5F9", border:"none", borderRadius:99, width:32, height:32, cursor:"pointer", fontSize:16, color:"#64748B" }}>✕</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
          {[
            { label:"현재가",    value:stock.price,  color:"#0F172A" },
            { label:"등락률",    value:stock.change, color: stock.up ? "#10B981" : "#EF4444" },
            { label:extraLabel,  value:extraVal,     color:accent },
            { label:"인기 순위", value:`${stock.rank}위`, color:"#F59E0B" },
          ].map(item => (
              <div key={item.label} style={{ background:"#F8FAFC", borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:"#94A3B8", marginBottom:4, fontWeight:600 }}>{item.label}</div>
                <div style={{ fontSize:16, fontWeight:800, color:item.color, fontFamily:"monospace" }}>{item.value}</div>
              </div>
          ))}
        </div>
        <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:12, padding:"12px 14px", fontSize:12, color:"#92400E", lineHeight:1.6 }}>
          ⚠️ 이 정보는 투자 참고용입니다. 투자 결정은 본인 책임 하에 신중히 판단하세요.
        </div>
      </div>
  );
}

// ── SCORING ─────────────────────────────────────────────────────────────────
// 각 카테고리 순위를 점수화 (1위=10점 … 10위=1점), 4개 합산 → 종합 점수
function computeScores(market) {
  const scoreMap = {};
  const add = (list, key) => {
    list.forEach(s => {
      const id = s.name;
      if (!scoreMap[id]) scoreMap[id] = { ...s, score:0, ranks:{} };
      scoreMap[id].score += (11 - s.rank);
      scoreMap[id].ranks[key] = s.rank;
    });
  };
  add(DATA[market].hot,         "hot");
  add(DATA[market].volume,      "volume");
  add(DATA[market].yearReturn,  "yearReturn");
  add(DATA[market].monthReturn, "monthReturn");
  return Object.values(scoreMap)
      .sort((a,b) => b.score - a.score)
      .slice(0,10)
      .map((s,i) => ({ ...s, rank: i+1 }));
}

// ── BAR CHART ────────────────────────────────────────────────────────────────
function BarChart({ stocks, catId, accent }) {
  const getVal = (s) => {
    if (catId === "hot")     return s.mention;
    if (catId === "pension") return s.pensionBuyers;
    if (catId === "volume") {
      // "4조 2,100억" → 숫자로 파싱
      const raw = s.volume || "";
      const jo  = raw.match(/(\d[\d,]*)조/);
      const eok = raw.match(/(\d[\d,]*)억/);
      const b   = raw.match(/\$(\d+\.?\d*)B/);
      if (b)   return parseFloat(b[1]);
      let v = 0;
      if (jo)  v += parseFloat(jo[1].replace(/,/g,"")) * 10000;
      if (eok) v += parseFloat(eok[1].replace(/,/g,""));
      return v;
    }
    // yearReturn / monthReturn: "+12.3%" → 12.3
    const r = s.returnVal || "0%";
    return parseFloat(r.replace(/[^-\d.]/g,"")) || 0;
  };

  const vals    = stocks.map(getVal);
  const absVals = vals.map(Math.abs);
  const maxAbs  = Math.max(...absVals) || 1;

  const labelOf = (s) => {
    if (catId === "hot")         return s.mention.toLocaleString();
    if (catId === "volume")      return s.volume;
    if (catId === "pension")     return (s.pensionBuyers?.toLocaleString() || "0") + "명";
    return s.returnVal;
  };

  const isReturn = catId === "yearReturn" || catId === "monthReturn";

  return (
      <div style={{ background:"#fff", borderRadius:"16px 16px 0 0", padding:"16px 16px 80px" }}>
        {stocks.map((stock, i) => {
          const val    = vals[i];
          const absVal = absVals[i];
          const pct    = (absVal / maxAbs) * 100;
          const isNeg  = val < 0;
          const barColor = isReturn
              ? (isNeg ? "#EF4444" : "#10B981")
              : accent;

          return (
              <div key={`bar-${i}-${stock.rank}`}
                   className="stock-item"
                   style={{ marginBottom:14, animationDelay:`${i * 40}ms` }}
              >
                {/* 종목명 + 값 */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <RankBadge rank={stock.rank} />
                    <span style={{ fontSize:13, fontWeight:700, color:"#0F172A" }}>{stock.name}</span>
                    <span style={{ fontSize:10, color:"#7C3AED", background:"#F5F3FF", padding:"1px 5px", borderRadius:99, fontWeight:600 }}>
                  {stock.theme}
                </span>
                  </div>
                  <span style={{
                    fontSize:12, fontWeight:800, fontFamily:"monospace",
                    color: isReturn ? (isNeg ? "#EF4444" : "#10B981") : accent,
                  }}>{labelOf(stock)}</span>
                </div>

                {/* 바 */}
                <div style={{ height:28, background:"#F1F5F9", borderRadius:8, overflow:"hidden", position:"relative" }}>
                  <div style={{
                    position:"absolute", top:0, bottom:0, left:0,
                    width:`${pct}%`,
                    background: `linear-gradient(90deg, ${barColor}CC, ${barColor})`,
                    borderRadius:8,
                    transition:"width 0.7s cubic-bezier(.4,0,.2,1)",
                    display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:8,
                    minWidth: pct > 15 ? "auto" : 0,
                  }}>
                    {pct > 25 && (
                        <span style={{ fontSize:11, fontWeight:700, color:"#fff", fontFamily:"monospace" }}>
                    {stock.change}
                  </span>
                    )}
                  </div>
                  {pct <= 25 && (
                      <span style={{
                        position:"absolute", left: `calc(${pct}% + 8px)`, top:"50%", transform:"translateY(-50%)",
                        fontSize:11, fontWeight:700, color:"#64748B", fontFamily:"monospace",
                      }}>{stock.change}</span>
                  )}
                </div>
              </div>
          );
        })}
      </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────


// ── MAIN ────────────────────────────────────────────────────────────────────

export default function TrendPick() {
  const [marketTab,      setMarketTab]      = useState("domestic");
  const [catId,          setCatId]          = useState("aiPick");
  const [selectedStock,  setSelectedStock]  = useState(null);
  const [lastUpdated,    setLastUpdated]    = useState("");
  const [tickerIdx,      setTickerIdx]      = useState(0);
  const [aiPicks,        setAiPicks]        = useState({domestic:null, overseas:null});
  const [aiLoading,      setAiLoading]      = useState(false);
  const [aiAnalysis,     setAiAnalysis]     = useState({domestic:"", overseas:""});
  const [isSubscribed,   setIsSubscribed]   = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState(null);
  const [showModal,      setShowModal]      = useState(null);
  const [viewMode,       setViewMode]       = useState("list");
  const [showAdPopup,    setShowAdPopup]    = useState(false);
  const [activeTab,      setActiveTab]      = useState("home");
  const [portfolioInputs,setPortfolioInputs]= useState(Array(10).fill(""));
  const [signals,        setSignals]        = useState(null);
  const [signalLoading,  setSignalLoading]  = useState(false);

  const isDomestic = marketTab === "domestic";
  const accent     = isDomestic ? "#3B82F6" : "#8B5CF6";
  const isAiPick   = catId === "aiPick";
  const scored     = computeScores(marketTab);
  const stocks     = isAiPick ? (aiPicks[marketTab] || scored) : DATA[marketTab][catId];
  const cat        = CATEGORIES.find(c => c.id === catId);
  const maxVal     = (catId === "hot" ? stocks[0]?.mention : catId === "pension" ? stocks[0]?.pensionBuyers : 1) || 1;

  useEffect(() => {
    const now = new Date();
    setLastUpdated(`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")} 업데이트`);
    fetchAiPick("domestic");
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % HOT_KEYWORDS.length), 2500);
    return () => clearInterval(t);
  }, []);

  const fetchAiPick = async (market) => {
    if (aiPicks[market]) return;
    setAiLoading(true);
    const sc = computeScores(market);
    const prompt = `당신은 주식 데이터 분석가입니다. 아래는 ${market === "domestic" ? "국내" : "해외"} 주식의 4개 카테고리 종합 점수 TOP 10입니다.\n\n${sc.map(s => `${s.rank}위 ${s.name}(${s.code}) 종합점수:${s.score}점 | 인기:${s.ranks.hot||"-"}위 거래대금:${s.ranks.volume||"-"}위 올해수익:${s.ranks.yearReturn||"-"}위 이달수익:${s.ranks.monthReturn||"-"}위`).join("\n")}\n\n위 데이터를 바탕으로:\n1. 최종 TOP 10 순위를 확정하고\n2. 각 종목에 한 줄 투자 포인트를 작성하고\n3. 전체 시장에 대한 2-3줄 종합 의견을 작성해주세요.\n\n반드시 아래 JSON 형식으로만 응답하세요 (마크다운 불가):\n{"picks":[{"rank":1,"name":"종목명","code":"코드","reason":"한줄 투자포인트","score":점수}],"summary":"전체 시장 종합 의견 2-3줄"}`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user", content:prompt}] }) });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      const enriched = parsed.picks.map(p => { const orig = sc.find(s => s.name === p.name) || {}; return { ...orig, ...p, rank:p.rank }; });
      setAiPicks(prev => ({ ...prev, [market]:enriched }));
      setAiAnalysis(prev => ({ ...prev, [market]:parsed.summary }));
    } catch(e) {
      setAiPicks(prev => ({ ...prev, [market]:sc }));
      setAiAnalysis(prev => ({ ...prev, [market]:"데이터 기반 종합 점수로 순위를 산정했습니다." }));
    }
    setAiLoading(false);
  };

  const fetchSignals = async () => {
    const tickers = portfolioInputs.filter(t => t.trim() !== "");
    if (tickers.length === 0) return;
    setSignalLoading(true);
    setSignals(null);
    const maxSlots = subscribedPlan === 3 ? 10 : 3;
    const limited  = tickers.slice(0, maxSlots);
    const prompt = `당신은 주식 모멘텀 분석가입니다. 아래 종목들의 현재 모멘텀을 분석해주세요.\n\n종목 목록: ${limited.join(", ")}\n\n각 종목에 대해 현재 시장 상황, 기술적 지표, 투자 심리를 종합하여 분석하세요.\n\n반드시 아래 JSON 형식으로만 응답하세요 (마크다운 불가):\n{"signals":[{"ticker":"종목명","signal":"매수","momentum":"강함","reason":"한줄 근거","target":"단기 목표가 또는 -"}],"market_comment":"전체 시장 한줄 코멘트"}\n\nsignal 값은 반드시 "매수", "보유", "매도" 중 하나.\nmomentum 값은 반드시 "강함", "보통", "약함" 중 하나.`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user", content:prompt}] }) });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setSignals(parsed);
    } catch(e) {
      setSignals({ error:true });
    }
    setSignalLoading(false);
  };

  const handleMarketTab = (tab) => { setMarketTab(tab); setSelectedStock(null); setViewMode("list"); if (catId === "aiPick") fetchAiPick(tab); };
  const handleCat = (id) => {
    setCatId(id); setSelectedStock(null); setViewMode("list");
    if (id === "aiPick") fetchAiPick(marketTab);
    if (!isSubscribed && Math.random() < 0.33) setTimeout(() => setShowAdPopup(true), 300);
  };

  const maxSlots  = subscribedPlan === 3 ? 10 : 3;
  const sigColors = { "매수":"#10B981", "보유":"#F59E0B", "매도":"#EF4444" };
  const momColors = { "강함":"#10B981", "보통":"#64748B", "약함":"#EF4444" };
  const momBg     = { "강함":"#ECFDF5", "보통":"#F8FAFC",  "약함":"#FEF2F2" };

  // ── 구독 플랜 데이터 ──
  const PLANS = [
    { id:1, badge:"BASIC",       badgeColor:"#3B82F6", title:"광고제거 + AI 탑픽 TOP 3",                    price:"월 2,900원",  desc:"부담 없이 시작하는 입문 플랜",               items:["✅ 광고 완전 제거","✅ AI 탑픽 종목 TOP 3 매일 추천","❌ 보유종목 시그널 없음","❌ 주간 리포트 없음"],                                              bg:"#fff",                                      border:"#E2E8F0", btnBg:"#3B82F6",  btnLabel:"베이직 시작하기 →" },
    { id:2, badge:"STANDARD ⭐", badgeColor:"#10B981", title:"탑픽 + 보유종목 3개 시그널",                  price:"월 9,900원",  desc:"투자 판단이 필요한 직장인에게 딱",           items:["✅ 광고 완전 제거","✅ AI 탑픽 종목 TOP 3 매일 추천","✅ 보유종목 3개 매수/보유/매도 시그널","❌ 주간 리포트 없음"],                              bg:"linear-gradient(135deg,#F0FDF4,#DCFCE7)", border:"#10B981", btnBg:"#10B981",  btnLabel:"스탠다드 시작하기 →", popular:true },
    { id:3, badge:"PRO 🔥",      badgeColor:"#F59E0B", title:"탑픽 TOP 10 + 보유종목 10개 + 주간 리포트",  price:"월 29,900원", desc:"진지하게 투자하는 분들을 위한 풀패키지",     items:["✅ 광고 완전 제거","✅ AI 탑픽 종목 TOP 10 매일 추천","✅ 보유종목 10개 매수/보유/매도 시그널","✅ 매주 월요일 AI 주간 시황 리포트"],             bg:"linear-gradient(135deg,#FFFBEB,#FEF3C7)", border:"#F59E0B", btnBg:"#F59E0B",  btnLabel:"PRO 시작하기 →" },
  ];

  // ── 공통 UI 조각 ──
  const PlanCards = () => (
      <>
        {PLANS.map(plan => (
            <div key={plan.id} style={{ background:plan.bg, border:`2px solid ${plan.border}`, borderRadius:16, padding:"16px 16px 14px", marginBottom:12, position:"relative" }}>
              {plan.popular && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#10B981", color:"#fff", fontSize:10, fontWeight:800, padding:"3px 14px", borderRadius:99, whiteSpace:"nowrap" }}>가장 인기 있는 플랜</div>}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <div>
                  <span style={{ fontSize:10, fontWeight:800, color:plan.badgeColor, background:"#F8FAFC", padding:"2px 8px", borderRadius:99 }}>{plan.badge}</span>
                  <div style={{ fontSize:14, fontWeight:800, color:"#0F172A", marginTop:6 }}>{plan.title}</div>
                </div>
                <div style={{ fontSize:16, fontWeight:900, color:"#0F172A", flexShrink:0, marginLeft:8 }}>{plan.price}</div>
              </div>
              <div style={{ fontSize:11, color:"#64748B", marginBottom:10 }}>{plan.desc}</div>
              {plan.items.map(item => <div key={item} style={{ fontSize:12, color:"#475569", marginBottom:5, fontWeight:500 }}>{item}</div>)}
              <button onClick={() => setShowModal(plan.id)} style={{ width:"100%", marginTop:12, padding:"11px 0", background:plan.btnBg, color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer" }}>{plan.btnLabel}</button>
            </div>
        ))}
        <div style={{ textAlign:"center", fontSize:11, color:"#94A3B8", marginTop:4 }}>7일 무료 체험 · 언제든지 해지 가능</div>
      </>
  );

  // ── 보유종목 화면 ──
  const PortfolioScreen = () => (
      <div style={{ minHeight:"100vh", background:"#F8FAFC", paddingBottom:80 }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #F1F5F9", padding:"20px 16px 16px", position:"sticky", top:0, zIndex:50 }}>
          <div style={{ fontSize:20, fontWeight:900, color:"#0F172A", marginBottom:2 }}>📊 보유종목 시그널</div>
          <div style={{ fontSize:12, color:"#94A3B8" }}>종목명 또는 티커 입력 후 분석</div>
        </div>
        <div style={{ padding:"16px" }}>
          {!isSubscribed ? (
              /* 비구독자 잠금 */
              <div style={{ background:"#fff", borderRadius:16, padding:24, textAlign:"center", border:"2px dashed #E2E8F0", marginBottom:16 }}>
                <div style={{ fontSize:36, marginBottom:12 }}>🔒</div>
                <div style={{ fontSize:16, fontWeight:800, color:"#0F172A", marginBottom:8 }}>구독자 전용 기능</div>
                <div style={{ fontSize:13, color:"#64748B", lineHeight:1.7, marginBottom:20 }}>스탠다드 이상 구독 시<br/>보유종목 모멘텀 시그널을 확인할 수 있어요</div>
                <button onClick={() => setShowModal(2)} style={{ background:"linear-gradient(90deg,#10B981,#059669)", color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontSize:14, fontWeight:800, cursor:"pointer" }}>스탠다드 구독하기 →</button>
              </div>
          ) : (
              <>
                {/* 플랜 안내 배너 */}
                <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:13 }}>{subscribedPlan === 3 ? "🔥" : "⭐"}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:"#4338CA" }}>
                {subscribedPlan === 3 ? "PRO — 최대 10종목 분석 가능" : "STANDARD — 최대 3종목 분석 가능"}
              </span>
                  {subscribedPlan !== 3 && (
                      <button onClick={() => setShowModal(3)} style={{ marginLeft:"auto", fontSize:10, fontWeight:700, color:"#6366F1", background:"#fff", border:"1px solid #C7D2FE", borderRadius:99, padding:"3px 10px", cursor:"pointer", flexShrink:0 }}>PRO 업그레이드</button>
                  )}
                </div>

                {/* 종목 입력 그리드 */}
                <div style={{ background:"#fff", borderRadius:16, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#0F172A", marginBottom:12 }}>
                    종목 입력 ({portfolioInputs.filter(t=>t.trim()).length}/{maxSlots})
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {Array.from({length:maxSlots}).map((_,i) => (
                        <input key={i}
                               value={portfolioInputs[i] || ""}
                               onChange={e => { const a=[...portfolioInputs]; a[i]=e.target.value; setPortfolioInputs(a); }}
                               placeholder={`종목 ${i+1}`}
                               style={{ border:"1.5px solid #E2E8F0", borderRadius:8, padding:"9px 12px", fontSize:13, fontWeight:600, color:"#0F172A", outline:"none", background:"#F8FAFC", fontFamily:"monospace" }}
                        />
                    ))}
                  </div>
                  <button onClick={fetchSignals} disabled={signalLoading || portfolioInputs.filter(t=>t.trim()).length===0}
                          style={{ width:"100%", marginTop:14, padding:"13px 0", background:signalLoading?"#94A3B8":"linear-gradient(90deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:800, cursor:signalLoading?"not-allowed":"pointer" }}>
                    {signalLoading ? "⏳ AI 분석 중..." : "✨ 모멘텀 분석하기"}
                  </button>
                </div>

                {/* 로딩 */}
                {signalLoading && (
                    <div style={{ background:"#fff", borderRadius:16, padding:24, textAlign:"center" }}>
                      <div style={{ width:36, height:36, borderRadius:"50%", border:"4px solid #C7D2FE", borderTopColor:"#6366F1", animation:"spin 0.8s linear infinite", margin:"0 auto 14px" }} />
                      <div style={{ fontSize:14, fontWeight:700, color:"#4338CA" }}>AI가 종목을 분석하고 있어요</div>
                      <div style={{ fontSize:11, color:"#94A3B8", marginTop:4 }}>잠시만 기다려주세요</div>
                    </div>
                )}

                {/* 시그널 결과 */}
                {signals && !signals.error && (
                    <>
                      {signals.market_comment && (
                          <div style={{ background:"linear-gradient(135deg,#0F172A,#1E1B4B)", borderRadius:12, padding:"12px 16px", marginBottom:12, display:"flex", gap:10, alignItems:"flex-start" }}>
                            <span style={{ fontSize:16, flexShrink:0 }}>🤖</span>
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, color:"#60A5FA", marginBottom:4 }}>오늘의 시장 코멘트</div>
                              <div style={{ fontSize:12, color:"#CBD5E1", lineHeight:1.6 }}>{signals.market_comment}</div>
                            </div>
                          </div>
                      )}
                      {signals.signals?.map((s,i) => (
                          <div key={i} className="stock-item" style={{ background:"#fff", borderRadius:14, padding:"14px 16px", marginBottom:10, borderLeft:`4px solid ${sigColors[s.signal]||"#94A3B8"}`, animationDelay:`${i*60}ms` }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                              <span style={{ fontSize:16, fontWeight:900, color:"#0F172A" }}>{s.ticker}</span>
                              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                                <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:99, background:momBg[s.momentum]||"#F8FAFC", color:momColors[s.momentum]||"#64748B" }}>모멘텀 {s.momentum}</span>
                                <span style={{ fontSize:13, fontWeight:900, padding:"4px 12px", borderRadius:99, background:sigColors[s.signal]||"#94A3B8", color:"#fff" }}>{s.signal}</span>
                              </div>
                            </div>
                            <div style={{ fontSize:12, color:"#64748B", lineHeight:1.6 }}>{s.reason}</div>
                            {s.target && s.target !== "-" && (
                                <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
                                  <span style={{ fontSize:10, color:"#94A3B8", fontWeight:600 }}>단기 목표가</span>
                                  <span style={{ fontSize:13, fontWeight:800, color:"#6366F1", fontFamily:"monospace" }}>{s.target}</span>
                                </div>
                            )}
                          </div>
                      ))}
                      <button onClick={fetchSignals} style={{ width:"100%", marginTop:4, padding:"12px 0", background:"#F1F5F9", color:"#64748B", border:"none", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer" }}>🔄 다시 분석하기</button>
                    </>
                )}
                {signals?.error && (
                    <div style={{ background:"#FEF2F2", borderRadius:12, padding:16, textAlign:"center", color:"#EF4444", fontSize:13, fontWeight:600 }}>분석 중 오류가 발생했어요. 다시 시도해주세요.</div>
                )}
                <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:12, padding:"12px 14px", marginTop:16, fontSize:11, color:"#92400E", lineHeight:1.6 }}>
                  ⚠️ AI 분석 결과는 투자 참고용입니다. 실제 투자 결정은 본인 판단 하에 신중히 하세요.
                </div>
              </>
          )}
          {/* 비구독자에게도 플랜 안내 */}
          {!isSubscribed && (
              <div style={{ marginTop:8 }}>
                <div style={{ background:"linear-gradient(135deg,#0F172A,#1E1B4B)", borderRadius:16, padding:"18px 16px", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <span style={{ fontSize:18 }}>✨</span>
                    <span style={{ fontSize:15, fontWeight:900, color:"#fff" }}>구독하면 이런 게 달라져요</span>
                  </div>
                  {[{ icon:"🚫", text:"광고 없이 쾌적하게 — 모든 플랜 공통" },{ icon:"🤖", text:"AI가 매일 엄선한 탑픽 종목 추천" },{ icon:"📊", text:"내 보유종목 매수/보유/매도 시그널" },{ icon:"📋", text:"매주 월요일 AI 주간 시황 리포트" }].map(item => (
                      <div key={item.text} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <span style={{ fontSize:15 }}>{item.icon}</span>
                        <span style={{ fontSize:13, color:"#CBD5E1", fontWeight:500 }}>{item.text}</span>
                      </div>
                  ))}
                </div>
                <PlanCards />
              </div>
          )}
        </div>
      </div>
  );

  // ── 홈 화면 렌더링 헬퍼 ──
  const renderStockList = () => (
      <div style={{ background:"#fff", borderRadius:"16px 16px 0 0", paddingBottom:80 }}>
        {stocks.map((stock,i) => (
            <div key={`${marketTab}-${catId}-${stock.rank}-${i}`} className="stock-item" style={{ animationDelay:`${i*35}ms` }}>
              <StockCard stock={stock} catId={catId} maxVal={maxVal} onClick={setSelectedStock}
                         selected={selectedStock?.code===stock.code && selectedStock?.rank===stock.rank} accent={accent} />
            </div>
        ))}
      </div>
  );

  return (
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#F8FAFC", position:"relative" }}>
        <style>{`
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        body { margin:0; background:#F8FAFC; }
        ::-webkit-scrollbar { display:none; }
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker  { 0%,100%{opacity:0;transform:translateY(8px)} 10%,85%{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        .stock-item { animation:fadeIn 0.28s ease both; }
        input:focus { border-color:#6366F1 !important; background:#fff !important; box-shadow:0 0 0 3px #EEF2FF; }
      `}</style>

        {/* ── 탭 콘텐츠 ── */}
        {activeTab === "portfolio" ? <PortfolioScreen /> : (

            // ── 홈 탭 ──
            <div style={{ paddingBottom:70 }}>

              {/* Sticky Header */}
              <div style={{ background:"#fff", borderBottom:"1px solid #F1F5F9", padding:"16px 16px 0", position:"sticky", top:0, zIndex:50 }}>
                {/* Logo row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.5px" }}>TrendPick</span>
                      <span style={{ fontSize:10, fontWeight:700, background:"#EFF6FF", color:"#3B82F6", padding:"2px 7px", borderRadius:99 }}>BETA</span>
                    </div>
                    <div style={{ fontSize:11, color:"#94A3B8", marginTop:1 }}>지금 가장 핫한 순위 한눈에</div>
                  </div>
                  <div style={{ background:"#FEF2F2", borderRadius:10, padding:"6px 10px", fontSize:11, color:"#EF4444", fontWeight:700 }}>🔴 LIVE</div>
                </div>
                {/* HOT ticker */}
                <div style={{ background:"#0F172A", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8, marginBottom:12, overflow:"hidden" }}>
                  <span style={{ fontSize:10, fontWeight:800, color:"#F59E0B", flexShrink:0 }}>🔥 HOT</span>
                  <div style={{ flex:1, overflow:"hidden", height:18 }}>
                    <span key={tickerIdx} style={{ display:"block", fontSize:12, fontWeight:700, color:"#fff", animation:"ticker 2.5s ease" }}>#{HOT_KEYWORDS[tickerIdx]}</span>
                  </div>
                  <span style={{ fontSize:10, color:"#475569", flexShrink:0 }}>{lastUpdated}</span>
                </div>
                {/* Market tab */}
                <div style={{ display:"flex", background:"#F1F5F9", borderRadius:12, padding:4, marginBottom:12, gap:4 }}>
                  {[{id:"domestic",label:"🇰🇷 국내주식",color:"#3B82F6"},{id:"overseas",label:"🌐 해외주식",color:"#8B5CF6"}].map(tab => (
                      <button key={tab.id} onClick={() => handleMarketTab(tab.id)} style={{ flex:1, padding:"9px 0", border:"none", cursor:"pointer", borderRadius:9, fontSize:13, fontWeight:700, transition:"all 0.2s", background:marketTab===tab.id?"#fff":"transparent", color:marketTab===tab.id?tab.color:"#94A3B8", boxShadow:marketTab===tab.id?"0 1px 6px rgba(0,0,0,0.08)":"none" }}>{tab.label}</button>
                  ))}
                </div>
                {/* Sliding accent bar */}
                <div style={{ height:3, background:"#F1F5F9", borderRadius:99, overflow:"hidden", marginBottom:12 }}>
                  <div style={{ height:"100%", width:"50%", background:accent, borderRadius:99, transform:isDomestic?"translateX(0)":"translateX(100%)", transition:"transform 0.3s ease, background 0.3s ease" }} />
                </div>
                {/* Category tabs */}
                <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:12 }}>
                  {CATEGORIES.map(c => (
                      <button key={c.id} onClick={() => handleCat(c.id)} style={{ flexShrink:0, padding:"7px 13px", borderRadius:99, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, transition:"all 0.15s", background:catId===c.id?accent:"#F1F5F9", color:catId===c.id?"#fff":"#64748B", boxShadow:catId===c.id?`0 2px 8px ${accent}44`:"none" }}>{c.label}</button>
                  ))}
                </div>
              </div>

              {/* Section header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 16px 8px" }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:"#0F172A" }}>{isDomestic?"🇰🇷":"🌐"} {cat.short} TOP 10</div>
                  <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>{cat.desc}</div>
                </div>
                {!isAiPick && (
                    <div style={{ display:"flex", background:"#F1F5F9", borderRadius:8, padding:3, gap:2 }}>
                      {[{mode:"list",icon:"☰"},{mode:"chart",icon:"▊"}].map(btn => (
                          <button key={btn.mode} onClick={() => setViewMode(btn.mode)} style={{ width:32, height:28, border:"none", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:700, transition:"all 0.15s", background:viewMode===btn.mode?"#fff":"transparent", color:viewMode===btn.mode?accent:"#94A3B8", boxShadow:viewMode===btn.mode?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>{btn.icon}</button>
                      ))}
                    </div>
                )}
              </div>

              {/* AI Pick — 비구독자 페이월 */}
              {isAiPick && !isSubscribed && (
                  <div style={{ padding:"0 16px 100px" }}>
                    <div style={{ position:"relative", marginBottom:16 }}>
                      {[1,2,3].map(n => (
                          <div key={n} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#fff", borderBottom:"1px solid #F8FAFC", borderLeft:"3px solid #E0E7FF", filter:"blur(3.5px)", userSelect:"none" }}>
                            <span style={{ width:26, height:26, borderRadius:6, background:n===1?"#F59E0B":n===2?"#94A3B8":"#B45309", display:"inline-flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:800, flexShrink:0 }}>{n}</span>
                            <div style={{ flex:1 }}>
                              <div style={{ height:14, background:"#E2E8F0", borderRadius:6, width:n===1?"60%":n===2?"50%":"55%", marginBottom:6 }} />
                              <div style={{ height:10, background:"#F1F5F9", borderRadius:6, width:"80%" }} />
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ height:14, background:"#E2E8F0", borderRadius:6, width:60, marginBottom:4 }} />
                              <div style={{ height:12, background:"#DCFCE7", borderRadius:6, width:48 }} />
                            </div>
                          </div>
                      ))}
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(248,250,252,0) 0%, rgba(248,250,252,0.97) 60%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", paddingBottom:16 }}>
                        <div style={{ fontSize:32, marginBottom:6 }}>🔒</div>
                        <div style={{ fontSize:15, fontWeight:800, color:"#0F172A", marginBottom:4 }}>구독자 전용 콘텐츠</div>
                        <div style={{ fontSize:12, color:"#64748B", textAlign:"center", lineHeight:1.6 }}>4개 카테고리를 AI가 종합 분석한<br/>최종 Pick TOP 10을 확인하세요</div>
                      </div>
                    </div>
                    <div style={{ background:"linear-gradient(135deg,#0F172A,#1E1B4B)", borderRadius:16, padding:"18px 16px", marginBottom:16 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                        <span style={{ fontSize:18 }}>✨</span>
                        <span style={{ fontSize:15, fontWeight:900, color:"#fff" }}>구독하면 이런 게 달라져요</span>
                      </div>
                      {[{icon:"🚫",text:"광고 없이 쾌적하게 — 모든 플랜 공통"},{icon:"🤖",text:"AI가 매일 엄선한 탑픽 종목 추천"},{icon:"📊",text:"내 보유종목 매수/보유/매도 시그널"},{icon:"📋",text:"매주 월요일 AI 주간 시황 리포트"}].map(item => (
                          <div key={item.text} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                            <span style={{ fontSize:15 }}>{item.icon}</span>
                            <span style={{ fontSize:13, color:"#CBD5E1", fontWeight:500 }}>{item.text}</span>
                          </div>
                      ))}
                    </div>
                    <PlanCards />
                  </div>
              )}

              {/* AI Pick — 구독자 */}
              {isAiPick && isSubscribed && (
                  <>
                    <div style={{ margin:"0 16px 12px" }}>
                      {aiLoading ? (
                          <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:14, padding:"18px 16px", display:"flex", alignItems:"center", gap:12 }}>
                            <div style={{ fontSize:24 }}>🤖</div>
                            <div><div style={{ fontSize:13, fontWeight:800, color:"#4338CA" }}>AI 분석 중...</div><div style={{ fontSize:11, color:"#6366F1", marginTop:2 }}>4개 카테고리 데이터를 종합하고 있습니다</div></div>
                            <div style={{ marginLeft:"auto" }}><div style={{ width:20, height:20, borderRadius:"50%", border:"3px solid #C7D2FE", borderTopColor:"#6366F1", animation:"spin 0.8s linear infinite" }} /></div>
                          </div>
                      ) : aiAnalysis[marketTab] ? (
                          <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:14, padding:"14px 16px", borderLeft:"4px solid #6366F1" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                              <span style={{ fontSize:14 }}>🤖</span>
                              <span style={{ fontSize:12, fontWeight:800, color:"#4338CA" }}>AI 종합 분석</span>
                              <span style={{ fontSize:10, color:"#A5B4FC", marginLeft:"auto" }}>Claude 분석</span>
                            </div>
                            <div style={{ fontSize:12, color:"#3730A3", lineHeight:1.7 }}>{aiAnalysis[marketTab]}</div>
                          </div>
                      ) : null}
                    </div>
                    {renderStockList()}
                  </>
              )}

              {/* 일반 카테고리 */}
              {!isAiPick && (
                  viewMode === "chart"
                      ? <BarChart stocks={stocks} catId={catId} accent={accent} />
                      : renderStockList()
              )}

              {/* 광고 배너 (비구독자) */}
              {!isSubscribed && (
                  <div style={{ position:"fixed", bottom:56, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid #F1F5F9", padding:"10px 16px", zIndex:40 }}>
                    <div style={{ background:isDomestic?"linear-gradient(90deg,#EFF6FF,#EEF2FF)":"linear-gradient(90deg,#F5F3FF,#EDE9FE)", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                      <div>
                        <div style={{ fontSize:10, color:"#94A3B8", fontWeight:600 }}>광고</div>
                        <div style={{ fontSize:13, fontWeight:700, color:isDomestic?"#1E40AF":"#5B21B6" }}>{isDomestic?"📈 국내 증권계좌 개설 시 현금 3만원!":"🌏 해외주식 수수료 0원 이벤트!"}</div>
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, color:"#fff", background:accent, borderRadius:8, padding:"4px 10px" }}>바로가기</span>
                    </div>
                  </div>
              )}

              {/* 구독 확인 모달 */}
              {showModal && (
                  <div onClick={() => setShowModal(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:199, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                    <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"24px 20px 48px", width:"100%", maxWidth:430, animation:"slideUp 0.25s ease" }}>
                      <div style={{ width:40, height:4, background:"#E2E8F0", borderRadius:99, margin:"0 auto 20px" }} />
                      <div style={{ fontSize:20, fontWeight:900, color:"#0F172A", marginBottom:4 }}>
                        {showModal===1?"BASIC 구독":showModal===2?"⭐ STANDARD 구독":"🔥 PRO 구독"}
                      </div>
                      <div style={{ fontSize:13, color:"#64748B", marginBottom:20, lineHeight:1.6 }}>
                        {showModal===1?"광고 없이 AI 탑픽 TOP 3를 매일 확인하세요.":showModal===2?"AI 탑픽에 보유종목 시그널까지. 투자 판단이 쉬워집니다.":"탑픽 TOP 10 + 보유종목 10개 + 주간 리포트까지 풀패키지로."}
                      </div>
                      <div style={{ background:"#F8FAFC", borderRadius:12, padding:"14px 16px", marginBottom:8 }}>
                        <div style={{ fontSize:13, color:"#475569", marginBottom:4 }}>결제 금액</div>
                        <div style={{ fontSize:28, fontWeight:900, color:"#0F172A" }}>{showModal===1?"월 2,900원":showModal===2?"월 9,900원":"월 29,900원"}</div>
                      </div>
                      <div style={{ fontSize:11, color:"#10B981", fontWeight:700, textAlign:"center", marginBottom:20 }}>🎁 7일 무료 체험 · 언제든 해지 가능</div>
                      <button onClick={() => { setIsSubscribed(true); setSubscribedPlan(showModal); setShowModal(null); }} style={{ width:"100%", padding:"14px 0", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:800, color:"#fff", background:showModal===1?"linear-gradient(90deg,#3B82F6,#6366F1)":showModal===2?"linear-gradient(90deg,#10B981,#059669)":"linear-gradient(90deg,#F59E0B,#EF4444)" }}>
                        7일 무료로 시작하기 →
                      </button>
                      <button onClick={() => setShowModal(null)} style={{ width:"100%", marginTop:10, padding:"12px 0", border:"none", borderRadius:12, background:"#F1F5F9", color:"#64748B", fontSize:14, fontWeight:700, cursor:"pointer" }}>취소</button>
                    </div>
                  </div>
              )}

              {/* 광고 팝업 */}
              {showAdPopup && (
                  <div onClick={() => setShowAdPopup(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:199, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                    <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"20px 20px 44px", width:"100%", maxWidth:430, animation:"slideUp 0.25s ease" }}>
                      <div style={{ width:40, height:4, background:"#E2E8F0", borderRadius:99, margin:"0 auto 16px" }} />
                      <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A5F)", borderRadius:16, padding:"20px 18px", marginBottom:16, position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(59,130,246,0.15)" }} />
                        <div style={{ fontSize:11, fontWeight:700, color:"#60A5FA", marginBottom:6 }}>📢 광고</div>
                        <div style={{ fontSize:18, fontWeight:900, color:"#fff", marginBottom:6, lineHeight:1.4 }}>📈 지금 증권계좌 개설하면<br/>현금 3만원 지급!</div>
                        <div style={{ fontSize:12, color:"#94A3B8", marginBottom:16, lineHeight:1.6 }}>비대면 계좌개설 5분 완성<br/>수수료 무료 + 신규 혜택 한가득</div>
                        <button style={{ background:"#3B82F6", color:"#fff", border:"none", borderRadius:10, padding:"11px 24px", fontSize:13, fontWeight:800, cursor:"pointer" }}>지금 바로 개설하기 →</button>
                      </div>
                      <div style={{ background:"#F8FAFC", borderRadius:12, padding:"14px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
                        <span style={{ fontSize:22 }}>🚫</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:800, color:"#0F172A", marginBottom:2 }}>광고 없이 보고싶으세요?</div>
                          <div style={{ fontSize:11, color:"#64748B" }}>월 2,900원으로 광고 완전 제거</div>
                        </div>
                        <button onClick={() => { setShowAdPopup(false); setShowModal(1); }} style={{ background:"#0F172A", color:"#fff", border:"none", borderRadius:8, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer", flexShrink:0 }}>구독하기</button>
                      </div>
                      <button onClick={() => setShowAdPopup(false)} style={{ width:"100%", padding:"12px 0", border:"none", borderRadius:12, background:"#F1F5F9", color:"#64748B", fontSize:14, fontWeight:700, cursor:"pointer" }}>닫기</button>
                    </div>
                  </div>
              )}

              {/* Backdrop + Detail sheet */}
              {selectedStock && <div onClick={() => setSelectedStock(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.3)", zIndex:99 }} />}
              <DetailSheet stock={selectedStock} catId={catId} onClose={() => setSelectedStock(null)} accent={accent} />

            </div>
        )}

        {/* ── 하단 탭바 ── */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, zIndex:80, background:"#fff", borderTop:"1px solid #F1F5F9", display:"flex" }}>
          {[{id:"home",icon:"📈",label:"홈"},{id:"portfolio",icon:"📊",label:"보유종목"}].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex:1, padding:"10px 0 12px", border:"none", cursor:"pointer", background:"transparent", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                <span style={{ fontSize:20 }}>{tab.icon}</span>
                <span style={{ fontSize:10, fontWeight:700, color:activeTab===tab.id?(isDomestic?"#3B82F6":"#8B5CF6"):"#94A3B8" }}>{tab.label}</span>
                {activeTab === tab.id && <div style={{ width:20, height:2, borderRadius:99, background:isDomestic?"#3B82F6":"#8B5CF6", marginTop:1 }} />}
              </button>
          ))}
        </div>

      </div>
  );
}
