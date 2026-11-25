import type { Destination } from '../types';
import { img } from './img';

export const thailand: Destination = {
  slug: 'thailand',
  name: 'Thailand',
  flag: '\u{1F1F9}\u{1F1ED}',
  region: 'Asia',
  vibes: ['Beach', 'Culture'],
  tagline: 'Golden temples, island hopping and the best street food on Earth.',
  description:
    'From the buzz of Bangkok to the jungles and temples of the north and the limestone islands of the south. Thailand is the Land of Smiles: night markets, long-tail boats, mango sticky rice and some of the most beautiful beaches in Asia.',
  bestTimeToVisit: 'November - April (dry season on the Andaman coast: Phuket, Krabi, Phi Phi); November - February is the coolest',
  heroImageUrl: img('thailand'),
  lat: 15.87,
  lng: 100.99,
  places: [
    {
      slug: 'bangkok',
      name: 'Bangkok',
      description: 'A non-stop capital of golden temples, river boats, rooftop bars and street food on every corner.',
      funFact: 'Bangkok\'s full ceremonial name, starting with "Krung Thep Maha Nakhon", is the longest place name in the world - Thais simply call the city Krung Thep, the "City of Angels".',
      heroImageUrl: img('thailand'),
      activities: [
        { rank: 1, title: 'Grand Palace and Wat Phra Kaew', description: 'The dazzling former royal residence and the temple of the Emerald Buddha. Cover your shoulders and knees.', imageUrl: img('thailand', 800) },
        { rank: 2, title: 'Wat Pho and Wat Arun', description: 'See the 46 m Reclining Buddha, then take the ferry across the river to Wat Arun for sunset.', imageUrl: img('thailand', 800) },
        { rank: 3, title: 'Chinatown street food at night', description: 'Yaowarat Road lights up with neon signs and stalls selling noodles, seafood and mango sticky rice.', imageUrl: img('road', 800) },
        { rank: 4, title: 'Long-tail boat through the canals', description: 'Explore the khlongs of Thonburi and see wooden stilt houses and the old side of the city.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Chatuchak Weekend Market', description: 'One of the largest markets in the world, with thousands of stalls - go early, it gets hot.', imageUrl: img('road', 800) },
      ],
      gallery: [
        { url: img('thailand', 1200), caption: 'Temples of Bangkok' },
        { url: img('road', 1200), caption: 'City streets' },
      ],
    },
    {
      slug: 'chiang-mai',
      name: 'Chiang Mai',
      description: 'The relaxed capital of the north: an old walled city, mountain temples and cooking classes.',
      funFact: 'Chiang Mai has more than 300 Buddhist temples - almost as many as Bangkok, in a city a fraction of the size.',
      heroImageUrl: img('mountains'),
      activities: [
        { rank: 1, title: 'Wat Phra That Doi Suthep', description: 'Climb the naga staircase of about 300 steps to the golden mountain temple, with views over the city.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'An ethical elephant sanctuary', description: 'Feed and walk with rescued elephants at a sanctuary that does not offer riding.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'Thai cooking class', description: 'Shop at a local market, then cook your own curry paste, pad thai and mango sticky rice.', imageUrl: img('thailand', 800) },
        { rank: 4, title: 'Old City temples by bike', description: 'Cycle between Wat Chedi Luang, Wat Phra Singh and the quiet temples inside the old moat.', imageUrl: img('thailand', 800) },
        { rank: 5, title: 'Sunday Walking Street market', description: 'Handicrafts, khao soi noodles and live music along Ratchadamnoen Road every Sunday evening.', imageUrl: img('road', 800) },
      ],
      gallery: [
        { url: img('mountains', 1200), caption: 'Northern mountains' },
        { url: img('thailand', 1200), caption: 'Temple details' },
      ],
    },
    {
      slug: 'phuket',
      name: 'Phuket',
      description: 'Thailand\'s largest island: long sandy beaches, a colourful old town and boat trips to Phang Nga Bay.',
      funFact: 'Phuket grew rich from tin mining, which brought Chinese and European traders - that is why its Old Town is full of colourful Sino-Portuguese shophouses.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Phang Nga Bay and James Bond Island', description: 'Limestone towers rising out of emerald water, made famous by "The Man with the Golden Gun".', imageUrl: img('lake', 800) },
        { rank: 2, title: 'Phuket Old Town', description: 'Pastel shophouses, street art and cafes on Thalang Road, plus a night market on Sundays.', imageUrl: img('road', 800) },
        { rank: 3, title: 'The Big Buddha', description: 'A 45 m white marble Buddha on a hilltop, with views over Chalong Bay.', imageUrl: img('thailand', 800) },
        { rank: 4, title: 'Sunset at Promthep Cape', description: 'The southern tip of the island, where everyone gathers to watch the sun drop into the sea.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Dive or snorkel the Similan Islands', description: 'Granite boulders and some of the clearest water in Thailand (the park opens roughly October to May).', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Andaman coast' },
        { url: img('lake', 1200), caption: 'Phang Nga Bay' },
      ],
    },
    {
      slug: 'krabi',
      name: 'Krabi',
      description: 'Dramatic limestone cliffs, hidden lagoons and some of the best rock climbing in the world.',
      funFact: 'Railay is on the mainland, but it is cut off by tall limestone cliffs - the only way to get there is by boat.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Railay Beach and Phra Nang Cave', description: 'White sand framed by towering cliffs, and a cave beach full of offerings to the local sea goddess.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Four Islands tour by long-tail boat', description: 'Hop between Poda, Chicken Island and Tup Island, where a sandbar appears at low tide.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Rock climbing in Railay', description: 'Beginner-friendly courses on limestone walls right above the beach.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Tiger Cave Temple', description: 'More than 1,200 steep steps to a golden Buddha at the top, with jungle views all around. Go early.', imageUrl: img('thailand', 800) },
        { rank: 5, title: 'Emerald Pool and the hot springs', description: 'A turquoise pool in the forest, then a warm waterfall soak at Khlong Thom.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Limestone cliffs' },
        { url: img('lake', 1200), caption: 'Island hopping' },
      ],
    },
    {
      slug: 'phi-phi-islands',
      name: 'Phi Phi Islands',
      description: 'Turquoise lagoons, white beaches and cliffs straight out of a movie, a short ferry ride from Phuket or Krabi.',
      funFact: 'Maya Bay, where "The Beach" with Leonardo DiCaprio was filmed, was closed from 2018 to 2022 so the coral could recover - and blacktip reef sharks came back to the bay.',
      heroImageUrl: img('lake'),
      activities: [
        { rank: 1, title: 'Maya Bay early in the morning', description: 'See the famous bay before the day trips arrive. Swimming is not allowed and it closes for part of each year.', imageUrl: img('lake', 800) },
        { rank: 2, title: 'Hike to the Phi Phi Viewpoint', description: 'A sweaty climb for the classic view of the two curved bays of Phi Phi Don, best at sunset.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Snorkel Pileh Lagoon and Bamboo Island', description: 'Swim in an emerald lagoon surrounded by cliffs, then relax on a quiet white-sand island.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Kayak to Monkey Beach', description: 'Paddle along the cliffs to a small beach (watch your bags and do not feed the monkeys).', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Sunset and fire shows on Loh Dalum', description: 'Beach bars and fire dancers after dark - there are no cars on the island, so you walk everywhere.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('lake', 1200), caption: 'Turquoise lagoon' },
        { url: img('landscape', 1200), caption: 'Phi Phi coastline' },
      ],
    },
  ],
};
