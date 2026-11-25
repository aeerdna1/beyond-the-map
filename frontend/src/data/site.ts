// Small site-wide constants. Kept apart from the destination seed data (src/data/index.ts),
// so pages and the footer can use them without downloading every destination.

/** Shown on the homepage "featured" grid. */
export const FEATURED = ['japan', 'iceland', 'morocco', 'bali', 'norway', 'hawaii'];

/** Contact details shown in the footer, the Plan my trip page and the privacy policy. */
export const CONTACT = {
  /** Data controller named in the privacy policy (GDPR Art. 13). */
  ownerName: 'Andreea Barbulescu',
  country: 'Romania',
  phone: '+40 726 206 555',
  whatsapp: 'https://wa.me/40726206555',
  email: 'andreea.barbulescu@yahoo.com',
  instagram: 'https://instagram.com/aeerdna_1',
  instagramHandle: '@aeerdna_1',
};
