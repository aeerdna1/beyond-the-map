import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/chile.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const chile: DestinationTranslation = {
  tagline: 'De la cel mai arid deșert de pe Pământ la turnurile de granit ale Patagoniei.',
  description:
    'Chile are aproximativ 4.300 km lungime și, în medie, sub 200 km lățime, strâns între Anzi și Pacific. Forma aceasta îi dă aproape toate peisajele de pe planetă: saline și gheizere în nord, podgorii și o capitală plină de viață la mijloc, iar jos, la capătul lumii, ghețari, fiorduri și vârfuri sălbatice în Patagonia.',
  bestTimeToVisit:
    'Octombrie - aprilie pentru Patagonia (decembrie - februarie e cel mai cald, dar și cel mai vântos); septembrie - noiembrie și martie - mai pentru Santiago; deșertul Atacama e bun tot anul',
  places: {
    patagonia: {
      description: 'Turnuri de granit, lacuri turcoaz, ghețari albaștri și guanaco sălbatici, într-unul dintre cele mai spectaculoase parcuri naționale de pe Pământ.',
      funFact: 'Se spune adesea că „Paine” înseamnă „albastru” în limba poporului tehuelche - un nume potrivit pentru un parc plin de ghețari albaștri și lacuri turcoaz.',
      activities: {
        1: { title: 'Drumeție până la Mirador Las Torres', description: 'O drumeție lungă și abruptă de o zi până la cele trei celebre turnuri de granit de deasupra unui lac glaciar. Pornește devreme pentru strălucirea de la răsărit.' },
        2: { title: 'Traseul W', description: 'Trekul clasic de 4 - 5 zile prin parc, cu nopți în refugii sau la camping. Rezervă-le cu luni înainte.' },
        3: { title: 'Cu barca la ghețarul Grey', description: 'Navighează pe Lago Grey printre aisberguri plutitoare, până la fruntea ghețarului.' },
        4: { title: 'Animale sălbatice și pe urmele pumei', description: 'Guanaco, condori și nandu sunt peste tot - cu un ghid specializat poți zări chiar și o pumă.' },
        5: { title: 'Puerto Natales și Peștera Milodonului', description: 'Un orășel-port primitor, bun de odihnă după drumeții, și o peșteră uriașă unde s-au găsit rămășițele unui leneș gigant preistoric.' },
      },
      gallery: ['Torres del Paine', 'Lacuri glaciare'],
    },
    'santiago-de-chile': {
      description: 'O capitală modernă, cu Anzii înzăpeziți drept fundal, piețe excelente cu mâncare și podgorii chiar la marginea orașului.',
      funFact: 'Iarna poți schia dimineața în Anzi și privi apusul deasupra Pacificului în aceeași seară - ambele sunt la doar aproximativ 1,5 ore de Santiago.',
      activities: {
        1: { description: 'Urcă pe deal cu funicularul sau cu telecabina pentru cea mai bună priveliște asupra orașului și a Anzilor.' },
        2: { title: 'Excursie de o zi la Valparaiso', description: 'Un oraș-port colorat, cu dealuri, street art și funiculare vechi, sit al patrimoniului mondial UNESCO.' },
        3: { title: 'Degustare de vin în valea Maipo sau Casablanca', description: 'Carmenere și Cabernet în podgorii aflate la mai puțin de o oră de oraș.' },
        4: { title: 'Bellavista și La Chascona', description: 'Cartierul boem și casa jucăușă a poetului Pablo Neruda.' },
        5: { title: 'Mercado Central și La Vega', description: 'Tocănițe cu fructe de mare, empanadas și fructe proaspete în cele mai animate piețe ale orașului.' },
      },
      gallery: ['Străzile din Santiago', 'Anzii deasupra orașului'],
    },
    'atacama-desert': {
      name: 'Deșertul Atacama',
      description: 'Saline, gheizere, lagune cu flamingi și unele dintre cele mai senine ceruri nocturne din lume, în jurul oazei San Pedro de Atacama.',
      funFact: 'Atacama este cel mai arid deșert nepolar de pe Pământ - unele stații meteo de acolo nu au înregistrat niciodată ploaie. NASA a testat aici roverele marțiene.',
      activities: {
        1: { title: 'Apus în Valle de la Luna', description: 'Plimbă-te printre dune și formațiuni de sare care seamănă cu suprafața Lunii, în timp ce cerul se face roz.' },
        2: { title: 'Gheizerele El Tatio la răsărit', description: 'Gheizere aburinde la aproximativ 4.300 m - în zori e foarte frig, așa că ia haine groase.' },
        3: { title: 'Tur de observare a stelelor', description: 'Datorită aerului uscat și altitudinii mari, în Atacama se află unele dintre cele mai mari observatoare din lume.' },
        4: { title: 'Plutește în Laguna Cejar', description: 'O lagună atât de sărată încât plutești fără efort, ca în Marea Moartă.' },
        5: { title: 'Lagune altiplanice și flamingi', description: 'Lacuri de un albastru intens la Miscanti și Miniques și flamingi care se hrănesc în Salar de Atacama.' },
      },
      gallery: ['Peisaj de deșert', 'Cerul nopții în Atacama'],
    },
  },
};
