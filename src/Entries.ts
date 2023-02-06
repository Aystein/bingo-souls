import * as PD from './Prob';
import countBy from 'lodash/countBy'

export interface Entry {
  group: string,
  difficulty: number,
  task: string,
  subcategory?: string,
}

export const STAT = 'Stat';
export const WEAPON = 'Weapon';
export const NPC = 'NPC';
export const CHALLENGE = 'Challenge';
export const BOSS = 'Boss';

export const DIFF_0 = 0;
export const DIFF_1 = 1;
export const DIFF_2 = 2;
export const DIFF_3 = 3;

export const ALL_CATEGORIES = [STAT, WEAPON, NPC, CHALLENGE, BOSS]



export function poolCategory(availableCategories: string[]) {
  const ratios = availableCategories.map(() => 1 / availableCategories.length)
  const categories = PD.sample(availableCategories, 1, false, ratios);
  return categories[0];
}

export function generateSample(availableCategories: string[], difficulty: number) {
  const category = poolCategory(availableCategories)

  const entries = (byCategory[category] as Entry[]).filter((e) => e.difficulty <= difficulty);
  const subcategories = Object.keys(countBy(entries.map((e) => e.subcategory)));

  const subcategory = PD.sample(subcategories, 1, true, undefined)[0];

  const subsamples = entries.filter((entry) => entry.subcategory === subcategory);

  return PD.sample(subsamples, 1, true, undefined)[0]
}



export const byCategory: any = {};
export const bySubcategory: any = {};

class EntryBuilder {
  group: string = '';
  subcategory: string = '';

  entries: Entry[] = [];

  constructor() {
  }

  setGroup(group: string) {
    this.group = group;

    return this;
  }

  setSubcategory(subcategory: string) {
    this.subcategory = subcategory;

    return this;
  }

  entry(difficulty: number, task: string) {
    this.entries.push({
      group: this.group, difficulty, task, subcategory: this.subcategory
    })

    return this;
  }
}

function entry(group: string, difficulty: number, task: string, subcategory?: string) {
  return {
    group,
    difficulty,
    task,
    subcategory: subcategory ?? 'default'
  }
}

function generateStatsEntries() {
  const stats = ['VITALITY', 'ATTUNEMENT', 'ENDURANCE', 'STRENGTH', 'DEXTERITY', 'RESISTANCE', 'INTELLIGENCE', 'FAITH']

  const builder = new EntryBuilder();
  builder.setGroup(STAT);

  builder.setSubcategory('raw')
  stats.forEach((stat) => {
    let diff = DIFF_0;
    if (stat === 'RESISTANCE' || stat === 'ATTUNEMENT') {
      diff = DIFF_3;
    }

    builder.entry(diff, `35 ${stat}`)
  });

  builder.setSubcategory('mixed')
  stats.forEach((a) => {
    stats.forEach((b) => {
      if (a !== b) {
        builder.entry(DIFF_1, `20 ${a} and ${b}`)
      }
    })
  })

  return builder.entries;
}

function generateBossEntries() {
  const builder = new EntryBuilder();

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

  builder.setGroup(BOSS);

  for (const boss of kill) {
    builder.entry(DIFF_1, `Kill ${boss}`)
  }

  builder.entry(DIFF_2, 'Kill Moonlight butterfly with consumable')
  builder.entry(DIFF_0, 'Kill Moonlight Butterfly first')
  builder.entry(DIFF_1, 'Kill Gorgyles without healing')
  builder.entry(DIFF_3, 'Kill Ornstein and Smough hitless')
  builder.entry(DIFF_0, 'Kill an boss with red tearstone ring be active')
  builder.entry(DIFF_3, 'Kill Ornstein & Smogh with a plus 0 Weapon')
  builder.entry(DIFF_3, 'Kill Asylum Demon with Bare Fists')
  builder.entry(DIFF_3, 'Kill Kalameet without Goughs Help')
  builder.entry(DIFF_2, 'Kill Quelaag with dagger only')
  builder.entry(DIFF_2, 'Kill Bed of Chaos without ranged attack')


  return builder.entries;
}

