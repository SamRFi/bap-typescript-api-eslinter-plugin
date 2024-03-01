import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://your-docs/${name}`);

export const myCustomRule = createRule({
  create(context) {
    return {
      // Define node selectors and corresponding listeners
      // Example: Identifier(node) { ... }
    };
  },
  name: 'my-custom-rule',
  meta: {
    // Rule metadata
    type: 'problem',
    docs: {
      description: 'Enforce specific API call structure',
      recommended: 'error',
    },
    schema: [], // Define options for the rule if necessary
  },
  defaultOptions: [],
});