import type { Destination } from '../types';
import { img } from './img';

export const italy: Destination = {
  slug: 'italy',
  name: 'Italy',
  flag: '\u{1F1EE}\u{1F1F9}',
  region: 'Europe',
  vibes: ['Nature', 'Beach', 'Culture'],
  tagline: 'Jagged peaks in the north, turquoise coves in the south, and history on every corner.',
  description:
    'La dolce vita in every form: hiking under the pink peaks of the Dolomites, swimming in the Caribbean-blue coves of Sardinia, eating orecchiette in the old lanes of Bari, walking through 2,000 years of history in Rome and, of course, holding up the Leaning Tower of Pisa.',
  bestTimeToVisit: 'May - June and September - October for cities and the coast (warm, fewer crowds); late June - September for Dolomites hiking; December - March for skiing',
  heroImageUrl: img('italy'),
  lat: 41.87,
  lng: 12.57,
  places: [
    {
      slug: 'dolomites',
      name: 'Dolomites',
      description: 'Pale limestone peaks, alpine meadows and mountain huts serving strudel and polenta in the north of Italy.',
      funFact: 'At sunset the Dolomites often glow pink and orange - locals call it "enrosadira". The rock contains dolomite, a mineral named after the French geologist Deodat de Dolomieu.',
      heroImageUrl: img('dolomites'),
      activities: [
        { rank: 1, title: 'Tre Cime di Lavaredo loop', description: 'A classic half-day hike around the three famous peaks, starting from Rifugio Auronzo (toll road, go early).', imageUrl: img('dolomites', 800) },
        { rank: 2, title: 'Lago di Braies at sunrise', description: 'An emerald lake under steep cliffs - rent a wooden rowing boat before the crowds arrive.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Seceda ridgeline', description: 'Take the cable car from Ortisei to one of the most dramatic ridges in the Alps.', imageUrl: img('mountains', 800) },
        { rank: 4, title: 'Alpe di Siusi', description: 'Europe\'s largest high-altitude meadow, perfect for easy walks, cycling or skiing in winter.', imageUrl: img('dolomites', 800) },
        { rank: 5, title: 'Lunch at a rifugio', description: 'Mountain huts with sunny terraces, canederli dumplings and apple strudel with a view.', imageUrl: img('mountains', 800) },
      ],
      gallery: [
        { url: img('dolomites', 1200), caption: 'Dolomites peaks' },
        { url: img('lake', 1200), caption: 'Alpine lake' },
      ],
    },
    {
      slug: 'sardinia',
      name: 'Sardinia',
      description: 'An island of turquoise coves, white sand and ancient stone towers in the middle of the Mediterranean.',
      funFact: 'Sardinia has more than 7,000 nuraghi - mysterious stone towers built over 3,000 years ago. It is also one of the world\'s "Blue Zones", where many people live past 100.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Boat trip in the Gulf of Orosei', description: 'Hidden coves like Cala Goloritze and Cala Mariolu, only reachable by boat or a steep hike.', imageUrl: img('lake', 800) },
        { rank: 2, title: 'La Pelosa beach', description: 'Shallow, crystal-clear water near Stintino. Book your entry ahead in summer and bring a beach mat - towels are not allowed.', imageUrl: img('landscape', 800) },
        { rank: 3, title: 'La Maddalena archipelago', description: 'Sail between pink-granite islands with some of the clearest water in the Mediterranean.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Su Nuraxi di Barumini', description: 'The best-preserved nuraghe village on the island, a UNESCO World Heritage site.', imageUrl: img('italy', 800) },
        { rank: 5, title: 'Sunset in Alghero', description: 'Walk the old sea walls of this Catalan-flavoured town, then dinner with local seafood.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Sardinian coast' },
        { url: img('lake', 1200), caption: 'Turquoise coves' },
      ],
    },
    {
      slug: 'bari',
      name: 'Bari',
      description: 'The lively capital of Puglia: an old town full of pasta-makers, a long seafront and the perfect base for exploring the south.',
      funFact: 'The bones of Saint Nicholas - the saint who inspired Santa Claus - were brought to Bari by sailors in 1087 and still rest in the Basilica di San Nicola.',
      heroImageUrl: img('italy'),
      activities: [
        { rank: 1, title: 'Bari Vecchia and "pasta street"', description: 'Watch the local women make orecchiette by hand outside their doors on Strada Arco Basso.', imageUrl: img('italy', 800) },
        { rank: 2, title: 'Basilica di San Nicola', description: 'A beautiful Romanesque church and an important pilgrimage site for both Catholics and Orthodox Christians.', imageUrl: img('italy', 800) },
        { rank: 3, title: 'Street food tour', description: 'Panzerotti, sgagliozze (fried polenta) and focaccia barese, fresh from the old town.', imageUrl: img('road', 800) },
        { rank: 4, title: 'Day trip to Polignano a Mare', description: 'White houses on cliffs above the sea and the famous Lama Monachile beach.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Alberobello trulli', description: 'A fairy-tale town of white stone houses with cone-shaped roofs, a UNESCO site about an hour away.', imageUrl: img('italy', 800) },
      ],
      gallery: [
        { url: img('italy', 1200), caption: 'Old town of Bari' },
        { url: img('landscape', 1200), caption: 'Puglia coast' },
      ],
    },
    {
      slug: 'rome',
      name: 'Rome',
      description: 'The Eternal City: ancient ruins, Baroque fountains, the Vatican and long dinners in cobbled piazzas.',
      funFact: 'About 3,000 euros in coins are thrown into the Trevi Fountain every day. The money is collected and given to charity - and tradition says one coin means you will return to Rome.',
      heroImageUrl: img('italy'),
      activities: [
        { rank: 1, title: 'Colosseum and the Roman Forum', description: 'Walk where gladiators fought and senators spoke. Book timed tickets online in advance.', imageUrl: img('italy', 800) },
        { rank: 2, title: 'Vatican Museums and the Sistine Chapel', description: 'Michelangelo\'s ceiling and St Peter\'s Basilica. Go early or late to avoid the longest queues.', imageUrl: img('italy', 800) },
        { rank: 3, title: 'Trevi Fountain and the Pantheon at dawn', description: 'See them almost empty before the city wakes up, then espresso standing at the bar.', imageUrl: img('road', 800) },
        { rank: 4, title: 'Trastevere at night', description: 'Ivy-covered lanes, cacio e pepe and carbonara in a family trattoria.', imageUrl: img('road', 800) },
        { rank: 5, title: 'Borghese Gallery and gardens', description: 'Bernini sculptures inside, then a sunset view over the city from the Pincio terrace.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('italy', 1200), caption: 'Rome' },
        { url: img('road', 1200), caption: 'Roman streets' },
      ],
    },
    {
      slug: 'pisa',
      name: 'Pisa',
      description: 'Much more than the famous tower: a lively university town on the Arno, close to Florence, Lucca and the Tuscan coast.',
      funFact: 'The tower started to lean during construction in the 12th century because of soft ground. Engineers reduced the lean by about 45 cm between 1990 and 2001, so it should stay standing for centuries.',
      heroImageUrl: img('italy'),
      activities: [
        { rank: 1, title: 'Climb the Leaning Tower', description: 'Around 250 slightly tilted steps to the top. Tickets are timed, so book in advance.', imageUrl: img('italy', 800) },
        { rank: 2, title: 'Piazza dei Miracoli', description: 'The white marble Cathedral, Baptistery and monumental cemetery around the tower, all on a green lawn.', imageUrl: img('italy', 800) },
        { rank: 3, title: 'Walk along the Arno', description: 'The riverside "lungarni" at sunset, with colourful palaces and the tiny Gothic church of Santa Maria della Spina.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Day trip to Lucca', description: 'Cycle on top of the Renaissance city walls, just 30 minutes away by train.', imageUrl: img('road', 800) },
        { rank: 5, title: 'Florence or the Tuscan coast', description: 'One hour to Florence\'s art and food, or head to the beaches of Viareggio and the Cinque Terre.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('italy', 1200), caption: 'Piazza dei Miracoli' },
        { url: img('lake', 1200), caption: 'The Arno at sunset' },
      ],
    },
  ],
};