function generateWeaponEntries() {
  const builder = new EntryBuilder();
  builder.setGroup(WEAPON);


  builder.setSubcategory('use')
    .entry(DIFF_2, 'Use Daggers for 3 bosses')
    .entry(DIFF_1, 'Use Straight Swords for 3 bosses')
    .entry(DIFF_1, 'Use Greatswords for 3 bosses')
    .entry(DIFF_1, 'Use Ultra Greatswords for 3 bosses')
    .entry(DIFF_1, 'Use Curved Swords for 3 bosses')
    .entry(DIFF_1, 'Use Katanas for 3 bosses')
    .entry(DIFF_2, 'Use Curved Greatswords for 3 bosses')
    .entry(DIFF_1, 'Use Piercing Swords for 3 bosses')
    .entry(DIFF_1, 'Use Axes for 3 bosses')
    .entry(DIFF_2, 'Use Great Axes for 3 bosses')
    .entry(DIFF_1, 'Use Hammers for 3 bosses')
    .entry(DIFF_2, 'Use Great Hammers for 3 bosses')
    .entry(DIFF_3, 'Use Fists & Claws for 3 bosses')
    .entry(DIFF_1, 'Use Spears for 3 bosses')
    .entry(DIFF_1, 'Use Halberds for 3 bosses')
    .entry(DIFF_3, 'Use Whips for 3 bosses')
    .entry(DIFF_3, 'Use Bows for 3 bosses')
    .entry(DIFF_3, 'Use Greatbows for 3 bosses')
    .entry(DIFF_3, 'Use Crossbows for 3 bosses')
    .entry(DIFF_2, 'Use Catalysts for 3 bosses')
    .entry(DIFF_2, 'Use Flames for 3 bosses')
    .entry(DIFF_2, 'Use Talismans for 3 bosses')

  builder.setSubcategory('dontuse')
    .entry(DIFF_0, 'Dont use Swords')
    .entry(DIFF_0, 'Dont use Katanas')
    .entry(DIFF_0, 'Dont use Halberds')
    .entry(DIFF_0, 'Dont use Curved Swords')
    .entry(DIFF_0, 'Dont use Daggers')
    .entry(DIFF_0, 'Dont use Bows')
    .entry(DIFF_1, 'Dont use Talismans')
    .entry(DIFF_1, 'Dont use Catalysts')
    .entry(DIFF_1, 'Dont use Flames')

  builder.setSubcategory('obtainweapon')
    .entry(DIFF_1, 'Obtain Crescent Axe')
    .entry(DIFF_1, 'Obtain Dragonslayer Greatbow')
    .entry(DIFF_2, 'Obtain Goughs Greatbow')
    .entry(DIFF_3, 'Obtain Black Knight Shield')
    .entry(DIFF_1, 'Obtain Gold Tracer')
    .entry(DIFF_3, 'Obtain Jagged Ghost Blade')
    .entry(DIFF_1, 'Obtain Dark Silver Tracer')
    .entry(DIFF_3, 'Obtain Ghost Blade')
    .entry(DIFF_2, 'Obtain Grant')
    .entry(DIFF_3, 'Obtain Black Knight Greataxe')
    .entry(DIFF_2, 'Obtain Stone Greataxe')
    .entry(DIFF_3, 'Obtain Black Knight Sword')
    .entry(DIFF_1, 'Obtain Stone Greatsword')
    .entry(DIFF_3, 'Obtain Black Knight Halberd')
    .entry(DIFF_1, 'Obtain Giants Halberd')
    .entry(DIFF_3, 'Obtain Titanite Catch Pole')
    .entry(DIFF_2, 'Obtain Blacksmith Giant Hammer')
    .entry(DIFF_2, 'Obtain Hammer of Vamos')
    .entry(DIFF_3, 'Obtain Channelers Trident')
    .entry(DIFF_1, 'Obtain Silver Knight Spear')
    .entry(DIFF_0, 'Obtain Astoras Straight Sword')
    .entry(DIFF_1, 'Obtain Silver Knight Straight Sword')
    .entry(DIFF_3, 'Obtain Black Knight Greatword')
    .entry(DIFF_0, 'Obtain Crest Shield')
    .entry(DIFF_0, 'Obtain Dragon Crest Shield')
    .entry(DIFF_1, 'Obtain Silver Knight Shield')
    .entry(DIFF_3, 'Obtain Cleansing Greatshield')
    .entry(DIFF_1, 'Obtain Havels Greatshield')
    .entry(DIFF_1, 'Obtain Stone Greatshield')
    .entry(DIFF_2, 'Obtain Velkas Rapier')
    .entry(DIFF_3, 'Obtain Dragon Greatsword')
    .entry(DIFF_0, 'Obtain Dragon King Greataxe')
    .entry(DIFF_0, 'Obtain Dragon Tooth')
    .entry(DIFF_1, 'Obtain Drake sword')
    .entry(DIFF_3, 'Obtain Moonlight Greatsword')
    .entry(DIFF_3, 'Obtain Obisidian Greatsword')
    .entry(DIFF_3, 'Obtain Priscillas Dagger')

  return builder.entries
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