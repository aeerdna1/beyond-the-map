import type { Destination } from '../types';
import { img } from './img';

export const chile: Destination = {
  slug: 'chile',
  name: 'Chile',
  flag: '\u{1F1E8}\u{1F1F1}',
  region: 'South America',
  vibes: ['Nature', 'Culture'],
  tagline: 'From the driest desert on Earth to the granite towers of Patagonia.',
  description:
    'Chile is about 4,300 km long and on average under 200 km wide, squeezed between the Andes and the Pacific. That shape gives it almost every landscape on the planet: salt flats and geysers in the north, vineyards and a lively capital in the middle, and glaciers, fjords and wild peaks in Patagonia at the bottom of the world.',
  bestTimeToVisit: 'October - April for Patagonia (December - February is warmest but windiest); September - November and March - May for Santiago; the Atacama Desert is good all year',
  heroImageUrl: img('mountains'),
  lat: -35.68,
  lng: -71.54,
  places: [
    {
      slug: 'patagonia',
      name: 'Patagonia (Torres del Paine)',
      description: 'Granite towers, turquoise lakes, blue glaciers and wild guanacos in one of the most spectacular national parks on Earth.',
      funFact: '"Paine" is often said to mean "blue" in the language of the Tehuelche people - a fitting name for a park full of blue glaciers and turquoise lakes.',
      heroImageUrl: img('mountains'),
      activities: [
        { rank: 1, title: 'Hike to Mirador Las Torres', description: 'A long, steep day hike to the famous three granite towers above a glacial lake. Start early for the sunrise glow.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'The W Trek', description: 'The classic 4 - 5 day trek through the park, sleeping in refugios or campsites. Book them months ahead.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'Boat to Grey Glacier', description: 'Sail across Lago Grey between floating icebergs to the face of the glacier.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Wildlife and puma tracking', description: 'Guanacos, condors and rheas are everywhere - with a specialist guide you may even spot a puma.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Puerto Natales and the Milodon Cave', description: 'A cosy harbour town to rest after hiking, and a huge cave where remains of a giant prehistoric sloth were found.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('mountains', 1200), caption: 'Torres del Paine' },
        { url: img('lake', 1200), caption: 'Glacial lakes' },
      ],
    },
    {
      slug: 'santiago-de-chile',
      name: 'Santiago de Chile',
      description: 'A modern capital with the snowy Andes as its backdrop, great food markets and vineyards just outside the city.',
      funFact: 'In winter you can ski in the Andes in the morning and watch the sunset over the Pacific the same evening - both are only about 1.5 hours from Santiago.',
      heroImageUrl: img('road'),
      activities: [
        { rank: 1, title: 'Cerro San Cristobal', description: 'Take the funicular or cable car up the hill for the best view over the city and the Andes.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'Day trip to Valparaiso', description: 'A colourful port city of hills, street art and old funiculars, a UNESCO World Heritage site.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Wine tasting in the Maipo or Casablanca valley', description: 'Carmenere and Cabernet in vineyards less than an hour from the city.', imageUrl: img('landscape', 800) },
        { rank: 4, title: 'Bellavista and La Chascona', description: 'The bohemian neighbourhood and the playful house of the poet Pablo Neruda.', imageUrl: img('road', 800) },
        { rank: 5, title: 'Mercado Central and La Vega', description: 'Seafood stews, empanadas and fresh fruit in the city\'s busiest markets.', imageUrl: img('road', 800) },
      ],
      gallery: [
        { url: img('road', 1200), caption: 'Santiago streets' },
        { url: img('mountains', 1200), caption: 'The Andes above the city' },
      ],
    },
    {
      slug: 'atacama-desert',
      name: 'Atacama Desert',
      description: 'Salt flats, geysers, flamingo lagoons and some of the clearest night skies in the world, around the oasis town of San Pedro de Atacama.',
      funFact: 'The Atacama is the driest non-polar desert on Earth - some weather stations there have never recorded rain. NASA has tested Mars rovers in its landscape.',
      heroImageUrl: img('morocco1'),
      activities: [
        { rank: 1, title: 'Sunset in the Valle de la Luna', description: 'Walk through dunes and salt formations that look like the surface of the moon as the sky turns pink.', imageUrl: img('morocco1', 800) },
        { rank: 2, title: 'El Tatio geysers at sunrise', description: 'Steaming geysers at about 4,300 m - very cold at dawn, so bring warm layers.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Stargazing tour', description: 'Thanks to the dry air and high altitude, the Atacama is home to some of the biggest observatories in the world.', imageUrl: img('aurora', 800) },
        { rank: 4, title: 'Float in Laguna Cejar', description: 'A salt lagoon so salty that you float without effort, like in the Dead Sea.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Altiplanic lagoons and flamingos', description: 'Deep-blue lakes at Miscanti and Miniques, and flamingos feeding at the Salar de Atacama.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('morocco1', 1200), caption: 'Desert landscape' },
        { url: img('aurora', 1200), caption: 'Atacama night sky' },
      ],
    },
  ],
};
