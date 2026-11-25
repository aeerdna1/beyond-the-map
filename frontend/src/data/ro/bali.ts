import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/bali.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const bali: DestinationTranslation = {
  tagline: 'Orezării în terase, ceremonii la temple și surf la apus.',
  description:
    'Insula Zeilor, din Indonezia: spirituală, verde și nesfârșit de fotogenică. Mici ofrande de flori stau pe fiecare prag, ceremoniile de la temple umplu străzile de muzică, iar într-o singură zi poți trece de la cascade în junglă la apusuri privite de pe faleze.',
  bestTimeToVisit: 'Aprilie - octombrie (sezonul uscat); mai, iunie și septembrie sunt mai puțin aglomerate decât iulie - august',
  places: {
    ubud: {
      description: 'Inima culturală a Bali, în mijlocul junglei: orezării în terase, yoga, sate de meșteșugari și dans tradițional.',
      funFact: 'Orezăriile în terase din Bali sunt irigate prin „subak”, un sistem cooperativ de irigații administrat de templele apei încă din secolul al IX-lea. Este sit al patrimoniului mondial UNESCO.',
      activities: {
        1: { title: 'Orezăriile Tegallalang la răsărit', description: 'Plimbă-te pe treptele verzi înainte de căldură și de mulțime - și încearcă faimosul leagăn din junglă, dacă ai chef.' },
        2: { title: 'Sanctuarul Pădurea Sacră a Maimuțelor', description: 'Temple acoperite de mușchi și sute de macaci cu coadă lungă. Ascunde ochelarii de soare și gustările.' },
        3: { title: 'Plimbare pe creasta Campuhan', description: 'O potecă ușoară pe o creastă înierbată, între două văi de râu, minunată la răsărit sau la apus.' },
        4: { title: 'Templul apei Tirta Empul', description: 'Alătură-te balinezilor într-un ritual de purificare sub izvoarele sfinte. Primești sarong la intrare.' },
        5: { title: 'Dans Kecak sau Legong seara', description: 'Dans tradițional la Palatul din Ubud sau la un templu local, în lumina focului și a felinarelor.' },
      },
      gallery: ['Orezării în terase', 'Jungla din Ubud'],
    },
    uluwatu: {
      description: 'Vârful sudic și sălbatic al Bali: faleze de calcar, plaje ascunse și surf de clasă mondială.',
      funFact: 'Pura Luhur Uluwatu, cocoțat la aproximativ 70 m deasupra oceanului, este unul dintre cele șase temple principale ale Bali, despre care se crede că protejează insula de spiritele rele.',
      activities: {
        1: { title: 'Templul Uluwatu și dansul Kecak cu foc', description: 'Un templu pe faleză la apus, urmat de hipnoticul dans cu incantații. Ai grijă la maimuțe.' },
        2: { title: 'Plajele Padang Padang și Bingin', description: 'Golfulețe mici la care ajungi pe trepte printre faleze, cu nisip auriu și apă limpede.' },
        3: { title: 'Privește surferii sau învață să faci surf', description: 'Unele dintre cele mai celebre valuri de recif din lume - începătorii pot lua lecții pe plaje mai blânde.' },
        4: { title: 'Plaja Melasti', description: 'Un drum săpat prin faleze albe coboară spre o plajă largă, cu apă turcoaz.' },
        5: { title: 'Apus la un beach club pe faleză', description: 'Cocktailuri și o piscină infinity deasupra Oceanului Indian.' },
      },
      gallery: ['Falezele din Uluwatu', 'Oceanul Indian'],
    },
    'canggu-seminyak': {
      name: 'Canggu și Seminyak',
      description: 'Coasta de vest a Bali, cea la modă: plaje de surf, cafenele, buticuri și cele mai frumoase apusuri de pe insulă.',
      funFact: 'Canggu a fost o zonă liniștită, cu orezării și câteva locuri de surf, până în anii 2010 - astăzi este unul dintre cele mai populare locuri din lume pentru nomazii digitali.',
      activities: {
        1: { title: 'Tanah Lot la apus', description: 'Un templu al mării, pe o stâncă din ocean - la reflux poți merge până la baza lui.' },
        2: { title: 'Lecție de surf la Batu Bolong', description: 'Valuri blânde și line, perfecte pentru prima ta dată pe placă.' },
        3: { title: 'Din cafenea în cafenea, la brunch', description: 'Smoothie bowls, cafea excelentă și mâncare sănătoasă pe fiecare stradă.' },
        4: { title: 'Buticurile și spa-urile din Seminyak', description: 'Cumpără de la designeri locali, apoi rezervă un masaj tradițional balinez.' },
        5: { title: 'Apus la Echo Beach sau la un beach club', description: 'Fotolii-sac pe nisip și muzică live în timp ce cerul se face portocaliu.' },
      },
      gallery: ['Apus pe coasta de vest', 'Plajă de surf'],
    },
    'nusa-penida': {
      description: 'O insulă sălbatică, la o scurtă cursă cu barca rapidă din Bali, celebră pentru falezele spectaculoase și pentru mante (diavoli de mare).',
      funFact: 'Plaja Kelingking are porecla „Golful T-Rex” pentru că, văzută de sus, faleza seamănă cu capul unui Tyrannosaurus.',
      activities: {
        1: { title: 'Belvederea de la Kelingking Beach', description: 'Celebra faleză T-Rex. Poteca spre plajă este foarte abruptă - coboară doar cu încălțări bune.' },
        2: { title: 'Snorkeling cu mante', description: 'Înoată alături de mante uriașe la Manta Point sau Manta Bay, într-o excursie cu barca.' },
        3: { description: 'O arcadă naturală de piatră deasupra unui golf circular și, lângă ea, un bazin limpede între stânci (verifică mai întâi valurile).' },
        4: { description: 'Trepte săpate în faleză coboară spre nisip alb și apă albastră, pe coasta de est.' },
        5: { title: 'Răsărit la belvederea Thousand Islands', description: 'Un șir de insulițe sub faleze, aurii în lumina dimineții.' },
      },
      gallery: ['Falezele din Nusa Penida', 'Apele mantelor'],
    },
  },
};
