import type { DestinationTranslation } from '../../types';

// Romanian text for src/data/italy.ts. Only texts that differ from English are listed.
// Places are keyed by slug, activities by rank and gallery captions follow the English order.
export const italy: DestinationTranslation = {
  name: 'Italia',
  tagline: 'Vârfuri zimțate în nord, golfulețe turcoaz în sud și istorie la fiecare colț.',
  description:
    'La dolce vita în toate formele ei: drumeții sub vârfurile roz ale Dolomiților, înot în golfulețele albastre ca în Caraibe ale Sardiniei, orecchiette mâncate pe ulițele vechi din Bari, o plimbare prin 2.000 de ani de istorie la Roma și, desigur, sprijinitul Turnului înclinat din Pisa.',
  bestTimeToVisit:
    'Mai - iunie și septembrie - octombrie pentru orașe și litoral (cald, mai puțină aglomerație); sfârșitul lui iunie - septembrie pentru drumeții în Dolomiți; decembrie - martie pentru schi',
  places: {
    dolomites: {
      name: 'Dolomiții',
      description: 'Vârfuri palide de calcar, pajiști alpine și cabane montane cu strudel și mămăligă, în nordul Italiei.',
      funFact: 'La apus, Dolomiții se colorează adesea în roz și portocaliu - localnicii numesc fenomenul „enrosadira”. Roca conține dolomit, un mineral numit după geologul francez Deodat de Dolomieu.',
      activities: {
        1: { title: 'Bucla Tre Cime di Lavaredo', description: 'O drumeție clasică de o jumătate de zi în jurul celor trei vârfuri celebre, cu plecare de la Rifugio Auronzo (drum cu taxă, mergi devreme).' },
        2: { title: 'Lago di Braies la răsărit', description: 'Un lac de smarald sub pereți abrupți - închiriază o barcă de lemn cu vâsle înainte să vină mulțimea.' },
        3: { title: 'Creasta Seceda', description: 'Ia telecabina din Ortisei până pe una dintre cele mai spectaculoase creste din Alpi.' },
        4: { description: 'Cea mai mare pajiște de altitudine din Europa, perfectă pentru plimbări ușoare, ciclism sau schi iarna.' },
        5: { title: 'Prânz la un rifugio', description: 'Cabane montane cu terase însorite, găluște canederli și strudel cu mere, cu priveliște.' },
      },
      gallery: ['Vârfurile Dolomiților', 'Lac alpin'],
    },
    sardinia: {
      name: 'Sardinia',
      description: 'O insulă cu golfulețe turcoaz, nisip alb și turnuri străvechi de piatră, în mijlocul Mediteranei.',
      funFact: 'Sardinia are peste 7.000 de nuraghi - turnuri misterioase de piatră construite acum mai bine de 3.000 de ani. Este și una dintre „Zonele Albastre” ale lumii, unde mulți oameni trec de 100 de ani.',
      activities: {
        1: { title: 'Excursie cu barca în Golful Orosei', description: 'Golfulețe ascunse precum Cala Goloritze și Cala Mariolu, la care ajungi doar cu barca sau pe o potecă abruptă.' },
        2: { title: 'Plaja La Pelosa', description: 'Apă mică, limpede ca cristalul, lângă Stintino. Vara rezervă-ți intrarea din timp și ia o saltea de plajă - prosoapele nu sunt permise.' },
        3: { title: 'Arhipelagul La Maddalena', description: 'Navighează printre insule de granit roz, cu una dintre cele mai limpezi ape din Mediterana.' },
        4: { description: 'Cel mai bine păstrat sat nuragic de pe insulă, sit al patrimoniului mondial UNESCO.' },
        5: { title: 'Apus în Alghero', description: 'Plimbă-te pe vechile ziduri de la mare ale acestui oraș cu aer catalan, apoi cină cu fructe de mare locale.' },
      },
      gallery: ['Coasta Sardiniei', 'Golfulețe turcoaz'],
    },
    bari: {
      description: 'Capitala plină de viață a regiunii Puglia: un oraș vechi plin de femei care fac paste, o faleză lungă și baza perfectă pentru a explora sudul.',
      funFact: 'Osemintele Sfântului Nicolae - sfântul care l-a inspirat pe Moș Crăciun - au fost aduse la Bari de marinari în 1087 și se odihnesc și azi în Bazilica San Nicola.',
      activities: {
        1: { title: 'Bari Vecchia și „strada pastelor”', description: 'Privește femeile din cartier făcând orecchiette de mână, în fața ușilor, pe Strada Arco Basso.' },
        2: { title: 'Bazilica San Nicola', description: 'O biserică romanică frumoasă și un important loc de pelerinaj atât pentru catolici, cât și pentru ortodocși.' },
        3: { title: 'Tur de street food', description: 'Panzerotti, sgagliozze (mămăligă prăjită) și focaccia barese, proaspete, din orașul vechi.' },
        4: { title: 'Excursie de o zi la Polignano a Mare', description: 'Case albe pe faleze deasupra mării și celebra plajă Lama Monachile.' },
        5: { title: 'Casele trulli din Alberobello', description: 'Un oraș ca din povești, cu case albe de piatră și acoperișuri conice, sit UNESCO la aproximativ o oră distanță.' },
      },
      gallery: ['Orașul vechi din Bari', 'Coasta din Puglia'],
    },
    rome: {
      name: 'Roma',
      description: 'Cetatea Eternă: ruine antice, fântâni baroce, Vaticanul și cine lungi în piațete pavate cu piatră.',
      funFact: 'În fiecare zi sunt aruncați în Fontana di Trevi monede de aproximativ 3.000 de euro. Banii sunt strânși și donați în scopuri caritabile - iar tradiția spune că o monedă înseamnă că te vei întoarce la Roma.',
      activities: {
        1: { title: 'Colosseumul și Forumul Roman', description: 'Pășește pe unde au luptat gladiatorii și au vorbit senatorii. Cumpără din timp, online, bilete cu oră fixă.' },
        2: { title: 'Muzeele Vaticanului și Capela Sixtină', description: 'Plafonul lui Michelangelo și Bazilica Sfântul Petru. Mergi devreme sau târziu ca să eviți cele mai lungi cozi.' },
        3: { title: 'Fontana di Trevi și Panteonul în zori', description: 'Vezi-le aproape goale, înainte să se trezească orașul, apoi bea un espresso în picioare, la bar.' },
        4: { title: 'Trastevere noaptea', description: 'Ulițe acoperite de iederă, cacio e pepe și carbonara într-o trattorie de familie.' },
        5: { title: 'Galeria și grădinile Borghese', description: 'Sculpturi de Bernini înăuntru, apoi apusul deasupra orașului de pe terasa Pincio.' },
      },
      gallery: ['Roma', 'Străzile Romei'],
    },
    pisa: {
      description: 'Mult mai mult decât celebrul turn: un oraș universitar plin de viață pe malul râului Arno, aproape de Florența, Lucca și coasta Toscanei.',
      funFact: 'Turnul a început să se încline încă din timpul construcției, în secolul al XII-lea, din cauza terenului moale. Între 1990 și 2001, inginerii au redus înclinarea cu aproximativ 45 cm, așa că ar trebui să rămână în picioare secole de acum înainte.',
      activities: {
        1: { title: 'Urcă în Turnul înclinat', description: 'Aproximativ 250 de trepte ușor înclinate până în vârf. Biletele au oră fixă, așa că rezervă din timp.' },
        2: { description: 'Catedrala din marmură albă, Baptisteriul și cimitirul monumental din jurul turnului, toate pe o pajiște verde.' },
        3: { title: 'Plimbare de-a lungul râului Arno', description: 'Cheiurile „lungarni” la apus, cu palate colorate și mica biserică gotică Santa Maria della Spina.' },
        4: { title: 'Excursie de o zi la Lucca', description: 'Pedalează pe zidurile renascentiste ale orașului, la doar 30 de minute cu trenul.' },
        5: { title: 'Florența sau coasta Toscanei', description: 'O oră până la arta și mâncarea din Florența sau mergi spre plajele din Viareggio și Cinque Terre.' },
      },
      gallery: ['Piazza dei Miracoli', 'Râul Arno la apus'],
    },
  },
};
