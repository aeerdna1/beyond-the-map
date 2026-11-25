import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/iceland.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const iceland: DestinationTranslation = {
  name: 'Islanda',
  tagline: 'Foc, gheață și aurora boreală dansând deasupra ta.',
  description:
    'Islanda pare o altă planetă: plaje cu nisip negru, ghețari, gheizere și cascade după fiecare curbă a șoselei Ring Road. Vara soarele abia apune; iarna cerul se aprinde în verde.',
  bestTimeToVisit: 'Iunie - august (soarele de la miezul nopții, road trip-uri) și septembrie - martie (aurora boreală)',
  places: {
    reykjavik: {
      description: 'Cea mai nordică capitală din lume: case colorate, cafenele primitoare și o scenă creativă plină de viață.',
      funFact: 'Reykjavik funcționează aproape în întregime cu energie regenerabilă, geotermală și hidro - chiar și unele trotuare sunt încălzite ca să topească zăpada.',
      activities: {
        1: { title: 'Turnul Hallgrimskirkja', description: 'Urcă în biserica inspirată de coloanele de bazalt pentru o priveliște peste acoperișurile în culorile curcubeului.' },
        2: { title: 'Sky Lagoon la apus', description: 'O piscină geotermală tip infinity, cu vedere spre ocean.' },
        3: { title: 'Sala de concerte Harpa', description: 'Un fagure de sticlă în port, care strălucește noaptea.' },
        4: { title: 'Observarea balenelor din Portul Vechi', description: 'Balene minke, balene cu cocoașă și papagali de mare, vara.' },
        5: { title: 'În căutarea aurorei boreale', description: 'Ieși din luminile orașului într-o noapte senină de iarnă.' },
      },
      gallery: ['Acoperișurile din Reykjavik', 'Aurora deasupra golfului'],
    },
    'golden-circle': {
      name: 'Cercul de Aur',
      description: 'O buclă de 300 km cu trei dintre cele mai faimoase minuni naturale ale Islandei.',
      funFact: 'La Thingvellir poți face snorkeling în Silfra, o fisură între plăcile tectonice nord-americană și eurasiatică.',
      activities: {
        1: { title: 'Snorkeling în fisura Silfra', description: 'Apă de ghețar atât de limpede încât vezi la peste 100 m - între două continente.' },
        2: { title: 'Gheizerul Strokkur', description: 'Erupe la fiecare 5 - 10 minute și aruncă apa până la 30 m înălțime.' },
        3: { title: 'Cascada Gullfoss', description: 'O cascadă tunătoare în două trepte, adesea cu un curcubeu.' },
        4: { description: 'Cea mai veche piscină naturală din Islanda, aburind în mijlocul câmpului.' },
        5: { title: 'Craterul Kerid', description: 'Un crater vulcanic roșu, cu un lac albastru-verzui pe fund.' },
      },
      gallery: ['Peisaje din Cercul de Aur'],
    },
    'south-coast': {
      name: 'Coasta de Sud (Vik)',
      description: 'Cascade, ghețari și plaje cu nisip negru de-a lungul șoselei Ring Road.',
      funFact: 'Nisipul negru de pe Reynisfjara provine din lavă care s-a răcit instantaneu când a atins apele reci ale Atlanticului.',
      activities: {
        1: { title: 'Pe după cascada Seljalandsfoss', description: 'O potecă te poartă chiar prin spatele perdelei de apă.' },
        2: { description: 'Urcă cele peste 500 de trepte pentru priveliștea de sus.' },
        3: { title: 'Plaja cu nisip negru Reynisfjara', description: 'Coloane de bazalt și stânci în mare - dar ai grijă la valurile neașteptate („sneaker waves”).' },
        4: { title: 'Drumeție pe ghețarul Solheimajokull', description: 'Colțari, piolet și crevase de gheață albastră, alături de un ghid.' },
        5: { title: 'Laguna glaciară Jokulsarlon', description: 'Aisberguri care plutesc spre „Plaja Diamantelor”.' },
      },
      gallery: ['Coasta de Sud'],
    },
    snaefellsnes: {
      description: 'Numită „Islanda în miniatură” - o peninsulă cu câte puțin din toate.',
      funFact: 'Jules Verne a ales ghețarul Snaefellsjokull drept intrare în „Călătorie spre centrul Pământului”.',
      activities: {
        1: { title: 'Muntele Kirkjufell', description: 'Cel mai fotografiat munte din Islanda, cu cascade în față.' },
        2: { title: 'Falezele de la Arnarstapi', description: 'O plimbare pe coastă, pe lângă arcade de bazalt și păsări care își fac cuiburile.' },
        3: { title: 'Biserica neagră de la Budir', description: 'O biserică neagră și singuratică într-un câmp de lavă.' },
        4: { title: 'Peștera de lavă Vatnshellir', description: 'Coboară 35 m într-un tunel de lavă vechi de 8.000 de ani.' },
        5: { title: 'Plaja Djupalonssandur', description: 'Pietricele negre și rămășițe de epave pe un țărm sălbatic.' },
      },
      gallery: ['Kirkjufell sub aurora boreală'],
    },
    akureyri: {
      name: 'Nordul (Akureyri)',
      description: 'Capitala nordului și poarta spre lacul Myvatn și ținutul balenelor.',
      funFact: 'Semafoarele din Akureyri au lumina roșie în formă de inimă - o mică campanie pentru a-i înveseli pe oameni după criza din 2008.',
      activities: {
        1: { title: 'Observarea balenelor în Husavik', description: 'Capitala europeană a observării balenelor.' },
        2: { title: 'Lacul Myvatn', description: 'Pseudocratere, formațiuni de lavă și bazine de noroi care bolborosesc.' },
        3: { description: 'Verișoara mai liniștită, albastru-lăptoasă, a celebrei Blue Lagoon.' },
        4: { description: '„Cascada zeilor”, o potcoavă perfectă.' },
        5: { description: 'Cea mai puternică cascadă din Europa.' },
      },
      gallery: ['Nordul Islandei'],
    },
  },
};
