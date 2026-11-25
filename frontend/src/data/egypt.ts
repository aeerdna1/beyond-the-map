import type { Destination } from '../types';
import { img } from './img';

export const egypt: Destination = {
  slug: 'egypt',
  name: 'Egypt',
  flag: '\u{1F1EA}\u{1F1EC}',
  region: 'Africa',
  vibes: ['Culture', 'Beach'],
  tagline: 'Pharaohs, the Nile and coral reefs in the Red Sea.',
  description:
    '5,000 years of history along the Nile, plus some of the best diving in the world. Stand in front of the last surviving Wonder of the Ancient World, sail a felucca at sunset, walk into painted tombs in the Valley of the Kings and then swim with turtles in the Red Sea.',
  bestTimeToVisit: 'October - April (cooler for temples and the desert); the Red Sea is good all year. Around 22 February and 22 October the sun lights up the inner sanctuary of Abu Simbel',
  heroImageUrl: img('egypt1'),
  lat: 26.82,
  lng: 30.8,
  places: [
    {
      slug: 'cairo-giza',
      name: 'Cairo & Giza',
      description: 'A huge, loud, fascinating capital, with the Pyramids of Giza waiting at the edge of the desert.',
      funFact: 'The Great Pyramid of Giza was the tallest man-made structure on Earth for about 3,800 years, and it is the only one of the Seven Wonders of the Ancient World still standing.',
      heroImageUrl: img('egypt1'),
      activities: [
        { rank: 1, title: 'The Pyramids and the Sphinx at opening time', description: 'Arrive early to beat the heat and the crowds, and head to the panorama point for the classic view of all nine pyramids.', imageUrl: img('egypt1', 800) },
        { rank: 2, title: 'Grand Egyptian Museum', description: 'The huge new museum next to the pyramids, home to the full treasure of Tutankhamun. Plan at least half a day.', imageUrl: img('egypt2', 800) },
        { rank: 3, title: 'Saqqara and the Step Pyramid of Djoser', description: 'The oldest pyramid in Egypt, plus beautifully painted tombs with far fewer visitors than Giza.', imageUrl: img('egypt1', 800) },
        { rank: 4, title: 'Khan el-Khalili and Islamic Cairo', description: 'Get lost in the old bazaar, then have mint tea at El Fishawy, a cafe open for more than 200 years.', imageUrl: img('morocco2', 800) },
        { rank: 5, title: 'Felucca on the Nile at sunset', description: 'A traditional wooden sailboat, the city lights coming on along both banks.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('egypt1', 1200), caption: 'Pyramids of Giza' },
        { url: img('egypt2', 1200), caption: 'Ancient Egypt' },
      ],
    },
    {
      slug: 'luxor',
      name: 'Luxor',
      description: 'Ancient Thebes, often called the world\'s greatest open-air museum: temples on the east bank, royal tombs on the west.',
      funFact: 'Tutankhamun\'s tomb in the Valley of the Kings was found almost untouched by Howard Carter in 1922 - his mummy still rests there today.',
      heroImageUrl: img('egypt2'),
      activities: [
        { rank: 1, title: 'Hot-air balloon at sunrise', description: 'Float above the West Bank temples, the green fields of the Nile and the desert mountains.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Valley of the Kings', description: 'Walk into colourful royal tombs carved deep into the rock. Extra tickets are needed for the most famous ones.', imageUrl: img('egypt2', 800) },
        { rank: 3, title: 'Karnak Temple', description: 'One of the largest religious complexes ever built - the Great Hypostyle Hall has 134 giant columns.', imageUrl: img('egypt1', 800) },
        { rank: 4, title: 'Luxor Temple at night', description: 'The temple and its Avenue of Sphinxes, beautifully lit after sunset.', imageUrl: img('egypt2', 800) },
        { rank: 5, title: 'Temple of Hatshepsut and the Colossi of Memnon', description: 'The terraced temple of one of Egypt\'s few female pharaohs, and two 18 m stone giants on the way.', imageUrl: img('egypt1', 800) },
      ],
      gallery: [
        { url: img('egypt2', 1200), caption: 'Temples of Luxor' },
        { url: img('landscape', 1200), caption: 'Sunrise over the West Bank' },
      ],
    },
    {
      slug: 'aswan',
      name: 'Aswan',
      description: 'The calmest place on the Nile: granite islands, colourful Nubian villages and the gateway to Abu Simbel.',
      funFact: 'In the 1960s the temples of Abu Simbel were cut into blocks and moved 65 m higher, piece by piece, to save them from the rising waters of Lake Nasser.',
      heroImageUrl: img('lake'),
      activities: [
        { rank: 1, title: 'Day trip to Abu Simbel', description: 'Ramses II\'s colossal temples near the Sudan border. An early start, but completely worth it.', imageUrl: img('egypt1', 800) },
        { rank: 2, title: 'Philae Temple', description: 'The island temple of Isis, reached by a small boat - also rescued and moved from the rising Nile.', imageUrl: img('egypt2', 800) },
        { rank: 3, title: 'Felucca around Elephantine Island', description: 'Sail past granite boulders and Kitchener\'s Botanical Island in the late afternoon light.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Visit a Nubian village', description: 'Brightly painted houses, henna, spices and a warm welcome on the West Bank.', imageUrl: img('morocco3', 800) },
        { rank: 5, title: 'Nile cruise to Luxor', description: 'Three or four slow days on the river, stopping at the temples of Kom Ombo and Edfu.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('lake', 1200), caption: 'The Nile at Aswan' },
        { url: img('egypt1', 1200), caption: 'Abu Simbel' },
      ],
    },
    {
      slug: 'red-sea-hurghada',
      name: 'Red Sea',
      description: 'Warm, clear water and colourful coral reefs along the coast of Hurghada, El Gouna and Marsa Alam.',
      funFact: 'The Red Sea is one of the saltiest seas in the world, and it is home to more than 1,000 species of fish - many of them found nowhere else on Earth.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Snorkel the Giftun Islands', description: 'A boat trip from Hurghada to white-sand islands and shallow coral gardens.', imageUrl: img('lake', 800) },
        { rank: 2, title: 'Swim with turtles in Marsa Alam', description: 'At Abu Dabbab bay green sea turtles feed on the seagrass close to the beach - and sometimes a dugong too.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Dive the SS Thistlegorm', description: 'A World War II cargo ship full of motorbikes and trucks, one of the most famous wreck dives in the world (for certified divers).', imageUrl: img('landscape', 800) },
        { rank: 4, title: 'Desert safari and a Bedouin dinner', description: 'Quad bikes or jeeps into the mountains, then dinner and stargazing in the desert.', imageUrl: img('morocco1', 800) },
        { rank: 5, title: 'Kitesurf or relax in El Gouna', description: 'A car-free lagoon town with steady winds, boat taxis and waterfront restaurants.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Red Sea coast' },
        { url: img('lake', 1200), caption: 'Coral reef waters' },
      ],
    },
  ],
};
