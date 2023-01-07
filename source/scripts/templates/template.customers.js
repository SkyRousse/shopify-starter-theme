/**
 * Scripts that are tightly coupled to the customers template
 *
 * Compiles to ./assets/template.customers.js & ./assets/template.customers.css
 */

import '../../styles/templates/template.customers.css';

/* eslint no-console: 0 */
console.log('sucessfully added template.customers.js and template.customers.css');
console.warn(
  '***** IMPORTANT *****',
  'if not using either of these files make sure to set the corresponding variable(s) to false',
  'located inside ./snippets/asset-router.js & ./snippets/asset-router.css'
);
