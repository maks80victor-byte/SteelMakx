import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 11,
    name: "Leaper Pulse Unit",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Quest Item'],
    price: 5.00,
    image: "/images/products/Itens de crafting/leaper_pulse_unit.png",
    badge: "QUEST ITEM",
    rating: 4.8
  },
  {
    id: 12,
    name: "Battery",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Reciclável'],
    price: 2.50,
    image: "/images/products/Itens de crafting/battery.png",
    badge: "COMUM",
    rating: 4.2
  },
  {
    id: 13,
    name: "Mechanical Components",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Projeto'],
    price: 12.00,
    image: "/images/products/Itens de crafting/mechanical_components.png",
    badge: "PROJETO",
    rating: 4.9
  },
  {
    id: 14,
    name: "Electrical Components",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Projeto'],
    price: 15.00,
    image: "/images/products/Itens de crafting/electrical_components.png",
    badge: "PROJETO",
    rating: 4.7
  },
  {
    id: 15,
    name: "ARC Alloy",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Raro'],
    price: 45.00,
    image: "/images/products/Itens de crafting/arc_alloy.png",
    badge: "RARO",
    rating: 5.0
  },
  {
    id: 16,
    name: "Magnetic Accelerator",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Projeto'],
    price: 35.00,
    image: "/images/products/Itens de crafting/magnetic_accelerator.png",
    badge: "PROJETO",
    rating: 4.8
  },
  {
    id: 17,
    name: "Fried Motherboard",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Reciclável'],
    price: 8.00,
    image: "/images/products/Itens de crafting/fried_motherboard.png",
    badge: "COMUM",
    rating: 4.5
  },
  {
    id: 18,
    name: "Cooling Fan",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Reciclável'],
    price: 10.00,
    image: "/images/products/Itens de crafting/cooling_fan.png",
    badge: "COMUM",
    rating: 4.3
  },
  {
    id: 19,
    name: "Light Bulb",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Reciclável'],
    price: 3.50,
    image: "/images/products/Itens de crafting/light_bulb.png",
    badge: "COMUM",
    rating: 4.1
  },
  {
    id: 20,
    name: "Wires",
    category: Category.CRAFTING_ITEMS,
    tags: ['Coletável', 'ARC Raiders', 'Comum'],
    price: 1.50,
    image: "/images/products/Itens de crafting/wires.png",
    badge: "COMUM",
    rating: 4.0
  },
  {
    id: 21,
    name: "Acoustic Guitar",
    category: Category.CRAFTING_ITEMS,
    tags: ['Bibeliô', 'ARC Raiders'],
    price: 150.00,
    image: "/images/products/Itens de crafting/acoustic_guitar.png",
    badge: "RARO",
    rating: 4.9
  },
  {
    id: 22,
    name: "Adrenaline Shot",
    category: Category.CRAFTING_ITEMS,
    tags: ['Uso Rápido', 'ARC Raiders'],
    price: 25.00,
    image: "/images/products/Itens de crafting/adrenaline_shot.png",
    badge: "ESSENCIAL",
    rating: 4.7
  },
  {
    id: 23,
    name: "Advanced Arc Powercell",
    category: Category.CRAFTING_ITEMS,
    tags: ['Material Refinado', 'ARC Raiders'],
    price: 85.00,
    image: "/images/products/Itens de crafting/advanced_arc_powercell.png",
    badge: "LÉGENDA",
    rating: 5.0
  },
  {
    id: 24,
    name: "Agave",
    category: Category.CRAFTING_ITEMS,
    tags: ['Natureza', 'ARC Raiders'],
    price: 5.50,
    image: "/images/products/Itens de crafting/agave.png",
    badge: "COLETÁVEL",
    rating: 4.2
  },
  {
    id: 25,
    name: "Alarm Clock",
    category: Category.CRAFTING_ITEMS,
    tags: ['Reciclável', 'ARC Raiders'],
    price: 7.50,
    image: "/images/products/Itens de crafting/alarm_clock.png",
    badge: "LIXO",
    rating: 4.0
  },
  {
    id: 26,
    name: "Angled Grip I",
    category: Category.CRAFTING_ITEMS,
    tags: ['Modificação', 'ARC Raiders'],
    price: 45.00,
    image: "/images/products/Itens de crafting/angled_grip_i.png",
    badge: "MOD",
    rating: 4.5
  },
  {
    id: 27,
    name: "Anvil Blueprint",
    category: Category.CRAFTING_ITEMS,
    tags: ['Diagrama', 'ARC Raiders'],
    price: 120.00,
    image: "/images/products/Itens de crafting/anvil_blueprint.png",
    badge: "DIAGRAMA",
    rating: 4.8
  },
  {
    id: 28,
    name: "Blue Gate Cellar Key",
    category: Category.CRAFTING_ITEMS,
    tags: ['Chave', 'ARC Raiders'],
    price: 250.00,
    image: "/images/products/Itens de crafting/blue_gate_cellar_key.png",
    badge: "CHAVE",
    rating: 5.0
  },
  {
    id: 29,
    name: "Heavy Shield",
    category: Category.CRAFTING_ITEMS,
    tags: ['Escudo', 'ARC Raiders'],
    price: 180.00,
    image: "/images/products/Itens de crafting/heavy_shield.png",
    badge: "EQUIPAMENTO",
    rating: 4.9
  },
  {
    id: 30,
    name: "Light Ammo",
    category: Category.CRAFTING_ITEMS,
    tags: ['Munição', 'ARC Raiders'],
    price: 1.50,
    image: "/images/products/Itens de crafting/light_ammo.png",
    badge: "MUNIÇÃO",
    rating: 4.4
  },
  {
    id: 31,
    name: "Torrente",
    category: Category.CRAFTING_ITEMS,
    tags: ['Pistola', 'ARC Raiders'],
    price: 320.00,
    image: "/images/products/Itens de crafting/torrente.png",
    badge: "ARMA",
    rating: 4.7
  },
  {
    id: 32,
    name: "Bandage",
    category: Category.CRAFTING_ITEMS,
    tags: ['Uso Rápido', 'ARC Raiders'],
    price: 10.00,
    image: "/images/products/Itens de crafting/bandage.png",
    badge: "CURA",
    rating: 4.3
  },
  {
    id: 33,
    name: "Shotgun Ammo",
    category: Category.CRAFTING_ITEMS,
    tags: ['Munição', 'ARC Raiders'],
    price: 3.00,
    image: "/images/products/Itens de crafting/shotgun_ammo.png",
    badge: "MUNIÇÃO",
    rating: 4.5
  },
  {
    id: 34,
    name: "Bettina Blueprint",
    category: Category.CRAFTING_ITEMS,
    tags: ['Diagrama', 'Fuzil de Assalto', 'ARC Raiders'],
    price: 150.00,
    image: "/images/products/Itens de crafting/bettina_blueprint.png",
    badge: "DIAGRAMA",
    rating: 4.9
  },
  {
    id: 35,
    name: "Bobcat",
    category: Category.CRAFTING_ITEMS,
    tags: ['Submetralhadora', 'ARC Raiders'],
    price: 280.00,
    image: "/images/products/Itens de crafting/bobcat.png",
    badge: "ARMA",
    rating: 4.6
  },
  {
    id: 36,
    name: "Dam Staff Room Key",
    category: Category.CRAFTING_ITEMS,
    tags: ['Chave', 'ARC Raiders'],
    price: 130.00,
    image: "/images/products/Itens de crafting/dam_staff_room_key.png",
    badge: "CHAVE RARA",
    rating: 4.8
  },
  {
    id: 37,
    name: "Chemicals",
    category: Category.CRAFTING_ITEMS,
    tags: ['Material', 'ARC Raiders'],
    price: 15.00,
    image: "/images/products/Itens de crafting/chemicals.png",
    badge: "MATERIAL",
    rating: 4.2
  },
  {
    id: 38,
    name: "Mushroom",
    category: Category.CRAFTING_ITEMS,
    tags: ['Natureza', 'ARC Raiders'],
    price: 2.00,
    image: "/images/products/Itens de crafting/mushroom.png",
    badge: "COZINHA",
    rating: 4.0
  },
  {
    id: 39,
    name: "Silencer II",
    category: Category.CRAFTING_ITEMS,
    tags: ['Modificação', 'ARC Raiders'],
    price: 65.00,
    image: "/images/products/Itens de crafting/silencer_ii.png",
    badge: "SILENCIOSO",
    rating: 4.7
  },
  {
    id: 40,
    name: "Medium Shield",
    category: Category.CRAFTING_ITEMS,
    tags: ['Escudo', 'ARC Raiders'],
    price: 120.00,
    image: "/images/products/Itens de crafting/medium_shield.png",
    badge: "PROTEÇÃO",
    rating: 4.5
  },
  {
    id: 41,
    name: "Osprey Blueprint",
    category: Category.CRAFTING_ITEMS,
    tags: ['Diagrama', 'Escopeta', 'ARC Raiders'],
    price: 140.00,
    image: "/images/products/Itens de crafting/osprey_blueprint.png",
    badge: "DIAGRAMA",
    rating: 4.8
  },
  {
    id: 42,
    name: "Venator",
    category: Category.CRAFTING_ITEMS,
    tags: ['Rifle de Precisão', 'ARC Raiders'],
    price: 550.00,
    image: "/images/products/Itens de crafting/venator.png",
    badge: "PRECISÃO",
    rating: 5.0
  },
  {
    id: 43,
    name: "Blaze Grenade",
    category: Category.CRAFTING_ITEMS,
    tags: ['Especial', 'ARC Raiders'],
    price: 20.00,
    image: "/images/products/Itens de crafting/blaze_grenade.png",
    badge: "INCENDIÁRIO",
    rating: 4.3
  },
  {
    id: 44,
    name: "Music Box",
    category: Category.CRAFTING_ITEMS,
    tags: ['Bibeliô', 'ARC Raiders'],
    price: 85.00,
    image: "/images/products/Itens de crafting/music_box.png",
    badge: "COLECIONÁVEL",
    rating: 4.9
  },
  {
    id: 45,
    name: "Ripped Safety Vest",
    category: Category.CRAFTING_ITEMS,
    tags: ['Traje', 'ARC Raiders'],
    price: 12.00,
    image: "/images/products/Itens de crafting/ripped_safety_vest.png",
    badge: "USADO",
    rating: 3.5
  },
  {
    id: 46,
    name: "Kinetic Converter",
    category: Category.CRAFTING_ITEMS,
    tags: ['Material Refinado', 'ARC Raiders'],
    price: 110.00,
    image: "/images/products/Itens de crafting/kinetic_converter.png",
    badge: "AVANÇADO",
    rating: 4.6
  },
  {
    id: 47,
    name: "Binoculars",
    category: Category.CRAFTING_ITEMS,
    tags: ['Diversos', 'ARC Raiders'],
    price: 40.00,
    image: "/images/products/Itens de crafting/binoculars.png",
    badge: "UTILITÁRIO",
    rating: 4.4
  },
  {
    id: 48,
    name: "Ferro",
    category: Category.CRAFTING_ITEMS,
    tags: ['Pistola', 'ARC Raiders'],
    price: 210.00,
    image: "/images/products/Itens de crafting/ferro.png",
    badge: "ARMA",
    rating: 4.5
  },
  {
    id: 49,
    name: "Duct Tape",
    category: Category.CRAFTING_ITEMS,
    tags: ['Material Básico', 'ARC Raiders'],
    price: 5.00,
    image: "/images/products/Itens de crafting/duct_tape.png",
    badge: "REPARO",
    rating: 4.9
  },
  {
    id: 50,
    name: "Industrial Battery",
    category: Category.CRAFTING_ITEMS,
    tags: ['Reciclável', 'ARC Raiders'],
    price: 45.00,
    image: "/images/products/Itens de crafting/industrial_battery.png",
    badge: "ENERGIA",
    rating: 4.2
  },
  {
    id: 51,
    name: "Arpeggio",
    category: Category.CRAFTING_ITEMS,
    tags: ['Fuzil de Assalto', 'ARC Raiders'],
    price: 420.00,
    image: "/images/products/Itens de crafting/arpeggio.png",
    badge: "LÉGENDA",
    rating: 4.9
  },
  {
    id: 52,
    name: "Launcher Ammo",
    category: Category.CRAFTING_ITEMS,
    tags: ['Munição', 'ARC Raiders'],
    price: 50.00,
    image: "/images/products/Itens de crafting/launcher_ammo.png",
    badge: "PESADA",
    rating: 4.7
  },
  {
    id: 53,
    name: "Free Loadout Augment",
    category: Category.CRAFTING_ITEMS,
    tags: ['Aumento', 'ARC Raiders'],
    price: 25.00,
    image: "/images/products/Itens de crafting/free_loadout_augment.png",
    badge: "BONUS",
    rating: 5.0
  },
  {
    id: 54,
    name: "Snowball",
    category: Category.CRAFTING_ITEMS,
    tags: ['Diversos', 'Especial', 'ARC Raiders'],
    price: 0.50,
    image: "/images/products/Itens de crafting/snowball.png",
    badge: "EVENTO",
    rating: 4.0
  },
  {
    id: 55,
    name: "Music Album",
    category: Category.CRAFTING_ITEMS,
    tags: ['Bibeliô', 'Cosmético', 'ARC Raiders'],
    price: 55.00,
    image: "/images/products/Itens de crafting/music_album.png",
    badge: "RARO",
    rating: 4.8
  }
];

export const CATEGORIES = [
  { id: Category.CRAFTING_ITEMS, name: 'Itens de Crafting' }
];