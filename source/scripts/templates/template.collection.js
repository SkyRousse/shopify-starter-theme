/**
 * Scripts that are tightly coupled to the collection template
 *
 * Compiles to ./assets/template.collection.js & ./assets/template.collection.css
 */

import '../../styles/templates/template.collection.css';

/* eslint no-console: 0 */
console.log('sucessfully added template.collection.js and template.collection.css');
console.warn(
  '***** IMPORTANT *****',
  'if not using either of these files make sure to set the corresponding variable(s) to false',
  'located inside ./snippets/asset-router.js & ./snippets/asset-router.css'
);
