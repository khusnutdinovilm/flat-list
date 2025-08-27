// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/block-order": [
      "error",
      {
        order: ["template", "script", "script[setup]", ["style[scoped]", "style"]],
      },
    ],
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always", // Для пустых элементов вроде <img/> и <input/>
          normal: "never", // Обычные теги не должны быть самозакрывающимися
          component: "always", // Самозакрывающиеся компоненты
        },
        svg: "always", // Самозакрывающиеся SVG теги
        math: "always", // Самозакрывающиеся MathML теги
      },
    ],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineOptions", "defineProps", "defineEmits", "defineModel", "defineSlots"],
        defineExposeLast: true,
      },
    ],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "SLOT",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          ["ATTR_DYNAMIC", "ATTR_STATIC", "ATTR_SHORTHAND_BOOL"],
          "EVENTS",
          "CONTENT",
        ],
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "default", "error"],
      },
    ],
    "vue/no-v-html": "warn",
    "vue/v-slot-style": ["error", "shorthand"],
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/custom-event-name-casing": ["error", "kebab-case"],
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
});
