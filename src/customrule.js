"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAnyTypeRule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var types_1 = require("@typescript-eslint/types");
var createRule = utils_1.ESLintUtils.RuleCreator(function (name) { return "https://your-docs/".concat(name); });
exports.noAnyTypeRule = createRule({
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
    create: function (context) {
        return {
            // Target variable declarations
            VariableDeclarator: function (node) {
                var _a;
                if (node.type === types_1.AST_NODE_TYPES.VariableDeclarator && node.id.type === types_1.AST_NODE_TYPES.Identifier && ((_a = node.id.typeAnnotation) === null || _a === void 0 ? void 0 : _a.typeAnnotation.type) === types_1.AST_NODE_TYPES.TSAnyKeyword) {
                    context.report({
                        node: node.id,
                        messageId: 'noAnyType',
                    });
                }
            },
            // Target function declarations
            FunctionDeclaration: function (node) {
                if (node.type === types_1.AST_NODE_TYPES.FunctionDeclaration) {
                    node.params.forEach(function (param) {
                        var _a;
                        if (param.type === types_1.AST_NODE_TYPES.Identifier && ((_a = param.typeAnnotation) === null || _a === void 0 ? void 0 : _a.typeAnnotation.type) === types_1.AST_NODE_TYPES.TSAnyKeyword) {
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
