import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/egypt.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const egypt: DestinationTranslation = {
  name: 'Egipt',
  tagline: 'Faraoni, Nilul și recife de corali în Marea Roșie.',
  description:
    '5.000 de ani de istorie de-a lungul Nilului, plus unele dintre cele mai bune locuri de scufundări din lume. Stai în fața ultimei Minuni a Lumii Antice care a supraviețuit, navighează cu o feluca la apus, intră în mormintele pictate din Valea Regilor, apoi înoată cu broaște țestoase în Marea Roșie.',
  bestTimeToVisit:
    'Octombrie - aprilie (mai răcoros pentru temple și deșert); Marea Roșie e bună tot anul. În jurul datelor de 22 februarie și 22 octombrie, soarele luminează sanctuarul interior de la Abu Simbel',
  places: {
    'cairo-giza': {
      name: 'Cairo și Giza',
      description: 'O capitală uriașă, gălăgioasă și fascinantă, cu Piramidele de la Giza așteptând la marginea deșertului.',
      funFact: 'Marea Piramidă de la Giza a fost cea mai înaltă construcție făcută de om de pe Pământ timp de aproximativ 3.800 de ani și este singura dintre cele Șapte Minuni ale Lumii Antice care mai există.',
      activities: {
        1: { title: 'Piramidele și Sfinxul la deschidere', description: 'Ajungi devreme ca să scapi de căldură și de mulțime, apoi mergi la punctul panoramic pentru priveliștea clasică asupra tuturor celor nouă piramide.' },
        2: { title: 'Marele Muzeu Egiptean', description: 'Uriașul muzeu nou de lângă piramide, unde se află întreaga comoară a lui Tutankhamon. Planifică cel puțin o jumătate de zi.' },
        3: { title: 'Saqqara și Piramida în trepte a lui Djoser', description: 'Cea mai veche piramidă din Egipt, plus morminte frumos pictate, cu mult mai puțini vizitatori decât la Giza.' },
        4: { title: 'Khan el-Khalili și Cairoul islamic', description: 'Pierde-te prin vechiul bazar, apoi bea un ceai de mentă la El Fishawy, o cafenea deschisă de peste 200 de ani.' },
        5: { title: 'Cu feluca pe Nil la apus', description: 'O barcă tradițională cu pânze, din lemn, în timp ce se aprind luminile orașului pe ambele maluri.' },
      },
      gallery: ['Piramidele de la Giza', 'Egiptul antic'],
    },
    luxor: {
      description: 'Vechea Teba, numită adesea cel mai mare muzeu în aer liber din lume: temple pe malul estic, morminte regale pe cel vestic.',
      funFact: 'Mormântul lui Tutankhamon din Valea Regilor a fost descoperit aproape neatins de Howard Carter în 1922 - mumia lui se odihnește acolo și astăzi.',
      activities: {
        1: { title: 'Zbor cu balonul cu aer cald la răsărit', description: 'Plutește deasupra templelor de pe malul vestic, a câmpurilor verzi ale Nilului și a munților deșertului.' },
        2: { title: 'Valea Regilor', description: 'Intră în morminte regale colorate, săpate adânc în stâncă. Pentru cele mai celebre ai nevoie de bilete suplimentare.' },
        3: { title: 'Templul Karnak', description: 'Unul dintre cele mai mari complexe religioase construite vreodată - Marea Sală Hipostilă are 134 de coloane uriașe.' },
        4: { title: 'Templul din Luxor noaptea', description: 'Templul și Aleea Sfincșilor, frumos luminate după apus.' },
        5: { title: 'Templul Hatșepsut și Colosii lui Memnon', description: 'Templul în terase al uneia dintre puținele femei faraon ale Egiptului și, pe drum, doi uriași de piatră de 18 m.' },
      },
      gallery: ['Templele din Luxor', 'Răsărit deasupra malului vestic'],
    },
    aswan: {
      description: 'Cel mai liniștit loc de pe Nil: insule de granit, sate nubiene colorate și poarta spre Abu Simbel.',
      funFact: 'În anii 1960, templele de la Abu Simbel au fost tăiate în blocuri și mutate cu 65 m mai sus, bucată cu bucată, ca să fie salvate de apele în creștere ale lacului Nasser.',
      activities: {
        1: { title: 'Excursie de o zi la Abu Simbel', description: 'Templele colosale ale lui Ramses al II-lea, lângă granița cu Sudanul. Plecare foarte devreme, dar merită pe deplin.' },
        2: { title: 'Templul de la Philae', description: 'Templul insular al zeiței Isis, la care ajungi cu o barcă mică - și el salvat și mutat din calea Nilului.' },
        3: { title: 'Cu feluca în jurul insulei Elephantine', description: 'Navighează pe lângă bolovani de granit și Insula Botanică a lui Kitchener, în lumina de după-amiază târziu.' },
        4: { title: 'Vizită într-un sat nubian', description: 'Case pictate în culori vii, henna, mirodenii și o primire călduroasă pe malul vestic.' },
        5: { title: 'Croazieră pe Nil până la Luxor', description: 'Trei sau patru zile lente pe râu, cu opriri la templele din Kom Ombo și Edfu.' },
      },
      gallery: ['Nilul la Aswan', 'Abu Simbel'],
    },
    'red-sea-hurghada': {
      name: 'Marea Roșie',
      description: 'Apă caldă și limpede și recife de corali colorate de-a lungul coastei de la Hurghada, El Gouna și Marsa Alam.',
      funFact: 'Marea Roșie este una dintre cele mai sărate mări din lume și găzduiește peste 1.000 de specii de pești - multe dintre ele nu se găsesc nicăieri altundeva pe Pământ.',
      activities: {
        1: { title: 'Snorkeling în Insulele Giftun', description: 'O excursie cu barca din Hurghada până la insule cu nisip alb și grădini de corali în apă mică.' },
        2: { title: 'Înot cu broaște țestoase în Marsa Alam', description: 'În golful Abu Dabbab, broaștele țestoase verzi se hrănesc cu iarbă de mare aproape de plajă - și uneori apare și un dugong.' },
        3: { title: 'Scufundare la epava SS Thistlegorm', description: 'O navă de marfă din al Doilea Război Mondial plină de motociclete și camioane, una dintre cele mai celebre scufundări la epave din lume (pentru scafandri brevetați).' },
        4: { title: 'Safari în deșert și cină beduină', description: 'Cu ATV-ul sau jeepul spre munți, apoi cină și privit stelele în deșert.' },
        5: { title: 'Kitesurf sau relaxare în El Gouna', description: 'Un oraș-lagună fără mașini, cu vânt constant, bărci-taxi și restaurante pe malul apei.' },
      },
      gallery: ['Coasta Mării Roșii', 'Ape cu recife de corali'],
    },
  },
};
