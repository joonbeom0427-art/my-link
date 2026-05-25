export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // Lucide 아이콘 명칭 매핑용 문자열 (또는 파비콘 로드 실패 시 대체용)
}

export const dummyLinks: LinkItem[] = [
  {
    id: "link-instagram",
    title: "인스타그램 (Instagram)",
    url: "https://www.instagram.com",
    icon: "Instagram",
  },
  {
    id: "link-youtube",
    title: "유튜브 (YouTube)",
    url: "https://www.youtube.com",
    icon: "Youtube",
  },
  {
    id: "link-blog",
    title: "기술 블로그 (Blog)",
    url: "https://velog.io",
    icon: "BookOpen",
  },
  {
    id: "link-github",
    title: "깃허브 (GitHub)",
    url: "https://github.com/joonbeom0427-art",
    icon: "Github",
  },
  {
    id: "link-portfolio",
    title: "개인 포트폴리오 (Portfolio)",
    url: "https://github.com/joonbeom0427-art/my-link",
    icon: "Briefcase",
  },
];
