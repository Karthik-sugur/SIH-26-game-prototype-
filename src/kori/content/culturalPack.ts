import { KoriItem } from '../types';

/** Assamese cultural memory pack — familiar objects & symbols */
export const CULTURAL_ITEMS: KoriItem[] = [
  {
    id: 'jaapi',
    emoji: '👒',
    nameKey: 'koriItemJaapi',
    nameEn: 'Jaapi hat',
    nameAs: 'জাপি',
    category: 'cultural',
  },
  {
    id: 'rice',
    emoji: '🍚',
    nameKey: 'koriItemRice',
    nameEn: 'Rice',
    nameAs: 'ভাত',
    category: 'cultural',
  },
  {
    id: 'tea',
    emoji: '🍵',
    nameKey: 'koriItemTea',
    nameEn: 'Assam tea',
    nameAs: 'চাহ',
    category: 'cultural',
  },
  {
    id: 'temple',
    emoji: '🛕',
    nameKey: 'koriItemTemple',
    nameEn: 'Temple',
    nameAs: 'মন্দিৰ',
    category: 'cultural',
  },
  {
    id: 'flower',
    emoji: '🌸',
    nameKey: 'koriItemFlower',
    nameEn: 'Kopou flower',
    nameAs: 'কপৌ ফুল',
    category: 'cultural',
  },
  {
    id: 'home',
    emoji: '🏠',
    nameKey: 'koriItemHome',
    nameEn: 'Home',
    nameAs: 'ঘৰ',
    category: 'place',
  },
  {
    id: 'orange',
    emoji: '🍊',
    nameKey: 'koriItemOrange',
    nameEn: 'Orange',
    nameAs: 'কমলা',
    category: 'cultural',
  },
  {
    id: 'elder',
    emoji: '👵',
    nameKey: 'koriItemElder',
    nameEn: 'Grandmother',
    nameAs: 'আইতা',
    category: 'person',
  },
  {
    id: 'medicine',
    emoji: '💊',
    nameKey: 'koriItemMedicine',
    nameEn: 'Medicine',
    nameAs: 'ঔষধ',
    category: 'object',
  },
  {
    id: 'water',
    emoji: '🥛',
    nameKey: 'koriItemWater',
    nameEn: 'Water',
    nameAs: 'পানী',
    category: 'object',
  },
  {
    id: 'phone',
    emoji: '📱',
    nameKey: 'koriItemPhone',
    nameEn: 'Phone',
    nameAs: 'ফোন',
    category: 'object',
  },
  {
    id: 'glasses',
    emoji: '👓',
    nameKey: 'koriItemGlasses',
    nameEn: 'Glasses',
    nameAs: 'চশমা',
    category: 'object',
  },
];

export function getItemById(id: string): KoriItem | undefined {
  return CULTURAL_ITEMS.find((i) => i.id === id);
}

export function pickItems(count: number, preferIds?: string[]): KoriItem[] {
  const pool = [...CULTURAL_ITEMS];
  const picked: KoriItem[] = [];

  if (preferIds) {
    preferIds.forEach((id) => {
      const item = getItemById(id);
      if (item && picked.length < count) picked.push(item);
    });
  }

  while (picked.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(idx, 1);
    if (!picked.find((p) => p.id === item.id)) picked.push(item);
  }

  return picked;
}
