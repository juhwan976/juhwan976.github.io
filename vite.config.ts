/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const SITEMAP_PATH = "public/sitemap.xml";
const ROUTE_SEO_PATH = "src/content/route_seo.json";

interface RouteSeo {
  readonly title: string;
  readonly description: string;
}

interface SitemapEntry {
  /** 사이트맵에 선언된 절대 URL */
  readonly url: string;
  /** 앞뒤 슬래시를 제거한 경로 (루트는 빈 문자열) */
  readonly pathname: string;
}

function readProjectFile(relativePath: string): string {
  return readFileSync(path.resolve(__dirname, relativePath), "utf-8");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readSitemapEntries(): SitemapEntry[] {
  const sitemap = readProjectFile(SITEMAP_PATH);

  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = match[1];
    return { url, pathname: new URL(url).pathname.replace(/^\/|\/$/g, "") };
  });
}

function readRouteSeo(): Map<string, RouteSeo> {
  const parsed: unknown = JSON.parse(readProjectFile(ROUTE_SEO_PATH));
  if (!isRecord(parsed)) {
    throw new Error(`${ROUTE_SEO_PATH}: 객체 형태여야 합니다.`);
  }

  const routeSeo = new Map<string, RouteSeo>();
  for (const [route, value] of Object.entries(parsed)) {
    if (!isRecord(value)) {
      throw new Error(`${ROUTE_SEO_PATH}: '${route}' 항목이 객체가 아닙니다.`);
    }
    const { title, description } = value;
    if (typeof title !== "string" || typeof description !== "string") {
      throw new Error(
        `${ROUTE_SEO_PATH}: '${route}' 항목에 title/description 문자열이 필요합니다.`,
      );
    }
    routeSeo.set(route, { title, description });
  }

  return routeSeo;
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 치환이 조용히 실패하면 잘못된 메타가 배포되므로, 대상 태그가 없으면 빌드를 멈춘다.
function replaceTag(
  html: string,
  pattern: RegExp,
  replacement: string,
  label: string,
): string {
  if (!pattern.test(html)) {
    throw new Error(`프리렌더: index.html에서 ${label} 태그를 찾지 못했습니다.`);
  }

  return html.replace(pattern, () => replacement);
}

// 상세 페이지 메타는 런타임에만 갱신되므로 정적 HTML에는 루트 값이 남는다.
// 크롤러와 링크 미리보기가 라우트별 값을 읽도록 사본에 직접 주입한다.
function injectRouteMeta(html: string, seo: RouteSeo, url: string): string {
  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);
  const canonical = escapeAttribute(url);

  let result = replaceTag(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
    "title",
  );
  result = replaceTag(
    result,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
    'meta[name="description"]',
  );
  result = replaceTag(
    result,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
    'meta[property="og:title"]',
  );
  result = replaceTag(
    result,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
    'meta[property="og:description"]',
  );

  // 사본은 `/projects/{slug}`와 `/projects/{slug}.html` 두 경로로 열리므로
  // canonical로 대표 URL을 지정한다.
  return replaceTag(
    result,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />\n    <link rel="canonical" href="${canonical}" />`,
    'meta[property="og:url"]',
  );
}

// GitHub Pages는 서버 측 rewrite가 없어 SPA 딥링크가 404.html로 떨어지고,
// 본문은 앱이 렌더링되지만 상태 코드는 404로 남아 크롤러가 색인하지 못한다.
// Pages가 확장자 없는 요청을 `{경로}.html`로 해석하므로, 사이트맵에 선언한
// 경로마다 메타를 주입한 index.html 사본을 만들어 200으로 응답시킨다.
function prerenderSitemapRoutes(): Plugin {
  return {
    name: "prerender-sitemap-routes",
    apply: "build",
    // index.html은 Vite 내부 build 플러그인이 emit하므로 그 뒤에 실행해야 한다.
    enforce: "post",
    generateBundle(_options, bundle) {
      const indexHtml = bundle["index.html"];
      if (indexHtml?.type !== "asset" || typeof indexHtml.source !== "string") {
        throw new Error("프리렌더: 빌드 결과에서 index.html을 찾지 못했습니다.");
      }

      const routeSeo = readRouteSeo();

      for (const { url, pathname } of readSitemapEntries()) {
        if (pathname.length === 0) {
          continue;
        }

        const seo = routeSeo.get(`/${pathname}`);
        if (!seo) {
          throw new Error(
            `프리렌더: '/${pathname}'의 메타가 ${ROUTE_SEO_PATH}에 없습니다.`,
          );
        }

        this.emitFile({
          type: "asset",
          fileName: `${pathname}.html`,
          source: injectRouteMeta(indexHtml.source, seo, url),
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderSitemapRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
