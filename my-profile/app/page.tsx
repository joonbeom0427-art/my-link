"use client";

import Image from "next/image";
import { dummyLinks } from "../data/links";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  BookOpen, 
  Briefcase, 
  ArrowUpRight,
  Sparkles,
  Laptop
} from "lucide-react";

// 동적 브랜드 및 일반 아이콘 렌더러 컴포넌트
function LinkIcon({ name }: { name: string }) {
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

  return <Sparkles className="w-5 h-5 text-neutral-500" />;
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-radial from-neutral-50 to-neutral-200 dark:from-neutral-950 dark:to-neutral-900 px-4 py-16 overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* 백그라운드 그리드 데코레이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* 메인 프로필 컨테이너 */}
      <div className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-8">
        
        {/* 프로필 이미지 및 배지 */}
        <div className="relative flex flex-col items-center group">
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-neutral-800 via-neutral-400 to-neutral-800 dark:from-neutral-200 dark:via-neutral-600 dark:to-neutral-200 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
              {/* 이미지 임시 아바타 플레이스홀더 (Lucide Icon 활용) */}
              <Laptop className="w-12 h-12 text-neutral-700 dark:text-neutral-300 animate-pulse" />
            </div>
          </div>
          
          <span className="absolute -bottom-2 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-neutral-700 dark:border-neutral-300 shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-yellow-400 dark:text-yellow-600 animate-spin" style={{ animationDuration: '3s' }} />
            DEVELOPER
          </span>
        </div>

        {/* 닉네임 및 설명 */}
        <div className="space-y-3 pt-2">
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            @joonbeom0427
          </h1>
          <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
            Frontend Engineer & Creative Creator. 분산된 나의 모든 가치를 단 하나의 링크에 담습니다.
          </p>
        </div>

        {/* 기술 스택 배지 리스트 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {["React 19", "Next.js 16", "TypeScript", "Shadcn/ui"].map((tech) => (
            <span 
              key={tech} 
              className="text-[10px] font-bold bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 px-2.5 py-1 rounded-md border border-neutral-300/40 dark:border-neutral-700/40 backdrop-blur-xs shadow-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 링크 카드 리스트 (세로 나열, 중앙 정렬) */}
        <div className="w-full space-y-4 pt-4">
          {dummyLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full focus:outline-none group"
            >
              <Card className="w-full bg-white/70 dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* 아이콘 둥근 래퍼 */}
                    <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-colors duration-300">
                      <LinkIcon name={link.icon} />
                    </div>
                    {/* 타이틀 */}
                    <span className="font-bold text-base text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-300">
                      {link.title}
                    </span>
                  </div>
                  
                  {/* 새 탭 화살표 */}
                  <ArrowUpRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* 푸터 영역 */}
        <footer className="pt-16 text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            Powered by My Link
          </p>
          <p className="text-[9px] font-mono text-neutral-400/80 dark:text-neutral-600/80">
            © 2026 Joonbeom Art. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
