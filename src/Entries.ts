import * as PD from './Prob';

export interface Entry {
  group: string,
  difficulty: number,
  task: string
}

export const STAT = 'Stat';
export const WEAPON = 'Weapon';
export const NPC = 'NPC';
export const CHALLENGE = 'Challenge';
export const BOSS = 'Boss';

export const DIFF_0 = 0;
export const DIFF_1 = 1;
export const DIFF_2 = 2;
export const DIFF_3 = 2;

export const ALL_CATEGORIES = [STAT, WEAPON, NPC, CHALLENGE, BOSS]



export function poolCategory(availableCategories: string[]) {
  const ratios = availableCategories.map(() => 1 / availableCategories.length)
  const categories = PD.sample(availableCategories, 1, false, ratios);
  return categories[0];
}

export function generateSample(availableCategories: string[]) {
  const category = poolCategory(availableCategories)

  return PD.sample(byCategory[category], 1, true, undefined)[0]
}



export const byCategory: any = {};



function entry(group: string, difficulty: number, task: string) {
  return {
    group,
    difficulty,
    task,
  }
}

function generateStatsEntries() {
  const stats = ['VITALITY', 'ATTUNEMENT', 'ENDURANCE', 'STRENGTH', 'DEXTERITY', 'RESISTANCE', 'INTELLIGENCE', 'FAITH']

  const entries = [...stats.map((stat) => {
    let diff = DIFF_0;
    if (stat === 'RESISTANCE' || stat === 'ATTUNEMENT') {
      diff = DIFF_3;
    }

    return entry(STAT, diff, `35 ${stat}`)
  })];

  stats.forEach((a) => {
    stats.forEach((b) => {
      if (a !== b) {
        entries.push(entry(STAT, DIFF_1, `20 ${a} and ${b}`))
      }
    })
  })

  return entries;
}

function generateBossEntries() {
  const kill = [
    'Ornstein and Smough',
    'Iron Golem',
    'Moonlight Butterfly',
    'Bell Gargoyle',
    'Capra Demon (glitchless)',
    'Ceasless Discharge (glitchless)',
    'Ceasless Discharge (glitched)',
    'Quelaag',
    'Pinwheel',
    'Stray Demon',
    'Taurus Demon',
  ]

  const entries = [...kill.map((boss) => entry(BOSS, DIFF_1, `Kill ${boss}`))];

  entries.push(
    entry(BOSS, DIFF_2, 'Kill Moonlight butterfly with consumable only'),
    entry(BOSS, DIFF_0, 'Kill Moonlight Butterfly first'),
    entry(BOSS, DIFF_1, 'Kill Gorgyles without healing'),
    entry(BOSS, DIFF_3, 'Kill Ornstein and Smough hitless'),
    entry(BOSS, DIFF_0, 'Kill an boss with red tearstone ring be active'),
    entry(BOSS, DIFF_3, 'Kill Ornstein & Smogh with a plus 0 Weapon'),
    entry(BOSS, DIFF_3, 'Kill Asylum Demon with Bare Fists'),
    entry(BOSS, DIFF_3, 'Kill Kalameet without Goughs Help'),
    entry(BOSS, DIFF_2, 'Kill Quelaag with dagger only'),
    entry(BOSS, DIFF_2, 'Kill Bed of Chaos without ranged attack')
  )

  return entries;
}

