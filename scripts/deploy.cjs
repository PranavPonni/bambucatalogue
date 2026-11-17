'use strict';
const {execFileSync} = require('node:child_process');
const git = (...args) => execFileSync('git', args, {encoding: 'utf8'}).trim();
try {
  if (git('branch', '--show-current') !== 'main') {
    throw new Error('Deploy from the main branch used by GitHub Pages.');
  }
  if (git('status', '--porcelain')) {
    throw new Error('Commit your catalogue changes first, then run npm run deploy again. Review them with git status and git diff.');
  }
  execFileSync('git', ['push', 'origin', 'main'], {stdio: 'inherit'});
  console.log('Pushed main. GitHub Pages will publish the committed catalogue at https://pranavponni.github.io/bambucatalogue/');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
