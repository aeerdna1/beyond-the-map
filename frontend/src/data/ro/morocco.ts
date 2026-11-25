import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/morocco.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const morocco: DestinationTranslation = {
  name: 'Maroc',
  tagline: 'Piețe de mirodenii, ulițe albastre și nopți sub stelele Saharei.',
  description:
    'Marocul este o sărbătoare a simțurilor: chemarea la rugăciune deasupra medinei, ceai de mentă turnat de la înălțime, riaduri ascunse în spatele unor uși simple și dune care strălucesc portocaliu la apus.',
  bestTimeToVisit: 'Martie - mai și septembrie - noiembrie (temperaturi blânde, nu prea cald în deșert)',
  places: {
    marrakech: {
      description: 'Orașul Roșu: souk-uri pline de viață, palate și apusuri privite de pe terase.',
      funFact: 'În fiecare seară, piața Jemaa el-Fnaa se transformă într-un food court în aer liber, cu povestitori, muzicieni și peste 100 de tarabe cu mâncare - o „Capodoperă a patrimoniului imaterial” UNESCO.',
      activities: {
        1: { title: 'Jemaa el-Fnaa la amurg', description: 'Privește cum se transformă piața de pe terasa unei cafenele, apoi pierde-te printre tarabele cu mâncare.' },
        2: { description: 'Vila albastru-cobalt și grădina de cactuși care au aparținut cândva lui Yves Saint Laurent.' },
        3: { title: 'Rătăcește-te prin souk-uri', description: 'Piele, felinare, mirodenii - și arta tocmelii prietenoase.' },
        4: { title: 'Cazare într-un riad + hammam', description: 'O casă cu curte interioară și fântână, plus o exfoliere tradițională în baia de aburi.' },
        5: { title: 'Excursie de o zi în Munții Atlas', description: 'Sate berbere, cascade și prânz cu priveliște.' },
      },
      gallery: ['Medina din Marrakech', 'Curtea unui riad'],
    },
    fes: {
      description: 'Inima culturală a Marocului și cel mai vechi dintre orașele sale imperiale.',
      funFact: 'Fes el-Bali este cea mai mare zonă urbană fără mașini din lume - mărfurile sunt cărate încă cu măgarul pe cele peste 9.000 de ulițe.',
      activities: {
        1: { title: 'Tăbăcăria Chouara', description: 'Vezi cum se vopsește pielea în cuve de piatră, la fel ca acum 900 de ani.' },
        2: { description: 'Fondată în 859, este considerată cea mai veche universitate încă existentă din lume.' },
        3: { title: 'Madrasa Bou Inania', description: 'Cedru sculptat, plăci zellige și stuc - o capodoperă a artei merinide.' },
        4: { title: 'Plimbare cu ghid prin medina', description: 'Un ghid local este cea mai bună cale de a găsi atelierele ascunse.' },
        5: { title: 'Apus de la Mormintele Merinide', description: 'Întreaga medina strălucește sub tine.' },
      },
    },
    chefchaouen: {
      description: 'Celebra perlă albastră din Munții Rif.',
      funFact: 'Nimeni nu știe sigur de ce orașul e albastru - teoriile spun că ține țânțarii departe, că răcorește casele sau că simbolizează cerul și paradisul.',
      activities: {
        1: { title: 'Fotografiază ulițele albastre', description: 'Mergi dimineața devreme pentru străzi goale și lumină blândă.' },
        2: { title: 'Belvederea de la Moscheea Spaniolă', description: 'O drumeție scurtă pentru apusul deasupra întregului oraș albastru.' },
        3: { title: 'Cascadele Akchour', description: 'Bazine turcoaz și arcada de piatră numită „Podul lui Dumnezeu”.' },
        4: { description: 'Ceai de mentă și brânză de capră în piața principală.' },
        5: { title: 'Izvorul Ras el-Maa', description: 'Locul unde localnicii încă spală lâna și hainele în pârâul de munte.' },
      },
      gallery: ['Ulițe albastre'],
    },
    sahara: {
      description: 'Dunele Erg Chebbi - de până la 150 m înălțime, strălucind portocaliu la apus.',
      funFact: 'Sahara are cam aceeași suprafață ca SUA, dar doar în jur de un sfert din ea sunt dune de nisip - restul sunt platouri stâncoase și câmpii cu pietriș.',
      activities: {
        1: { title: 'Plimbare cu cămila la apus', description: 'Intră în dune în timp ce trec de la auriu la un portocaliu intens.' },
        2: { title: 'O noapte într-o tabără în deșert', description: 'Tobe berbere lângă foc și mai multe stele decât ai văzut vreodată.' },
        3: { title: 'Răsăritul din vârful unei dune', description: 'Merită urcușul de dimineață, de fiecare dată.' },
        4: { description: 'Ca snowboardul, dar la cald.' },
        5: { title: 'Cheile Todra, pe drum', description: 'Pereți de canion de până la 300 m înălțime.' },
      },
    },
    essaouira: {
      description: 'Un oraș-port alb și răcoros, bătut de vânt, la malul Atlanticului.',
      funFact: 'Zidurile din Essaouira au fost locul de filmare pentru Astapor din „Urzeala tronurilor”.',
      activities: {
        1: { title: 'Meterezele Skala de la Ville', description: 'Tunuri vechi și valuri care se sparg de ziduri la apus.' },
        2: { title: 'Pește la grătar în port', description: 'Îl alegi de la tarabă și ți-l fac la grătar pe loc.' },
        3: { description: 'Alizeele fac din Essaouira unul dintre cele mai bune locuri de kitesurfing din Africa.' },
        4: { title: 'Cooperativă de ulei de argan', description: 'Vezi cum cooperativele de femei fac ulei de argan manual.' },
        5: { title: 'Călărie pe plajă', description: 'Galopează de-a lungul golfului larg și nisipos.' },
      },
      gallery: ['Coasta Atlanticului'],
    },
  },
};