function generateWeaponEntries() {
  return [
    entry(WEAPON, DIFF_2, 'Use Daggers'),
    entry(WEAPON, DIFF_1, 'Use Straight Swords'),
    entry(WEAPON, DIFF_1, 'Use Greatswords'),
    entry(WEAPON, DIFF_1, 'Use Ultra Greatswords'),
    entry(WEAPON, DIFF_1, 'Use Curved Swords'),
    entry(WEAPON, DIFF_1, 'Use Katanas'),
    entry(WEAPON, DIFF_2, 'Use Curved Greatswords'),
    entry(WEAPON, DIFF_1, 'Use Piercing Swords'),
    entry(WEAPON, DIFF_1, 'Use Axes'),
    entry(WEAPON, DIFF_2, 'Use Great Axes'),
    entry(WEAPON, DIFF_1, 'Use Hammers'),
    entry(WEAPON, DIFF_2, 'Use Great Hammers'),
    entry(WEAPON, DIFF_3, 'Use Fists & Claws'),
    entry(WEAPON, DIFF_1, 'Use Spears'),
    entry(WEAPON, DIFF_1, 'Use Halberds'),
    entry(WEAPON, DIFF_3, 'Use Whips'),
    entry(WEAPON, DIFF_2, 'Use Bows'),
    entry(WEAPON, DIFF_3, 'Use Greatbows'),
    entry(WEAPON, DIFF_3, 'Use Crossbows'),
    entry(WEAPON, DIFF_2, 'Use Catalysts'),
    entry(WEAPON, DIFF_2, 'Use Flames'),
    entry(WEAPON, DIFF_3, 'Use Talismans'),

    entry(WEAPON, DIFF_0, 'Dont use Swords'),
    entry(WEAPON, DIFF_0, 'Dont use Katanas'),
    entry(WEAPON, DIFF_0, 'Dont use Halberds'),
    entry(WEAPON, DIFF_0, 'Dont use Curved Swords'),
    entry(WEAPON, DIFF_0, 'Dont use Daggers'),
    entry(WEAPON, DIFF_1, 'Dont use Bows'),
    entry(WEAPON, DIFF_1, 'Dont use Talismans'),
    entry(WEAPON, DIFF_1, 'Dont use Catalysts'),
    entry(WEAPON, DIFF_1, 'Dont use Flames'),

    entry(WEAPON, DIFF_1, 'Obtain Crescent Axe'),
    entry(WEAPON, DIFF_1, 'Obtain Dragonslayer Greatbow'),
    entry(WEAPON, DIFF_2, 'Obtain Goughs Greatbow'),
    entry(WEAPON, DIFF_3, 'Obtain Black Knight Shield'),
    entry(WEAPON, DIFF_1, 'Obtain Gold Tracer'),
    entry(WEAPON, DIFF_3, 'Obtain Jagged Ghost Blade'),
    entry(WEAPON, DIFF_1, 'Obtain Dark Silver Tracer'),
    entry(WEAPON, DIFF_3, 'Obtain Ghost Blade'),
    entry(WEAPON, DIFF_2, 'Obtain Grant'),
    entry(WEAPON, DIFF_3, 'Obtain Black Knight Greataxe'),
    entry(WEAPON, DIFF_2, 'Obtain Stone Greataxe'),
    entry(WEAPON, DIFF_3, 'Obtain Black Knight Sword'),
    entry(WEAPON, DIFF_1, 'Obtain Stone Greatsword'),
    entry(WEAPON, DIFF_3, 'Obtain Black Knight Halberd'),
    entry(WEAPON, DIFF_1, 'Obtain Giants Halberd'),
    entry(WEAPON, DIFF_3, 'Obtain Titanite Catch Pole'),
    entry(WEAPON, DIFF_2, 'Obtain Blacksmith Giant Hammer'),
    entry(WEAPON, DIFF_2, 'Obtain Hammer of Vamos'),
    entry(WEAPON, DIFF_3, 'Obtain Channelers Trident'),
    entry(WEAPON, DIFF_1, 'Obtain Silver Knight Spear'),
    entry(WEAPON, DIFF_0, 'Obtain Astoras Straight Sword'),
    entry(WEAPON, DIFF_1, 'Obtain Silver Knight Straight Sword'),
    entry(WEAPON, DIFF_3, 'Obtain Black Knight Greatword'),
    entry(WEAPON, DIFF_0, 'Obtain Crest Shield'),
    entry(WEAPON, DIFF_0, 'Obtain Dragon Crest Shield'),
    entry(WEAPON, DIFF_1, 'Obtain Silver Knight Shield'),
    entry(WEAPON, DIFF_3, 'Obtain Cleansing Greatshield'),
    entry(WEAPON, DIFF_1, 'Obtain Havels Greatshield'),
    entry(WEAPON, DIFF_1, 'Obtain Stone Greatshield'),
    entry(WEAPON, DIFF_2, 'Obtain Velkas Rapier'),
    entry(WEAPON, DIFF_3, 'Obtain Dragon Greatsword'),
    entry(WEAPON, DIFF_0, 'Obtain Dragon King Greataxe'),
    entry(WEAPON, DIFF_0, 'Obtain Dragon Tooth'),
    entry(WEAPON, DIFF_1, 'Obtain Drake sword'),
    entry(WEAPON, DIFF_3, 'Obtain Moonlight Greatsword'),
    entry(WEAPON, DIFF_3, 'Obtain Obisidian Greatsword'),
    entry(WEAPON, DIFF_3, 'Obtain Priscillas Dagger'),
  ]
}

