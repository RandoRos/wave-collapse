const grassWeight = 10;
const waterWeight = 30;

const summerTileset = [
  {
    name: 'GRASS',
    src: './tiles/summer/grass0.png',
    edges: ['000', '000', '000', '000'],
    weight: grassWeight,
  },
  // {
  //   src: './tiles/summer/road0.png',
  //   edges: ['111', '110', '000', '011'],
  // },
  // {
  //   src: './tiles/summer/road1.png',
  //   edges: ['110', '000', '011', '111'],
  // },
  // {
  //   src: './tiles/summer/road2.png',
  //   edges: ['000', '011', '111', '110'],
  // },
  // {
  //   src: './tiles/summer/road3.png',
  //   edges: ['011', '111', '110', '000'],
  // },
  // {
  //   src: './tiles/summer/roadturn0.png',
  //   edges: ['011', '110', '000', '000'],
  //   weight: 1,
  // },
  // {
  //   src: './tiles/summer/roadturn1.png',
  //   edges: ['110', '000', '000', '011'],
  //   weight: 1,
  // },
  // {
  //   src: './tiles/summer/roadturn2.png',
  //   edges: ['000', '000', '011', '110'],
  //   weight: 1,
  // },
  // {
  //   src: './tiles/summer/roadturn3.png',
  //   edges: ['000', '011', '110', '000'],
  //   weight: 1,
  // },
  // {
  //   src: './tiles/summer/grasscorner0.png',
  //   edges: ['110', '011', '111', '110'],
  // },
  // {
  //   src: './tiles/summer/grasscorner1.png',
  //   edges: ['011', '111', '111', '110'],
  // },
  // {
  //   src: './tiles/summer/grasscorner2.png',
  //   edges: ['111', '111', '110', '011'],
  // },
  // {
  //   src: './tiles/summer/grasscorner3.png',
  //   edges: ['111', '110', '011', '111'],
  // },
  {
    name: 'WATER_A',
    src: './tiles/summer/water_a.png',
    edges: ['333', '333', '333', '333'],
    weight: waterWeight,
  },
  {
    name: 'WATER_B',
    src: './tiles/summer/water_b.png',
    edges: ['333', '333', '333', '333'],
    weight: waterWeight,
  },
  {
    name: 'WATER_C',
    src: './tiles/summer/water_c.png',
    edges: ['333', '333', '333', '333'],
    weight: waterWeight,
  },
  {
    name: 'WATERSIDE_0',
    src: './tiles/summer/waterside0.png',
    edges: ['333', '300', '000', '003'],
  },
  {
    name: 'WATERSIDE_1',
    src: './tiles/summer/waterside1.png',
    edges: ['300', '000', '003', '333'],
  },
  {
    name: 'WATERSIDE_2',
    src: './tiles/summer/waterside2.png',
    edges: ['000', '003', '333', '300'],
  },
  {
    name: 'WATERSIDE_3',
    src: './tiles/summer/waterside3.png',
    edges: ['003', '333', '300', '000'],
  },
  {
    name: 'WATERCORNER_0',
    src: './tiles/summer/watercorner0.png',
    edges: ['003', '300', '000', '000'],
    weight: 1,
  },
  {
    name: 'WATERCORNER_1',
    src: './tiles/summer/watercorner1.png',
    edges: ['300', '000', '000', '003'],
    weight: 1,
  },
  {
    name: 'WATERCORNER_2',
    src: './tiles/summer/watercorner2.png',
    edges: ['000', '000', '003', '300'],
    weight: 1,
  },
  {
    name: 'WATERCORNER_3',
    src: './tiles/summer/watercorner3.png',
    edges: ['000', '003', '300', '000'],
    weight: 1,
  },
  {
    name: 'WATERTURN_0',
    src: './tiles/summer/waterturn0.png',
    edges: ['333', '333', '300', '003'],
    weight: 1,
  },
  {
    name: 'WATERTURN_1',
    src: './tiles/summer/waterturn1.png',
    edges: ['333', '300', '003', '333'],
    weight: 1,
  },
  {
    name: 'WATERTURN_2',
    src: './tiles/summer/waterturn2.png',
    edges: ['300', '003', '333', '333'],
    weight: 1,
  },
  {
    name: 'WATERTURN_3',
    src: './tiles/summer/waterturn3.png',
    edges: ['003', '333', '333', '300'],
    weight: 1,
  },
  {
    name: 'CLIFF0',
    src: './tiles/summer/cliff0.png',
    edges: ['000', '040', '000', '040'],
    weight: 1,
  },
  {
    name: 'CLIFF1',
    src: './tiles/summer/cliff1.png',
    edges: ['040', '000', '040', '000'],
    weight: 1,
  },
  {
    name: 'CLIFF2',
    src: './tiles/summer/cliff2.png',
    edges: ['000', '040', '000', '040'],
    weight: 1,
  },
  {
    name: 'CLIFF3',
    src: './tiles/summer/cliff3.png',
    edges: ['040', '000', '040', '000'],
    weight: 1,
  },
  {
    name: 'CLIFFCORNER0',
    src: './tiles/summer/cliffcorner0.png',
    edges: ['040', '040', '000', '000'],
    weight: 1,
  },
  {
    name: 'CLIFFCORNER1',
    src: './tiles/summer/cliffcorner1.png',
    edges: ['040', '000', '000', '040'],
    weight: 1,
  },
  {
    name: 'CLIFFCORNER2',
    src: './tiles/summer/cliffcorner2.png',
    edges: ['000', '000', '040', '040'],
    weight: 1,
  },
  {
    name: 'CLIFFCORNER3',
    src: './tiles/summer/cliffcorner3.png',
    edges: ['000', '040', '040', '000'],
    weight: 1,
  },
];
