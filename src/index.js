'use strict'

module.exports = function() {
  return {
    name: 'transform-remove-import',
    visitor: {
      ImportDeclaration(path, stats) {
        const { source } = path.node
        const extensions = stats.opts.extensions;
        const hasExtensions = extensions && extensions.length;
        if (!hasExtensions) {
          path.remove();
        } else if (hasExtensions && source.value.match(new RegExp('\.(' + extensions.join('|') + ')$', 'i'))) {
          path.remove();
        }

      },
    },
  }
}
