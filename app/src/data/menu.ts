export type Category = 'platos' | 'postres' | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: Category;
  image?: string;
  tagline: string;
  description: string;
  tag?: string;
  featured?: boolean;
}

type MenuItemInput = Omit<MenuItem, 'tagline' | 'description'> & {
  tagline?: string;
  description?: string;
};

const CATEGORY_COPY: Record<Category, { tagline: string; description: string }> = {
  platos: {
    tagline: 'Sabor peruano preparado para disfrutar en familia.',
    description: 'Plato de la carta oficial de Mixtura 2026, preparado con el sabor de nuestra cocina peruana.',
  },
  postres: {
    tagline: 'Un dulce final para compartir.',
    description: 'Postre de la carta oficial de Mixtura 2026, ideal para cerrar la experiencia con algo dulce.',
  },
  bebidas: {
    tagline: 'Refrescante y perfecta para acompañar tu comida.',
    description: 'Bebida de la carta oficial de Mixtura 2026 para acompañar cualquiera de nuestros platos.',
  },
};

const menuItem = (item: MenuItemInput): MenuItem => ({
  ...CATEGORY_COPY[item.category],
  ...item,
});

/**
 * Única fuente oficial de la carta.
 *
 * Los productos sin precio confirmado muestran "Precio pendiente". No se
 * publican valores estimados para evitar que la web contradiga la carta.
 */
