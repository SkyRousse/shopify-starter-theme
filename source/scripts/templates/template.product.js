/**
 * Scripts that are tightly coupled to the product template
 *
 * Compiles to ./assets/template.product.js & ./assets/template.product.css
 */

import '../../styles/templates/template.product.css';

/* eslint no-console: 0 */
console.log('sucessfully added template.product.js and template.product.css');
console.warn(
  '***** IMPORTANT *****',
  'if not using either of these files make sure to set the corresponding variable(s) to false',
  'located inside ./snippets/asset-router.js & ./snippets/asset-router.css'
);
