import type { Destination } from '../types';
import { img } from './img';

export const malaysia: Destination = {
  slug: 'malaysia',
  name: 'Malaysia',
  flag: '\u{1F1F2}\u{1F1FE}',
  region: 'Asia',
  vibes: ['Culture', 'Nature', 'Beach'],
  tagline: 'Skyscrapers, rainforest and a food scene shaped by three cultures.',
  description:
    'Malay, Chinese and Indian flavours meet in cities, islands and one of the oldest rainforests in the world. One week you can eat your way through hawker stalls under the Petronas Towers, the next you can watch wild orangutans in Borneo.',
  bestTimeToVisit: 'December - April for the west coast (Penang, Langkawi); March - October for Sabah (Borneo); Kuala Lumpur is good all year',
  heroImageUrl: img('malaysia'),
  lat: 4.21,
  lng: 101.98,
  places: [
    {
      slug: 'kuala-lumpur',
      name: 'Kuala Lumpur',
      description: 'A modern skyline, colourful temples and some of the best street food in Asia.',
      funFact: 'At 452 m, the Petronas Twin Towers were the tallest buildings in the world from 1998 to 2004, and they are still the tallest twin towers on Earth.',
      heroImageUrl: img('malaysia'),
      activities: [
        { rank: 1, title: 'Petronas Twin Towers and the Skybridge', description: 'Walk the bridge between the towers, then see them light up from KLCC Park at night. Book tickets ahead.', imageUrl: img('malaysia', 800) },
        { rank: 2, title: 'Batu Caves', description: 'Climb the 272 rainbow-coloured steps to a Hindu temple inside a huge limestone cave, guarded by a giant golden statue.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Jalan Alor food street', description: 'Satay, chilli crab and durian at hundreds of open-air stalls every evening.', imageUrl: img('road', 800) },
        { rank: 4, title: 'Merdeka Square and the old town', description: 'The place where independence was declared in 1957, surrounded by Moorish-style buildings.', imageUrl: img('malaysia', 800) },
        { rank: 5, title: 'KL Tower or a rooftop bar at sunset', description: 'See the whole skyline turn gold, then sparkle as the city lights come on.', imageUrl: img('singapore', 800) },
      ],
      gallery: [
        { url: img('malaysia', 1200), caption: 'Kuala Lumpur skyline' },
        { url: img('road', 1200), caption: 'Street food at night' },
      ],
    },
    {
      slug: 'penang',
      name: 'Penang',
      description: 'An island famous for George Town\'s heritage streets, street art and legendary hawker food.',
      funFact: 'George Town\'s famous murals were started in 2012 by Lithuanian artist Ernest Zacharevic for a festival. They were meant to be temporary, and now they are the city\'s biggest attraction.',
      heroImageUrl: img('road'),
      activities: [
        { rank: 1, title: 'George Town street art hunt', description: 'Find the murals and iron caricatures around the UNESCO-listed old town - on foot or by bike.', imageUrl: img('road', 800) },
        { rank: 2, title: 'Hawker food crawl', description: 'Char kway teow, assam laksa and cendol at Gurney Drive or New Lane - Penang is Malaysia\'s food capital.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Kek Lok Si Temple', description: 'One of the largest Buddhist temples in Southeast Asia, beautifully lit with lanterns at night.', imageUrl: img('malaysia', 800) },
        { rank: 4, title: 'Penang Hill by funicular', description: 'Ride up the hill for cooler air and a view over George Town and the bridge to the mainland.', imageUrl: img('mountains', 800) },
        { rank: 5, title: 'Chew Jetty, the clan jetties', description: 'Wooden houses on stilts over the water, still home to Chinese clan families.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('road', 1200), caption: 'George Town streets' },
        { url: img('malaysia', 1200), caption: 'Temples of Penang' },
      ],
    },
    {
      slug: 'langkawi',
      name: 'Langkawi',
      description: 'A relaxed tropical archipelago of rainforest, mangroves and quiet beaches.',
      funFact: 'Langkawi is a group of 99 islands - a few more appear at low tide. The whole archipelago is a UNESCO Global Geopark and a duty-free zone.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'SkyCab and the Sky Bridge', description: 'A steep cable car ride up Mount Mat Cincang to a curved bridge hanging over the rainforest.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'Kilim mangrove boat or kayak tour', description: 'Glide through mangroves and limestone caves, with eagles circling overhead.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Island hopping', description: 'Swim in the Lake of the Pregnant Maiden on Dayang Bunting and relax on Beras Basah beach.', imageUrl: img('landscape', 800) },
        { rank: 4, title: 'Seven Wells Waterfall', description: 'A jungle hike to natural rock pools stacked one above the other.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Sunset at Pantai Cenang', description: 'The island\'s liveliest beach, with seafood dinners on the sand.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Langkawi beaches' },
        { url: img('lake', 1200), caption: 'Mangroves' },
      ],
    },
    {
      slug: 'borneo-sabah',
      name: 'Borneo (Sabah)',
      description: 'Wild Borneo: orangutans, rainforest rivers, Mount Kinabalu and some of the best diving in the world.',
      funFact: 'Borneo is the third-largest island in the world and the only one shared by three countries: Malaysia, Indonesia and Brunei.',
      heroImageUrl: img('mountains'),
      activities: [
        { rank: 1, title: 'Sepilok Orangutan Rehabilitation Centre', description: 'Watch rescued orangutans swing in for feeding time in the rainforest.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Kinabatangan River cruise', description: 'Look out for proboscis monkeys, hornbills and even pygmy elephants at dawn and dusk.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Climb or visit Mount Kinabalu', description: 'Malaysia\'s highest peak at 4,095 m - a two-day climb, or easy nature trails in Kinabalu Park.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Dive or snorkel at Sipadan', description: 'Turtles, barracuda tornadoes and reef sharks. Daily permits are limited, so book early.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Island hopping from Kota Kinabalu', description: 'Snorkel in Tunku Abdul Rahman Park, then catch sunset and the night market in the city.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('mountains', 1200), caption: 'Mount Kinabalu' },
        { url: img('landscape', 1200), caption: 'Borneo rainforest' },
      ],
    },
  ],
};
