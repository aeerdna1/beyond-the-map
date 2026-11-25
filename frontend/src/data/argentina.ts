import type { Destination } from '../types';
import { img } from './img';

export const argentina: Destination = {
  slug: 'argentina',
  name: 'Argentina',
  flag: '\u{1F1E6}\u{1F1F7}',
  region: 'South America',
  vibes: ['Nature', 'Culture'],
  tagline: 'Tango nights, thundering waterfalls and glaciers you can hear crack.',
  description:
    'Argentina is huge - the eighth-largest country in the world - and every corner feels different. Dance tango in the elegant streets of Buenos Aires, stand in the spray of Iguazu Falls, sip Malbec under the Andes in Mendoza and watch walls of ice crash into the lake at the Perito Moreno Glacier.',
  bestTimeToVisit: 'October - April for Patagonia; March - May (harvest) for Mendoza; March - May and September - November for Buenos Aires; Iguazu is good all year (wetter, with more water, December - March)',
  heroImageUrl: img('lake'),
  lat: -38.42,
  lng: -63.62,
  places: [
    {
      slug: 'patagonia-el-calafate',
      name: 'Patagonia (El Calafate)',
      description: 'The gateway to Los Glaciares National Park, the Perito Moreno Glacier and the hiking capital of El Chalten.',
      funFact: 'The Perito Moreno Glacier is one of the few glaciers in the world that is not shrinking - it is about 30 km long and its front rises around 70 m above Lago Argentino.',
      heroImageUrl: img('lake'),
      activities: [
        { rank: 1, title: 'Perito Moreno Glacier walkways', description: 'Watch huge blocks of ice break off and crash into the lake from the balconies right in front of the glacier.', imageUrl: img('lake', 800) },
        { rank: 2, title: 'Mini-trekking on the ice', description: 'Put on crampons and walk on the glacier itself, between blue crevasses.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Day trip to El Chalten and Laguna de los Tres', description: 'A long, tough hike to the iconic view of Mount Fitz Roy at sunrise.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Boat trip to the Upsala and Spegazzini glaciers', description: 'Sail across Lago Argentino between giant icebergs to glaciers you can only reach by water.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Patagonian lamb at an estancia', description: 'Slow-roasted cordero al asador on a traditional sheep farm, with gauchos and huge open views.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('lake', 1200), caption: 'Perito Moreno Glacier' },
        { url: img('mountains', 1200), caption: 'Fitz Roy' },
      ],
    },
    {
      slug: 'buenos-aires',
      name: 'Buenos Aires',
      description: 'The "Paris of South America": grand avenues, colourful barrios, late dinners and tango until sunrise.',
      funFact: 'Avenida 9 de Julio is one of the widest avenues in the world, with up to 7 lanes in each direction - it takes several traffic lights to cross it.',
      heroImageUrl: img('road'),
      activities: [
        { rank: 1, title: 'Tango in San Telmo', description: 'Watch dancers in Plaza Dorrego on Sunday, then take a class or go to a milonga at night.', imageUrl: img('road', 800) },
        { rank: 2, title: 'La Boca and Caminito', description: 'Brightly painted houses, street art and the famous Boca Juniors stadium. Visit by day.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Recoleta Cemetery', description: 'A city of marble tombs and statues where Eva Peron is buried.', imageUrl: img('italy', 800) },
        { rank: 4, title: 'A real Argentine asado', description: 'Steak and Malbec at a traditional parrilla - dinner here rarely starts before 9 pm.', imageUrl: img('road', 800) },
        { rank: 5, title: 'El Ateneo Grand Splendid', description: 'A bookshop inside an old theatre, often called one of the most beautiful in the world.', imageUrl: img('planning', 800) },
      ],
      gallery: [
        { url: img('road', 1200), caption: 'Buenos Aires streets' },
        { url: img('italy', 1200), caption: 'Grand architecture' },
      ],
    },
    {
      slug: 'iguazu-falls',
      name: 'Iguazu Falls',
      description: 'Around 275 waterfalls in the jungle on the border with Brazil, one of the New Seven Wonders of Nature.',
      funFact: 'When Eleanor Roosevelt first saw Iguazu, she is said to have exclaimed "Poor Niagara!" - Iguazu is taller than Niagara and about twice as wide.',
      heroImageUrl: img('lake'),
      activities: [
        { rank: 1, title: 'Garganta del Diablo (Devil\'s Throat)', description: 'Take the jungle train and walk over the river to the edge of the biggest, loudest fall.', imageUrl: img('lake', 800) },
        { rank: 2, title: 'Upper and Lower Circuits', description: 'Walkways above and below the falls, with rainbows almost everywhere you look.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Boat ride under the falls', description: 'A speedboat takes you right into the spray - you will get completely soaked.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'The Brazilian side', description: 'A day trip across the border for the wide panoramic view of the whole system of falls.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Wildlife spotting', description: 'Toucans, coatis and clouds of butterflies along the forest paths. Keep your snacks hidden from the coatis.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('lake', 1200), caption: 'Iguazu Falls' },
        { url: img('landscape', 1200), caption: 'Subtropical jungle' },
      ],
    },
    {
      slug: 'mendoza',
      name: 'Mendoza',
      description: 'Argentina\'s wine capital, with vineyards at the foot of the Andes and the highest mountain in the Americas nearby.',
      funFact: 'Mendoza produces most of Argentina\'s wine, and Aconcagua nearby is the highest mountain outside Asia at 6,961 m.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Malbec tasting in the Uco Valley', description: 'High-altitude vineyards with the snowy Andes right behind them.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Cycle between wineries in Maipu', description: 'Rent a bike and ride from bodega to bodega, with olive oil tastings on the way.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Aconcagua Provincial Park', description: 'A short walk to the viewpoint of the highest mountain in the Americas.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Thermal baths at Cacheuta', description: 'Hot pools by a mountain river, perfect after a long day of tastings.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Long winery lunch', description: 'A multi-course meal paired with local wines - plan an afternoon, not an hour.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Vineyards under the Andes' },
        { url: img('mountains', 1200), caption: 'Aconcagua' },
      ],
    },
  ],
};
