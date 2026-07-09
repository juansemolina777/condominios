/* ══════════════════════════════════════
   CONSORCIAL — JavaScript Principal
   ══════════════════════════════════════ */

// ↓ PASO 1: Pegá acá tu URL de Formspree
const FORMSPREE_URL = 'https://formspree.io/f/xzdanekg';

// ── Envío del formulario ──
const formBtn = document.querySelector('.form-btn');

if (formBtn) {
  formBtn.addEventListener('click', async () => {
    const nombre   = document.querySelector('#campo-nombre').value.trim();
    const email    = document.querySelector('#campo-email').value.trim();
    const telefono = document.querySelector('#campo-telefono').value.trim();
    const mensaje  = document.querySelector('#campo-mensaje').value.trim();

    if (!nombre || !email) {
      mostrarAlerta('Por favor completá tu nombre y correo electrónico.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarAlerta('Por favor ingresá un correo electrónico válido.', 'error');
      return;
    }

    formBtn.disabled = true;
    formBtn.textContent = 'Enviando...';

    try {
      const respuesta = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nombre, email, telefono, mensaje })
      });

      if (respuesta.ok) {
        mostrarAlerta(`¡Gracias, ${nombre}! Te contactamos pronto.`, 'ok');
        document.querySelector('#campo-nombre').value   = '';
        document.querySelector('#campo-email').value    = '';
        document.querySelector('#campo-telefono').value = '';
        document.querySelector('#campo-mensaje').value  = '';
      } else {
        mostrarAlerta('Hubo un error. Intentá de nuevo o escribinos por WhatsApp.', 'error');
      }
    } catch (err) {
      mostrarAlerta('No se pudo conectar. Revisá tu conexión.', 'error');
    } finally {
      formBtn.disabled = false;
      formBtn.textContent = 'Enviar mensaje';
    }
  });
}

function mostrarAlerta(texto, tipo) {
  let alerta = document.querySelector('.form-alerta');
  if (!alerta) {
    alerta = document.createElement('div');
    alerta.className = 'form-alerta';
    formBtn.parentNode.insertBefore(alerta, formBtn);
  }
  alerta.textContent = texto;
  alerta.style.cssText = `
    padding: 12px 16px; border-radius: 4px; font-size: .9rem;
    font-weight: 600; margin-bottom: 14px;
    background: ${tipo === 'ok' ? '#e6f4ea' : '#fdecea'};
    color:       ${tipo === 'ok' ? '#1e6e3a' : '#b71c1c'};
    border:      1px solid ${tipo === 'ok' ? '#a8d5b5' : '#f5c6c6'};
  `;
}

// ── Nav: fondo sólido al hacer scroll ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(13, 31, 60, 1)';
    nav.style.boxShadow  = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = 'rgba(13, 31, 60, 0.96)';
    nav.style.boxShadow  = 'none';
  }
});

// ── Animación al hacer scroll ──
const fadeEls = document.querySelectorAll(
  '.pilar-card, .diag-item, .contact-card, .compromiso-item, .stat-item'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
  observer.observe(el);
});