import type { Destination } from '../types';
import { img } from './img';

export const hawaii: Destination = {
  slug: 'hawaii',
  name: 'Hawaii',
  flag: '🌺',
  region: 'Islands',
  vibes: ['Beach', 'Nature'],
  tagline: 'Volcanoes, rainbows and the true spirit of aloha.',
  description:
    'A US state in the middle of the Pacific, more than 3,000 km from the nearest continent. Every island has its own personality: Oahu buzzes, Maui relaxes, the Big Island is still being built by lava and Kauai is pure green jungle.',
  bestTimeToVisit: 'April - May and September - October (dry, fewer crowds, better prices); December - April for humpback whales',
  heroImageUrl: img('hawaii1'),
  lat: 20.8,
  lng: -156.33,
  places: [
    {
      slug: 'oahu',
      name: 'Oahu',
      description: 'The Gathering Place: Honolulu city life, Waikiki beach and legendary surf on the North Shore.',
      funFact: 'Iolani Palace in Honolulu is the only royal palace on US soil - it was home to the last Hawaiian monarchs and had electric light before the White House did.',
      heroImageUrl: img('hawaii2'),
      activities: [
        { rank: 1, title: 'Diamond Head at sunrise', description: 'A short, steep hike up an old volcanic crater for a view over Waikiki and the ocean. Book your entry slot ahead.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'Pearl Harbor and the USS Arizona Memorial', description: 'A quiet, moving visit to the place that pulled the US into World War II.', imageUrl: img('hawaii1', 800) },
        { rank: 3, title: 'North Shore day', description: 'Watch the big-wave surfers in winter, then garlic shrimp from a Haleiwa food truck.', imageUrl: img('hawaii2', 800) },
        { rank: 4, title: 'Snorkel Hanauma Bay', description: 'A protected bay inside a volcanic cone, full of reef fish and green sea turtles. Reservations required.', imageUrl: img('lake', 800) },
        { rank: 5, title: 'Kualoa Ranch', description: 'The dramatic green valley where Jurassic Park and Jumanji were filmed - by jeep, horse or e-bike.', imageUrl: img('landscape', 800) },
      ],
      gallery: [
        { url: img('hawaii2', 1200), caption: 'Oahu coastline' },
        { url: img('hawaii1', 1200), caption: 'Turquoise water' },
      ],
    },
    {
      slug: 'maui',
      name: 'Maui',
      description: 'The Valley Isle: sunrise above the clouds, winding coastal roads and whales in winter.',
      funFact: 'Haleakala means "House of the Sun". Legend says the demigod Maui lassoed the sun from its summit to make the days longer.',
      heroImageUrl: img('hawaii1'),
      activities: [
        { rank: 1, title: 'Sunrise at Haleakala', description: 'Watch the sun rise above a sea of clouds from 3,000 m. Sunrise entry must be reserved in advance - bring a jacket.', imageUrl: img('mountains', 800) },
        { rank: 2, title: 'Road to Hana', description: 'Hundreds of curves, one-lane bridges, waterfalls, black-sand beaches and banana bread stands.', imageUrl: img('road', 800) },
        { rank: 3, title: 'Snorkel Molokini Crater', description: 'A half-sunken volcanic crater with some of the clearest water in Hawaii.', imageUrl: img('lake', 800) },
        { rank: 4, title: 'Whale watching (December - April)', description: 'Thousands of humpback whales come to Maui\'s warm waters to give birth.', imageUrl: img('hawaii2', 800) },
        { rank: 5, title: 'Kaanapali Beach and Black Rock', description: 'Snorkel with turtles at Black Rock, then stay for the cliff-diving ceremony at sunset.', imageUrl: img('hawaii1', 800) },
      ],
      gallery: [
        { url: img('hawaii1', 1200), caption: 'Maui beach' },
        { url: img('mountains', 1200), caption: 'Above the clouds' },
      ],
    },
    {
      slug: 'big-island',
      name: 'Big Island',
      description: 'The youngest and largest island, where active volcanoes are still adding new land.',
      funFact: 'Measured from its base on the ocean floor, Mauna Kea is over 10,000 m tall - higher than Mount Everest.',
      heroImageUrl: img('landscape'),
      activities: [
        { rank: 1, title: 'Hawaii Volcanoes National Park', description: 'Walk past steaming vents and craters around Kilauea - at night, check if the lava glow is visible.', imageUrl: img('landscape', 800) },
        { rank: 2, title: 'Manta ray night snorkel in Kona', description: 'Float at the surface while giant mantas do somersaults in the lights below you.', imageUrl: img('lake', 800) },
        { rank: 3, title: 'Stargazing on Mauna Kea', description: 'One of the best places on Earth to see the stars, home to world-class observatories.', imageUrl: img('aurora', 800) },
        { rank: 4, title: 'Punaluu Black Sand Beach', description: 'Jet-black volcanic sand with green sea turtles resting on the shore (keep your distance).', imageUrl: img('hawaii2', 800) },
        { rank: 5, title: 'Kona coffee farm tour', description: 'Taste some of the world\'s most famous coffee right where it grows on the volcano slopes.', imageUrl: img('mountains', 800) },
      ],
      gallery: [
        { url: img('landscape', 1200), caption: 'Volcanic landscape' },
        { url: img('aurora', 1200), caption: 'Night sky' },
      ],
    },
    {
      slug: 'kauai',
      name: 'Kauai',
      description: 'The Garden Isle: the oldest main island, all emerald cliffs, waterfalls and quiet beaches.',
      funFact: 'On Kauai no building can be taller than a coconut tree - a local rule that keeps the island wild and low-rise.',
      heroImageUrl: img('hawaii2'),
      activities: [
        { rank: 1, title: 'Na Pali Coast by boat or helicopter', description: 'Sheer green cliffs dropping into the ocean, only reachable by sea, air or a long hike.', imageUrl: img('hawaii2', 800) },
        { rank: 2, title: 'Waimea Canyon', description: 'Nicknamed the "Grand Canyon of the Pacific" - red rock, green ridges and waterfalls.', imageUrl: img('mountains', 800) },
        { rank: 3, title: 'Hanalei Bay', description: 'A wide crescent of sand with mountains behind it. Perfect for a lazy beach day or paddleboarding.', imageUrl: img('hawaii1', 800) },
        { rank: 4, title: 'Kalalau Trail to Hanakapiai', description: 'The first part of the famous coastal trail. Reserve Haena State Park entry in advance.', imageUrl: img('landscape', 800) },
        { rank: 5, title: 'Kayak the Wailua River', description: 'Paddle through the jungle, then hike to a waterfall for a swim.', imageUrl: img('lake', 800) },
      ],
      gallery: [
        { url: img('hawaii2', 1200), caption: 'Na Pali Coast' },
        { url: img('mountains', 1200), caption: 'Waimea Canyon' },
      ],
    },
  ],
};
