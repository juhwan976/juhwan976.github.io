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
            "JSX 이벤트 prop에는 인라인 함수를 사용하지 마세요. 명명된 핸들러 또는 useMemo 핸들러 맵을 사용하세요.",
        },
        {
          selector:
            "JSXAttribute[name.name=/^on[A-Z]/] > JSXExpressionContainer > FunctionExpression",
          message:
            "JSX 이벤트 prop에는 인라인 함수를 사용하지 마세요. 명명된 핸들러 또는 useMemo 핸들러 맵을 사용하세요.",
        },
      ],

      // (선택) 팀 합의로 켜도 좋음: 타입/값 import 정리
      // "@typescript-eslint/consistent-type-imports": [
      //   "warn",
      //   { prefer: "type-imports", fixStyle: "inline-type-imports" },
      // ],
    },
  },

  /**
   * =========================
   * Layer 규칙: View/Component에서 API 직접 접근 금지
   * =========================
   *
   * 목표: DTO가 View로 새는 걸 차단
   * - View/Component/Routes/Hooks 등에서 api 레이어를 직접 import 못 하게
   */
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // alias 기반
            {
              group: ["@/api/*", "@/api/**"],
              message:
                "View/Component에서 api 레이어를 직접 import 하지 마세요. Service/Controller 또는 Provider 훅을 통해 접근하세요.",
            },
            // 상대경로/절대경로 기반
            {
              group: ["src/api/*", "src/api/**"],
              message:
                "View/Component에서 api 레이어를 직접 import 하지 마세요. Service/Controller 또는 Provider 훅을 통해 접근하세요.",
            },
          ],
        },
      ],
    },
  },

  /**
   * =========================
   * 예외: api 레이어 내부에서는 api import 허용
   * =========================
   */
  {
    files: ["src/api/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },

  /**
   * =========================
   * Controller Hook 규칙: 타이머 우회 금지
   * =========================
   */
  {
    files: ["src/views/**/hooks/use*Controller.ts"],
    rules: {
      "no-restricted-globals": ["error", "setTimeout", "setInterval"],
      "no-restricted-properties": [
        "error",
        {
          object: "window",
          property: "setTimeout",
          message: "Controller 훅에서 setTimeout 우회를 사용하지 마세요.",
        },
        {
          object: "window",
          property: "setInterval",
          message: "Controller 훅에서 setInterval 우회를 사용하지 마세요.",
        },
      ],
    },
  },

  /**
   * =========================
   * Layer 규칙: Entity는 순수 도메인 (React/View 의존 금지)
   * =========================
   */
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["react", "react/*"], message: "Entity는 React에 의존하면 안 됩니다." },
            { group: ["@/views/*", "@/views/**"], message: "Entity는 View에 의존하면 안 됩니다." },
            { group: ["src/views/*", "src/views/**"], message: "Entity는 View에 의존하면 안 됩니다." },
            { group: ["@/components/*", "@/components/**"], message: "Entity는 Component에 의존하면 안 됩니다." },
            { group: ["src/components/*", "src/components/**"], message: "Entity는 Component에 의존하면 안 됩니다." },
            { group: ["@/view_models/*", "@/view_models/**"], message: "Entity는 ViewModel에 의존하면 안 됩니다." },
            { group: ["src/view_models/*", "src/view_models/**"], message: "Entity는 ViewModel에 의존하면 안 됩니다." },
          ],
        },
      ],
    },
  },

  /**
   * =========================
   * Layer 규칙: ViewModel은 네트워크(API) 직접 의존 금지
   * =========================
   */
  {
    files: ["src/view_models/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/api/*", "@/api/**"],
              message:
                "ViewModel은 API 레이어에 직접 의존하지 마세요. Service/Controller에서 데이터를 가져오고 ViewModel은 가공에 집중하세요.",
            },
            {
              group: ["src/api/*", "src/api/**"],
              message:
                "ViewModel은 API 레이어에 직접 의존하지 마세요. Service/Controller에서 데이터를 가져오고 ViewModel은 가공에 집중하세요.",
            },
          ],
        },
      ],
    },
  },

  /**
   * =========================
   * ignores
   * =========================
   */
  {
    ignores: ["dist", "storybook-static", "coverage", ".agents"],
  }
);