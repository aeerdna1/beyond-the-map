import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/thailand.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const thailand: DestinationTranslation = {
  name: 'Thailanda',
  tagline: 'Temple aurii, insule de explorat și cel mai bun street food de pe Pământ.',
  description:
    'De la agitația din Bangkok la junglele și templele din nord și insulele de calcar din sud. Thailanda este Țara Zâmbetelor: piețe de noapte, bărci long-tail, orez lipicios cu mango și unele dintre cele mai frumoase plaje din Asia.',
  bestTimeToVisit:
    'Noiembrie - aprilie (sezonul uscat pe coasta Andaman: Phuket, Krabi, Phi Phi); noiembrie - februarie este perioada cea mai răcoroasă',
  places: {
    bangkok: {
      description: 'O capitală care nu se oprește niciodată: temple aurii, bărci pe râu, baruri pe acoperișuri și street food la fiecare colț.',
      funFact: 'Numele ceremonial complet al orașului Bangkok, care începe cu „Krung Thep Maha Nakhon”, este cel mai lung nume de localitate din lume - thailandezii îi spun simplu Krung Thep, „Orașul Îngerilor”.',
      activities: {
        1: { title: 'Marele Palat și Wat Phra Kaew', description: 'Fosta reședință regală, uluitoare, și templul lui Buddha de Smarald. Acoperă-ți umerii și genunchii.' },
        2: { title: 'Wat Pho și Wat Arun', description: 'Vezi statuia de 46 m a lui Buddha culcat, apoi ia feribotul peste râu până la Wat Arun pentru apus.' },
        3: { title: 'Street food noaptea în Chinatown', description: 'Strada Yaowarat se aprinde cu reclame de neon și tarabe cu tăiței, fructe de mare și orez lipicios cu mango.' },
        4: { title: 'Cu barca long-tail pe canale', description: 'Explorează canalele (khlong) din Thonburi și vezi casele de lemn pe piloni și partea veche a orașului.' },
        5: { title: 'Piața de weekend Chatuchak', description: 'Una dintre cele mai mari piețe din lume, cu mii de tarabe - mergi devreme, că se face cald.' },
      },
      gallery: ['Templele din Bangkok', 'Străzile orașului'],
    },
    'chiang-mai': {
      description: 'Capitala relaxată a nordului: un oraș vechi înconjurat de ziduri, temple pe munte și cursuri de gătit.',
      funFact: 'Chiang Mai are peste 300 de temple budiste - aproape cât Bangkokul, într-un oraș de multe ori mai mic.',
      activities: {
        1: { description: 'Urcă scara străjuită de naga, de aproximativ 300 de trepte, până la templul auriu de pe munte, cu priveliște peste oraș.' },
        2: { title: 'Un sanctuar etic pentru elefanți', description: 'Hrănește elefanți salvați și plimbă-te alături de ei, într-un sanctuar care nu oferă plimbări în spinarea lor.' },
        3: { title: 'Curs de gătit thailandez', description: 'Fă cumpărături într-o piață locală, apoi pregătește-ți singur pasta de curry, pad thai și orez lipicios cu mango.' },
        4: { title: 'Templele din Orașul Vechi, cu bicicleta', description: 'Pedalează între Wat Chedi Luang, Wat Phra Singh și templele liniștite din interiorul vechiului șanț de apărare.' },
        5: { title: 'Piața de duminică Walking Street', description: 'Obiecte meșteșugărești, supă khao soi și muzică live pe strada Ratchadamnoen, în fiecare duminică seara.' },
      },
      gallery: ['Munții din nord', 'Detalii de templu'],
    },
    phuket: {
      description: 'Cea mai mare insulă a Thailandei: plaje lungi cu nisip, un oraș vechi colorat și excursii cu barca în golful Phang Nga.',
      funFact: 'Phuket s-a îmbogățit din mineritul de staniu, care a adus negustori chinezi și europeni - de aceea Orașul Vechi e plin de case-magazin colorate, în stil sino-portughez.',
      activities: {
        1: { title: 'Golful Phang Nga și Insula James Bond', description: 'Turnuri de calcar care se ridică din apa de smarald, celebre datorită filmului „Omul cu pistolul de aur”.' },
        2: { title: 'Orașul Vechi din Phuket', description: 'Case-magazin în culori pastel, street art și cafenele pe strada Thalang, plus o piață de noapte duminica.' },
        3: { title: 'Marele Buddha', description: 'Un Buddha de 45 m din marmură albă, pe vârful unui deal, cu priveliște spre golful Chalong.' },
        4: { title: 'Apus la Capul Promthep', description: 'Vârful sudic al insulei, unde toată lumea se adună să vadă soarele coborând în mare.' },
        5: { title: 'Scufundări sau snorkeling în Insulele Similan', description: 'Bolovani de granit și una dintre cele mai limpezi ape din Thailanda (parcul e deschis aproximativ din octombrie până în mai).' },
      },
      gallery: ['Coasta Andaman', 'Golful Phang Nga'],
    },
    krabi: {
      description: 'Faleze spectaculoase de calcar, lagune ascunse și unele dintre cele mai bune trasee de escaladă din lume.',
      funFact: 'Railay se află pe continent, dar este izolat de faleze înalte de calcar - singura cale de a ajunge acolo este cu barca.',
      activities: {
        1: { title: 'Plaja Railay și peștera Phra Nang', description: 'Nisip alb încadrat de faleze uriașe și o plajă-peșteră plină de ofrande pentru zeița locală a mării.' },
        2: { title: 'Turul celor Patru Insule cu barca long-tail', description: 'Treci de la Poda la Chicken Island și Tup Island, unde la reflux apare o limbă de nisip.' },
        3: { title: 'Escaladă în Railay', description: 'Cursuri potrivite pentru începători, pe pereți de calcar chiar deasupra plajei.' },
        4: { title: 'Templul Peșterii Tigrului', description: 'Peste 1.200 de trepte abrupte până la un Buddha auriu în vârf, cu junglă de jur împrejur. Mergi devreme.' },
        5: { title: 'Emerald Pool și izvoarele termale', description: 'Un bazin turcoaz în pădure, apoi o baie caldă la cascada termală din Khlong Thom.' },
      },
      gallery: ['Faleze de calcar', 'Din insulă în insulă'],
    },
    'phi-phi-islands': {
      name: 'Insulele Phi Phi',
      description: 'Lagune turcoaz, plaje albe și faleze ca din film, la o scurtă călătorie cu feribotul din Phuket sau Krabi.',
      funFact: 'Maya Bay, unde a fost filmat „Plaja” cu Leonardo DiCaprio, a fost închis între 2018 și 2022 ca să se refacă coralii - iar rechinii de recif cu vârful negru s-au întors în golf.',
      activities: {
        1: { title: 'Maya Bay dimineața devreme', description: 'Vezi celebrul golf înainte să sosească excursiile de o zi. Înotul nu este permis, iar golful se închide o parte din fiecare an.' },
        2: { title: 'Drumeție până la Phi Phi Viewpoint', description: 'Un urcuș transpirat pentru priveliștea clasică asupra celor două golfuri arcuite din Phi Phi Don, cel mai frumos la apus.' },
        3: { title: 'Snorkeling în laguna Pileh și pe Bamboo Island', description: 'Înoată într-o lagună de smarald înconjurată de faleze, apoi relaxează-te pe o insulă liniștită cu nisip alb.' },
        4: { title: 'Cu caiacul până la Monkey Beach', description: 'Vâslește de-a lungul falezelor până la o plajă mică (ai grijă de genți și nu hrăni maimuțele).' },
        5: { title: 'Apus și spectacole cu foc pe Loh Dalum', description: 'Baruri pe plajă și dansatori cu foc după lăsarea serii - pe insulă nu sunt mașini, așa că mergi peste tot pe jos.' },
      },
      gallery: ['Lagună turcoaz', 'Coasta din Phi Phi'],
    },
  },
};
