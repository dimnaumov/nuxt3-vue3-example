// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],

      'vue/html-indent': ['error', 2],

      "vue/max-attributes-per-line": ["error", {
        "singleline": 1,
        "multiline": {
          "max": 1,
        },
      }],

      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'ignore',
        'multiline': 'below',
      }],
    },
  },
)
