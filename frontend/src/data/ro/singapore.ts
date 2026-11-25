import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/singapore.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const singapore: DestinationTranslation = {
  name: 'Singapore',
  tagline: 'Un oraș-grădină al viitorului, cu mâncarea de stradă de altădată.',
  description:
    'Mic, impecabil de curat și surprinzător de verde, cu cartiere care par fiecare o altă țară. Într-o singură zi poți lua micul dejun în Little India, prânzul la o tarabă cu stea Michelin, te poți plimba pe sub uriașii Supertrees luminați și poți încheia ziua cu o priveliște de pe acoperiș asupra golfului.',
  bestTimeToVisit:
    'Februarie - aprilie (mai uscat și mai puțin umed); cald tot anul (aproximativ 25 - 32 C), cu ploi tropicale scurte aproape în orice zi',
  places: {
    'marina-bay': {
      description: 'Orizontul celebru: Marina Bay Sands, Merlionul și o faleză care se luminează în fiecare seară.',
      funFact: 'O mare parte din Marina Bay este construită pe teren câștigat de la mare - Singapore a crescut cu aproximativ 25% din anii 1960 încoace, adăugând pământ în mare.',
      activities: {
        1: { title: 'Spectacolul de lumini și apă Spectra', description: 'Un spectacol gratuit, seara, pe promenada de pe malul apei, în fața Marina Bay Sands.' },
        2: { description: 'Platforma de observație de la etajul 57, pentru priveliștea clasică asupra golfului și a orașului.' },
        3: { title: 'Merlionul', description: 'Simbolul Singapore, jumătate leu, jumătate pește, cu cel mai bun loc pentru poze cu orizontul chiar în spatele lui.' },
        4: { title: 'Strada cu satay de la Lau Pa Sat', description: 'O hală victoriană în fața căreia strada se umple de grătare cu satay în fiecare seară.' },
        5: { title: 'Plimbare la apus în jurul golfului', description: 'Traversează podul Helix și urmează promenada în timp ce zgârie-norii se aprind.' },
      },
      gallery: ['Orizontul Marina Bay', 'Golful la amurg'],
    },
    sentosa: {
      description: 'Insula de joacă a Singapore: plaje, parcuri de distracții și telecabine, chiar după un pod scurt.',
      funFact: 'Sentosa înseamnă „pace și liniște” în malaeziană, dar insula se numea cândva Pulau Blakang Mati - „insula din spatele morții” - și a fost un fort militar britanic.',
      activities: {
        1: { description: 'Atracții și spectacole în zone tematice - mergi într-o zi lucrătoare ca să eviți cele mai lungi cozi.' },
        2: { title: 'Telecabina de pe Muntele Faber', description: 'Plutește deasupra portului și a navelor până pe insulă, cu priveliște înapoi spre oraș.' },
        3: { title: 'Plajele Siloso și Palawan', description: 'Relaxează-te pe nisip și traversează podul suspendat până la o insuliță de lângă plaja Palawan.' },
        4: { description: 'Unul dintre cele mai mari acvarii din lume, cu un geam uriaș plin de mante și rechini.' },
        5: { description: 'Explorează tuneluri vechi și tunuri din al Doilea Război Mondial, în vârful vestic al insulei.' },
      },
      gallery: ['Plajele din Sentosa', 'Apele insulei'],
    },
    'chinatown-little-india': {
      name: 'Chinatown și Little India',
      description: 'Cartiere istorice colorate, pline de temple, case-magazin, mirodenii și cu unele dintre cele mai bune mâncăruri din oraș.',
      funFact: 'În 2016, o tarabă cu pui în sos de soia din Chinatown a devenit una dintre primele tarabe de street food din lume care au primit o stea Michelin.',
      activities: {
        1: { title: 'Templul Relicvei Dintelui lui Buddha', description: 'Un templu impunător, roșu cu auriu, în Chinatown, cu o grădină liniștită pe acoperiș.' },
        2: { description: 'Încearcă orezul cu pui Hainanese, felul național al Singapore, la unul dintre cele mai celebre centre de street food.' },
        3: { title: 'Templul Sri Mariamman', description: 'Cel mai vechi templu hindus din Singapore, cu un turn acoperit de zei sculptați în culori vii.' },
        4: { title: 'Tekka Centre și strada Serangoon', description: 'Biryani, ghirlande de flori și magazine de mirodenii în inima cartierului Little India.' },
        5: { title: 'Kampong Glam și Haji Lane', description: 'Moscheea aurie a Sultanului, Arab Street și ulițe înguste pline de picturi murale și buticuri mici.' },
      },
      gallery: ['Străzi istorice', 'Temple și case-magazin'],
    },
    'gardens-nature': {
      name: 'Grădini și natură',
      description: '„Orașul într-o grădină”: grădini futuriste, plimbări prin pădurea tropicală și una dintre cele mai bune grădini zoologice din lume.',
      funFact: 'Grădina Botanică din Singapore are peste 160 de ani și a fost prima grădină botanică tropicală inclusă în patrimoniul mondial UNESCO.',
      activities: {
        1: { title: 'Gardens by the Bay și Supertrees', description: 'Plimbă-te pe pasarela OCBC Skyway printre uriașii Supertrees, apoi rămâi seara la spectacolul de lumini Garden Rhapsody.' },
        2: { title: 'Cloud Forest și Flower Dome', description: 'Un munte în interior, cu o cascadă de 35 m, și cea mai mare seră de sticlă din lume.' },
        3: { title: 'Grădina Botanică din Singapore', description: 'Intrare gratuită, iar Grădina Națională a Orhideelor are peste 1.000 de specii de orhidee.' },
        4: { description: 'Prima grădină zoologică de noapte din lume - vezi animalele treze după lăsarea întunericului, cu trenulețul sau pe o potecă.' },
        5: { title: 'Southern Ridges și Henderson Waves', description: 'O plimbare printre coroanele copacilor, de-a lungul unui lanț de parcuri de 10 km și peste podul în formă de val Henderson Waves.' },
      },
      gallery: ['Gardens by the Bay', 'Singapore verde'],
    },
  },
};
