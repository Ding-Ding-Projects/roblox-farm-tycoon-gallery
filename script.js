const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
const gallery = document.querySelector('.gallery');
fetch('capture-inventory.json').then((response) => response.json()).then((inventory) => {
  const dates = new Map(inventory.publishable.map((item) => [item.image, item.capturedAt]));
  [...cards].sort((a, b) => {
    const imageA = a.querySelector('img').getAttribute('src').split('/').pop();
    const imageB = b.querySelector('img').getAttribute('src').split('/').pop();
    const timeA = dates.get(imageA) && dates.get(imageA) !== 'unavailable' ? Date.parse(dates.get(imageA)) : -Infinity;
    const timeB = dates.get(imageB) && dates.get(imageB) !== 'unavailable' ? Date.parse(dates.get(imageB)) : -Infinity;
    return timeB - timeA;
  }).forEach((card) => gallery.appendChild(card));
}).catch(() => {});
filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((item) => item.classList.toggle('active', item === filter));
  const selected = filter.dataset.filter;
  cards.forEach((card) => { card.hidden = selected !== 'all' && card.dataset.kind !== selected; });
}));
const dialog = document.querySelector('#viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerCaption = document.querySelector('#viewer-caption');
document.querySelectorAll('.image-button').forEach((button) => button.addEventListener('click', () => {
  const image = button.querySelector('img');
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = button.closest('.card').querySelector('h2').textContent;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
