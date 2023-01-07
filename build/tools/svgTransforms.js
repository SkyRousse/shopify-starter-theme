const path = require('path');
const fs = require('fs');
const glob = require('glob');
const svgo = require('svgo');

const svgTransforms = () => {
  const tmpDirPath = `${process.cwd()}/tmp`;

  // delete tmp dir if exists
  if (fs.existsSync(tmpDirPath)) {
    fs.rm(tmpDirPath, { recursive: true }, () => {});
  }

  // transform svgs to snippets
  glob('./source/**/*.svg', null, (err, filePaths) => {
    filePaths.forEach((filePath) => {
      // get file name
      const fileName = path.basename(filePath, path.extname(filePath));

      // get parent dir name
      let parentDirName = path.basename(path.dirname(filePath));
      if (parentDirName.endsWith('s')) parentDirName = parentDirName.slice(0, -1);

      const svgString = fs.readFileSync(filePath, 'utf-8');
      const result = svgo.optimize(svgString, {
        path: filePath,
        plugins: [
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ 'aria-hidden': true, focusable: false }],
            },
          },
          {
            name: 'addClassesToSVGElement',
            params: {
              className: `svg-${parentDirName} svg-${parentDirName}-${fileName}`,
            },
          },
        ],
      });

      fs.writeFileSync(
        `${process.cwd()}/snippets/${parentDirName}-${fileName}.liquid`,
        result.data
      );
    });
  });
};

module.exports.svgTransforms = svgTransforms;
