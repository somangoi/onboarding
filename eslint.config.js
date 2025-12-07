import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".yarn/**", ".pnp.*", "public/mockServiceWorker.js"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // [커스텀1] React 17+ 버전부터는 JSX 사용 시 React를 import 하지 않아도 되므로 꺼둠
      "react/react-in-jsx-scope": "off",
      // [커스텀2] 일관된 네이밍을 강제하여 리팩토링 효율을 높이고, 불필요한 코드 포함을 막아 트리쉐이킹 효율을 극대화하기 위함
      "import/prefer-default-export": "off",
    },
  },
]);
