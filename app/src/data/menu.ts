export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: 'platos' | 'postres' | 'bebidas';
  image?: string;
  tagline: string;       // short hook for carousel / card
  description: string;   // full marketing copy for modal
  tag?: string;
  featured?: boolean;
}

export const MENU: MenuItem[] = [
  // ── PLATOS ─────────────────────────────────────────────────────────────────
  {
    id: 'chancho-caja-china',
    name: 'Chancho Caja China',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-caja-china.jpg',
    tagline: 'Costra dorada. Carne que se deshace. Un ritual de sabor.',
    description:
      'Esta preparación lleva más de un siglo de historia latinoamericana. La caja china es un método cubano adoptado por la gastronomía peruana: el cerdo se asa lentamente bajo carbones encendidos sobre una caja de madera, logrando una costra exterior increíblemente crujiente y dorada mientras la carne interior queda jugosa, tierna y perfumada. Cada bocado es un equilibrio perfecto entre la crocancia de la piel y la suavidad del cerdo, sazonado con un adobo de ajo, pimentón y hierbas que penetra hasta el hueso. Una experiencia gastronómica que no olvidarás.',
    tag: '🔥 Top',
    featured: true,
  },
  {
    id: 'chancho-cilindro',
    name: 'Chancho al Cilindro',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-cilindro.jpg',
    tagline: 'Brasas de leña. Humo aromático. Tradición peruana en estado puro.',
    description:
      'El asado en cilindro es una técnica ancestral de las parrilladas peruanas de barrio. El cerdo se cocina durante horas sobre brasas de leña dentro de un cilindro metálico que retiene el calor y el humo, creando un ambiente de cocción único. El resultado: piel caramelizada con un aroma ahumado intenso, carne que se separa sola del hueso, y ese sabor profundo que solo el fuego lento puede lograr. Un plato que transporta a los fogones del Perú tradicional.',
    tag: '🔥 Top',
    featured: true,
  },
  {
    id: 'anticuchos',
    name: 'Anticuchos',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/anticuchos.jpg',
    tagline: '500 años de historia en cada brocheta. El alma de Lima.',
    description:
      'Los anticuchos son la joya de la corona de la cocina callejera peruana, con raíces que se remontan al Imperio Incaico y que luego fueron enriquecidos por la influencia afroperuana durante la colonia. Corazón de res marinado durante horas en ají panca rojo, vinagre, comino y ajo, luego asado sobre carbones al rojo vivo. El resultado es una brocheta de sabor intenso y ahumado, con una textura tierna por dentro y ligeramente caramelizada por fuera. Se sirven con papa sancochada y choclo. Más que un plato: es un símbolo de identidad peruana.',
    tag: '⭐ Popular',
    featured: true,
  },
  {
    id: 'carapulcra',
    name: 'Carapulcra + Sopa Seca',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/carapulcra.jpg',
    tagline: 'El matrimonio más famoso de la cocina peruana. 400 años de sabor.',
    description:
      'Este dúo legendario es conocido como "el matrimonio" de la cocina afroperuana. La carapulcra —del quechua "qala phurk\'a", papa al fuego— es uno de los guisos más antiguos del Perú: papa seca deshidratada guisada con carne de cerdo, maní tostado, ají panca y especias. La sopa seca es fideos negros cocidos en el aderezo de la gallina con culantro, tomando todo el sabor de la cocción. Juntos en un plato, forman una combinación de texturas y sabores que ha conquistado generaciones. Un bocado de historia viva.',
    tag: '🏆 Clásico',
    featured: true,
  },
  {
    id: 'frejol-seco',
    name: 'Frejol con Seco',
    price: 'S/ 12.00',
    category: 'platos',
    tagline: 'Guiso verde intenso con frejoles cremosos. Herencia afroperuana.',
    description:
      'El seco es uno de los guisos más aromáticos del Perú: res o cabrito cocinado lentamente con un licuado de culantro fresco, ají amarillo, cerveza negra o chicha de jora, y especias. La preparación deja la carne increíblemente tierna y la salsa verde con un sabor herbáceo y profundo. Los frejoles negros se cocinan hasta lograr una textura cremosa que contrasta maravillosamente con el guiso. Un plato que lleva el alma de la cocina costeña peruana.',
  },
  {
    id: 'caldo-gallina',
    name: 'Caldo de Gallina',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/caldo-gallina.jpg',
    tagline: 'El reconstituyente favorito del Perú. Caliente, sabroso, infalible.',
    description:
      'En Lima, el caldo de gallina es mucho más que un plato: es un ritual de sanación y camaradería. Gallina de campo cocida durante horas con fideos de trigo, papa amarilla, huevo duro, cebolla china y pimienta negra. El caldo adquiere un color dorado intenso y un sabor profundo y reconfortante que calienta el cuerpo y el alma. Perfecto para comenzar o terminar el día, este plato ha pasado de generación en generación como el remedio más sabroso de la cocina peruana.',
  },
  {
    id: 'arroz-pollo',
    name: 'Arroz con Pollo + Huancaína',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/arroz-pollo.jpg',
    tagline: 'Verde como el campo, dorado como el ají. Dos íconos en un plato.',
    description:
      'El arroz con pollo peruano es un plato de celebración: el arroz se cocina con un licuado de culantro fresco que lo torna verde intenso, absorbe el caldo del pollo dorado y se perfuma con ajo, comino y ají amarillo. Lo acompaña la papa a la huancaína, emblema de la sierra peruana: papa amarilla tierna bañada en una salsa irresistible de ají amarillo, queso fresco, galleta de soda y leche evaporada. Dos preparaciones icónicas que juntas crean una experiencia culinaria completa.',
  },
  {
    id: 'pollo-broster',
    name: 'Pollo Broster + Papas/Arroz',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/pollo-broster.jpg',
    tagline: 'Ultra crujiente por fuera. Jugoso y tierno por dentro.',
    description:
      'La técnica broster —fritura bajo presión— eleva el pollo frito a otro nivel: la presión sella los jugos dentro mientras la cobertura se vuelve extraordinariamente crujiente. Primero se marina el pollo en ajo, pimienta, orégano y especias secretas, luego se empaniza y fríe en aceite bajo presión controlada. El resultado es una capa exterior que cruje en cada mordida mientras la carne interior permanece jugosa y llena de sabor. Acompañado de papas fritas doradas o arroz, es el plato favorito de la familia peruana.',
  },
  {
    id: 'alita-broster',
    name: 'Alita Broster + Papas/Arroz',
    price: 'S/ 10.00',
    category: 'platos',
    tagline: 'Para compartir. Para picar. Para no parar.',
    description:
      'Las alitas al estilo broster son la versión social perfecta del pollo crujiente: pequeñas, sabrosas y con una cobertura que cruje de manera satisfactoria en cada bocado. Marinadas en especias y fritas bajo presión para lograr esa textura característica, estas alitas son ideales para compartir entre amigos y familia. Acompañadas de papas doradas o arroz, representan la combinación perfecta entre sabor, precio y disfrute colectivo.',
  },
  {
    id: 'cau-cau',
    name: 'Cau-Cau',
    price: 'S/ 10.00',
    category: 'platos',
    tagline: 'El guiso más aromático de Lima. Raíces italo-afroperuanas.',
    description:
      'El cau-cau es una expresión perfecta de la fusión cultural peruana: mondongo (panza de res) cocido lentamente con papa amarilla, ají amarillo fresco, hierbabuena y orégano, con influencias de la cocina italiana. La preparación requiere paciencia: el mondongo se limpia, blanquea y guisa durante horas hasta lograr una textura suave y sedosa. El aroma de la hierbabuena y el ají amarillo crean un perfume único que anuncia un sabor profundo y complejo. Un plato para valenteshermosos que se atreven a la cocina auténtica.',
  },
  {
    id: 'causa-limena',
    name: 'Causa Limeña',
    price: 'S/ 7.00',
    category: 'platos',
    image: '/images/causa-limena.jpg',
    tagline: 'La elegancia de Lima en un plato frío. Un ícono que viaja al mundo.',
    description:
      'La causa limeña es considerada una de las preparaciones más ingeniosas de la cocina peruana. Su nombre viene de la Guerra del Pacífico, cuando las limeñas preparaban esta receta para recaudar fondos "por la causa". La papa amarilla —la más cremosa del mundo— se sazona con ají amarillo, limón y aceite, creando una masa suave de sabor único. Se rellena con atún o pollo en mayonesa y se decora con huevo, aceitunas y palta. Fría, elegante y perfecta: la causa es arte culinario peruano.',
    tag: '💛 Favorito',
    featured: true,
  },
  {
    id: 'papa-rellena',
    name: 'Papa Rellena',
    price: 'S/ 5.00',
    category: 'platos',
    tagline: 'Crujiente por fuera, un mundo de sabor por dentro.',
    description:
      'La papa rellena peruana es una joya de la cocina criolla: papa amarilla cocida y amasada con sal y aceite, formada a mano alrededor de un relleno de carne molida guisada con cebolla, tomate, ají amarillo, huevo duro picado, aceitunas y pasas. Luego se fríe hasta lograr una cobertura dorada y crujiente. En cada mordida encuentras la suavidad de la papa, la intensidad del guiso y la sorpresa de los ingredientes del relleno. Un bocado pequeño con un universo de sabores.',
  },

  // ── POSTRES ────────────────────────────────────────────────────────────────
  {
    id: 'queque-naranja',
    name: 'Queque de Naranja',
    price: 'S/ 2.00',
    category: 'postres',
    tagline: 'Esponjoso, húmedo, aromático. Horneado con amor casero.',
    description:
      'Este queque artesanal concentra todo el aroma y frescura de la naranja peruana: ralladura de cáscara natural que perfuma toda la masa, jugo fresco que aporta humedad y un sabor cítrico vibrante. Horneado en horno casero hasta lograr una costra dorada por fuera y una miga increíblemente esponjosa por dentro. Sin aditivos artificiales, sin conservantes: solo ingredientes de primera y el calor de manos que hornean con dedicación. El acompañante perfecto de un café caliente.',
  },
  {
    id: 'queque-chocolate',
    name: 'Queque de Chocolate',
    price: 'S/ 2.00',
    category: 'postres',
    tagline: 'Para los que no pueden resistirse al chocolate. Intenso y profundo.',
    description:
      'Elaborado con cacao de alta calidad, este queque casero es el paraíso de los amantes del chocolate: masa húmeda y densa, de color oscuro intenso y sabor profundo a cacao con notas amargas y ligeramente dulces. La receta, transmitida con cariño, utiliza cocoa pura y mantequilla real que le dan una textura suave y fondante. Perfecto para el postre o el antojo de la tarde, este queque es un pequeño lujo accesible para todos.',
  },
  {
    id: 'arroz-leche-mazamorra',
    name: 'Arroz c/Leche + Mazamorra',
    price: 'S/ 3.00',
    category: 'postres',
    tagline: 'El postre más querido del Perú. Dos sabores, un solo amor.',
    description:
      'El "combinado" es la corona de la repostería peruana: arroz con leche cremoso, preparado con leche fresca, azúcar, canela en rama y clavos de olor hasta lograr una consistencia sedosa, espolvoreado con canela en polvo; junto a la mazamorra morada, preparada con maíz morado, frutas secas, piña y membrillo, espesada con chuño y de un color violeta profundo e intenso. Servidos juntos, representan el sabor de la infancia peruana: el blanco y el morado, el dulce suave y el dulce frutal. Un clásico eterno.',
    tag: '🏆 Clásico',
    featured: true,
  },
  {
    id: 'picarones',
    name: 'Picarones',
    price: 'S/ 5.00',
    category: 'postres',
    image: '/images/picarones.jpg',
    tagline: 'Rosquillas de zapallo. Miel de chancaca. Lima de antaño.',
    description:
      'Los picarones son un tesoro de la Lima colonial: rosquillas esponjosas elaboradas con zapallo (calabaza) y camote, que le dan un color anaranjado natural y una textura suave y aireada. Se fríen en aceite caliente hasta quedar dorados y ligeros, y se sirven bañados en miel de chancaca perfumada con clavo de olor, canela, anís estrella y naranja. Esta miel oscura y aromática es el alma del plato. Originalmente vendidos en carros callejeros limeños, los picarones son hoy un símbolo gastronómico que los mejores restaurantes del mundo reconocen.',
    tag: '🔥 Top',
    featured: true,
  },

  // ── BEBIDAS ────────────────────────────────────────────────────────────────
  {
    id: 'chicha-morada',
    name: 'Chicha Morada',
    price: 'S/ 1.50',
    category: 'bebidas',
    image: '/images/chicha-morada.jpg',
    tagline: 'La bebida nacional del Perú. Refrescante y ancestral.',
    description:
      'La chicha morada tiene más de 3,000 años de historia en el Perú precolombino, donde el maíz morado era considerado sagrado por los Incas. Preparada cociendo el maíz morado con piña, membrillo, canela y clavos de olor, luego enfriada y endulzada con azúcar y jugo de limón. Su color violeta intenso proviene de las antocianinas del maíz, poderosos antioxidantes naturales. Refrescante, ligeramente dulce y frutal, es la bebida que acompaña toda mesa peruana. Rica en historia y en salud.',
    tag: '⭐ Popular',
    featured: true,
  },
  {
    id: 'cebada',
    name: 'Cebada',
    price: 'S/ 1.50 | Jarra S/ 5.00',
    category: 'bebidas',
    tagline: 'Nutritiva, reconfortante. La bebida de las familias peruanas.',
    description:
      'La cebada peruana es una bebida artesanal de granos de cebada tostados que se cuecen en agua con canela y azúcar morena. Su sabor es suave, levemente acaramelado y con notas tostadas que recuerdan al café pero sin cafeína. Bebida nutritiva y digestiva, perfecta para acompañar cualquier plato del evento. Disponible por vaso o en jarra familiar para compartir en la mesa.',
  },
  {
    id: 'cafe',
    name: 'Café Peruano',
    price: 'S/ 2.00',
    category: 'bebidas',
    tagline: 'De las alturas de Villa Rica y San Martín. Aroma inigualable.',
    description:
      'El Perú es uno de los principales productores de café orgánico del mundo, y hoy lo compartimos con orgullo. Nuestro café proviene de los Andes peruanos, zonas como Villa Rica (Pasco) y San Martín, donde el microclima y la altura crean granos de sabor complejo y aroma intenso. Preparado hot pour-over para preservar sus notas frutales y su acidez equilibrada. Un café de especialidad que merece disfrutarse despacio, acompañando el queque casero.',
  },
  {
    id: 'infusiones',
    name: 'Infusiones Andinas',
    price: 'S/ 2.00',
    category: 'bebidas',
    tagline: 'La sabiduría andina en cada taza. Hierbas de verdad.',
    description:
      'Nuestras infusiones son un homenaje a la fitoterapia andina, donde cada hierba tiene un propósito. Manzanilla para calmar y digerir; hierba luisa, aromática y digestiva; menta refrescante que limpia el paladar; muña, hierba de altura que ayuda a la digestión de las carnes. Preparadas en agua caliente con hojas frescas o secas seleccionadas. El cierre perfecto para un gran banquete: una taza caliente que recuerda que la mejor medicina es la naturaleza peruana.',
  },
];

export type Category = 'platos' | 'postres' | 'bebidas';

export const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'platos',   label: 'Platos',   icon: '🍽️', color: '#D62828' },
  { id: 'postres',  label: 'Postres',  icon: '🍮', color: '#E8A020' },
  { id: 'bebidas',  label: 'Bebidas',  icon: '🥤', color: '#2980D6' },
];

export const FEATURED = MENU.filter(m => m.featured);
