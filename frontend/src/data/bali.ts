import type { Destination } from '../types';
import { img } from './img';

export const bali: Destination = {
  slug: 'bali',
  name: 'Bali',
  flag: '\u{1F1EE}\u{1F1E9}',
  region: 'Islands',
  vibes: ['Beach', 'Culture', 'Nature'],
  tagline: 'Rice terraces, temple ceremonies and surf at sunset.',
  description:
    'The Island of the Gods, in Indonesia: spiritual, green and endlessly photogenic. Small offerings of flowers sit on every doorstep, temple ceremonies fill the streets with music, and in one day you can go from jungle waterfalls to clifftop sunsets.',
  bestTimeToVisit: 'April - October (dry season); May, June and September have fewer crowds than July - August',
  heroImageUrl: img('bali'),
  lat: -8.34,
  lng: 115.09,
  places: [
    {
      slug: 'ubud',
      name: 'Ubud',
      description: 'Bali\'s cultural heart in the jungle: rice terraces, yoga, craft villages and traditional dance.',
      funFact: 'The Balinese rice terraces are watered by "subak", a cooperative irrigation system run by water temples since the 9th century. It is a UNESCO World Heritage site.',
      heroImageUrl: img('bali'),
      activities: [
        { rank: 1, title: 'Tegallalang Rice Terraces at sunrise', description: 'Walk the green steps before the heat and the crowds - and try the famous jungle swing if you like.', imageUrl: img('bali', 800) },
        { rank: 2, title: 'Sacred Monkey Forest Sanctuary', description: 'Moss-covered temples and hundreds of long-tailed macaques. Hide sunglasses and snacks.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'Campuhan Ridge Walk', description: 'An easy path along a grassy ridge between two river valleys, lovely at sunrise or sunset.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Tirta Empul water temple', description: 'Join the Balinese in a purification ritual under the holy springs. Sarongs are provided.', imageUrl: img('bali', 800) },
        { rank: 5, title: 'Kecak or Legong dance at night', description: 'Traditional dance at the Ubud Palace or a local temple, lit by fire and lanterns.', imageUrl: img('bali', 800) },
      ],
      gallery: [
        { url: img('bali', 1200), caption: 'Rice terraces' },
        { url: img('landscape', 1200), caption: 'Ubud jungle' },
      ],
    },
    {
      slug: 'uluwatu',
      name: 'Uluwatu',
      description: 'The wild southern tip of Bali: limestone cliffs, hidden beaches and world-class surf.',
      funFact: 'Pura Luhur Uluwatu, perched about 70 m above the ocean, is one of Bali\'s six key temples that are believed to protect the island from evil spirits.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Uluwatu Temple and the Kecak fire dance', description: 'A clifftop temple at sunset, followed by the hypnotic chanting dance. Watch out for the monkeys.', imageUrl: img('bali', 800) },
        { rank: 2, title: 'Padang Padang and Bingin beaches', description: 'Small coves reached by steps through the cliffs, with golden sand and clear water.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'Watch or learn to surf', description: 'Some of the most famous reef breaks in the world - beginners can take lessons on gentler beaches.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Melasti Beach', description: 'A road carved through white cliffs leads down to a wide beach with turquoise water.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Sunset at a clifftop beach club', description: 'Cocktails and an infinity pool above the Indian Ocean.', imageUrl: img('bali', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Uluwatu cliffs' },
        { url: img('lake', 1200), caption: 'Indian Ocean' },
      ],
    },
    {
      slug: 'canggu-seminyak',
      name: 'Canggu & Seminyak',
      description: 'Bali\'s trendy west coast: surf beaches, cafes, boutiques and the best sunsets on the island.',
      funFact: 'Canggu was a quiet area of rice fields and a few surf spots until the 2010s - today it is one of the most popular places in the world for digital nomads.',
      heroImageUrl: img('bali'),
      activities: [
        { rank: 1, title: 'Tanah Lot at sunset', description: 'A sea temple on a rock in the ocean - at low tide you can walk to its base.', imageUrl: img('bali', 800) },
        { rank: 2, title: 'Surf lesson at Batu Bolong', description: 'Soft, rolling waves that are perfect for your first time on a board.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Cafe and brunch hopping', description: 'Smoothie bowls, great coffee and healthy food on every street.', imageUrl: img('planning', 800) },
        { rank: 4, title: 'Seminyak boutiques and spas', description: 'Shop local designers, then book a traditional Balinese massage.', imageUrl: img('bali', 800) },
        { rank: 5, title: 'Sunset at Echo Beach or a beach club', description: 'Bean bags on the sand and live music as the sky turns orange.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('bali', 1200), caption: 'Sunset on the west coast' },
        { url: img('lake', 1200), caption: 'Surf beach' },
      ],
    },
    {
      slug: 'nusa-penida',
      name: 'Nusa Penida',
      description: 'A rugged island a short fast-boat ride from Bali, famous for its dramatic cliffs and manta rays.',
      funFact: 'Kelingking Beach is nicknamed "T-Rex Bay" because, seen from above, the cliff looks like the head of a Tyrannosaurus.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Kelingking Beach viewpoint', description: 'The famous T-Rex cliff. The path down to the beach is very steep - only go with good shoes.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Snorkel with manta rays', description: 'Swim with giant mantas at Manta Point or Manta Bay on a boat trip.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Broken Beach and Angel\'s Billabong', description: 'A natural rock arch over a circular bay, and a clear rock pool next to it (check the waves first).', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Diamond Beach', description: 'Steps carved into the cliff lead to white sand and blue water on the east coast.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Sunrise at the Thousand Islands viewpoint', description: 'A row of small islands below the cliffs, golden in the morning light.', imageUrl: img('mountains', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Nusa Penida cliffs' },
        { url: img('lake', 1200), caption: 'Manta rays waters' },
      ],
    },
  ],
};
