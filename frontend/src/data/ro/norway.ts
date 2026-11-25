import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/norway.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const norway: DestinationTranslation = {
  name: 'Norvegia',
  tagline: 'Fiorduri, sate de pescari și aurora boreală.',
  description:
    'Fiorduri spectaculoase, căsuțe roșii pe malul apei și aventuri arctice dincolo de cercul polar. Norvegia este locul unde dimineața iei trenul prin munți, după-amiaza vâslești cu caiacul pe un fiord, iar noaptea aștepți să se facă cerul verde.',
  bestTimeToVisit: 'Iunie - august (fiorduri, drumeții, soarele de la miezul nopții) și sfârșitul lui septembrie - martie (aurora boreală)',
  places: {
    oslo: {
      description: 'O capitală verde și relaxată, la malul apei, cu muzee de clasă mondială și saune chiar pe fiord.',
      funFact: 'Premiul Nobel pentru Pace este singurul premiu Nobel acordat în afara Suediei - este decernat în fiecare an, pe 10 decembrie, la Primăria din Oslo.',
      activities: {
        1: { title: 'Plimbare pe acoperișul Operei', description: 'Acoperișul înclinat din marmură albă se ridică direct din fiord - urcă până sus pentru apus.' },
        2: { title: 'Parcul de sculpturi Vigeland', description: 'Peste 200 de sculpturi de Gustav Vigeland în parcul Frogner, gratuit și deschis toată ziua.' },
        3: { title: 'Muzeul MUNCH', description: 'Opera lui Edvard Munch, inclusiv versiuni ale „Țipătului”, într-o clădire spectaculoasă din port.' },
        4: { title: 'Muzeele din Bygdoy, cu feribotul', description: 'Nave polare la Muzeul Fram și pluta lui Thor Heyerdahl la Muzeul Kon-Tiki.' },
        5: { title: 'Saună plutitoare pe fiord', description: 'Încălzește-te într-o saună pe apă, apoi sari în fiord - în stil norvegian, tot anul.' },
      },
      gallery: ['Portul din Oslo', 'Fiordul Oslo'],
    },
    'bergen-the-fjords': {
      name: 'Bergen și fiordurile',
      description: 'Colorata cetate-port hanseatică și poarta spre cele mai celebre fiorduri ale Norvegiei.',
      funFact: 'Bergen este unul dintre cele mai ploioase orașe din Europa, cu ploaie în peste 200 de zile pe an - localnicii glumesc că bebelușii de aici se nasc cu umbrela.',
      activities: {
        1: { title: 'Cheiul Bryggen', description: 'Rătăcește pe aleile înguste din spatele caselor colorate de lemn ale negustorilor, sit al patrimoniului mondial UNESCO.' },
        2: { title: 'Funicularul Floibanen până pe Muntele Floyen', description: 'Urci în câteva minute pentru priveliștea clasică asupra orașului, apoi cobori pe jos prin pădure.' },
        3: { title: 'Calea ferată Flam și croazieră pe Naeroyfjord', description: 'Una dintre cele mai abrupte căi ferate cu ecartament normal din lume, apoi o croazieră pe unul dintre cele mai înguste fiorduri.' },
        4: { title: 'Drumeție la Trolltunga (vara)', description: 'O drumeție lungă și grea de o zi până la celebra limbă de stâncă suspendată la 700 m deasupra lacului Ringedalsvatnet.' },
        5: { title: 'Prânz la Piața de pește', description: 'Creveți proaspeți, crab-rege și supă de pește chiar în port.' },
      },
      gallery: ['Priveliște spre fiord', 'Munți deasupra fiordului'],
    },
    lofoten: {
      description: 'Vârfuri zimțate care se ridică direct din mare, căsuțe roșii de pescari și plaje arctice cu nisip alb.',
      funFact: 'Lofoten se află dincolo de Cercul Polar, dar datorită Curentului Golfului iernile sunt mult mai blânde decât în alte locuri la fel de nordice.',
      activities: {
        1: { title: 'Reine și Hamnoy la ora de aur', description: 'Priveliștea de carte poștală: căsuțe roșii, apă liniștită și vârfuri ascuțite - cel mai bine de pe poduri.' },
        2: { title: 'Drumeție pe Reinebringen', description: 'Aproximativ 2.000 de trepte de piatră până la unul dintre cele mai celebre puncte de belvedere din Norvegia.' },
        3: { title: 'Dormi într-un rorbu', description: 'O cabană tradițională de pescari, pe piloni deasupra apei.' },
        4: { title: 'Surf arctic la Unstad', description: 'Surf sub soarele de la miezul nopții sau sub aurora boreală, cu un costum de neopren gros.' },
        5: { title: 'Muzeul Vikingilor Lofotr', description: 'O reconstituire a celei mai mari case lungi vikinge descoperite vreodată, cu un ospăț viking vara.' },
      },
      gallery: ['Sat de pescari în Lofoten', 'Vârfuri arctice'],
    },
    tromso: {
      description: 'Capitala Arcticii și una dintre cele mai bune baze din lume pentru a vedea aurora boreală.',
      funFact: 'În Tromso soarele nu răsare deloc de la sfârșitul lui noiembrie până la mijlocul lui ianuarie (noaptea polară) și nu apune de la sfârșitul lui mai până la sfârșitul lui iulie (soarele de la miezul nopții).',
      activities: {
        1: { title: 'În căutarea aurorei boreale', description: 'Tururi în grupuri mici care fug de nori și de luminile orașului ca să găsească aurora.' },
        2: { title: 'Sanie cu câini husky', description: 'Condu-ți propria echipă de câini prin văi înzăpezite.' },
        3: { title: 'Telecabina Fjellheisen', description: 'Urcă la Storsteinen, la 421 m deasupra orașului, pentru priveliște la apus sau sub aurora boreală.' },
        4: { title: 'Observarea balenelor (noiembrie - ianuarie)', description: 'Orcele și balenele cu cocoașă urmăresc heringii în fiordurile nordice, iarna.' },
        5: { title: 'Reni și cultura sami', description: 'Hrănește reni și ascultă cântece joik și povești într-un cort lavvu, lângă foc.' },
      },
      gallery: ['Aurora boreală', 'Iarnă arctică'],
    },
  },
};
