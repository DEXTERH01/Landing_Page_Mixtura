export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: 'platos' | 'postres' | 'bebidas';
  image?: string;
  description: string;
  tag?: string; // e.g. 'Top', 'Popular', 'Nuevo'
}

export const MENU: MenuItem[] = [
  // ── PLATOS ─────────────────────────────────────────────────────────────────
  {
    id: 'chancho-caja-china',
    name: 'Chancho Caja China',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-caja-china.jpg',
    description:
      'Cerdo entero asado lentamente en la tradicional caja china, técnica cubana adoptada por la gastronomía peruana. La piel queda crujiente y dorada mientras la carne permanece jugosa y llena de sabor. Se sirve con papas doradas y ensalada criolla.',
    tag: 'Top',
  },
  {
    id: 'chancho-cilindro',
    name: 'Chancho al Cilindro',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-cilindro.jpg',
    description:
      'Preparado en un cilindro metálico sobre brasas de leña, el chancho absorbe el aroma del humo y se cocina en su propio jugo. Textura incomparable, piel caramelizada y un sabor profundo que es emblema de las parrilladas peruanas.',
    tag: 'Top',
  },
  {
    id: 'anticuchos',
    name: 'Anticuchos',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/anticuchos.jpg',
    description:
      'Brochetas de corazón de res marinadas en ají panca, vinagre, comino y ajo. Asadas al carbón y acompañadas de papa sancochada y choclo. Un clásico infaltable de la cocina callejera peruana con más de 500 años de historia.',
    tag: 'Popular',
  },
  {
    id: 'carapulcra',
    name: 'Carapulcra + Sopa Seca',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/carapulcra.jpg',
    description:
      'Combinación emblemática de la cocina afroperuana. La carapulcra es un guiso de papa seca con carne de cerdo, maní y ají. La sopa seca es un tipo de fideos seco con gallina y especias. Juntos forman el "matrimonio" más famoso de nuestra cocina.',
    tag: 'Clásico',
  },
  {
    id: 'frejol-seco',
    name: 'Frejol con Seco',
    price: 'S/ 12.00',
    category: 'platos',
    description:
      'Seco de res o cabrito guisado con cilantro, ají amarillo y chicha de jora, acompañado de frejoles negros cremosos. Un plato de herencia afroperuana que combina la intensidad del guiso con la suavidad del frejol.',
  },
  {
    id: 'caldo-gallina',
    name: 'Caldo de Gallina',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/caldo-gallina.jpg',
    description:
      'Reconfortante caldo de gallina de campo cocida lentamente con fideos, papa amarilla, huevo, pimienta y hierbas aromáticas. El remedio favorito de los peruanos: reconstituyente, sabroso y servido bien caliente.',
  },
  {
    id: 'arroz-pollo',
    name: 'Arroz con Pollo + Papa a la Huancaína',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/arroz-pollo.jpg',
    description:
      'Arroz verde preparado con cilantro y pollo tierno, acompañado de la legendaria papa a la huancaína: papa amarilla bañada en una crema de ají amarillo, queso fresco, leche y galletas. Un plato bandera de la cocina casera peruana.',
  },
  {
    id: 'pollo-broster',
    name: 'Pollo Broster + Papas/Arroz',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/pollo-broster.jpg',
    description:
      'Pollo marinado y frito bajo presión para lograr una capa exterior increíblemente crujiente y una carne interior jugosa y tierna. Servido con papas fritas doradas o arroz a elección.',
  },
  {
    id: 'alita-broster',
    name: 'Alita Broster + Papas/Arroz',
    price: 'S/ 10.00',
    category: 'platos',
    description:
      'Alitas de pollo preparadas al estilo broster: marinadadas en especias y fritas a presión para una cobertura ultra crujiente. Perfectas para compartir, acompañadas de papas fritas o arroz.',
  },
  {
    id: 'cau-cau',
    name: 'Cau-Cau',
    price: 'S/ 10.00',
    category: 'platos',
    description:
      'Guiso de mondongo (panza de res) con papas amarillas, ají amarillo, hierbabuena y orégano. Plato tradicional de la gastronomía limeña con raíces en la cocina afroperuana e italiana. Servido con arroz blanco.',
  },
  {
    id: 'causa-limena',
    name: 'Causa Limeña',
    price: 'S/ 7.00',
    category: 'platos',
    image: '/images/causa-limena.jpg',
    description:
      'Pastel frío de papa amarilla sazonada con ají amarillo y limón, relleno de atún, pollo o mariscos con mayonesa. Decorada con huevo, aceitunas y palta. Un emblema de la cocina criolla limeña, servida fría y elegante.',
    tag: 'Favorito',
  },
  {
    id: 'papa-rellena',
    name: 'Papa Rellena',
    price: 'S/ 5.00',
    category: 'platos',
    description:
      'Croqueta de papa amarilla rellena con carne molida guisada, huevo duro, aceitunas y pasas. Frita hasta quedar dorada por fuera. Un snack clásico de la cocina peruana que se come a cualquier hora del día.',
  },

  // ── POSTRES ────────────────────────────────────────────────────────────────
  {
    id: 'queque-naranja',
    name: 'Queque de Naranja',
    price: 'S/ 2.00',
    category: 'postres',
    description:
      'Esponjoso biscocho casero con aroma y sabor intenso a naranja fresca. Húmedo por dentro y con una delicada costra dorada por fuera. Perfecto para acompañar el café o la cebada.',
  },
  {
    id: 'queque-chocolate',
    name: 'Queque de Chocolate',
    price: 'S/ 2.00',
    category: 'postres',
    description:
      'Queque casero de chocolate oscuro, con textura suave y sabor profundo a cacao. Una delicia para los amantes del chocolate, preparado con amor para este evento especial.',
  },
  {
    id: 'arroz-leche-mazamorra',
    name: 'Arroz con Leche + Mazamorra',
    price: 'S/ 3.00',
    category: 'postres',
    description:
      'El "combinado" más querido del Perú: arroz con leche cremoso y canela en la superficie, junto a mazamorra morada de maíz morado con fruta. Servidos juntos en un mismo plato, forman el postre nacional peruano por excelencia.',
    tag: 'Clásico',
  },
  {
    id: 'picarones',
    name: 'Picarones',
    price: 'S/ 5.00',
    category: 'postres',
    image: '/images/picarones.jpg',
    description:
      'Rosquillas esponjosas de zapallo y camote, fritas y bañadas en miel de chancaca con especias (clavo, canela, anís y naranja). El postre de antaño más querido de Lima, que se vende en carritos ambulantes y ahora en las mejores mesas.',
    tag: 'Top',
  },

  // ── BEBIDAS ────────────────────────────────────────────────────────────────
  {
    id: 'chicha-morada',
    name: 'Chicha Morada',
    price: 'S/ 1.50',
    category: 'bebidas',
    image: '/images/chicha-morada.jpg',
    description:
      'Bebida tradicional peruana preparada con maíz morado cocido con piña, membrillo, canela y clavo. Refrescante, de color violeta intenso y sabor dulce-ácido. Rica en antioxidantes y símbolo de la cultura peruana.',
    tag: 'Popular',
  },
  {
    id: 'cebada',
    name: 'Cebada',
    price: 'S/ 1.50',
    category: 'bebidas',
    description:
      'Bebida nutritiva y reconfortante de cebada tostada, preparada de manera artesanal. De sabor suave y aroma tostado, ideal para acompañar cualquier plato. También disponible en jarra para la familia.',
    tag: 'Jarra S/ 5.00',
  },
  {
    id: 'cafe',
    name: 'Café',
    price: 'S/ 2.00',
    category: 'bebidas',
    description:
      'Café peruano de altura, de regiones cafetaleras como Villa Rica o San Martín. Servido caliente, con aroma tostado y sabor equilibrado. El compañero perfecto para el queque.',
  },
  {
    id: 'infusiones',
    name: 'Infusiones',
    price: 'S/ 2.00',
    category: 'bebidas',
    description:
      'Selección de hierbas aromáticas: manzanilla, hierba luisa, menta y muña. Preparadas en agua caliente para brindar calma y bienestar después de un gran banquete.',
  },
];

export type Category = 'platos' | 'postres' | 'bebidas';

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'platos',   label: 'Platos',   icon: '🍽️' },
  { id: 'postres',  label: 'Postres',  icon: '🍮' },
  { id: 'bebidas',  label: 'Bebidas',  icon: '🥤' },
];
