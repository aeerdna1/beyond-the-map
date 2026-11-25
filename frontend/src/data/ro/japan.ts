import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/japan.ts. Only texts that differ from English are listed:
// names that stay the same (Tokyo, Kyoto, teamLab Planets, ...) are simply left out.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const japan: DestinationTranslation = {
  name: 'Japonia',
  tagline: 'Nopți de neon, temple liniștite și arta micilor detalii.',
  description:
    'Japonia este locul unde orașe ultramoderne stau lângă altare vechi de o mie de ani. Fiecare tren vine la timp, fiecare masă e o mică ceremonie, iar fiecare anotimp pictează țara într-o altă culoare.',
  bestTimeToVisit: 'Sfârșitul lui martie - mai (cireșii în floare) și octombrie - noiembrie (frunzele de toamnă)',
  places: {
    tokyo: {
      description: 'Un oraș de 14 milioane de locuitori care încă pare o colecție de cartiere mici, fiecare cu personalitatea lui.',
      funFact: 'Tokyo are mai multe restaurante cu stele Michelin decât orice alt oraș din lume - iar unele sunt doar niște tejghele minuscule, cu mai puțin de 10 locuri.',
      activities: {
        1: { title: 'Intersecția Shibuya noaptea', description: 'Privește până la 3.000 de oameni traversând deodată de pe terasa Shibuya Sky, apoi alătură-te și tu mulțimii.' },
        2: { title: 'Senso-ji la răsărit', description: 'Cel mai vechi templu din Tokyo, în Asakusa, liniștit și aurit înainte să sosească mulțimile.' },
        3: { title: 'Mic dejun la Tsukiji Outer Market', description: 'Tamagoyaki, sushi proaspăt și scoici la grătar, mâncate în picioare lângă tarabe.' },
        4: { description: 'Mergi desculț prin apă și prin camere cu oglinzi într-un muzeu imersiv de artă digitală.' },
        5: { title: 'Excursie de o zi la Muntele Fuji / Hakone', description: 'Izvoare termale, o corabie de pirați pe lacul Ashi și - într-o zi senină - Fuji în toată splendoarea lui.' },
      },
      gallery: ['Panorama orașului Tokyo', 'Felinare seara', 'Muntele Fuji văzut de la Pagoda Chureito'],
    },
    kyoto: {
      description: 'Vechea capitală imperială: case de lemn machiya, grădini cu mușchi și felinare care strălucesc pe ulițe înguste.',
      funFact: 'Kyoto are peste 1.600 de temple budiste și aproximativ 400 de altare șintoiste. A fost cruțat de bombardamente în al Doilea Război Mondial datorită valorii sale culturale.',
      activities: {
        1: { description: 'Plimbă-te la răsărit printre miile de porți torii.' },
        2: { title: 'Pădurea de bambus Arashiyama și Tenryu-ji', description: 'Bambuși uriași, apoi o grădină zen aflată în patrimoniul mondial UNESCO.' },
        3: { title: 'Gion la apus', description: 'Plimbă-te pe străzile luminate de felinare și poate zărești o geiko sau o maiko în drum spre o întâlnire.' },
        4: { title: 'Kinkaku-ji, Pavilionul de Aur', description: 'Un templu acoperit cu foiță de aur, oglindit perfect în iazul din fața lui.' },
        5: { title: 'O ceremonie a ceaiului sau o cină kaiseki', description: 'Încetinește ritmul cu un matcha într-o cameră cu tatami sau cu un festin sezonier cu multe feluri.' },
      },
      gallery: ['Pagoda Yasaka', 'Felinare în Gion'],
    },
    osaka: {
      description: 'Bucătăria Japoniei: gălăgioasă, prietenoasă și obsedată de street food.',
      funFact: 'Motto-ul neoficial al orașului Osaka este „kuidaore” - mănâncă până cazi.',
      activities: {
        1: { title: 'Tur de street food în Dotonbori', description: 'Takoyaki, okonomiyaki și kushikatsu sub celebra reclamă Glico cu omulețul care aleargă.' },
        2: { title: 'Castelul Osaka', description: 'Urcă în castel pentru priveliștea asupra orașului și plimbă-te pe lângă șanțurile cu apă mărginite de cireși.' },
        3: { title: 'Piața Kuromon', description: 'Frigărui de wagyu la grătar și căpșuni uriașe, direct de la tarabă.' },
        4: { title: 'Excursie de o zi la Nara', description: 'Înclină-te în fața căprioarelor prietenoase și vezi statuia uriașă a lui Buddha din Todai-ji.' },
        5: { title: 'Umeda Sky Building la apus', description: 'Un observator în aer liber, o „grădină plutitoare” la 173 m deasupra orașului.' },
      },
      gallery: ['Osaka noaptea'],
    },
    okinawa: {
      description: 'Partea tropicală a Japoniei: apă turcoaz, recife de corali și o cultură insulară relaxată.',
      funFact: 'Okinawa este una dintre „Zonele Albastre” ale lumii, cu unul dintre cele mai mari numere de centenari de pe Pământ.',
      activities: {
        1: { title: 'Snorkeling în Insulele Kerama', description: 'Una dintre cele mai limpezi ape din lume, cu broaște țestoase marine drept companie.' },
        2: { title: 'Acvariul Churaumi', description: 'Rechini-balenă care alunecă prin fața unuia dintre cele mai mari geamuri de acvariu din lume.' },
        3: { title: 'Castelul Shuri', description: 'Reședința lăcuită în roșu a vechiului Regat Ryukyu.' },
        4: { title: 'Cu mașina pe podul spre insula Kouri', description: 'Un pod de doi kilometri care pare să plutească deasupra apelor turcoaz, puțin adânci.' },
        5: { title: 'Bucătărie tradițională din Okinawa', description: 'Goya champuru și cartof dulce mov - dieta longevității.' },
      },
      gallery: ['Coasta din Okinawa'],
    },
    hokkaido: {
      description: 'Nordul sălbatic al Japoniei: zăpadă pufoasă, câmpuri de lavandă și izvoare termale aburinde.',
      funFact: 'În Niseko, pe Hokkaido, cad în jur de 15 metri de zăpadă pe sezon - una dintre cele mai pufoase zăpezi de pe planetă.',
      activities: {
        1: { title: 'Schi sau snowboard în Niseko', description: 'Zăpadă pufoasă celebră în toată lumea, cu Muntele Yotei înălțându-se în spatele pârtiilor.' },
        2: { title: 'Festivalul Zăpezii din Sapporo', description: 'Sculpturi uriașe de gheață în fiecare februarie.' },
        3: { title: 'Câmpurile de lavandă din Furano', description: 'Dealuri mov de la sfârșitul lui iunie până la începutul lui august.' },
        4: { title: 'Onsen în Noboribetsu', description: 'Relaxează-te în izvoare cu sulf, lângă aburinda „Vale a Iadului”.' },
        5: { title: 'Fructe de mare proaspete în Otaru', description: 'Boluri cu uni, crab și icre de somon într-un orășel-port cu canale.' },
      },
      gallery: ['Hokkaido iarna'],
    },
  },
};
