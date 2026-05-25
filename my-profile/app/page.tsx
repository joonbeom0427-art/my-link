"use client";

import { useState } from "react";
import { dummyLinks } from "../data/links";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Briefcase, 
  ArrowUpRight,
  Sparkles,
  Laptop,
  Globe,
  Plus,
  Trash2,
  Settings,
  Check
} from "lucide-react";

// 동적 브랜드 및 일반 아이콘 렌더러 컴포넌트
function LinkIcon({ name, url }: { name: string; url: string }) {
  // 사용자가 추가한 커스텀 링크의 경우 실시간 파비콘 자동 추출 시도 (F-3.1 규격 충족)
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname && parsed.hostname.includes(".")) {
        return (
          <img 
            src={`https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=64`} 
            alt="favicon" 
            className="w-5 h-5 object-contain"
            onError={(e) => {
              // 로드 실패 시 대체 기본 아이콘 노출
              e.currentTarget.style.display = 'none';
            }}
          />
        );
      }
    } catch (e) {
      // 파싱 실패 시 아래의 기본 Lucide 혹은 브랜드 아이콘 폴백으로 연동
    }
  }

  // 기본 더미 데이터 아이콘용 브랜드 SVG 매핑
  if (name === "Instagram") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  
  if (name === "Youtube") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    );
  }

  if (name === "Github") {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (name === "BookOpen") {
    return <BookOpen className="w-5 h-5" />;
  }

  if (name === "Briefcase") {
    return <Briefcase className="w-5 h-5" />;
  }

  return <Globe className="w-5 h-5" />;
}