export const MENU: MenuItem[] = [
  // Platos
  menuItem({
    id: 'chancho-cilindro',
    name: 'Chancho al cilindro',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-cilindro.jpg',
    tagline: 'Un clásico de brasas para disfrutar en familia.',
    description: 'Una opción protagonista para compartir y celebrar alrededor de una buena mesa.',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({
    id: 'chancho-caja-china',
    name: 'Chancho a la caja china',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-caja-china.jpg',
    tagline: 'Un favorito de celebración para la mesa.',
    description: 'Una propuesta especial de la carta para quienes quieren disfrutar un gran momento en familia.',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({
    id: 'chicharrones', name: 'Chicharrones', price: 'S/ 20.00', category: 'platos', image: '/images/chicharrones.jpg',
    tagline: 'Un clásico para compartir en la mesa.',
    description: 'Una de esas opciones que reúne a la familia y hace especial cualquier visita.',
  }),
  menuItem({
    id: 'pollo-cilindro', name: 'Pollo al cilindro', price: 'S/ 20.00', category: 'platos', image: '/images/pollo-cilindro.jpg',
    tagline: 'Una opción de brasas para disfrutar sin apuro.',
    description: 'Perfecto para quienes buscan un plato principal para saborear y compartir.',
  }),
  menuItem({
    id: 'arroz-pato', name: 'Arroz con pato', price: 'S/ 15.00', category: 'platos', image: '/images/arroz-pato.jpg',
    tagline: 'Tradición peruana que siempre invita a volver.',
    description: 'Un plato querido de la carta para disfrutar un sabor de celebración.',
  }),
  menuItem({
    id: 'caldo-gallina',
    name: 'Caldo de gallina',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/caldo-gallina.jpg',
    tagline: 'Un abrazo caliente para cualquier momento.',
    description: 'Una alternativa reconfortante de la carta para disfrutar con calma.',
  }),
  menuItem({
    id: 'frejol-seco-carne', name: 'Frejol con seco de carne', price: 'S/ 12.00', category: 'platos', image: '/images/frejol-seco-carne.jpg',
    tagline: 'Sabor casero para una buena mesa.',
    description: 'Una combinación tradicional que acompaña muy bien un almuerzo para compartir.',
  }),
  menuItem({
    id: 'arroz-pollo-huancaina',
    name: 'Arroz con pollo + huancaína',
    price: 'S/ 10.00',
    category: 'platos',
    image: '/images/arroz-pollo.jpg',
    tagline: 'Un favorito de siempre con huancaína.',
    description: 'Una elección conocida y sabrosa para disfrutar con la familia.',
  }),
  menuItem({
    id: 'carapulcra-sopa-seca',
    name: 'Carapulcra con sopa seca',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/carapulcra.jpg',
    tagline: 'Dos clásicos reunidos en un solo plato.',
    description: 'Una propuesta tradicional para quienes quieren probar una combinación muy querida.',
    tag: '🏆 Clásico',
    featured: true,
  }),
  menuItem({
    id: 'cau-cau', name: 'Caú – Caú', price: 'S/ 10.00', category: 'platos', image: '/images/cau-cau.jpg',
    tagline: 'Un sabor tradicional que se disfruta sin apuro.',
    description: 'Una opción con personalidad para quienes buscan un clásico de nuestra cocina.',
  }),
  menuItem({
    id: 'pollo-broster',
    name: 'Pollo broster',
    price: 'Alitas S/ 10.00 · Pecho, pierna o entrepierna S/ 12.00',
    category: 'platos',
    image: '/images/pollo-broster.jpg',
    tagline: 'Elige tu pieza favorita y disfruta.',
    description: 'Disponible en alitas, pecho, pierna o entrepierna para elegir según tu antojo.',
  }),
  menuItem({
    id: 'juanes', name: 'Juanes', price: 'Precio pendiente', category: 'platos', image: '/images/juanes.jpg',
    tagline: 'Una opción especial con sabor de tradición.',
    description: 'Una alternativa distinta para descubrir y compartir durante Mixtura 2026.',
  }),
  menuItem({
    id: 'combinado-4x4',
    name: 'Combinado 4 x 4',
    price: 'S/ 10.00',
    category: 'platos',
    image: '/images/combinado-4x4.jpg',
    tagline: 'Cuatro favoritos reunidos para disfrutar.',
    description: 'Incluye tallarines, chanfainita, ceviche y huancaína en una opción para quienes quieren probar de todo.',
  }),
  menuItem({
    id: 'anticuchos',
    name: 'Anticuchos',
    price: 'S/ 15.00',
    category: 'platos',
    image: '/images/anticuchos.jpg',
    tagline: 'Un clásico que no puede faltar en la reunión.',
    description: 'Una elección popular para compartir y disfrutar el espíritu de la feria.',
    tag: '⭐ Popular',
    featured: true,
  }),
  menuItem({
    id: 'lomo-saltado', name: 'Lomo saltado', price: 'Precio pendiente', category: 'platos', image: '/images/lomo-saltado.jpg',
    tagline: 'El antojo peruano para cualquier ocasión.',
    description: 'Un favorito de la carta para quienes buscan un plato principal con mucho carácter.',
  }),
  menuItem({
    id: 'papa-rellena', name: 'Papa rellena', price: 'S/ 5.00', category: 'platos', image: '/images/papa-rellena.jpg',
    tagline: 'Pequeña en tamaño, grande en antojo.',
    description: 'Una opción práctica para disfrutar sola o acompañar tu recorrido por la feria.',
  }),
  menuItem({
    id: 'causa',
    name: 'Causa',
    price: 'S/ 5.00',
    category: 'platos',
    image: '/images/causa-limena.jpg',
    tagline: 'Un clásico fresco para disfrutar a cualquier hora.',
    description: 'Una alternativa ligera y conocida para sumar a tu visita.',
    featured: true,
  }),
  menuItem({
    id: 'arepas-tumbarrancho', name: 'Arepas tumbarrancho', price: 'Precio pendiente', category: 'platos', image: '/images/arepas-tumbarrancho.jpg',
    tagline: 'Una alternativa diferente para descubrir.',
    description: 'Una propuesta especial de la carta para salir de lo habitual y compartir algo nuevo.',
  }),
  // Bebidas
  menuItem({
    id: 'chicha-morada',
    name: 'Chicha morada (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/chicha-morada.jpg',
    tagline: 'El refresco peruano que acompaña cualquier plato.',
    description: 'Disponible por vaso o jarra para disfrutar durante toda tu visita.',
    tag: '⭐ Popular',
    featured: true,
  }),
  menuItem({
    id: 'emoliente',
    name: 'Emoliente (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/emoliente.jpg',
    tagline: 'Una pausa reconfortante en tu recorrido.',
    description: 'Disponible por vaso o jarra para acompañarte mientras disfrutas la feria.',
  }),
  menuItem({
    id: 'camu-camu',
    name: 'Camu camu (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/camu-camu.jpg',
    tagline: 'Un refresco especial para acompañar tu antojo.',
    description: 'Disponible por vaso o jarra para compartir durante tu visita.',
  }),
  menuItem({
    id: 'chicha-jora', name: 'Chicha de jora', price: 'Precio pendiente', category: 'bebidas', image: '/images/chicha-jora.jpg',
    tagline: 'Una bebida tradicional para descubrir.',
    description: 'Una opción de la carta para acompañar una tarde de sabores peruanos.',
  }),

  // Postres
  menuItem({
    id: 'picarones',
    name: 'Picarones',
    price: 'Precio pendiente',
    category: 'postres',
    image: '/images/picarones.jpg',
    tagline: 'Un dulce clásico para cerrar con una sonrisa.',
    description: 'La elección ideal para compartir un momento dulce al final de tu recorrido.',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({
    id: 'torta-chocolate', name: 'Torta de chocolate', price: 'S/ 3.00', category: 'postres', image: '/images/torta-chocolate.jpg',
    tagline: 'Un antojo dulce para disfrutar sin prisa.',
    description: 'Una opción de postre para regalarte un momento especial durante tu visita.',
  }),
  menuItem({
    id: 'queque-naranja', name: 'Queque de naranja', price: 'S/ 2.00', category: 'postres', image: '/images/queque-naranja.jpg',
    tagline: 'Un toque cítrico para acompañar la tarde.',
    description: 'Un dulce sencillo y especial para disfrutar solo o compartir.',
  }),
  menuItem({
    id: 'queque-vainilla', name: 'Queque de vainilla', price: 'S/ 2.00', category: 'postres', image: '/images/queque-vainilla.jpg',
    tagline: 'Un clásico dulce para todos los gustos.',
    description: 'Una alternativa suave y agradable para sumar a tu visita.',
  }),
  menuItem({
    id: 'gelatina', name: 'Gelatina', price: 'S/ 2.00', category: 'postres', image: '/images/gelatina.jpg',
    tagline: 'Un dulce ligero para sonreír en familia.',
    description: 'Una opción sencilla y alegre para disfrutar durante la feria.',
  }),
  menuItem({
    id: 'chifon', name: 'Chifón', price: 'Precio pendiente', category: 'postres', image: '/images/chifon.jpg',
    tagline: 'Un dulce especial para acompañar tu visita.',
    description: 'Una alternativa de postre para compartir un momento agradable.',
  }),
  menuItem({
    id: 'pye-manzana', name: 'Pye de manzana', price: 'Precio pendiente', category: 'postres', image: '/images/pye-manzana.jpg',
    tagline: 'Un final dulce para tu recorrido.',
    description: 'Una opción de postre para terminar la visita con algo especial.',
  }),
];

export const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'platos', label: 'Platos', icon: '🍽️', color: '#D62828' },
  { id: 'postres', label: 'Postres', icon: '🍮', color: '#E8A020' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤', color: '#2980D6' },
];

export const FEATURED = MENU.filter((item) => item.featured);
