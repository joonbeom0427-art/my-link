"use client";

import { useState, useEffect } from "react";
import { dummyLinks, LinkItem } from "../data/links";
import { db, auth, googleProvider } from "@/lib/firebase";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy,
  updateDoc,
  increment
} from "firebase/firestore";
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
  Check,
  Edit2,
  LogOut,
  Copy,
  User as UserIcon,
  Sun,
  Moon,
  ChevronDown,
  BarChart3,
  TrendingUp
} from "lucide-react";

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bio: string;
  techStack: string[];
}

// 동적 브랜드 및 일반 아이콘 렌더러 컴포넌트
function LinkIcon({ name, url }: { name: string; url: string }) {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    let hostname = "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname && parsed.hostname.includes(".")) {
        hostname = parsed.hostname;
      }
    } catch {
      // 파싱 실패 시 대체 기본 아이콘 노출
    }

    if (hostname) {
      return (
        <img 
          src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`} 
          alt="favicon" 
          className="w-5 h-5 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
  }

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
  // Auth 관련 상태 관리
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // URL에서 조회하고자 하는 대상 UID (?uid=...)
  const [targetUid, setTargetUid] = useState<string | null>(null);

  // 현재 화면에 보여주고 있는 프로필 및 링크 정보의 실소유자 UID
  const [activeUid, setActiveUid] = useState<string | null>(null);
  
  // 유저 프로필 상세 정보
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 로컬 링크 목록 상태 관리
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 편집 / 관리자 모드 상태
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // 링크 추가 모달 제어 및 입력 폼 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");

  // 링크 수정 모달 제어 및 입력 폼 상태
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editTitleError, setEditTitleError] = useState("");
  const [editUrlError, setEditUrlError] = useState("");

  // 프로필 설정 모달 제어 및 폼 상태
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [editProfileName, setEditProfileName] = useState("");
  const [editProfileBio, setEditProfileBio] = useState("");
  const [editProfileTechs, setEditProfileTechs] = useState("");
  const [profileNameError, setProfileNameError] = useState("");
  const [profileBioError, setProfileBioError] = useState("");

  // UI 편의용 드롭다운 / 다크모드 상태
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  // 실시간 통계 메트릭 계산
  const totalClicks = links.reduce((sum, link) => sum + (link.clickCount || 0), 0);
  const maxClicks = Math.max(...links.map(link => link.clickCount || 0), 1);
  const topLink = links.length > 0
    ? [...links].sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))[0]
    : null;
  const avgClicks = links.length > 0 ? (totalClicks / links.length).toFixed(1) : "0.0";

  // 테마 초기화
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(isDarkClass);
    }
  }, []);

  // 테마 토글
  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      const current = document.documentElement.classList.toggle("dark");
      setIsDark(current);
    }
  };

  // 1클릭 내 주소 복사 핸들러
  const handleCopyLink = () => {
    if (typeof window !== "undefined" && user) {
      const url = `${window.location.origin}?uid=${user.uid}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // 구글 소셜 로그인
  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google 소셜 로그인 실패:", error);
      setAuthLoading(false);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      setIsAdminMode(false);
      setIsUserMenuOpen(false);
      await signOut(auth);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // URL 쿼리 파라미터 파싱 (마운트 시 1회)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const uidParam = searchParams.get("uid");
      setTargetUid(uidParam);
    }
  }, []);

  // Firebase Auth 리스너
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // activeUid 분석 결정 (user 상태 또는 targetUid 상태 변경 시)
  useEffect(() => {
    if (targetUid) {
      // 1순위: URL 쿼리 파라미터에 명시된 특정 UID 프로필 조회 (Public View)
      setActiveUid(targetUid);
    } else if (user) {
      // 2순위: 내 대시보드 조회 (Owner View)
      setActiveUid(user.uid);
    } else {
      // 3순위: 비로그인 및 타겟 프로필도 없는 소개 랜딩 화면
      setActiveUid(null);
    }
  }, [user, targetUid]);

  // activeUid가 결정되었을 때 유저 프로필 및 링크 목록 실시간 로드
  useEffect(() => {
    if (activeUid) {
      fetchUserProfile(activeUid);
      fetchLinks(activeUid, true);
    } else {
      setIsLoading(false);
      setLinks([]);
      setUserProfile(null);
    }
  }, [activeUid]);

  // Firestore 유저 프로필 조회 및 최초 생성(Seeding)
  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile({
          uid: data.uid || uid,
          email: data.email || "",
          displayName: data.displayName || "Creator",
          photoURL: data.photoURL || "",
          bio: data.bio || "",
          techStack: data.techStack || [],
        });
      } else {
        // 만약 내 프로필인데 DB에 없다면 (신규 가입 유저) 기본값 생성
        if (user && uid === user.uid) {
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "Creator",
            photoURL: user.photoURL || "",
            bio: "Frontend Architect & Technical Creator. 분산된 나의 모든 활동을 단 하나의 공간에.",
            techStack: ["React 19", "Next.js 16", "TypeScript", "Shadcn/ui"],
          };
          await setDoc(docRef, newProfile);
          setUserProfile(newProfile);
        } else {
          // 타인 조회인데 DB에 없는 경우 기본 폴백 세팅
          setUserProfile({
            uid: uid,
            email: "",
            displayName: "Anonymous Creator",
            photoURL: "",
            bio: "설정된 프로필 소개글이 아직 존재하지 않습니다.",
            techStack: ["Creator"],
          });
        }
      }
    } catch (error) {
      console.error("Firestore에서 유저 프로필을 조회하는 중 오류 발생:", error);
    }
  };

  // Firestore 링크 데이터 로드 및 초기 시딩 (Seeding)
  const fetchLinks = async (uid: string, showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const linksRef = collection(db, "users", uid, "links");
      const q = query(linksRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // 내 프로필에 링크가 하나도 없을 때 Aha Moment 제공을 위한 기본 링크 시딩
        if (user && uid === user.uid) {
          const seededLinks: LinkItem[] = [];
          for (let i = 0; i < dummyLinks.length; i++) {
            const item = dummyLinks[i];
            const docRef = doc(linksRef, item.id);
            const linkData = {
              title: item.title,
              url: item.url,
              icon: item.icon,
              clickCount: 0,
              createdAt: new Date(Date.now() - i * 1000),
            };
            await setDoc(docRef, linkData);
            seededLinks.push({
              id: item.id,
              ...linkData
            });
          }
          setLinks(seededLinks);
        } else {
          setLinks([]);
        }
      } else {
        const fetchedLinks: LinkItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedLinks.push({
            id: doc.id,
            title: data.title || "",
            url: data.url || "",
            icon: data.icon || "Globe",
            clickCount: data.clickCount || 0,
          });
        });
        setLinks(fetchedLinks);
      }
    } catch (error) {
      console.error("Firestore에서 링크를 불러오는 중 오류 발생:", error);
      // 네트워크 에러 대비 세이프 폴백
      if (uid === "anonymous") {
        setLinks(dummyLinks);
      }
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  // 실시간 파비콘 미리보기 분석용 헬퍼
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
    } catch {
      // 파싱 실패 무시
    }
    return "";
  };

  // 내 프로필 페이지를 수정할 권한이 있는지 체크
  const isOwnProfile = user !== null && activeUid === user.uid;

  // 링크 추가 제출 핸들러 (개인화된 uid 적용)
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setTitleError("");
    setUrlError("");

    let isValid = true;
    const cleanTitle = newTitle.trim();
    const cleanUrl = newUrl.trim();

    if (cleanTitle.length === 0) {
      setTitleError("링크 제목을 입력해 주세요.");
      isValid = false;
    } else if (cleanTitle.length < 2) {
      setTitleError("링크 제목은 최소 2글자 이상 입력해 주세요.");
      isValid = false;
    } else if (cleanTitle.length > 40) {
      setTitleError("링크 제목은 최대 40글자 이하로 입력해 주세요.");
      isValid = false;
    }

    let formattedUrl = cleanUrl;
    if (cleanUrl.length === 0) {
      setUrlError("이동할 주소(URL)를 입력해 주세요.");
      isValid = false;
    } else {
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "https://" + formattedUrl;
      }

      let isUrlValid = false;
      try {
        const parsed = new URL(formattedUrl);
        isUrlValid = !!(parsed.hostname && parsed.hostname.includes(".") && parsed.hostname.split(".").filter(Boolean).length >= 2);
      } catch {
        isUrlValid = false;
      }

      if (!isUrlValid) {
        setUrlError("올바른 웹 주소(URL) 형식을 입력해 주세요. (예: github.com 또는 https://...)");
        isValid = false;
      }
    }

    if (!isValid) return;

    const newId = `link-${Date.now()}`;
    const newLinkData = {
      title: cleanTitle,
      url: formattedUrl,
      icon: "Globe",
      clickCount: 0,
      createdAt: new Date(),
    };

    try {
      const docRef = doc(db, "users", user.uid, "links", newId);
      await setDoc(docRef, newLinkData);

      await fetchLinks(user.uid, false);

      setNewTitle("");
      setNewUrl("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Firestore에 링크를 추가하는 중 오류 발생:", error);
    }
  };

  // 링크 수정 모달 열기 핸들러
  const handleOpenEditDialog = (link: LinkItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingLink(link);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditTitleError("");
    setEditUrlError("");
    setIsEditDialogOpen(true);
  };

  // 링크 수정 제출 핸들러
  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink || !user) return;

    setEditTitleError("");
    setEditUrlError("");

    let isValid = true;
    const cleanTitle = editTitle.trim();
    const cleanUrl = editUrl.trim();

    if (cleanTitle.length === 0) {
      setEditTitleError("링크 제목을 입력해 주세요.");
      isValid = false;
    } else if (cleanTitle.length < 2) {
      setEditTitleError("링크 제목은 최소 2글자 이상 입력해 주세요.");
      isValid = false;
    } else if (cleanTitle.length > 40) {
      setEditTitleError("링크 제목은 최대 40글자 이하로 입력해 주세요.");
      isValid = false;
    }

    let formattedUrl = cleanUrl;
    if (cleanUrl.length === 0) {
      setEditUrlError("이동할 주소(URL)를 입력해 주세요.");
      isValid = false;
    } else {
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "https://" + formattedUrl;
      }

      let isUrlValid = false;
      try {
        const parsed = new URL(formattedUrl);
        isUrlValid = !!(parsed.hostname && parsed.hostname.includes(".") && parsed.hostname.split(".").filter(Boolean).length >= 2);
      } catch {
        isUrlValid = false;
      }

      if (!isUrlValid) {
        setEditUrlError("올바른 웹 주소(URL) 형식을 입력해 주세요. (예: github.com 또는 https://...)");
        isValid = false;
      }
    }

    if (!isValid) return;

    try {
      const docRef = doc(db, "users", user.uid, "links", editingLink.id);
      
      await setDoc(docRef, {
        title: cleanTitle,
        url: formattedUrl,
      }, { merge: true });

      await fetchLinks(user.uid, false);

      setIsEditDialogOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error("Firestore에 링크를 수정하는 중 오류 발생:", error);
    }
  };

  // 링크 삭제 핸들러
  const handleDeleteLink = async (idToDelete: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    const isConfirmed = window.confirm("정말로 이 링크를 삭제하시겠습니까?\n삭제된 링크는 복구할 수 없습니다.");
    if (!isConfirmed) return;
    
    try {
      const docRef = doc(db, "users", user.uid, "links", idToDelete);
      await deleteDoc(docRef);

      await fetchLinks(user.uid, false);
    } catch (error) {
      console.error("Firestore에서 링크를 삭제하는 중 오류 발생:", error);
    }
  };

  // 링크 클릭 시 클릭 카운트 증가 핸들러
  const handleLinkClick = async (linkId: string) => {
    if (!activeUid) return;
    try {
      const linkDocRef = doc(db, "users", activeUid, "links", linkId);
      await updateDoc(linkDocRef, {
        clickCount: increment(1)
      });

      // 로컬 상태 업데이트
      setLinks(prevLinks =>
        prevLinks.map(link =>
          link.id === linkId
            ? { ...link, clickCount: (link.clickCount || 0) + 1 }
            : link
        )
      );
    } catch (error) {
      console.error("Firestore에 클릭 카운트 증가 중 오류 발생:", error);
    }
  };

  // 프로필 편집 다이얼로그 열기 핸들러
  const handleOpenProfileDialog = () => {
    if (!userProfile) return;
    setEditProfileName(userProfile.displayName);
    setEditProfileBio(userProfile.bio);
    setEditProfileTechs(userProfile.techStack.join(", "));
    setProfileNameError("");
    setProfileBioError("");
    setIsProfileDialogOpen(true);
  };

  // 프로필 편집 제출 핸들러
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;

    setProfileNameError("");
    setProfileBioError("");

    let isValid = true;
    const cleanName = editProfileName.trim();
    const cleanBio = editProfileBio.trim();
    
    if (cleanName.length === 0) {
      setProfileNameError("닉네임을 입력해 주세요.");
      isValid = false;
    } else if (cleanName.length < 2 || cleanName.length > 20) {
      setProfileNameError("닉네임은 최소 2글자 이상, 최대 20글자 이하여야 합니다.");
      isValid = false;
    }

    if (cleanBio.length > 100) {
      setProfileBioError("한 줄 소개는 최대 100글자 이하여야 합니다.");
      isValid = false;
    }

    if (!isValid) return;

    // 콤마로 구분된 기술 태그 배열로 변환
    const techArray = editProfileTechs
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    try {
      const docRef = doc(db, "users", user.uid);
      const updatedData = {
        displayName: cleanName,
        bio: cleanBio,
        techStack: techArray
      };

      await setDoc(docRef, updatedData, { merge: true });

      // 로컬 상태 동기화
      setUserProfile({
        ...userProfile,
        ...updatedData
      });

      setIsProfileDialogOpen(false);
    } catch (error) {
      console.error("Firestore에 프로필 정보를 저장하는 중 오류 발생:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-radial from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-4 pb-16 overflow-x-hidden selection:bg-neutral-800 selection:text-white transition-colors duration-300">
      
      {/* 백그라운드 그리드 데코레이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* 미학적 몽환적 배경 오라(Aura) 링 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500/10 to-pink-500/10 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 🚀 상단 네비게이션 헤더 바 (Navbar) */}
      {/* ========================================================================= */}
      <header className="w-full max-w-5xl z-30 mt-6 mb-10 px-4 py-3 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300">
        
        {/* 좌측: 로고 */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => typeof window !== 'undefined' && (window.location.href = "/")}>
          <div className="p-2 bg-gradient-to-tr from-pink-500 via-violet-500 to-cyan-400 rounded-xl shadow-md">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
            My Link
          </span>
        </div>

        {/* 중앙: 고유 페이지 공유 주소 (로그인 사용자 대상) */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/40 rounded-full font-mono text-[11px] text-neutral-600 dark:text-neutral-300 max-w-xs md:max-w-md truncate">
            <span className="font-semibold text-neutral-400 dark:text-neutral-500">Share:</span>
            <span className="font-bold truncate select-all">{typeof window !== 'undefined' ? `${window.location.origin}?uid=${user.uid.slice(0, 10)}...` : ""}</span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleCopyLink}
              className="hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              title="주소 복사"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        )}

        {/* 우측: 다크모드 및 로그인 세션 위젯 */}
        <div className="flex items-center gap-3">
          {/* 다크모드 스위치 */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 shadow-sm"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-violet-500" />
            )}
          </Button>

          {/* 소셜 로그인 세션 제어 */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          ) : user ? (
            <div className="relative">
              {/* 유저 아바타 드롭다운 트리거 */}
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 focus:outline-none p-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all shadow-xs"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="profile" 
                    className="w-7 h-7 rounded-full object-cover" 
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-neutral-500" />
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {/* 드롭다운 콘텐츠 */}
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-52 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl z-50 p-2.5 space-y-1.5 animate-scale-in">
                    <div className="px-2 py-1.5">
                      <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Sign-In User</p>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate mt-0.5">{user.displayName || "Creator"}</p>
                      <p className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                    </div>
                    
                    <hr className="border-neutral-200 dark:border-neutral-800" />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        typeof window !== 'undefined' && (window.location.href = `/`);
                      }}
                      className="w-full justify-start text-xs font-bold text-neutral-700 dark:text-neutral-300 rounded-lg"
                    >
                      <UserIcon className="w-3.5 h-3.5 mr-2" />
                      내 대시보드로 가기
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsAnalyticsOpen(true);
                      }}
                      className="w-full justify-start text-xs font-bold text-neutral-700 dark:text-neutral-300 rounded-lg"
                    >
                      <BarChart3 className="w-3.5 h-3.5 mr-2 text-violet-500" />
                      통계 대시보드
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      로그아웃
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={handleGoogleLogin}
              className="bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 rounded-xl text-xs font-bold px-3 py-2 flex items-center gap-1.5 shadow-md shadow-neutral-950/10"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.61 4.5 1.64l2.44-2.44C17.3 1.69 14.89 1 12.24 1 6.64 1 2.24 5.4 2.24 11s4.4 10 10 10c5.8 0 10-4.08 10-10 0-.68-.08-1.33-.24-1.715H12.24z" />
              </svg>
              Google로 시작하기
            </Button>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 🔴 로그인 안 한 경우: 프리미엄 랜딩 뷰 (Unauthorized View) */}
      {/* ========================================================================= */}
      {!activeUid && !authLoading && (
        <div className="w-full max-w-4xl z-10 flex flex-col items-center justify-center space-y-12 py-16 animate-fade-in">
          
          {/* 브랜딩 헤드라인 */}
          <div className="text-center space-y-4 max-w-xl md:max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-violet-500/10 dark:bg-violet-400/10 text-violet-700 dark:text-violet-400 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase border border-violet-500/20 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400" />
              Next-Gen Linktree Creator
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-neutral-900 dark:text-white">
              분산된 나만의 모든 활동을<br />
              <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">단 하나의 명품 공간</span>에.
            </h1>
            <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 max-w-md md:max-w-xl mx-auto leading-relaxed">
              구글 간편 로그인 하나만으로 나만의 독창적인 링크트리를 생성해 보세요. 실시간 파비콘 자동 분석, 미학적인 몽환 테마, 세밀한 디자인 커스터마이징이 즉시 열립니다.
            </p>
          </div>

          {/* 중앙 랜딩 유도 영역 */}
          <Card className="w-full max-w-md border border-neutral-200/50 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center space-y-6 transform hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">지금 나만의 주소를 선점하세요!</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
                로그인 완료 후, 실시간 관리 화면에서 링크를 즉시 추가하고 타인에게 링크 주소를 공유할 수 있습니다.
              </p>
            </div>
            
            <div className="py-2">
              <Button
                onClick={handleGoogleLogin}
                className="w-full py-6 bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-500 hover:from-pink-600 hover:via-violet-700 hover:to-cyan-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-violet-500/20 active:scale-98 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.61 4.5 1.64l2.44-2.44C17.3 1.69 14.89 1 12.24 1 6.64 1 2.24 5.4 2.24 11s4.4 10 10 10c5.8 0 10-4.08 10-10 0-.68-.08-1.33-.24-1.715H12.24z" />
                </svg>
                Google 계정으로 무료로 시작하기
              </Button>
            </div>

            <div className="text-[10px] font-mono text-neutral-400/80">
              ⚡ 1초 가입 및 무료 무제한 링크 생성 제공
            </div>
          </Card>

          {/* 서비스 특장점 3그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-4">
            {[
              {
                icon: <Laptop className="w-5 h-5 text-pink-500" />,
                title: "1초 소셜 로그인",
                desc: "구글 계정 인증 즉시 나만의 전용 프로필 데이터베이스가 구성되며 모든 링크가 유저 UID에 안전하게 보관됩니다."
              },
              {
                icon: <Globe className="w-5 h-5 text-violet-500" />,
                title: "실시간 파비콘 로드",
                desc: "추가하려는 링크의 주소(URL)만 입력하면 똑똑한 마이링크가 실시간으로 고유 로고 아이콘을 추적해 매핑합니다."
              },
              {
                icon: <Sparkles className="w-5 h-5 text-cyan-500" />,
                title: "감각적인 프리미엄 디자인",
                desc: "다크모드 완벽 호환, 몽환적인 그라데이션 오라 효과가 결합된 디자인으로 방문자에게 강렬한 인상을 선사합니다."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border border-neutral-200/40 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardContent className="p-0 space-y-3">
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="font-black text-sm text-neutral-900 dark:text-white">{feature.title}</h3>
                  <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 푸터 */}
          <footer className="pt-16 text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Powered by My Link
            </p>
            <p className="text-[9px] font-mono text-neutral-400/80 dark:text-neutral-600/80">
              © 2026 Joonbeom Art. All rights reserved.
            </p>
          </footer>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 🟢 로그인 완료 혹은 타인 프로필 조회 뷰 (Personalized Active View) */}
      {/* ========================================================================= */}
      {activeUid && (
        <div className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-8 animate-scale-in">
          
          {/* 프로필 이미지 및 배지 */}
          <div className="relative flex flex-col items-center group">
            {/* 아바타 테두리 그라데이션 광채 */}
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-violet-500 to-cyan-400 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                {userProfile?.photoURL ? (
                  <img 
                    src={userProfile.photoURL} 
                    alt="avatar" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <Laptop className="w-12 h-12 text-neutral-700 dark:text-neutral-300 animate-pulse" />
                )}
              </div>
            </div>
            
            <span className="absolute -bottom-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-neutral-700 dark:border-neutral-200 shadow-lg flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-3 h-3 text-yellow-400 dark:text-yellow-600 animate-spin" style={{ animationDuration: '3s' }} />
              CREATOR
            </span>
          </div>

          {/* 닉네임 및 설명 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent">
                @{userProfile?.displayName || "Creator"}
              </h1>
              {isOwnProfile && isAdminMode && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={handleOpenProfileDialog}
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded-full"
                  title="프로필 수정"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
            <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
              {userProfile?.bio || "나만의 프리미엄 마이링크 공간입니다."}
            </p>
          </div>

          {/* 기술 스택 배지 리스트 */}
          {userProfile?.techStack && userProfile.techStack.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {userProfile.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="text-[10px] font-black px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-500/5 text-neutral-800 dark:text-neutral-200 backdrop-blur-xs shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* 우측 상단 플로팅 편집 모드 스위치 (내 프로필인 경우에만 노출) */}
          {isOwnProfile && (
            <div className="fixed bottom-6 right-6 z-20 flex gap-2.5">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAnalyticsOpen(true)}
                className="shadow-2xl backdrop-blur-md rounded-full px-5 py-3.5 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95"
              >
                <BarChart3 className="w-3.5 h-3.5 text-violet-500 animate-pulse" />
                <span>통계 대시보드</span>
              </Button>
              <Button 
                variant={isAdminMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="shadow-2xl backdrop-blur-md rounded-full px-5 py-3.5 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95"
              >
                {isAdminMode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white dark:text-neutral-950 animate-pulse" />
                    <span>편집 모드 끄기</span>
                  </>
                ) : (
                  <>
                    <Settings className="w-3.5 h-3.5 text-neutral-500 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>프로필/링크 관리</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* 링크 카드 리스트 (세로 나열, 중앙 정렬) */}
          <div className="w-full space-y-4 pt-4">
            
            {isLoading ? (
              // 프리미엄 스켈레톤 로더 UI
              <>
                {[1, 2, 3].map((item) => (
                  <Card 
                    key={item} 
                    className="w-full border border-neutral-200/50 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md animate-pulse overflow-hidden"
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/2" />
                      </div>
                      <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md shrink-0" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <>
                {/* 관리자 편집 모드 활성화 시 노출되는 '새 링크 추가' 카드 블록 */}
                {isOwnProfile && isAdminMode && (
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
                {links.length === 0 && !isAdminMode ? (
                  <div className="py-8 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-500 bg-white/20 dark:bg-neutral-900/20 backdrop-blur-xs border border-neutral-200/30 dark:border-neutral-800/30 rounded-2xl">
                    ⚠️ 생성된 링크가 현재 하나도 존재하지 않습니다.
                  </div>
                ) : (
                  links.map((link) => {
                    const styles = styleMap[link.icon] || customFallbackStyle;

                    return (
                      <a 
                        key={link.id} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick(link.id)}
                        className="block w-full focus:outline-none group relative"
                      >
                        <Card className={`w-full border backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden ${styles.cardBg} ${styles.borderColor} ${styles.hoverBorder}`}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* 아이콘 둥근 래퍼 */}
                              <div className={`p-2.5 rounded-lg transition-all duration-300 ${styles.iconBg}`}>
                                <LinkIcon name={link.icon} url={link.url} />
                              </div>
                              {/* 타이틀 및 클릭수 */}
                              <div className="flex flex-col items-start gap-0.5">
                                <span className={`font-black text-base transition-colors duration-300 ${styles.textColor} text-left`}>
                                  {link.title}
                                </span>
                                {isOwnProfile && (
                                  <span className={`text-[10px] font-semibold opacity-70 ${styles.iconColor} transition-colors duration-300 text-left`}>
                                    🖱️ {(link.clickCount || 0).toLocaleString()} clicks
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              {/* 관리자 모드 활성화 시 노출되는 '수정' 및 '삭제' 버튼 그룹 */}
                              {isOwnProfile && isAdminMode ? (
                                <div className="flex items-center gap-1.5">
                                  <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={(e) => handleOpenEditDialog(link, e)}
                                    className="hover:scale-105 transition-transform border-neutral-200 dark:border-neutral-800"
                                    title="링크 수정"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon-sm"
                                    onClick={(e) => handleDeleteLink(link.id, e)}
                                    className="hover:scale-105 transition-transform"
                                    title="링크 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                  </Button>
                                </div>
                              ) : (
                                /* 일반 모드 시 노출되는 새 탭 화살표 */
                                <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${styles.arrowColor}`} />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    );
                  })
                )}
              </>
            )}
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
      )}

      {/* ========================================================================= */}
      {/* 팝업 다이얼로그 (Dialog - 링크 추가 폼) */}
      {/* ========================================================================= */}
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setNewTitle("");
            setNewUrl("");
            setTitleError("");
            setUrlError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-500" />
              새로운 링크 추가하기
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddLink} noValidate className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">링크 제목</Label>
              <Input 
                id="title" 
                value={newTitle} 
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  if (titleError) setTitleError("");
                }} 
                placeholder="예: 나의 노션 이력서 📄" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${titleError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
                required 
              />
              {titleError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {titleError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">이동할 주소 (URL)</Label>
              <Input 
                id="url" 
                value={newUrl} 
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  if (urlError) setUrlError("");
                }} 
                placeholder="예: notion.so/yourname" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${urlError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
                required 
              />
              {urlError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {urlError}</p>
              )}
            </div>
            
            {/* 실시간 파비콘 자동 감지 미리보기 박스 */}
            {getFaviconUrl(newUrl) && !urlError && (
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
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setNewTitle("");
                setNewUrl("");
                setTitleError("");
                setUrlError("");
              }}>
                취소
              </Button>
              <Button type="submit" className="bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950">
                링크 추가
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 팝업 다이얼로그 (Dialog - 링크 수정 폼) */}
      {/* ========================================================================= */}
      <Dialog 
        open={isEditDialogOpen} 
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingLink(null);
            setEditTitle("");
            setEditUrl("");
            setEditTitleError("");
            setEditUrlError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-violet-500" />
              링크 수정하기
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditLink} noValidate className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">링크 제목</Label>
              <Input 
                id="edit-title" 
                value={editTitle} 
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editTitleError) setEditTitleError("");
                }} 
                placeholder="예: 나의 노션 이력서 📄" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${editTitleError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
                required 
              />
              {editTitleError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {editTitleError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-url" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">이동할 주소 (URL)</Label>
              <Input 
                id="edit-url" 
                value={editUrl} 
                onChange={(e) => {
                  setEditUrl(e.target.value);
                  if (editUrlError) setEditUrlError("");
                }} 
                placeholder="예: notion.so/yourname" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${editUrlError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
                required 
              />
              {editUrlError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {editUrlError}</p>
              )}
            </div>
            
            {/* 실시간 파비콘 자동 감지 미리보기 박스 */}
            {getFaviconUrl(editUrl) && !editUrlError && (
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center gap-3 animate-fade-in transition-all">
                <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
                  <img 
                    src={getFaviconUrl(editUrl)} 
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
                    {new URL(/^https?:\/\//i.test(editUrl) ? editUrl : "https://" + editUrl).hostname}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="pt-4 flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => {
                setIsEditDialogOpen(false);
                setEditingLink(null);
                setEditTitle("");
                setEditUrl("");
                setEditTitleError("");
                setEditUrlError("");
              }}>
                취소
              </Button>
              <Button type="submit" className="bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950">
                수정 완료
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 팝업 다이얼로그 (Dialog - 👤 프로필 설정 편집 폼) */}
      {/* ========================================================================= */}
      <Dialog 
        open={isProfileDialogOpen} 
        onOpenChange={(open) => {
          setIsProfileDialogOpen(open);
          if (!open) {
            setEditProfileName("");
            setEditProfileBio("");
            setEditProfileTechs("");
            setProfileNameError("");
            setProfileBioError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-violet-500" />
              크리에이터 프로필 설정
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpdateProfile} noValidate className="space-y-5 pt-4">
            {/* 닉네임 입력 */}
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">크리에이터 이름 (닉네임)</Label>
              <Input 
                id="profile-name" 
                value={editProfileName} 
                onChange={(e) => {
                  setEditProfileName(e.target.value);
                  if (profileNameError) setProfileNameError("");
                }} 
                placeholder="예: Minwoo Dev" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${profileNameError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
                required 
              />
              {profileNameError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {profileNameError}</p>
              )}
            </div>
            
            {/* 한 줄 소개 입력 */}
            <div className="space-y-2">
              <Label htmlFor="profile-bio" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">한 줄 소개</Label>
              <Input 
                id="profile-bio" 
                value={editProfileBio} 
                onChange={(e) => {
                  setEditProfileBio(e.target.value);
                  if (profileBioError) setProfileBioError("");
                }} 
                placeholder="예: 안녕하세요, 개발자 민우입니다!" 
                className={`w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800 ${profileBioError ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {profileBioError && (
                <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">⚠️ {profileBioError}</p>
              )}
            </div>

            {/* 기술 태그 배지 입력 */}
            <div className="space-y-2">
              <Label htmlFor="profile-techs" className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">기술 배지 태그 (콤마로 구분)</Label>
              <Input 
                id="profile-techs" 
                value={editProfileTechs} 
                onChange={(e) => setEditProfileTechs(e.target.value)} 
                placeholder="예: React 19, Next.js 16, TypeScript, UI/UX" 
                className="w-full font-semibold text-sm border-neutral-200 dark:border-neutral-800"
              />
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold leading-relaxed">
                * 키워드를 쉼표(,)로 구분해 여러 배지를 동시에 표시할 수 있습니다.
              </p>
            </div>

            <DialogFooter className="pt-4 flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => {
                setIsProfileDialogOpen(false);
                setEditProfileName("");
                setEditProfileBio("");
                setEditProfileTechs("");
                setProfileNameError("");
                setProfileBioError("");
              }}>
                취소
              </Button>
              <Button type="submit" className="bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950">
                저장 완료
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* 📊 팝업 다이얼로그 (Dialog - 링크 클릭 통계 대시보드) */}
      {/* ========================================================================= */}
      <Dialog 
        open={isAnalyticsOpen} 
        onOpenChange={setIsAnalyticsOpen}
      >
        <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <BarChart3 className="w-5.5 h-5.5 text-violet-500 animate-pulse" />
              링크 클릭 통계 대시보드
            </DialogTitle>
          </DialogHeader>

          {/* 3컬럼 요약 오버뷰 카드 그리드 */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Card className="border-neutral-200/65 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 p-3.5 text-center rounded-2xl shadow-xs">
              <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">총 클릭 수</p>
              <p className="text-2xl font-black mt-1 text-transparent bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text">
                {totalClicks.toLocaleString()}
              </p>
            </Card>
            <Card className="border-neutral-200/65 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 p-3.5 text-center rounded-2xl shadow-xs">
              <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">평균 클릭 수</p>
              <p className="text-2xl font-black mt-1 text-neutral-800 dark:text-neutral-100">
                {avgClicks}
              </p>
            </Card>
            <Card className="border-neutral-200/65 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 p-3.5 text-center rounded-2xl shadow-xs">
              <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">인기 채널</p>
              <p className="text-xs font-black mt-2 text-violet-600 dark:text-violet-400 truncate max-w-[120px] mx-auto" title={topLink?.title || "없음"}>
                {topLink?.title || "없음"}
              </p>
            </Card>
          </div>

          {/* 시각적 차트 영역 */}
          <div className="space-y-4 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                링크별 클릭 비중 및 순위
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">실시간 누적 기준</span>
            </div>

            {links.length === 0 ? (
              <div className="py-8 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-500 bg-neutral-50/50 dark:bg-neutral-950/20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                ⚠️ 등록된 링크가 없어 통계를 집계할 수 없습니다.
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {[...links]
                  .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
                  .map((link, idx) => {
                    const clicks = link.clickCount || 0;
                    const percent = totalClicks > 0 ? Math.round((clicks / totalClicks) * 100) : 0;
                    const barWidth = `${Math.max((clicks / maxClicks) * 100, 2)}%`; // 최소 2% 보정으로 시각적 바 노출 유지
                    const styles = styleMap[link.icon] || customFallbackStyle;

                    return (
                      <div key={link.id} className="space-y-1.5 group">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 w-4">{idx + 1}</span>
                            <div className={`p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0 ${styles.iconColor}`}>
                              <LinkIcon name={link.icon} url={link.url} />
                            </div>
                            <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate max-w-[220px]">
                              {link.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                              {clicks.toLocaleString()} clicks
                            </span>
                            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                              ({percent}%)
                            </span>
                          </div>
                        </div>
                        {/* 클릭 게이지 바 */}
                        <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden border border-neutral-200/30 dark:border-neutral-800/30">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                            style={{ width: barWidth }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <DialogFooter className="pt-6">
            <Button 
              onClick={() => setIsAnalyticsOpen(false)}
              className="w-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 rounded-xl py-5 font-bold shadow-md shadow-violet-500/5"
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
