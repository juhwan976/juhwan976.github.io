// 프리렌더(SSG) — 빌드 산출물의 각 라우트 HTML에 앱 마크업을 주입한다.
//
// 실행 순서 (package.json build):
//   1. vite build            → dist/ (클라이언트 번들 + 사이트맵 라우트별 HTML)
//   2. vite build --ssr      → dist-server/entry-server.js
//   3. node scripts/prerender.mjs → 각 HTML의 #root에 렌더 결과 주입
//
// 크롤러·링크 미리보기가 JS 실행 없이 실제 텍스트 콘텐츠를 읽을 수 있게 한다.
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(rootDir, "dist-server");

const { render } = await import(
  pathToFileURL(path.join(serverDir, "entry-server.js")).href
);

// vite.config.ts의 사이트맵 플러그인이 emit한 HTML(라우트별 메타 주입 완료)이 대상이다.
const targets = [
  { route: "/", file: path.join(distDir, "index.html") },
  ...readdirSync(path.join(distDir, "projects"))
    .filter((name) => name.endsWith(".html"))
    .map((name) => ({
      route: `/projects/${name.replace(/\.html$/, "")}`,
      file: path.join(distDir, "projects", name),
    })),
];

const ROOT_MARKER = '<div id="root"></div>';

for (const { route, file } of targets) {
  const html = readFileSync(file, "utf-8");
  if (!html.includes(ROOT_MARKER)) {
    throw new Error(`프리렌더: ${file}에서 '${ROOT_MARKER}'를 찾지 못했습니다.`);
  }

  const { appHtml, styleTags } = render(route);
  if (appHtml.length === 0) {
    throw new Error(`프리렌더: '${route}' 렌더 결과가 비어 있습니다.`);
  }

  const result = html
    .replace("</head>", `${styleTags}\n  </head>`)
    .replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);
  writeFileSync(file, result);
  console.log(`prerendered ${route} → ${path.relative(rootDir, file)}`);
}

// SSR 번들은 주입이 끝나면 필요 없다.
rmSync(serverDir, { recursive: true, force: true });
