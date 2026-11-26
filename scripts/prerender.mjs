// 프리렌더(SSG) — 빌드 산출물의 각 라우트 HTML에 앱 마크업을 주입한다.
//
// 실행 순서 (package.json build):
//   1. vite build            → dist/ (클라이언트 번들 + 사이트맵 라우트별 HTML)
//   2. vite build --ssr      → dist-server/entry-server.js
//   3. node scripts/prerender.mjs → 각 HTML의 #root에 렌더 결과 주입, 404.html 생성
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

const ROOT_MARKER = '<div id="root"></div>';
const indexFile = path.join(distDir, "index.html");

// GitHub Pages는 매칭되는 파일이 없는 모든 요청(미정의 경로, 잘못된 slug,
// 트레일링 슬래시 등)에 404.html을 200 본문으로 내려준다.
// 어떤 라우트가 올지 알 수 없으므로 마크업을 굽지 않고 빈 셸을 둔다.
// main.tsx는 #root가 비어 있으면 hydrate 대신 createRoot로 렌더링하므로
// 어떤 라우트로 들어와도 hydration 불일치가 생기지 않는다.
// (홈 마크업을 주입하기 전의 원본 index.html에서 복사해야 한다.)
const shellHtml = readFileSync(indexFile, "utf-8");
if (!shellHtml.includes(ROOT_MARKER)) {
  throw new Error(`프리렌더: ${indexFile}에서 '${ROOT_MARKER}'를 찾지 못했습니다.`);
}
writeFileSync(path.join(distDir, "404.html"), shellHtml);
console.log("created 404.html (empty shell)");

// vite.config.ts의 사이트맵 플러그인이 emit한 HTML(라우트별 메타 주입 완료)이 대상이다.
const targets = [
  { route: "/", file: indexFile },
  ...readdirSync(path.join(distDir, "projects"))
    .filter((name) => name.endsWith(".html"))
    .map((name) => ({
      route: `/projects/${name.replace(/\.html$/, "")}`,
      file: path.join(distDir, "projects", name),
    })),
];

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
