import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/hawaii.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const hawaii: DestinationTranslation = {
  tagline: 'Vulcani, curcubeie și adevăratul spirit aloha.',
  description:
    'Un stat american în mijlocul Pacificului, la peste 3.000 km de cel mai apropiat continent. Fiecare insulă are personalitatea ei: Oahu e plină de viață, Maui te relaxează, Big Island este încă în construcție datorită lavei, iar Kauai este junglă verde în stare pură.',
  bestTimeToVisit:
    'Aprilie - mai și septembrie - octombrie (vreme uscată, mai puțină aglomerație, prețuri mai bune); decembrie - aprilie pentru balenele cu cocoașă',
  places: {
    oahu: {
      description: 'Locul de întâlnire: viața de oraș din Honolulu, plaja Waikiki și surful legendar de pe North Shore.',
      funFact: 'Palatul Iolani din Honolulu este singurul palat regal de pe teritoriul SUA - a fost casa ultimilor monarhi hawaiieni și a avut lumină electrică înaintea Casei Albe.',
      activities: {
        1: { title: 'Diamond Head la răsărit', description: 'O drumeție scurtă și abruptă pe un vechi crater vulcanic, cu priveliște asupra Waikiki și a oceanului. Rezervă-ți din timp intervalul de intrare.' },
        2: { title: 'Pearl Harbor și Memorialul USS Arizona', description: 'O vizită liniștită și emoționantă la locul care a atras SUA în al Doilea Război Mondial.' },
        3: { title: 'O zi pe North Shore', description: 'Iarna, privește surferii pe valurile uriașe, apoi mănâncă creveți cu usturoi de la un food truck din Haleiwa.' },
        4: { title: 'Snorkeling în Hanauma Bay', description: 'Un golf protejat în interiorul unui con vulcanic, plin de pești de recif și broaște țestoase verzi. Rezervarea este obligatorie.' },
        5: { description: 'Valea verde și spectaculoasă unde s-au filmat „Jurassic Park” și „Jumanji” - cu jeepul, călare sau cu bicicleta electrică.' },
      },
      gallery: ['Coasta din Oahu', 'Apă turcoaz'],
    },
    maui: {
      description: 'Insula Văii: răsărit deasupra norilor, drumuri șerpuite pe coastă și balene iarna.',
      funFact: 'Haleakala înseamnă „Casa Soarelui”. Legenda spune că semizeul Maui a prins soarele cu lasoul din vârful muntelui, ca să facă zilele mai lungi.',
      activities: {
        1: { title: 'Răsărit pe Haleakala', description: 'Privește soarele răsărind deasupra unei mări de nori, de la 3.000 m. Intrarea la răsărit trebuie rezervată din timp - ia-ți o geacă.' },
        2: { title: 'Drumul spre Hana', description: 'Sute de curbe, poduri cu o singură bandă, cascade, plaje cu nisip negru și tarabe cu pâine cu banane.' },
        3: { title: 'Snorkeling la craterul Molokini', description: 'Un crater vulcanic pe jumătate scufundat, cu una dintre cele mai limpezi ape din Hawaii.' },
        4: { title: 'Observarea balenelor (decembrie - aprilie)', description: 'Mii de balene cu cocoașă vin în apele calde ale insulei Maui ca să nască.' },
        5: { title: 'Plaja Kaanapali și Black Rock', description: 'Snorkeling cu broaște țestoase la Black Rock, apoi rămâi pentru ceremonia săriturii de pe stâncă, la apus.' },
      },
      gallery: ['Plajă în Maui', 'Deasupra norilor'],
    },
    'big-island': {
      description: 'Cea mai tânără și cea mai mare insulă, unde vulcanii activi încă adaugă pământ nou.',
      funFact: 'Măsurat de la baza sa de pe fundul oceanului, Mauna Kea are peste 10.000 m înălțime - mai mult decât Everestul.',
      activities: {
        1: { title: 'Parcul Național Hawaii Volcanoes', description: 'Plimbă-te pe lângă fumarole și cratere în jurul vulcanului Kilauea - noaptea, verifică dacă se vede strălucirea lavei.' },
        2: { title: 'Snorkeling de noapte cu mante în Kona', description: 'Plutește la suprafață în timp ce mante uriașe fac tumbe în luminile de sub tine.' },
        3: { title: 'Observarea stelelor pe Mauna Kea', description: 'Unul dintre cele mai bune locuri de pe Pământ pentru a vedea stelele, unde se află observatoare de top mondial.' },
        4: { title: 'Plaja cu nisip negru Punaluu', description: 'Nisip vulcanic negru ca smoala, cu broaște țestoase verzi odihnindu-se pe mal (păstrează distanța).' },
        5: { title: 'Tur la o plantație de cafea Kona', description: 'Gustă una dintre cele mai celebre cafele din lume chiar acolo unde crește, pe versanții vulcanului.' },
      },
      gallery: ['Peisaj vulcanic', 'Cerul nopții'],
    },
    kauai: {
      description: 'Insula Grădină: cea mai veche dintre insulele principale, numai faleze de smarald, cascade și plaje liniștite.',
      funFact: 'Pe Kauai nicio clădire nu poate fi mai înaltă decât un cocotier - o regulă locală care păstrează insula sălbatică și fără clădiri înalte.',
      activities: {
        1: { title: 'Coasta Na Pali cu barca sau elicopterul', description: 'Faleze verzi abrupte care coboară în ocean, accesibile doar pe mare, din aer sau printr-o drumeție lungă.' },
        2: { title: 'Canionul Waimea', description: 'Poreclit „Marele Canion al Pacificului” - stâncă roșie, creste verzi și cascade.' },
        3: { title: 'Golful Hanalei', description: 'O semilună largă de nisip, cu munți în spate. Perfectă pentru o zi leneșă la plajă sau pentru paddleboarding.' },
        4: { title: 'Traseul Kalalau până la Hanakapiai', description: 'Prima parte a celebrului traseu de coastă. Rezervă din timp intrarea în Parcul de Stat Haena.' },
        5: { title: 'Cu caiacul pe râul Wailua', description: 'Vâslește prin junglă, apoi urcă până la o cascadă pentru o baie.' },
      },
      gallery: ['Coasta Na Pali', 'Canionul Waimea'],
    },
  },
};
