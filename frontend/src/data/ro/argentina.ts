import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/argentina.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const argentina: DestinationTranslation = {
  tagline: 'Nopți de tango, cascade tunătoare și ghețari pe care îi auzi cum crapă.',
  description:
    'Argentina este uriașă - a opta țară ca mărime din lume - și fiecare colț al ei pare altfel. Dansează tango pe străzile elegante din Buenos Aires, stai în stropii Cascadelor Iguazu, savurează un Malbec la poalele Anzilor în Mendoza și privește cum pereți de gheață se prăbușesc în lac la ghețarul Perito Moreno.',
  bestTimeToVisit:
    'Octombrie - aprilie pentru Patagonia; martie - mai (culesul viei) pentru Mendoza; martie - mai și septembrie - noiembrie pentru Buenos Aires; Iguazu e bun tot anul (mai ploios și cu mai multă apă în decembrie - martie)',
  places: {
    'patagonia-el-calafate': {
      description: 'Poarta spre Parcul Național Los Glaciares, ghețarul Perito Moreno și El Chalten, capitala drumețiilor.',
      funFact: 'Ghețarul Perito Moreno este unul dintre puținii ghețari din lume care nu se micșorează - are aproximativ 30 km lungime, iar fruntea lui se ridică la circa 70 m deasupra lacului Lago Argentino.',
      activities: {
        1: { title: 'Pasarelele de la ghețarul Perito Moreno', description: 'Privește cum blocuri uriașe de gheață se desprind și se prăbușesc în lac, de pe balcoanele aflate chiar în fața ghețarului.' },
        2: { title: 'Mini-trekking pe gheață', description: 'Pune-ți colțarii și mergi chiar pe ghețar, printre crevase albastre.' },
        3: { title: 'Excursie de o zi la El Chalten și Laguna de los Tres', description: 'O drumeție lungă și grea până la priveliștea emblematică a Muntelui Fitz Roy la răsărit.' },
        4: { title: 'Cu barca la ghețarii Upsala și Spegazzini', description: 'Navighează pe Lago Argentino printre aisberguri uriașe, până la ghețari la care ajungi doar pe apă.' },
        5: { title: 'Miel patagonez la o estancia', description: 'Cordero al asador, copt încet, la o fermă tradițională de oi, cu gauchos și priveliști nesfârșite.' },
      },
      gallery: ['Ghețarul Perito Moreno'],
    },
    'buenos-aires': {
      description: '„Parisul Americii de Sud”: bulevarde grandioase, cartiere colorate, cine târzii și tango până la răsărit.',
      funFact: 'Avenida 9 de Julio este unul dintre cele mai late bulevarde din lume, cu până la 7 benzi pe fiecare sens - îți trebuie mai multe semafoare ca să-l traversezi.',
      activities: {
        1: { title: 'Tango în San Telmo', description: 'Duminica privește dansatorii din Plaza Dorrego, apoi ia o lecție sau mergi seara la o milonga.' },
        2: { title: 'La Boca și Caminito', description: 'Case pictate în culori vii, street art și celebrul stadion al echipei Boca Juniors. Vizitează-l ziua.' },
        3: { title: 'Cimitirul Recoleta', description: 'Un oraș de morminte și statui din marmură, unde este înmormântată Eva Peron.' },
        4: { title: 'Un adevărat asado argentinian', description: 'Friptură de vită și Malbec la o parrilla tradițională - cina începe rareori înainte de ora 21.' },
        5: { description: 'O librărie într-un teatru vechi, numită adesea una dintre cele mai frumoase din lume.' },
      },
      gallery: ['Străzile din Buenos Aires', 'Arhitectură grandioasă'],
    },
    'iguazu-falls': {
      name: 'Cascadele Iguazu',
      description: 'Aproximativ 275 de cascade în junglă, la granița cu Brazilia, una dintre cele Șapte Noi Minuni ale Naturii.',
      funFact: 'Se spune că Eleanor Roosevelt, când a văzut prima dată Iguazu, ar fi exclamat „Bietul Niagara!” - Iguazu este mai înalt decât Niagara și de aproximativ două ori mai lat.',
      activities: {
        1: { title: 'Garganta del Diablo (Gâtlejul Diavolului)', description: 'Ia trenulețul prin junglă și mergi pe pasarele peste râu până la marginea celei mai mari și mai zgomotoase cascade.' },
        2: { title: 'Circuitele de sus și de jos', description: 'Pasarele deasupra și dedesubtul cascadelor, cu curcubeie aproape oriunde te uiți.' },
        3: { title: 'Cu barca pe sub cascade', description: 'O barcă rapidă te duce direct în stropi - te vei uda complet.' },
        4: { title: 'Partea braziliană', description: 'O excursie de o zi peste graniță pentru priveliștea panoramică largă asupra întregului sistem de cascade.' },
        5: { title: 'Observarea animalelor', description: 'Tucani, coati și nori de fluturi pe potecile din pădure. Ține-ți gustările ascunse de coati.' },
      },
      gallery: ['Cascadele Iguazu', 'Junglă subtropicală'],
    },
    mendoza: {
      description: 'Capitala vinului din Argentina, cu podgorii la poalele Anzilor și cel mai înalt munte din cele două Americi în apropiere.',
      funFact: 'Mendoza produce cea mai mare parte a vinului argentinian, iar Aconcagua, aflat în apropiere, este cel mai înalt munte din afara Asiei, cu 6.961 m.',
      activities: {
        1: { title: 'Degustare de Malbec în Valea Uco', description: 'Podgorii la mare altitudine, cu Anzii înzăpeziți chiar în spatele lor.' },
        2: { title: 'Cu bicicleta printre cramele din Maipu', description: 'Închiriază o bicicletă și mergi din bodega în bodega, cu degustări de ulei de măsline pe drum.' },
        3: { title: 'Parcul Provincial Aconcagua', description: 'O plimbare scurtă până la punctul de belvedere spre cel mai înalt munte din cele două Americi.' },
        4: { title: 'Băile termale de la Cacheuta', description: 'Bazine cu apă caldă lângă un râu de munte, perfecte după o zi lungă de degustări.' },
        5: { title: 'Prânz lung la o cramă', description: 'O masă cu mai multe feluri, asortată cu vinuri locale - planifică o după-amiază, nu o oră.' },
      },
      gallery: ['Podgorii la poalele Anzilor'],
    },
  },
};
