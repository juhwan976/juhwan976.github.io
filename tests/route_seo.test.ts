import { buildProjectPath } from "@/constants/route_paths";
import { projects } from "@/content/projects";
import routeSeo from "@/content/route_seo.json";
import { siteConfig } from "@/content/site";
import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import sitemap from "../public/sitemap.xml?raw";

const readTag = (pattern: RegExp): string | undefined =>
  indexHtml.match(pattern)?.[1];

// route_seo.json은 빌드 시 프리렌더 HTML에 주입되는 정적 메타다(vite.config.ts).
// 콘텐츠가 바뀌었는데 이 파일이 그대로면 검색 결과와 링크 미리보기에만
// 낡은 문구가 남아 눈에 띄지 않으므로, 런타임이 쓰는 값과 일치하는지 검증한다.
describe("route SEO", () => {
  it("정적 메타가 상세 페이지의 런타임 값과 일치한다", () => {
    const expected = Object.fromEntries(
      projects.map((project) => [
        buildProjectPath(project.slug),
        {
          title: `${project.name} · ${siteConfig.pageTitle}`,
          description: project.summary,
        },
      ]),
    );

    expect(routeSeo).toEqual(expected);
  });

  // 홈은 index.html의 정적 <title>이 그대로 프리렌더된다.
  // 런타임(useDocumentTitle)이 다른 값으로 덮어쓰면 hydration 직후 탭 제목이 바뀐다.
  it("index.html의 title·og:title이 홈 문서 제목과 일치한다", () => {
    expect(readTag(/<title>([^<]*)<\/title>/)).toBe(siteConfig.documentTitle);
    expect(
      readTag(/<meta\s+property="og:title"\s+content="([^"]*)"/),
    ).toBe(siteConfig.documentTitle);
  });

  it("og:url이 사이트맵의 루트 URL과 일치한다", () => {
    const rootLoc = sitemap.match(/<loc>([^<]+)<\/loc>/)?.[1];
    expect(readTag(/<meta\s+property="og:url"\s+content="([^"]*)"/)).toBe(
      rootLoc,
    );
  });
});
