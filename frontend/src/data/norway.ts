import type { Destination } from '../types';
import { img } from './img';

export const norway: Destination = {
  slug: 'norway',
  name: 'Norway',
  flag: '\u{1F1F3}\u{1F1F4}',
  region: 'Europe',
  vibes: ['Nature'],
  tagline: 'Fjords, fishing villages and the Northern Lights.',
  description:
    'Dramatic fjords, red cabins on the water and Arctic adventures above the polar circle. Norway is the place where you take a train through the mountains in the morning, kayak a fjord in the afternoon and wait for the sky to turn green at night.',
  bestTimeToVisit: 'June - August (fjords, hiking, midnight sun) and late September - March (Northern Lights)',
  heroImageUrl: img('norway1'),
  lat: 60.47,
  lng: 8.47,
  places: [
    {
      slug: 'oslo',
      name: 'Oslo',
      description: 'A green, relaxed capital on the water, with world-class museums and saunas right on the fjord.',
      funFact: 'The Nobel Peace Prize is the only Nobel Prize awarded outside Sweden - it is presented every 10 December in Oslo City Hall.',
      heroImageUrl: img('norway2'),
      activities: [
        { rank: 1, title: 'Walk on the Opera House roof', description: 'The sloping white marble roof rises straight out of the fjord - walk all the way to the top for sunset.', imageUrl: img('norway2', 800) },
        { rank: 2, title: 'Vigeland Sculpture Park', description: 'More than 200 sculptures by Gustav Vigeland in Frogner Park, free and open all day.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'MUNCH museum', description: 'Edvard Munch\'s work, including versions of The Scream, in a striking building on the harbour.', imageUrl: img('norway2', 800) },
        { rank: 4, title: 'Bygdoy museums by ferry', description: 'Polar ships at the Fram Museum and Thor Heyerdahl\'s raft at the Kon-Tiki Museum.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Floating fjord sauna', description: 'Heat up in a sauna on the water, then jump into the fjord - the Norwegian way, all year round.', imageUrl: img('norway1', 800) },
      ],
      gallery: [
        { url: img('norway2', 1200), caption: 'Oslo harbour' },
        { url: img('lake', 1200), caption: 'Oslofjord' },
      ],
    },
    {
      slug: 'bergen-the-fjords',
      name: 'Bergen & the Fjords',
      description: 'The colourful Hanseatic port city and the gateway to Norway\'s most famous fjords.',
      funFact: 'Bergen is one of the rainiest cities in Europe, with rain on more than 200 days a year - locals joke that babies here are born with umbrellas.',
      heroImageUrl: img('norway1'),
      activities: [
        { rank: 1, title: 'Bryggen wharf', description: 'Wander the narrow alleys behind the colourful wooden merchant houses, a UNESCO World Heritage site.', imageUrl: img('norway2', 800) },
        { rank: 2, title: 'Floibanen funicular to Mount Floyen', description: 'Ride up in minutes for the classic view over the city, then hike back down through the forest.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Flam Railway and Naeroyfjord cruise', description: 'One of the steepest standard-gauge railways in the world, then a boat through one of its narrowest fjords.', imageUrl: img('norway1', 800) },
        { rank: 4, title: 'Hike Trolltunga (summer)', description: 'A long, tough day hike to the famous rock ledge hanging 700 m above Lake Ringedalsvatnet.', imageUrl: img('mountains', 800) },
        { rank: 5, title: 'Fish Market lunch', description: 'Fresh shrimp, king crab and fish soup right on the harbour.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('norway1', 1200), caption: 'Fjord view' },
        { url: img('mountains', 1200), caption: 'Mountains above the fjord' },
      ],
    },
    {
      slug: 'lofoten',
      name: 'Lofoten',
      description: 'Jagged peaks rising straight out of the sea, red fishing cabins and white-sand Arctic beaches.',
      funFact: 'Lofoten is above the Arctic Circle, yet thanks to the Gulf Stream its winters are much milder than other places that far north.',
      heroImageUrl: img('norway1'),
      activities: [
        { rank: 1, title: 'Reine and Hamnoy at golden hour', description: 'The postcard view of red cabins, still water and sharp peaks - best from the bridges.', imageUrl: img('norway1', 800) },
        { rank: 2, title: 'Hike Reinebringen', description: 'About 2,000 stone steps up for one of the most famous viewpoints in Norway.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Sleep in a rorbu', description: 'A traditional fisherman\'s cabin on stilts over the water.', imageUrl: img('norway2', 800) },
        { rank: 4, title: 'Arctic surfing at Unstad', description: 'Surf under the midnight sun or the Northern Lights, with a thick wetsuit.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Lofotr Viking Museum', description: 'A reconstruction of the largest Viking longhouse ever found, with a Viking feast in summer.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('norway1', 1200), caption: 'Lofoten fishing village' },
        { url: img('mountains', 1200), caption: 'Arctic peaks' },
      ],
    },
    {
      slug: 'tromso',
      name: 'Tromso',
      description: 'The capital of the Arctic and one of the best bases in the world for seeing the Northern Lights.',
      funFact: 'In Tromso the sun does not rise at all from late November to mid-January (polar night), and it does not set from late May to late July (midnight sun).',
      heroImageUrl: img('aurora'),
      activities: [
        { rank: 1, title: 'Northern Lights chase', description: 'Small-group tours drive away from the clouds and city lights to find the aurora.', imageUrl: img('aurora', 800) },
        { rank: 2, title: 'Husky sledding', description: 'Drive your own team of dogs across snowy valleys.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Fjellheisen cable car', description: 'Up to Storsteinen, 421 m above the city, for the view at sunset or under the aurora.', imageUrl: img('norway2', 800) },
        { rank: 4, title: 'Whale watching (November - January)', description: 'Orcas and humpbacks follow the herring into the northern fjords in winter.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Reindeer and Sami culture', description: 'Feed reindeer and listen to joik songs and stories in a lavvu tent by the fire.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('aurora', 1200), caption: 'Northern Lights' },
        { url: img('mountains', 1200), caption: 'Arctic winter' },
      ],
    },
  ],
};
