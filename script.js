const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuButton.textContent = isOpen ? '✕' : '☰';
});
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.textContent = '☰';
}));
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin: '-25% 0px -60% 0px'});
sections.forEach(section => sectionObserver.observe(section));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:banton.alyssagayle@gmail.com?subject=${subject}&body=${body}`;
});

// Accessible click-to-open details for projects and experience.
const detailData = {
  farm: `<h2 id="modal-title">Farm Analytics and Production Monitoring System</h2><p>Capstone project for Joross Farm, integrating crop and livestock records, farm activities, inventory, sales, weather information, and reporting.</p><p><strong>Technologies:</strong> Next.js, React, Python, FastAPI, Microsoft SQL Server.</p><p><strong>Status:</strong> Local prototype; evaluation and deployment are pending.</p><a class="paper-link" target="_blank" rel="noopener noreferrer" href="${'https://docs.google.com/document/d/11XmgbNZ14c6JzWeVksYsaUscoMNsr-wC/edit?usp=sharing&ouid=112963328693435628118&rtpof=true&sd=true'}">Open research paper ↗</a>`,
  hardware: `<h2 id="modal-title">Hardware Store Inventory Management System</h2><p>An academic system concept for organizing hardware store inventory, sales transactions, and supplier records.</p><ul><li>Product and stock tracking</li><li>Sales transaction processing and reporting</li><li>Low-stock notifications</li><li>Administrator dashboard</li></ul>`,
  repirego: `<h2 id="modal-title">Repirego — Android Device Tracking Application</h2><p>A proposed Android-only tracking application for lost or stolen phones.</p><ul><li>Location tracking and ringtone activation</li><li>Device locking and theft mode</li><li>Lost-device messages and account settings</li></ul><p>Features described are proposed concepts, not claims of a deployed application.</p>`,
  certificate: `<h2 id="modal-title">Oracle Academy — Java Fundamentals</h2><img src="oracle-java-certificate.png" alt="Java Fundamentals course completion certificate"><p>Award of Course Completion, June 19, 2024.</p>`,
  experience: `<h2 id="modal-title">Academic Project Experience</h2><h3>Farm Analytics and Production Monitoring System for Joross Farm</h3><p><strong>Capstone Researcher &amp; System Developer</strong></p><ul class="experience-bullets"><li>Conducted research and gathered requirements for crop, livestock, inventory, reporting, and farm monitoring features.</li><li>Designed and developed system features for crop and livestock production monitoring.</li><li>Worked on frontend and backend development, database integration, system testing, and debugging.</li><li>Analyzed system problems and implemented improvements based on project requirements.</li><li>Prepared research and technical documentation for the capstone project.</li></ul><h3>Other Academic System Development Projects</h3><p><strong>Student System Developer</strong></p><ul class="experience-bullets"><li>Developed various systems and applications as part of academic requirements.</li><li>Gained hands-on experience in system design, programming, database management, testing, and debugging.</li><li>Created user interfaces and implemented data-management features for school projects.</li></ul>`
};
detailData.education = `<h2 id="modal-title">Education</h2><h3>Bachelor of Science in Information Technology</h3><p><strong>STI College Legazpi</strong></p><p>Fourth-year BSIT student developing practical experience through academic programming, research, database, and web development projects.</p>`;
const overlay = document.getElementById('detail-modal');
const modalPanel = overlay.querySelector('.modal-panel');
const modalContent = document.getElementById('modal-content');
let previousFocus;
function openDetail(key){
  previousFocus=document.activeElement;
  modalContent.innerHTML=detailData[key]||'';
  overlay.hidden=false;document.body.classList.add('modal-open');
  overlay.querySelector('.modal-close').focus();
}
function closeDetail(){overlay.hidden=true;document.body.classList.remove('modal-open');previousFocus?.focus();}
document.querySelectorAll('[data-modal]').forEach(card=>{
  card.addEventListener('click',e=>{if(e.target.closest('a'))return;openDetail(card.dataset.modal)});
  card.addEventListener('keydown',e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openDetail(card.dataset.modal)}});
});
overlay.querySelector('.modal-close').addEventListener('click',closeDetail);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeDetail()});
document.addEventListener('keydown',e=>{
  if(overlay.hidden)return;
  if(e.key==='Escape')closeDetail();
  if(e.key==='Tab'){
    const focusable=[...modalPanel.querySelectorAll('button,a[href]')];
    const first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});
