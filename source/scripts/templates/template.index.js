/**
 * Scripts that are tightly coupled to the index template
 *
 * Compiles to ./assets/template.index.js & ./assets/template.index.css
 */

import '../../styles/templates/template.index.css';

/* eslint no-console: 0 */
console.log('sucessfully added template.index.js and template.index.css');
console.warn(
  '***** IMPORTANT *****',
  'if not using either of these files make sure to set the corresponding variable(s) to false',
  'located inside ./snippets/asset-router.js & ./snippets/asset-router.css'
);
