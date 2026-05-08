/* ===== Dhalam Couture — WhatsApp Module ===== */

const WhatsApp = (() => {
  const WHATSAPP_NUMBER = '919526352500'; // no + sign in URL

  function buildWhatsAppURL(product, size, quantity = 1) {
    const sizeLine = size ? `\nSize: ${size}` : '\nSize: (Please help me with sizing)';
    const qtyLine = quantity > 1 ? `\nQuantity: ${quantity}` : '';
    const message = 
      `Hi Dhalam Couture! 🌿\n\n` +
      `I'm interested in ordering:\n` +
      `*${product.name}*\n` +
      `Product ID: ${product.id}${sizeLine}${qtyLine}\n\n` +
      `Kindly share availability and payment details. Thank you! 🙏`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function buildGeneralWhatsAppURL() {
    const message = 
      `Hi Dhalam Couture! 🌿\n\n` +
      `I found you on Instagram and I'd love to browse your collection.\n` +
      `Could you help me with what's currently available? Thank you!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function buildRestockWhatsAppURL(product) {
    const message = 
      `Hi Dhalam Couture! 🌿\n\n` +
      `I noticed that *${product.name}* (ID: ${product.id}) is currently out of stock.\n` +
      `Could you please notify me when it's back? Thank you!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Backwards compatibility for existing function names
  function buildURL(product, size, quantity) {
    return buildWhatsAppURL(product, size, quantity);
  }

  function buildInquiryURL(product) {
    return buildWhatsAppURL(product, null, 1);
  }

  function buildGeneralURL() {
    return buildGeneralWhatsAppURL();
  }

  function attachHandlers() {
    document.querySelectorAll('[data-wa-general]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(buildGeneralURL(), '_blank');
      });
    });
  }

  function init(settings) {
    // We hardcode the WhatsApp number above as requested in amendment 4, 
    // but keep init for compatibility.
  }

  return { init, buildURL, buildInquiryURL, buildGeneralURL, attachHandlers, buildWhatsAppURL, buildGeneralWhatsAppURL, buildRestockWhatsAppURL };
})();

if (typeof module !== 'undefined') module.exports = WhatsApp;
