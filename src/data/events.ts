
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  type: 'hackathon' | 'workshop' | 'meetup';
  registrationLink?: string;
  isPast?: boolean;
};

export const events: Event[] = [
  {
    id: 'sui-summer-hack-2023',
    title: 'Sui Summer Hackathon 2023',
    description: 'A global hackathon challenging students to build innovative dApps on Sui.',
    date: 'July 10-31, 2023',
    location: 'Global (Virtual)',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?w=800&h=500&fit=crop&q=80',
    type: 'hackathon',
    isPast: true
  },
  {
    id: 'sui-workshop-stanford',
    title: 'Sui Development Workshop',
    description: 'Hands-on workshop teaching the fundamentals of developing on the Sui blockchain.',
    date: 'September 15, 2023',
    location: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?w=800&h=500&fit=crop&q=80',
    type: 'workshop',
    isPast: true
  },
  {
    id: 'blockchain-meetup-mit',
    title: 'Blockchain Innovation Meetup',
    description: 'Networking event connecting students with industry professionals.',
    date: 'October 5, 2023',
    location: 'MIT',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop&q=80',
    type: 'meetup',
    isPast: true
  },
  {
    id: 'winter-hack-2024',
    title: 'Winter Hack 2024',
    description: 'Our largest hackathon yet, with $50k in prizes and mentorship from top Sui developers.',
    date: 'February 15-28, 2024',
    location: 'Global (Virtual)',
    image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&h=500&fit=crop&q=80',
    type: 'hackathon',
    registrationLink: '#'
  },
  {
    id: 'spring-workshop-series',
    title: 'Spring Workshop Series',
    description: 'A series of workshops covering advanced topics in Sui development.',
    date: 'March - April, 2024',
    location: 'Multiple Universities',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&q=80',
    type: 'workshop',
    registrationLink: '#'
  }
];
