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
    tagline: 'Brasas, humo aromático y tradición peruana.',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({
    id: 'chancho-caja-china',
    name: 'Chancho a la caja china',
    price: 'S/ 20.00',
    category: 'platos',
    image: '/images/chancho-caja-china.jpg',
    tagline: 'Costra dorada y carne tierna cocida lentamente.',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({ id: 'chicharrones', name: 'Chicharrones', price: 'S/ 20.00', category: 'platos', image: '/images/chicharrones.jpg' }),
  menuItem({ id: 'pollo-cilindro', name: 'Pollo al cilindro', price: 'S/ 20.00', category: 'platos', image: '/images/pollo-cilindro.jpg' }),
  menuItem({ id: 'arroz-pato', name: 'Arroz con pato', price: 'S/ 15.00', category: 'platos', image: '/images/arroz-pato.jpg' }),
  menuItem({
    id: 'caldo-gallina',
    name: 'Caldo de gallina',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/caldo-gallina.jpg',
  }),
  menuItem({ id: 'frejol-seco-carne', name: 'Frejol con seco de carne', price: 'S/ 12.00', category: 'platos', image: '/images/frejol-seco-carne.jpg' }),
  menuItem({
    id: 'arroz-pollo-huancaina',
    name: 'Arroz con pollo + huancaína',
    price: 'S/ 10.00',
    category: 'platos',
    image: '/images/arroz-pollo.jpg',
  }),
  menuItem({
    id: 'carapulcra-sopa-seca',
    name: 'Carapulcra con sopa seca',
    price: 'S/ 12.00',
    category: 'platos',
    image: '/images/carapulcra.jpg',
    tag: '🏆 Clásico',
    featured: true,
  }),
  menuItem({ id: 'cau-cau', name: 'Caú – Caú', price: 'S/ 10.00', category: 'platos', image: '/images/cau-cau.jpg' }),
  menuItem({
    id: 'pollo-broster',
    name: 'Pollo broster',
    price: 'Alitas S/ 10.00 · Pecho, pierna o entrepierna S/ 12.00',
    category: 'platos',
    image: '/images/pollo-broster.jpg',
  }),
  menuItem({ id: 'juanes', name: 'Juanes', price: 'Precio pendiente', category: 'platos', image: '/images/juanes.jpg' }),
  menuItem({
    id: 'combinado-4x4',
    name: 'Combinado 4 x 4',
    price: 'S/ 10.00',
    category: 'platos',
    image: '/images/combinado-4x4.jpg',
    tagline: 'Tallarines, chanfainita, ceviche y huancaína.',
    description: 'Un combinado de tallarines, chanfainita, ceviche y huancaína, según la carta oficial de Mixtura 2026.',
  }),
  menuItem({
    id: 'anticuchos',
    name: 'Anticuchos',
    price: 'S/ 15.00',
    category: 'platos',
    image: '/images/anticuchos.jpg',
    tag: '⭐ Popular',
    featured: true,
  }),
  menuItem({ id: 'lomo-saltado', name: 'Lomo saltado', price: 'Precio pendiente', category: 'platos', image: '/images/lomo-saltado.jpg' }),
  menuItem({ id: 'papa-rellena', name: 'Papa rellena', price: 'S/ 5.00', category: 'platos', image: '/images/papa-rellena.jpg' }),
  menuItem({
    id: 'causa',
    name: 'Causa',
    price: 'S/ 5.00',
    category: 'platos',
    image: '/images/causa-limena.jpg',
    featured: true,
  }),
  menuItem({ id: 'arepas-tumbarrancho', name: 'Arepas tumbarrancho', price: 'Precio pendiente', category: 'platos', image: '/images/arepas-tumbarrancho.jpg' }),
  // Bebidas
  menuItem({
    id: 'chicha-morada',
    name: 'Chicha morada (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/chicha-morada.jpg',
    tag: '⭐ Popular',
    featured: true,
  }),
  menuItem({
    id: 'emoliente',
    name: 'Emoliente (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/emoliente.jpg',
  }),
  menuItem({
    id: 'camu-camu',
    name: 'Camu camu (refresco)',
    price: 'Vaso S/ 2.00 · Jarra S/ 6.00',
    category: 'bebidas',
    image: '/images/camu-camu.jpg',
  }),
  menuItem({ id: 'chicha-jora', name: 'Chicha de jora', price: 'Precio pendiente', category: 'bebidas', image: '/images/chicha-jora.jpg' }),

  // Postres
  menuItem({
    id: 'picarones',
    name: 'Picarones',
    price: 'Precio pendiente',
    category: 'postres',
    image: '/images/picarones.jpg',
    tag: '🔥 Top',
    featured: true,
  }),
  menuItem({ id: 'torta-chocolate', name: 'Torta de chocolate', price: 'S/ 3.00', category: 'postres', image: '/images/torta-chocolate.jpg' }),
  menuItem({ id: 'queque-naranja', name: 'Queque de naranja', price: 'S/ 2.00', category: 'postres', image: '/images/queque-naranja.jpg' }),
  menuItem({ id: 'queque-vainilla', name: 'Queque de vainilla', price: 'S/ 2.00', category: 'postres', image: '/images/queque-vainilla.jpg' }),
  menuItem({ id: 'gelatina', name: 'Gelatina', price: 'S/ 2.00', category: 'postres', image: '/images/gelatina.jpg' }),
  menuItem({ id: 'chifon', name: 'Chifón', price: 'Precio pendiente', category: 'postres', image: '/images/chifon.jpg' }),
  menuItem({ id: 'pye-manzana', name: 'Pye de manzana', price: 'Precio pendiente', category: 'postres', image: '/images/pye-manzana.jpg' }),
];

export const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'platos', label: 'Platos', icon: '🍽️', color: '#D62828' },
  { id: 'postres', label: 'Postres', icon: '🍮', color: '#E8A020' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤', color: '#2980D6' },
];

export const FEATURED = MENU.filter((item) => item.featured);
