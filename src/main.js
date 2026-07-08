// EDIT THE LINKS BELOW — this is the only place you need to touch
// for URLs and social handles.
var LINKS = {
  shop: 'https://zhatka.com.au/',
  recipes: 'https://zhatka.com.au/pages/recipes',   // placeholder — page not created yet
  feedback: 'https://zhatka.com.au/pages/contact',  // guessed contact page — confirm real URL
  instagram: 'https://instagram.com/',              // placeholder — add real handle
  tiktok: 'https://tiktok.com/',                     // placeholder — add real handle
  facebook: 'https://facebook.com/',                 // placeholder — add real handle
};

document.getElementById('link-shop').href = LINKS.shop;
document.getElementById('link-recipes').href = LINKS.recipes;
document.getElementById('link-feedback').href = LINKS.feedback;
document.getElementById('link-instagram').href = LINKS.instagram;
document.getElementById('link-tiktok').href = LINKS.tiktok;
document.getElementById('link-facebook').href = LINKS.facebook;
document.getElementById('copyright').textContent = '© ' + new Date().getFullYear() + ' Zhatka';
document.getElementById('version').textContent = 'v' + __APP_VERSION__;

var footer = document.querySelector('footer');
function syncFooterSpace() {
  document.documentElement.style.setProperty('--footer-h', footer.offsetHeight + 'px');
}
syncFooterSpace();
window.addEventListener('resize', syncFooterSpace);

var splash = document.getElementById('splash');
var dismissed = false;
function dismissSplash() {
  if (dismissed) return;
  dismissed = true;
  splash.classList.add('hidden');
  setTimeout(function () { splash.classList.add('removed'); }, 500);
}
splash.addEventListener('click', dismissSplash);
setTimeout(dismissSplash, 1500);