// 각 브랜드 및 링크 아이템별 프리미엄 스타일 설정 맵
const styleMap: Record<string, {
  cardBg: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  hoverBorder: string;
  textColor: string;
  arrowColor: string;
}> = {
  Instagram: {
    cardBg: "bg-linear-to-r from-pink-500/10 via-rose-500/5 to-transparent hover:from-pink-500/15 hover:via-rose-500/10 dark:from-pink-500/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
    iconBg: "bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white dark:group-hover:bg-pink-500",
    iconColor: "text-pink-600 dark:text-pink-400",
    borderColor: "border-pink-200/80 dark:border-pink-900/50",
    hoverBorder: "hover:border-pink-400 dark:hover:border-pink-700 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    textColor: "text-pink-950 dark:text-pink-200 group-hover:text-pink-700 dark:group-hover:text-pink-300",
    arrowColor: "text-pink-400 dark:text-pink-800 group-hover:text-pink-600 dark:group-hover:text-pink-400",
  },
  Youtube: {
    cardBg: "bg-linear-to-r from-red-500/10 via-orange-500/5 to-transparent hover:from-red-500/15 hover:via-orange-500/10 dark:from-red-500/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
    iconBg: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white dark:group-hover:bg-red-500",
    iconColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-200/80 dark:border-red-900/50",
    hoverBorder: "hover:border-red-400 dark:hover:border-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    textColor: "text-red-950 dark:text-red-200 group-hover:text-red-700 dark:group-hover:text-red-300",
    arrowColor: "text-red-400 dark:text-red-800 group-hover:text-red-600 dark:group-hover:text-red-400",
  },
  BookOpen: {
    cardBg: "bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent hover:from-emerald-500/15 hover:via-teal-500/10 dark:from-emerald-500/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200/80 dark:border-emerald-900/50",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    textColor: "text-emerald-950 dark:text-emerald-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
    arrowColor: "text-emerald-400 dark:text-emerald-800 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  Github: {
    cardBg: "bg-linear-to-r from-slate-500/10 via-neutral-500/5 to-transparent hover:from-slate-500/15 hover:via-neutral-500/10 dark:from-slate-500/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
    iconBg: "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-950",
    iconColor: "text-slate-800 dark:text-slate-200",
    borderColor: "border-slate-200 dark:border-neutral-800",
    hoverBorder: "hover:border-slate-400 dark:hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(100,116,139,0.15)]",
    textColor: "text-slate-950 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white",
    arrowColor: "text-slate-400 dark:text-slate-700 group-hover:text-slate-800 dark:group-hover:text-slate-200",
  },
  Briefcase: {
    cardBg: "bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent hover:from-violet-500/15 hover:via-fuchsia-500/10 dark:from-violet-500/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
    iconBg: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200/80 dark:border-violet-900/50",
    hoverBorder: "hover:border-violet-400 dark:hover:border-violet-700 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    textColor: "text-violet-950 dark:text-violet-200 group-hover:text-violet-700 dark:group-hover:text-violet-300",
    arrowColor: "text-violet-400 dark:text-violet-800 group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
};

// 사용자가 추가한 커스텀 링크 전용 폴백 스타일
const customFallbackStyle = {
  cardBg: "bg-linear-to-r from-neutral-500/5 via-neutral-400/5 to-transparent hover:from-neutral-500/10 hover:via-neutral-400/5 dark:from-neutral-800/10 dark:to-transparent bg-white/60 dark:bg-neutral-900/60",
  iconBg: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-50 dark:group-hover:text-neutral-950",
  iconColor: "text-neutral-800 dark:text-neutral-200",
  borderColor: "border-neutral-200 dark:border-neutral-800",
  hoverBorder: "hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]",
  textColor: "text-neutral-950 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white",
  arrowColor: "text-neutral-400 dark:text-neutral-700 group-hover:text-neutral-800 dark:group-hover:text-neutral-200",
};

export default function Home() {
  // 로컬 링크 목록 상태 관리
  const [links, setLinks] = useState(dummyLinks);
  
  // 편집 / 관리자 모드 상태
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // 모달 제어 및 입력 폼 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // 실시간 파비콘 미리보기 분석용 헬퍼 (F-3.1)
  const getFaviconUrl = (urlStr: string) => {
    if (!urlStr) return "";
    try {
      let formattedUrl = urlStr;
      if (!/^https?:\/\//i.test(urlStr)) {
        formattedUrl = "https://" + urlStr;
      }
      const parsed = new URL(formattedUrl);
      if (parsed.hostname && parsed.hostname.includes(".")) {
        return `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=64`;
      }
    } catch (e) {
      // 불완전한 URL 입력 단계 시에는 파싱 에러를 무시
    }
    return "";
  };

  // 링크 추가 서브밋 핸들러 (로컬 상태 연동)
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    const newLinkItem = {
      id: `link-${Date.now()}`,
      title: newTitle.trim(),
      url: formattedUrl,
      icon: "Globe", // 기본 커스텀 링크 아이콘 구분
    };

    setLinks((prev) => [...prev, newLinkItem]);
    
    // 폼 초기화 및 다이얼로그 닫기
    setNewTitle("");
    setNewUrl("");
    setIsDialogOpen(false);
  };

  // 링크 삭제 핸들러
  const handleDeleteLink = (idToDelete: string, e: React.MouseEvent) => {
    e.preventDefault(); // 카드 이동 동작 방지
    e.stopPropagation();
    setLinks((prev) => prev.filter((link) => link.id !== idToDelete));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-radial from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-4 py-16 overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* 백그라운드 그리드 데코레이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* 미학적 몽환적 배경 오라(Aura) 링 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-violet-500/10 to-pink-500/10 blur-3xl pointer-events-none" />

      {/* 우측 상단 플로팅 편집 모드 스위치 */}
      <div className="absolute top-6 right-6 z-20">
        <Button 
          variant={isAdminMode ? "default" : "outline"} 
          size="sm"
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="shadow-lg backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 flex items-center gap-1.5"
        >
          {isAdminMode ? (
            <>
              <Check className="w-3.5 h-3.5 text-white dark:text-neutral-950 animate-pulse" />
              <span>완료</span>
            </>
          ) : (
            <>
              <Settings className="w-3.5 h-3.5 text-neutral-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>관리자 편집</span>
            </>
          )}
        </Button>
      </div>

      {/* 메인 프로필 컨테이너 */}
      <div className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-8">
        
        {/* 프로필 이미지 및 배지 */}
        <div className="relative flex flex-col items-center group">
          {/* 아바타 테두리 그라데이션 광채 */}
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-violet-500 to-cyan-400 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
              {/* 이미지 임시 아바타 플레이스홀더 (Lucide Icon 활용) */}
              <Laptop className="w-12 h-12 text-neutral-700 dark:text-neutral-300 animate-pulse" />
            </div>
          </div>
          
          <span className="absolute -bottom-2 bg-neutral-955 dark:bg-white text-white dark:text-neutral-955 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-neutral-700 dark:border-neutral-200 shadow-lg flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="w-3 h-3 text-yellow-400 dark:text-yellow-600 animate-spin" style={{ animationDuration: '3s' }} />
            CREATOR
          </span>
        </div>

        {/* 닉네임 및 설명 */}
        <div className="space-y-3 pt-2">
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent">
            @joonbeom0427
          </h1>
          <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
            Frontend Architect & Technical Creator.<br />
            분산된 나의 모든 활동을 단 하나의 공간에.
          </p>
        </div>

        {/* 기술 스택 배지 리스트 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {[
            { name: "React 19", color: "border-pink-200 dark:border-pink-900/60 bg-pink-500/5 text-pink-700 dark:text-pink-400" },
            { name: "Next.js 16", color: "border-violet-200 dark:border-violet-900/60 bg-violet-500/5 text-violet-700 dark:text-violet-400" },
            { name: "TypeScript", color: "border-cyan-200 dark:border-cyan-900/60 bg-cyan-500/5 text-cyan-700 dark:text-cyan-400" },
            { name: "Shadcn/ui", color: "border-neutral-300 dark:border-neutral-700 bg-neutral-500/5 text-neutral-800 dark:text-neutral-200" }
          ].map((tech) => (
            <span 
              key={tech.name} 
              className={`text-[10px] font-black px-2.5 py-1 rounded-md border backdrop-blur-xs shadow-xs ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* 링크 카드 리스트 (세로 나열, 중앙 정렬) */}
        <div className="w-full space-y-4 pt-4">
          
          {/* 관리자 편집 모드 활성화 시 노출되는 '새 링크 추가' 카드 블록 */}
          {isAdminMode && (
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="block w-full focus:outline-none group"
            >
              <Card className="w-full border-2 border-dashed border-neutral-400 dark:border-neutral-700 hover:border-neutral-800 dark:hover:border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/50 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/30 backdrop-blur-xs transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md">
                <CardContent className="p-5 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm text-neutral-700 dark:text-neutral-300">새로운 링크 추가하기</span>
                </CardContent>
              </Card>
            </button>
          )}

          {/* 등록된 전체 링크 목록 */}
          {links.map((link) => {
            const styles = styleMap[link.icon] || customFallbackStyle;

            return (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full focus:outline-none group relative"
              >
                <Card className={`w-full border backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden ${styles.cardBg} ${styles.borderColor} ${styles.hoverBorder}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* 아이콘 둥근 래퍼 */}
                      <div className={`p-2.5 rounded-lg transition-all duration-300 ${styles.iconBg}`}>
                        <LinkIcon name={link.icon} url={link.url} />
                      </div>
                      {/* 타이틀 */}
                      <span className={`font-black text-base transition-colors duration-300 ${styles.textColor}`}>
                        {link.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* 관리자 모드 활성화 시 노출되는 '삭제' 버튼 */}
                      {isAdminMode ? (
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          onClick={(e) => handleDeleteLink(link.id, e)}
                          className="hover:scale-105 transition-transform"
                          title="링크 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </Button>
                      ) : (
                        /* 일반 모드 시 노출되는 새 탭 화살표 */
                        <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${styles.arrowColor}`} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* 푸터 영역 */}
        <footer className="pt-16 text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
            Powered by My Link
          </p>
          <p className="text-[9px] font-mono text-neutral-400/80 dark:text-neutral-600/80">
            © 2026 Joonbeom Art. All rights reserved.
          </p>
        </footer>

      </div>

      {/* ========================================================================= */}
      {/* 팝업 다이얼로그 (Dialog - F-3.1 링크 추가 폼) */}
      {/* ========================================================================= */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-500" />
              새로운 링크 추가하기
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddLink} className="space-y-5 pt-4">
            {/* 링크 제목 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">링크 제목</Label>
              <Input 
                id="title" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                placeholder="예: 나의 노션 이력서 📄" 
                className="w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800"
                required 
              />
            </div>
            
            {/* 링크 URL 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">이동할 주소 (URL)</Label>
              <Input 
                id="url" 
                value={newUrl} 
                onChange={(e) => setNewUrl(e.target.value)} 
                placeholder="예: notion.so/yourname" 
                className="w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800"
                required 
              />
            </div>
            
            {/* 실시간 파비콘 자동 감지 미리보기 박스 (PRD F-3.1 규격 충족) */}
            {getFaviconUrl(newUrl) && (
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center gap-3 animate-fade-in transition-all">
                <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
                  <img 
                    src={getFaviconUrl(newUrl)} 
                    alt="favicon-preview" 
                    className="w-5 h-5 object-contain" 
                    onError={(e) => {
                      e.currentTarget.src = "https://www.google.com/s2/favicons?domain=google.com&sz=64";
                    }}
                  />
                </div>
                <div className="text-xs text-left">
                  <p className="font-black text-neutral-800 dark:text-neutral-200">자동 파비콘 연동 감지</p>
                  <p className="text-neutral-500 font-mono text-[9px] truncate max-w-[260px] mt-0.5">
                    {new URL(/^https?:\/\//i.test(newUrl) ? newUrl : "https://" + newUrl).hostname}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="pt-4 flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                취소
              </Button>
              <Button type="submit" className="bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950">
                링크 추가
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
