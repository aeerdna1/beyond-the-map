import type { Destination } from '../types';
import { img } from './img';

export const singapore: Destination = {
  slug: 'singapore',
  name: 'Singapore',
  flag: '\u{1F1F8}\u{1F1EC}',
  region: 'Asia',
  vibes: ['Culture'],
  tagline: 'A garden city of the future, with hawker food from the past.',
  description:
    'Tiny, spotless and surprisingly green, with neighbourhoods that each feel like a different country. In one day you can have breakfast in Little India, lunch at a hawker stall with a Michelin star, walk under giant glowing Supertrees and end with a rooftop view over the bay.',
  bestTimeToVisit: 'February - April (drier and less humid); hot all year (about 25 - 32 C), with short tropical showers almost any day',
  heroImageUrl: img('singapore'),
  lat: 1.35,
  lng: 103.82,
  places: [
    {
      slug: 'marina-bay',
      name: 'Marina Bay',
      description: 'The famous skyline: Marina Bay Sands, the Merlion and a waterfront that lights up every night.',
      funFact: 'Much of Marina Bay is built on reclaimed land - Singapore has grown by about 25% since the 1960s by adding land from the sea.',
      heroImageUrl: img('singapore'),
      activities: [
        { rank: 1, title: 'Spectra light and water show', description: 'A free evening show on the waterfront promenade in front of Marina Bay Sands.', imageUrl: img('singapore', 800) },
        { rank: 2, title: 'Marina Bay Sands SkyPark', description: 'The observation deck 57 floors up, for the classic view over the bay and the city.', imageUrl: img('singapore', 800) },
        { rank: 3, title: 'The Merlion', description: 'Singapore\'s half-lion, half-fish symbol, with the best skyline photo spot right behind it.', imageUrl: img('singapore', 800) },
        { rank: 4, title: 'Lau Pa Sat satay street', description: 'A Victorian market hall where the street outside fills with satay grills every evening.', imageUrl: img('road', 800) },
        { rank: 5, title: 'Sunset walk around the bay', description: 'Cross the Helix Bridge and follow the promenade as the skyscrapers light up.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('singapore', 1200), caption: 'Marina Bay skyline' },
        { url: img('lake', 1200), caption: 'The bay at dusk' },
      ],
    },
    {
      slug: 'sentosa',
      name: 'Sentosa',
      description: 'Singapore\'s island playground: beaches, theme parks and cable cars, just across a short bridge.',
      funFact: 'Sentosa means "peace and tranquillity" in Malay, but the island used to be called Pulau Blakang Mati - "the island behind death" - and was a British military fort.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Universal Studios Singapore', description: 'Rides and shows across themed zones - go on a weekday to avoid the longest queues.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Cable car from Mount Faber', description: 'Glide over the harbour and the ships to the island, with views back over the city.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Siloso and Palawan beaches', description: 'Relax on the sand, and cross the suspension bridge to a small islet near Palawan Beach.', imageUrl: img('landscape', 800) },
        { rank: 4, title: 'S.E.A. Aquarium', description: 'One of the largest aquariums in the world, with a giant viewing panel full of manta rays and sharks.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Fort Siloso', description: 'Explore old tunnels and cannons from World War II at the western tip of the island.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Sentosa beaches' },
        { url: img('lake', 1200), caption: 'Island waters' },
      ],
    },
    {
      slug: 'chinatown-little-india',
      name: 'Chinatown & Little India',
      description: 'Colourful heritage districts full of temples, shophouses, spices and some of the best food in the city.',
      funFact: 'In 2016 a soya sauce chicken stall in Chinatown became one of the first street-food stalls in the world to get a Michelin star.',
      heroImageUrl: img('road'),
      activities: [
        { rank: 1, title: 'Buddha Tooth Relic Temple', description: 'A grand red-and-gold temple in Chinatown with a peaceful rooftop garden.', imageUrl: img('singapore', 800) },
        { rank: 2, title: 'Maxwell Food Centre', description: 'Try Hainanese chicken rice, Singapore\'s national dish, at one of its most famous hawker centres.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Sri Mariamman Temple', description: 'Singapore\'s oldest Hindu temple, with a tower covered in colourful carved gods.', imageUrl: img('singapore', 800) },
        { rank: 4, title: 'Tekka Centre and Serangoon Road', description: 'Biryani, flower garlands and spice shops in the heart of Little India.', imageUrl: img('road', 800) },
        { rank: 5, title: 'Kampong Glam and Haji Lane', description: 'The golden Sultan Mosque, Arab Street and narrow lanes full of murals and small boutiques.', imageUrl: img('road', 800) },
      ],
      gallery: [
        { url: img('road', 1200), caption: 'Heritage streets' },
        { url: img('singapore', 1200), caption: 'Temples and shophouses' },
      ],
    },
    {
      slug: 'gardens-nature',
      name: 'Gardens & Nature',
      description: 'The "City in a Garden": futuristic gardens, rainforest walks and one of the best zoos in the world.',
      funFact: 'The Singapore Botanic Gardens are more than 160 years old and were the first tropical botanic garden to become a UNESCO World Heritage site.',
      heroImageUrl: img('lake'),
      activities: [
        { rank: 1, title: 'Gardens by the Bay and the Supertrees', description: 'Walk the OCBC Skyway between the giant Supertrees, then stay for the Garden Rhapsody light show at night.', imageUrl: img('singapore', 800) },
        { rank: 2, title: 'Cloud Forest and Flower Dome', description: 'An indoor mountain with a 35 m waterfall, and the largest glass greenhouse in the world.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Singapore Botanic Gardens', description: 'Free entry, with the National Orchid Garden showing more than 1,000 orchid species.', imageUrl: img('landscape', 800) },
        { rank: 4, title: 'Night Safari', description: 'The world\'s first nocturnal zoo - see animals awake after dark on a tram ride or a walking trail.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Southern Ridges and Henderson Waves', description: 'A walk through the treetops along a 10 km chain of parks and the wave-shaped Henderson Waves bridge.', imageUrl: img('mountains', 800) },
      ],
      gallery: [
        { url: img('singapore', 1200), caption: 'Gardens by the Bay' },
        { url: img('lake', 1200), caption: 'Green Singapore' },
      ],
    },
  ],
};