const entries = [
  // Stat based
  ...generateStatsEntries(),
  ...generateBossEntries(),
  // NPC
  entry(NPC, DIFF_1, 'Free Griggs'),
  entry(NPC, DIFF_1, 'Free Logan'),
  entry(NPC, DIFF_1, 'Talk to Dusk of Oolacile'),
  entry(NPC, DIFF_0, 'Kill Ingward'),
  entry(NPC, DIFF_2, 'Kill Ingward without going up the ladder'),
  entry(NPC, DIFF_1, 'Talk to Reah'),
  entry(NPC, DIFF_2, 'Rescue Reah in Tomb of Giants'),
  entry(NPC, DIFF_3, 'Kill Reah in Dukes Archives'),
  entry(NPC, DIFF_0, 'Talk to Elizabeth'),
  entry(NPC, DIFF_0, 'Kill Eingiy'),
  entry(NPC, DIFF_0, 'Kill Quelaags Sister'),

  // Weapon
  ...generateWeaponEntries(),

  entry(CHALLENGE, DIFF_3, 'Skip Seaths first Encounter'),
  entry(CHALLENGE, DIFF_3, 'Skip Ceaseless Discharge Fight'),
  entry(CHALLENGE, DIFF_3, 'Perform Sens Skip'),

  entry(CHALLENGE, DIFF_3, 'Skip Seaths first Encounter'),
  entry(CHALLENGE, DIFF_3, 'Kill 4 Kings before Gargoyles'),


  entry(CHALLENGE, DIFF_3, 'Make Taurus Demon jump off'),
  entry(CHALLENGE, DIFF_2, 'Get infected with parasites'),
  entry(CHALLENGE, DIFF_3, 'Kill only 3 of 4 Kings'),
  entry(CHALLENGE, DIFF_3, 'Beat double Sanctuary Guardian Fight'),
  entry(CHALLENGE, DIFF_3, 'Beat Manus without Silver Pendant'),
  entry(CHALLENGE, DIFF_1, 'Parry a Black Knight 5 times in a row'),
  entry(CHALLENGE, DIFF_0, 'Level up Estus Flakon to +3'),

  entry(CHALLENGE, DIFF_3, 'Get 15 Pyromancies'),

  entry(CHALLENGE, DIFF_3, 'Never talk with an NPC'),

  entry(CHALLENGE, DIFF_0, 'Kill a Boss only with drop Attack'),
  entry(CHALLENGE, DIFF_0, 'Kill a boss while poisened'),
  entry(CHALLENGE, DIFF_2, 'Bleed an enemy at least 3 times'),
  entry(CHALLENGE, DIFF_0, 'Kill 5 friendly NPC'),
  entry(CHALLENGE, DIFF_1, 'Use a shield in the right hand'),
  entry(CHALLENGE, DIFF_3, 'Only kill with backstabs'),
  entry(CHALLENGE, DIFF_2, 'Get 99 small shards'),
  entry(CHALLENGE, DIFF_1, 'Get an +15 weapon'),

  entry(CHALLENGE, DIFF_1, 'Kill 2 Blacksmith'),
  entry(CHALLENGE, DIFF_3, 'Never Die'),
  entry(CHALLENGE, DIFF_3, 'Play with heavy roll (after Asylum)'),
  entry(CHALLENGE, DIFF_0, 'Use 4 DIFFerent weapons for bosses'),
  entry(CHALLENGE, DIFF_3, 'Restart the game after you rang both bells of awakening'),
  entry(CHALLENGE, DIFF_1, 'Achive an ending'),
  entry(CHALLENGE, DIFF_0, 'Kill all demons in sens Fortress'),
  entry(CHALLENGE, DIFF_0, 'Kill 3 Invader'),
  entry(CHALLENGE, DIFF_2, 'Invade an NPC'),
  entry(CHALLENGE, DIFF_3, 'Finish siegmayrs questline'),
  entry(CHALLENGE, DIFF_1, 'Never kindle a bonfire'),
  entry(CHALLENGE, DIFF_0, 'Use consumables to poisen,toxic an boss')
];

ALL_CATEGORIES.forEach((category) => {
  byCategory[category] = []
})
entries.forEach((entry) => {
  byCategory[entry.group].push(entry)
})