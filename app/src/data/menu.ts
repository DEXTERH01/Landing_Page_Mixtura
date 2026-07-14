export type Category = 'platos' | 'postres' | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: Category;
  image?: string;
  tagline: string;
  origin: string;
  story: string;
  tag?: string;
  featured?: boolean;
}

const item = (menuItem: MenuItem): MenuItem => menuItem;

/** Única fuente oficial de la carta de Mixtura 2026. */
export const MENU: MenuItem[] = [
  // Platos
  item({
    id: 'chancho-cilindro', name: 'Chancho al cilindro', price: 'S/ 20.00', category: 'platos', image: '/images/chancho-cilindro.jpg',
    tagline: 'Brasas, encuentro y sabor para compartir.',
    origin: 'Parrillas y celebraciones peruanas',
    story: 'El cilindro es parte de esas reuniones donde el fuego convoca a familia y amigos. En Mixtura llega como una invitación a sentarse, conversar y celebrar juntos.',
    tag: '🔥 Top', featured: true,
  }),
  item({
    id: 'chancho-caja-china', name: 'Chancho a la caja china', price: 'S/ 20.00', category: 'platos', image: '/images/chancho-caja-china.jpg',
    tagline: 'Un protagonista de las grandes celebraciones.',
    origin: 'Celebraciones familiares del Perú',
    story: 'La caja china se ha ganado un lugar especial en fiestas y encuentros familiares. Es una opción pensada para convertir una visita a la feria en un recuerdo compartido.',
    tag: '🔥 Top', featured: true,
  }),
  item({
    id: 'chicharrones', name: 'Chicharrones', price: 'S/ 20.00', category: 'platos', image: '/images/chicharrones.jpg',
    tagline: 'Un clásico de mercado para reunir la mesa.',
    origin: 'Desayunos y mercados peruanos',
    story: 'Los chicharrones son parte del ritmo de los mercados y las mañanas peruanas. Su presencia en la feria trae ese sabor de encuentro que se disfruta mejor acompañado.',
  }),
  item({
    id: 'pollo-cilindro', name: 'Pollo al cilindro', price: 'S/ 15.00', category: 'platos', image: '/images/pollo-cilindro.jpg',
    tagline: 'El espíritu de la parrilla en tu plato.',
    origin: 'Tradición de brasas peruanas',
    story: 'Las preparaciones al cilindro acompañan reuniones de barrio y celebraciones familiares. Este plato lleva esa energía festiva a la carta de Mixtura.',
  }),
  item({
    id: 'arroz-pato', name: 'Arroz con pato', price: 'S/ 15.00', category: 'platos', image: '/images/arroz-pato.jpg?v=1',
    tagline: 'Un emblema norteño para celebrar.',
    origin: 'Lambayeque · norte del Perú',
    story: 'El arroz con pato es una de las preparaciones más representativas de la cocina lambayecana. En cada feria recuerda la generosidad y orgullo gastronómico del norte peruano.',
  }),
  item({
    id: 'caldo-gallina', name: 'Caldo de gallina', price: 'S/ 12.00', category: 'platos', image: '/images/caldo-gallina.jpg',
    tagline: 'Un abrazo caliente para cualquier momento.',
    origin: 'Picanterías y madrugadas peruanas',
    story: 'El caldo de gallina es un clásico reconfortante de la vida urbana peruana. Su lugar en la carta celebra esos platos que acompañan conversaciones largas y momentos de pausa.',
  }),
  item({
    id: 'frejol-seco-carne', name: 'Frejol con seco de carne', price: 'S/ 12.00', category: 'platos', image: '/images/frejol-seco-carne.jpg?v=2',
    tagline: 'Una combinación criolla para la buena mesa.',
    origin: 'Cocina casera peruana',
    story: 'Frejoles y seco evocan la mesa de casa, donde los sabores se comparten sin prisa. Es una elección para quienes buscan una tradición cercana y familiar.',
  }),
  item({
    id: 'arroz-pollo-huancaina', name: 'Arroz con pollo + huancaína', price: 'S/ 10.00', category: 'platos', image: '/images/arroz-pollo.jpg',
    tagline: 'Dos favoritos peruanos en un solo encuentro.',
    origin: 'Cocina familiar peruana',
    story: 'El arroz con pollo es protagonista de reuniones y celebraciones cotidianas. Acompañado de huancaína, reúne dos sabores muy queridos por varias generaciones.',
  }),
  item({
    id: 'carapulcra-sopa-seca', name: 'Carapulcra con sopa seca', price: 'S/ 12.00', category: 'platos', image: '/images/carapulcra.jpg',
    tagline: 'El famoso matrimonio de la cocina peruana.',
    origin: 'Raíces andinas y costa de Chincha',
    story: 'La carapulcra es una de las preparaciones antiguas del Perú y su encuentro con la sopa seca se volvió un símbolo de la tradición chinchana. Es historia servida para compartir.',
    tag: '🏆 Clásico', featured: true,
  }),
  item({
    id: 'cau-cau', name: 'Caú – Caú', price: 'S/ 10.00', category: 'platos', image: '/images/cau-cau.jpg',
    tagline: 'Un clásico limeño con herencia afroperuana.',
    origin: 'Herencia afroperuana · Lima',
    story: 'El cau-cau forma parte de la historia de sabores que la presencia afroperuana dejó en Lima. Hoy sigue siendo un plato con identidad y memoria en la cocina criolla.',
  }),
  item({
    id: 'pollo-broster', name: 'Pollo broster', price: 'Alitas S/ 10.00 · Pecho, pierna o entrepierna S/ 12.00', category: 'platos', image: '/images/pollo-broster.jpg',
    tagline: 'Elige tu pieza favorita y disfruta.',
    origin: 'Pollerías populares del Perú',
    story: 'El pollo broster se volvió un favorito de las comidas compartidas y las salidas en familia. Aquí puedes escoger alitas, pecho, pierna o entrepierna según tu antojo.',
  }),
  item({
    id: 'juanes', name: 'Juanes', price: 'S/ 10.00', category: 'platos', image: '/images/juanes.jpg',
    tagline: 'Un viaje a la Amazonía peruana.',
    origin: 'Amazonía peruana · Fiesta de San Juan',
    story: 'Los juanes son emblema de la Amazonía y ocupan un lugar especial durante la fiesta de San Juan. En la carta invitan a descubrir la diversidad regional del Perú.',
  }),
  item({
    id: 'combinado-4x4', name: 'Combinado 4 x 4', price: 'S/ 10.00', category: 'platos', image: '/images/combinado-4x4.jpg',
    tagline: 'Cuatro favoritos para explorar la feria.',
    origin: 'Espíritu de las ferias peruanas',
    story: 'El combinado 4 x 4 celebra la variedad: tallarines, chanfainita, ceviche y huancaína. Es una opción hecha para quienes quieren probar varios sabores en una sola visita.',
  }),
  item({
    id: 'anticuchos', name: 'Anticuchos', price: 'S/ 15.00', category: 'platos', image: '/images/anticuchos.jpg',
    tagline: 'Un ícono de la calle limeña.',
    origin: 'Herencia afroperuana · Lima',
    story: 'Los anticuchos son una de las expresiones más queridas de la herencia afroperuana. Sus brasas son parte de la memoria de las calles, las reuniones y las noches limeñas.',
    tag: '⭐ Popular', featured: true,
  }),
  item({
    id: 'papa-rellena', name: 'Papa rellena', price: 'S/ 5.00', category: 'platos', image: '/images/papa-rellena.jpg',
    tagline: 'Un bocado criollo para seguir el recorrido.',
    origin: 'Cocina criolla peruana',
    story: 'La papa rellena es parte de los antojos que acompañan mercados, viajes y reuniones familiares. Su presencia en la feria celebra el lado cotidiano y entrañable de la cocina criolla.',
  }),
  item({
    id: 'causa', name: 'Causa', price: 'S/ 5.00', category: 'platos', image: '/images/causa-limena.jpg',
    tagline: 'Lima en capas de sabor y memoria.',
    origin: 'Fusión peruano-hispana · Lima',
    story: 'La causa es uno de los platos más reconocibles de Lima y refleja el encuentro de tradiciones que formaron la cocina peruana. Es una elección fresca, elegante y muy nuestra.',
    featured: true,
  }),
  item({
    id: 'arepas-tumbarrancho', name: 'Arepas tumbarrancho', price: 'S/ 5.00', category: 'platos', image: '/images/arepas-tumbarrancho.jpg',
    tagline: 'Un sabor maracucho que llega a Mixtura.',
    origin: 'Zulia · Venezuela',
    story: 'El tumbarrancho es una arepa emblemática de la tradición callejera zuliana, especialmente de Maracaibo. Esta especialidad venezolana trae a la feria una historia de identidad, barrio y sabor compartido.',
    tag: '🇻🇪 Especial venezolano',
    featured: true,
  }),

  // Bebidas
  item({
    id: 'chicha-morada', name: 'Chicha morada (refresco)', price: 'Vaso S/ 2.00 · Jarra 1 Lt. S/ 6.00', category: 'bebidas', image: '/images/chicha-morada.jpg',
    tagline: 'El refresco morado que acompaña al Perú.',
    origin: 'Tradición limeña',
    story: 'La chicha morada forma parte de la identidad cotidiana de Lima y acompaña mesas familiares de generación en generación. Disponible por vaso o jarra para compartir la visita.',
    tag: '⭐ Popular', featured: true,
  }),
  item({
    id: 'emoliente', name: 'Emoliente (refresco)', price: 'Vaso S/ 2.00 · Jarra 1 Lt. S/ 6.00', category: 'bebidas', image: '/images/emoliente.jpg',
    tagline: 'Una pausa tradicional en el camino.',
    origin: 'Carretillas y calles de Lima',
    story: 'El emoliente es parte del paisaje de las calles peruanas, una bebida que acompaña madrugadas y conversaciones. Aquí está disponible por vaso o jarra.',
  }),
  item({
    id: 'camu-camu', name: 'Camu camu (refresco)', price: 'Vaso S/ 2.00 · Jarra 1 Lt. S/ 6.00', category: 'bebidas', image: '/images/camu-camu.jpg',
    tagline: 'Un refresco que conecta con la Amazonía.',
    origin: 'Amazonía peruana',
    story: 'El camu camu acerca a la feria uno de los sabores más reconocibles de la Amazonía peruana. Puedes disfrutarlo por vaso o en jarra para compartir.',
  }),
  item({
    id: 'chicha-jora', name: 'Chicha jora (refresco)', price: 'Vaso S/ 2.00 · Jarra jora 1 Lt. S/ 7.00', category: 'bebidas', image: '/images/chicha-jora.jpg',
    tagline: 'Una bebida de memoria andina.',
    origin: 'Andes del Perú',
    story: 'La chicha de jora ocupa un lugar especial en celebraciones y encuentros de los Andes. Su presencia en la carta suma una tradición profunda a la experiencia de Mixtura.',
  }),

  // Postres
  item({
    id: 'torta-chocolate', name: 'Torta de chocolate', price: 'S/ 3.00', category: 'postres', image: '/images/torta-chocolate.jpg',
    tagline: 'Un antojo dulce para regalarte un momento.',
    origin: 'Repostería de celebración',
    story: 'La torta de chocolate es una invitación a hacer una pausa y compartir algo especial. Un final dulce para recorrer la feria con una sonrisa.',
  }),
  item({
    id: 'queque-naranja', name: 'Queque de naranja', price: 'S/ 2.00', category: 'postres', image: '/images/queque-naranja.jpg',
    tagline: 'Un toque cítrico con aire de casa.',
    origin: 'Horneados familiares',
    story: 'El queque de naranja recuerda las tardes de casa y los dulces que se comparten sin ceremonia. Una opción sencilla que suma calidez a tu visita.',
  }),
  item({
    id: 'queque-vainilla', name: 'Queque de vainilla', price: 'S/ 2.00', category: 'postres', image: '/images/queque-vainilla.jpg',
    tagline: 'Un clásico dulce para todos los gustos.',
    origin: 'Pastelería casera',
    story: 'El queque de vainilla representa esos sabores familiares que siempre encuentran un lugar en la mesa. Ideal para compartir una pausa dulce durante la feria.',
  }),
  item({
    id: 'gelatina', name: 'Gelatina', price: 'S/ 2.00', category: 'postres', image: '/images/gelatina.jpg',
    tagline: 'Color, alegría y un dulce para sonreír.',
    origin: 'Celebraciones familiares',
    story: 'La gelatina aparece en los recuerdos de muchas reuniones familiares y celebraciones. En Mixtura es una alternativa alegre para grandes y chicos.',
  }),
  item({
    id: 'torta-helada', name: 'Torta helada', price: 'S/ 2.00', category: 'postres', image: '/images/torta-helada.jpg?v=1',
    tagline: 'Un postre fresco para cerrar la visita.',
    origin: 'Repostería de celebración',
    story: 'La torta helada acompaña fiestas y reuniones con una pausa dulce y refrescante. Una nueva opción para compartir al final del recorrido.',
  }),
  item({
    id: 'chifon', name: 'Chifón', price: 'S/ 2.00', category: 'postres', image: '/images/chifon.jpg',
    tagline: 'Un dulce suave para acompañar la tarde.',
    origin: 'Pastelería peruana',
    story: 'El chifón aporta una pausa ligera a la experiencia de la feria. Una opción para disfrutar con calma entre un plato, una bebida y una conversación.',
  }),
  item({
    id: 'pye-manzana', name: 'Pye de manzana', price: 'S/ 2.50', category: 'postres', image: '/images/pye-manzana.jpg',
    tagline: 'Un cierre dulce para tu recorrido.',
    origin: 'Repostería de encuentro',
    story: 'El pye de manzana es una invitación a terminar la visita con un momento especial. Un postre pensado para compartir y volver a disfrutar.',
  }),
];

export const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'platos', label: 'Platos', icon: '🍽️', color: '#D62828' },
  { id: 'postres', label: 'Postres', icon: '🍮', color: '#E8A020' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤', color: '#2980D6' },
];

export const FEATURED = MENU.filter((menuItem) => menuItem.featured);
