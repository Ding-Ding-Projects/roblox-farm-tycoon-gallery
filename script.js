const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
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
