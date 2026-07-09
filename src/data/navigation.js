// Navigation data for the website
export const navLinks = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Treks',
    path: '/treks',
    dropdown: [
      { label: 'Kedarkantha Trek', path: '/treks/kedarkantha-trek', badge: 'Popular' },
      { label: 'Har Ki Dun Trek', path: '/treks/har-ki-dun-trek' },
      { label: 'Chandernahan Lake Trek', path: '/treks/chandernahan-lake-trek' },
      { label: 'Chaainsheel Bugyal Trek', path: '/treks/chaainsheel-bugyal-trek' },
      { label: 'Buran Ghati Trek', path: '/treks/buran-ghati-trek', badge: 'Hard' },
      { label: 'Ruinsara Tal Trek', path: '/treks/ruinsara-tal-trek' },
      { label: 'Rupin Pass Trek', path: '/treks/rupin-pass-trek' },
      { label: 'Bali Pass Trek', path: '/treks/bali-pass-trek' },
      { label: 'Dayara Bugyal Trek', path: '/treks/dayara-bugyal-trek', badge: 'Easy' },
      { label: 'Nag Tibba Trek', path: '/treks/nag-tibba-trek' },
      { label: 'Chopta Chandrashila Trek', path: '/treks/chopta-chandrashila-trek' },
      { label: 'Phulara Ridge Trek', path: '/treks/phulara-ridge-trek' },
      { label: 'Borasu Pass Trek', path: '/treks/borasu-pass-trek' },
      { label: 'Valley of Flowers Trek', path: '/treks/valley-of-flowers-trek', badge: 'Scenic' },
    ],
  },
  {
    label: 'Gallery',
    path: '/gallery',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'WhatsApp', href: 'https://wa.me/918279888470', icon: 'whatsapp' },
];

export const contactInfo = {
  phone: '+91 82798 88470',
  email: 'hello@summitseek.in',
  address: 'Sankri Village, Uttarakhand, India 249145',
  hours: 'Mon–Sun: 7:00 AM – 10:00 PM',
};
