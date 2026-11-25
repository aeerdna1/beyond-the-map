import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/malaysia.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const malaysia: DestinationTranslation = {
  name: 'Malaezia',
  tagline: 'Zgârie-nori, pădure tropicală și o bucătărie modelată de trei culturi.',
  description:
    'Aromele malaeziene, chinezești și indiene se întâlnesc în orașe, pe insule și într-una dintre cele mai vechi păduri tropicale din lume. Într-o săptămână poți gusta din toate tarabele de street food de sub Turnurile Petronas, iar în următoarea poți privi urangutani sălbatici în Borneo.',
  bestTimeToVisit:
    'Decembrie - aprilie pentru coasta de vest (Penang, Langkawi); martie - octombrie pentru Sabah (Borneo); Kuala Lumpur e o alegere bună tot anul',
  places: {
    'kuala-lumpur': {
      description: 'Un orizont modern, temple colorate și unele dintre cele mai bune street food-uri din Asia.',
      funFact: 'Cu cei 452 m ai lor, Turnurile Gemene Petronas au fost cele mai înalte clădiri din lume între 1998 și 2004 și sunt încă cele mai înalte turnuri gemene de pe Pământ.',
      activities: {
        1: { title: 'Turnurile Gemene Petronas și Skybridge', description: 'Traversează podul dintre turnuri, apoi privește-le cum se aprind seara din parcul KLCC. Cumpără biletele din timp.' },
        2: { title: 'Peșterile Batu', description: 'Urcă cele 272 de trepte în culorile curcubeului până la un templu hindus dintr-o peșteră uriașă de calcar, păzit de o statuie aurie gigantică.' },
        3: { title: 'Strada cu mâncare Jalan Alor', description: 'Satay, crab cu chili și durian la sute de tarabe în aer liber, în fiecare seară.' },
        4: { title: 'Piața Merdeka și orașul vechi', description: 'Locul unde a fost proclamată independența în 1957, înconjurat de clădiri în stil maur.' },
        5: { title: 'KL Tower sau un bar pe acoperiș la apus', description: 'Privește cum întregul oraș devine auriu, apoi sclipește când se aprind luminile.' },
      },
      gallery: ['Orizontul din Kuala Lumpur', 'Street food noaptea'],
    },
    penang: {
      description: 'O insulă celebră pentru străzile istorice din George Town, street art și legendarul street food.',
      funFact: 'Celebrele picturi murale din George Town au fost începute în 2012 de artistul lituanian Ernest Zacharevic, pentru un festival. Trebuiau să fie temporare, iar acum sunt cea mai mare atracție a orașului.',
      activities: {
        1: { title: 'Vânătoare de street art în George Town', description: 'Găsește picturile murale și caricaturile din fier forjat din orașul vechi aflat în patrimoniul UNESCO - pe jos sau cu bicicleta.' },
        2: { title: 'Tur de street food', description: 'Char kway teow, assam laksa și cendol pe Gurney Drive sau New Lane - Penang este capitala gastronomică a Malaeziei.' },
        3: { title: 'Templul Kek Lok Si', description: 'Unul dintre cele mai mari temple budiste din Asia de Sud-Est, frumos luminat cu felinare noaptea.' },
        4: { title: 'Penang Hill cu funicularul', description: 'Urcă pe deal pentru aer mai răcoros și o priveliște asupra George Town și a podului spre continent.' },
        5: { title: 'Chew Jetty, debarcaderele clanurilor', description: 'Case de lemn pe piloni deasupra apei, locuite încă de familii ale clanurilor chinezești.' },
      },
      gallery: ['Străzile din George Town', 'Templele din Penang'],
    },
    langkawi: {
      description: 'Un arhipelag tropical relaxat, cu pădure tropicală, mangrove și plaje liniștite.',
      funFact: 'Langkawi este un grup de 99 de insule - la reflux mai apar câteva. Întregul arhipelag este Geoparc Global UNESCO și zonă duty-free.',
      activities: {
        1: { title: 'SkyCab și Sky Bridge', description: 'O cursă abruptă cu telecabina pe Muntele Mat Cincang, până la un pod curbat suspendat deasupra pădurii tropicale.' },
        2: { title: 'Tur cu barca sau caiacul prin mangrovele Kilim', description: 'Alunecă printre mangrove și peșteri de calcar, cu vulturi rotindu-se deasupra.' },
        3: { title: 'Din insulă în insulă', description: 'Înoată în Lacul Fecioarei Însărcinate de pe Dayang Bunting și relaxează-te pe plaja Beras Basah.' },
        4: { title: 'Cascada Seven Wells', description: 'O drumeție prin junglă până la bazine naturale de piatră, așezate unul deasupra celuilalt.' },
        5: { title: 'Apus pe Pantai Cenang', description: 'Cea mai animată plajă a insulei, cu cine cu fructe de mare pe nisip.' },
      },
      gallery: ['Plajele din Langkawi', 'Mangrove'],
    },
    'borneo-sabah': {
      description: 'Borneo sălbatic: urangutani, râuri prin pădurea tropicală, Muntele Kinabalu și unele dintre cele mai bune locuri de scufundări din lume.',
      funFact: 'Borneo este a treia insulă ca mărime din lume și singura împărțită între trei țări: Malaezia, Indonezia și Brunei.',
      activities: {
        1: { title: 'Centrul de reabilitare a urangutanilor Sepilok', description: 'Privește urangutanii salvați cum vin legănându-se la ora mesei, în pădurea tropicală.' },
        2: { title: 'Croazieră pe râul Kinabatangan', description: 'Caută maimuțe nasalis, păsări calao și chiar elefanți pitici, în zori și la amurg.' },
        3: { title: 'Urcă sau vizitează Muntele Kinabalu', description: 'Cel mai înalt vârf al Malaeziei, de 4.095 m - o ascensiune de două zile sau trasee ușoare prin natură în Parcul Kinabalu.' },
        4: { title: 'Scufundări sau snorkeling la Sipadan', description: 'Broaște țestoase, tornade de barracuda și rechini de recif. Permisele zilnice sunt limitate, așa că rezervă din timp.' },
        5: { title: 'Din insulă în insulă, din Kota Kinabalu', description: 'Snorkeling în Parcul Tunku Abdul Rahman, apoi apusul și piața de noapte din oraș.' },
      },
      gallery: ['Muntele Kinabalu', 'Pădurea tropicală din Borneo'],
    },
  },
};
