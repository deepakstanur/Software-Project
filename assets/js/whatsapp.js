/* ===== Dhalam Couture — WhatsApp Module ===== */

const WhatsApp = (() => {
  let whatsappNumber = '919876543210';
  let defaultGreeting = 'Hi Dhalam Couture! 👋 I\'m interested in your collection.';

  function init(settings) {
    if (settings?.contact?.whatsappNumber) {
      whatsappNumber = settings.contact.whatsappNumber.replace('+', '');
    }
    if (settings?.contact?.whatsappGreeting) {
      defaultGreeting = settings.contact.whatsappGreeting;
    }
  }

  function buildURL(product, size, quantity) {
    const lines = [];
    lines.push(`Hi! I'd like to order from Dhalam Couture 🛍️`);
    lines.push('');
    lines.push(`*Product:* ${product.name}`);
    lines.push(`*Product ID:* ${product.id}`);
    if (size) lines.push(`*Size:* ${size}`);
    if (quantity && quantity > 1) lines.push(`*Quantity:* ${quantity}`);
    lines.push(`*Price:* ${product.currency}${product.price}`);
    lines.push('');
    lines.push('Please confirm availability and payment details. Thank you! 🙏');
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }

  function buildInquiryURL(product) {
    const lines = [];
    lines.push(`Hi! I have a question about this product:`);
    lines.push('');
    lines.push(`*${product.name}* (${product.id})`);
    lines.push(`*Price:* ${product.currency}${product.price}`);
    lines.push('');
    lines.push('Could you help me with more details?');
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }

  function buildGeneralURL() {
    const text = encodeURIComponent(defaultGreeting);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }

  function attachHandlers() {
    document.querySelectorAll('[data-wa-general]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(buildGeneralURL(), '_blank');
      });
    });
  }

  return { init, buildURL, buildInquiryURL, buildGeneralURL, attachHandlers };
})();

if (typeof module !== 'undefined') module.exports = WhatsApp;
