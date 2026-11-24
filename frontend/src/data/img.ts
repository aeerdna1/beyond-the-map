// Placeholder photos from Unsplash (free licence). Replace with your own photos
// (or Cloudinary URLs) before launch - own photos are the brand's biggest asset.
export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  tokyo: '1540959733332-eab4deabeeaf',
  kyoto: '1493976040374-85c8e12f0c0e',
  fuji: '1490806843957-31f4c9a91c65',
  japanStreet: '1478436127897-769e1b3f0f36',
  iceland1: '1504893524553-b855bce32c67',
  iceland2: '1476610182048-b716b8518aae',
  aurora: '1531366936337-7c912a4589a7',
  morocco1: '1489749798305-4fea3ae63d43',
  morocco2: '1539020140153-e479b8c22e70',
  morocco3: '1553603227-2358aabe821e',
  bali: '1537996194471-e657df975ab4',
  thailand: '1528181304800-259b08848526',
  singapore: '1525625293386-3f8f99389edd',
  hawaii1: '1507876466758-bc54f384809c',
  hawaii2: '1542259009477-d625272157b7',
  malaysia: '1596422846543-75c6fc197f07',
  egypt1: '1539650116574-8efeb43e2750',
  egypt2: '1503177119275-0aa32b3a9368',
  italy: '1516483638261-f4dbaf036963',
  dolomites: '1531219432768-9f540ce91ef3',
  norway1: '1513519245088-0e12902e5a38',
  norway2: '1601439678777-b2b3c56fa627',
  road: '1469854523086-cc02fe5d8800',
  planning: '1488646953014-85cb44e25828',
  landscape: '1500530855697-b586d89ba3ee',
  mountains: '1506905925346-21bda4d32df4',
  lake: '1501785888041-af3ef285b470',
} as const;

export const img = (key: keyof typeof IMG, w?: number) => unsplash(IMG[key], w);
