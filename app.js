const restaurant = JSON.parse(document.getElementById('restaurant-data').textContent);
const text = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
const digits = restaurant.phone.replace(/\D/g, '');
const opening = `Hello ${restaurant.short}, I would like to make a food enquiry.`;

document.documentElement.style.setProperty('--accent', restaurant.accent);
document.documentElement.style.setProperty('--accent-deep', restaurant.deep);
document.title = `${restaurant.name} | ${restaurant.headline}`;
document.querySelector('meta[name="description"]').content = restaurant.description;
text('[data-business]', restaurant.short); text('[data-headline]', restaurant.headline); text('[data-intro]', restaurant.intro); text('[data-caption]', restaurant.caption); text('[data-menu-intro]', restaurant.menuIntro); text('[data-experience-title]', restaurant.experienceTitle); text('[data-experience-copy]', restaurant.experienceCopy); text('[data-footer]', restaurant.footer); text('[data-rating]', restaurant.rating); text('[data-reviews]', restaurant.reviews); text('[data-location]', restaurant.location); text('[data-hours]', restaurant.hours); text('[data-phone-display]', restaurant.display); text('[data-year]', new Date().getFullYear());
document.querySelectorAll('[data-phone]').forEach((link) => { link.href = `tel:${restaurant.phone}`; });
document.querySelectorAll('[data-directions]').forEach((link) => { link.href = restaurant.directions; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = `https://wa.me/${digits}?text=${encodeURIComponent(opening)}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
document.querySelector('[data-cards]').innerHTML = restaurant.cards.map((card, index) => `<article class="card" data-number="0${index + 1}"><i class="fa-solid ${card[0]}"></i><div><h3>${card[1]}</h3><p>${card[2]}</p></div></article>`).join('');

const gallery = document.querySelector('[data-gallery]');
const gallerySection = document.querySelector('[data-gallery-section]');
const galleryFiles = (document.body.dataset.gallery || '').split('|').filter(Boolean).slice(0, 6);
if (gallery && gallerySection && galleryFiles.length) {
  gallery.innerHTML = galleryFiles.map((file, index) => `<figure class="photo-card"><img src="assets/images/${file}" alt="${restaurant.short} menu or restaurant photo ${index + 1}" loading="lazy"></figure>`).join('');
  gallerySection.hidden = false;
}
const toggle = document.querySelector('[data-toggle]');
const nav = document.querySelector('[data-nav]');
const closeNav = () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.innerHTML = '<span class="sr-only">Open navigation</span><i class="fa-solid fa-bars"></i>'; };
toggle.addEventListener('click', () => { const open = document.body.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.innerHTML = open ? '<span class="sr-only">Close navigation</span><i class="fa-solid fa-xmark"></i>' : '<span class="sr-only">Open navigation</span><i class="fa-solid fa-bars"></i>'; });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

document.querySelector('[data-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = `Hello ${restaurant.short}, my name is ${form.get('name')}.%0A%0APhone: ${form.get('phone')}%0A%0AI would like to ask about:%0A${form.get('message')}`;
  document.querySelector('[data-status]').textContent = 'Opening WhatsApp…';
  window.open(`https://wa.me/${digits}?text=${message}`, '_blank', 'noopener');
});

