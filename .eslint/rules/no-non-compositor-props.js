/**
 * ESLint Plugin: No Non-Compositor Animation Properties
 * 
 * Prevents using non-compositor properties in Framer Motion animations.
 * Only `transform` and `opacity` should be animated for best performance.
 * 
 * Non-compositor properties trigger layout recalculation and paint,
 * causing jank and poor performance, especially on mobile devices.
 * 
 * @see https://web.dev/animations-guide/
 * @see https://www.framer.com/motion/animation/#performance
 */

const NON_COMPOSITOR_PROPS = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontSize',
  'lineHeight',
  'borderWidth',
  'borderRadius', // Partially compositor-safe, but can trigger paint
];



module.exports = {
  rules: {
    'no-non-compositor-props': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Disallow non-compositor properties in Framer Motion animations',
          category: 'Performance',
          recommended: true,
        },
        messages: {
          nonCompositorProp:
            'Avoid animating "{{ prop }}" - use compositor-only properties (transform, opacity) instead. Consider using {{ suggestion }} for better performance.',
        },
        schema: [],
      },
      create(context) {
        return {
          JSXAttribute(node) {
            // Check if this is a Framer Motion component
            const parentName = node.parent?.name?.name;
            if (!parentName || !parentName.startsWith('motion.')) {
              return;
            }

            // Check animation props: animate, initial, whileHover, whileTap, etc.
            const animationProps = [
              'animate',
              'initial',
              'whileHover',
              'whileTap',
              'whileFocus',
              'whileDrag',
              'whileInView',
              'exit',
            ];

            if (!animationProps.includes(node.name.name)) {
              return;
            }

            // Check if value is an object expression
            if (node.value?.expression?.type !== 'ObjectExpression') {
              return;
            }

            // Check each property in the animation object
            const properties = node.value.expression.properties;
            properties.forEach((prop) => {
              if (prop.type !== 'Property') return;

              const propName =
                prop.key.type === 'Identifier'
                  ? prop.key.name
                  : prop.key.value;

              if (NON_COMPOSITOR_PROPS.includes(propName)) {
                // Suggest alternative
                const suggestion = getSuggestion(propName);

                context.report({
                  node: prop,
                  messageId: 'nonCompositorProp',
                  data: {
                    prop: propName,
                    suggestion,
                  },
                });
              }
            });
          },
        };
      },
    },
  },
};

/**
 * Get a compositor-safe alternative for a non-compositor property
 */
function getSuggestion(propName) {
  const suggestions = {
    left: 'x (translateX)',
    right: 'x (translateX)',
    top: 'y (translateY)',
    bottom: 'y (translateY)',
    width: 'scaleX',
    height: 'scaleY',
    margin: 'x/y (translate)',
    marginTop: 'y (translateY)',
    marginRight: 'x (translateX)',
    marginBottom: 'y (translateY)',
    marginLeft: 'x (translateX)',
    padding: 'Consider layout animations or avoid animating',
    paddingTop: 'Consider layout animations or avoid animating',
    paddingRight: 'Consider layout animations or avoid animating',
    paddingBottom: 'Consider layout animations or avoid animating',
    paddingLeft: 'Consider layout animations or avoid animating',
    fontSize: 'scale',
    lineHeight: 'scale',
    borderWidth: 'opacity or scale',
    borderRadius: 'Avoid animating or use will-change sparingly',
  };

  return suggestions[propName] || 'a compositor-only property';
}
