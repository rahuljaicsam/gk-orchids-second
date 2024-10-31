import { renderNavigation } from './components/navigation.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderProducts } from './pages/products.js';
import { renderContact } from './pages/contact.js';
import { createClient } from '@libsql/client';

// Database connection setup
const client = createClient({
  url: 'libsql://gkorchids-db.turso.io',
  // authToken would be needed for production
});

// Product data
const products = [
  {
    name: 'Generic Medicines',
    description: 'High-quality generic medications for various conditions',
    category: 'Medicine'
  },
  {
    name: 'Dietary Supplements',
    description: 'Essential vitamins and minerals for overall health',
    category: 'Supplements'
  },
  {
    name: 'Healthcare Products',
    description: 'Medical devices and healthcare accessories',
    category: 'Healthcare'
  }
];

// Router
function router() {
  const path = window.location.pathname;
  const main = document.querySelector('main');
  
  switch(path) {
    case '/':
      main.innerHTML = renderHome();
      break;
    case '/about':
      main.innerHTML = renderAbout();
      break;
    case '/products':
      main.innerHTML = renderProducts(products);
      break;
    case '/contact':
      main.innerHTML = renderContact();
      initContactForm();
      break;
    default:
      main.innerHTML = renderHome();
  }
}

// Handle contact form
function initContactForm() {
  document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    try {
      // In a real implementation, you would send this to your backend
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      e.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Render static components
  document.body.insertAdjacentHTML('afterbegin', renderNavigation());
  document.body.insertAdjacentHTML('beforeend', renderFooter());
  
  // Handle routing
  router();
  
  // Handle navigation
  document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.history.pushState({}, '', href);
      router();
    }
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', router);
});