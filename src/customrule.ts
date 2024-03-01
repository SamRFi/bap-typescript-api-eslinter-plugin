import { ESLintUtils } from '@typescript-eslint/utils';
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/types';

const createRule = ESLintUtils.RuleCreator(name => `https://your-docs/${name}`);

type MyRuleOptions = [];
type MyRuleMessageIds = 'noAnyType';

export const noAnyTypeRule = createRule<MyRuleOptions, MyRuleMessageIds>({
  name: 'no-any-type',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallows the use of the any type',
    },
    schema: [],
    messages: {
      noAnyType: 'Using the any type is not allowed.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Target variable declarations
      VariableDeclarator(node: TSESTree.Node) {
        if (node.type === AST_NODE_TYPES.VariableDeclarator && node.id.type === AST_NODE_TYPES.Identifier && node.id.typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSAnyKeyword) {
          context.report({
            node: node.id,
            messageId: 'noAnyType',
          });
        }
      },
      // Target function declarations
      FunctionDeclaration(node: TSESTree.Node) {
        if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
          node.params.forEach(param => {
            if (param.type === AST_NODE_TYPES.Identifier && param.typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSAnyKeyword) {
              context.report({
                node: param,
                messageId: 'noAnyType',
              });
            }
          });
        }
      },
    };
  },
});