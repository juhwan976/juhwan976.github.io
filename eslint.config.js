import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  /**
   * =========================
   * Base (TS/TSX)
   * =========================
   */
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      /**
       * =========================
       * TypeScript 강화 규칙
       * =========================
       */

      // any 금지
      "@typescript-eslint/no-explicit-any": "error",

      // 불필요한 타입 단언 남발 방지
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],

      // 사용하지 않는 변수
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // JSX 이벤트 핸들러 인라인 함수 금지 (onClick={() => ...} 등)
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name=/^on[A-Z]/] > JSXExpressionContainer > ArrowFunctionExpression",
          message:
            "JSX 이벤트 prop에는 인라인 함수를 사용하지 마세요. 명명된 핸들러 또는 useCallback 핸들러를 사용하세요.",
        },
        {
          selector:
            "JSXAttribute[name.name=/^on[A-Z]/] > JSXExpressionContainer > FunctionExpression",
          message:
            "JSX 이벤트 prop에는 인라인 함수를 사용하지 마세요. 명명된 핸들러 또는 useCallback 핸들러를 사용하세요.",
        },
      ],
    },
  },

  /**
   * =========================
   * Layer 규칙: 콘텐츠 데이터는 순수 데이터 (React/View 의존 금지)
   * =========================
   *
   * src/content/는 화면 문구·수치·에셋 경로의 단일 원천이다.
   * 프리렌더(entry-server)와 테스트가 그대로 import하므로 런타임/DOM에 의존하면 안 된다.
   */
  {
    files: ["src/content/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react/*", "react-dom", "react-dom/*"],
              message: "콘텐츠 데이터는 React에 의존하면 안 됩니다.",
            },
            {
              group: ["@/views/*", "@/views/**", "@/components/*", "@/components/**"],
              message: "콘텐츠 데이터는 View/Component에 의존하면 안 됩니다.",
            },
            {
              group: ["@/hooks/*", "@/hooks/**"],
              message: "콘텐츠 데이터는 훅에 의존하면 안 됩니다.",
            },
          ],
        },
      ],
    },
  },

  /**
   * =========================
   * 빌드 스크립트 (Node 환경)
   * =========================
   */
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * =========================
   * ignores
   * =========================
   */
  {
    ignores: ["dist", "dist-server", "coverage", ".agents"],
  }
);
