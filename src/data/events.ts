
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
  isPinned?: boolean;
};

export const events: Event[] = [
  {
    id: 'sui-summer-hack-2023',
    title: 'Road To Overflow',
    description: 'A global hackathon challenging students to build innovative dApps on Sui.',
    date: 'March 16-22, 2023',
    location: 'Abuja',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//overflowabj.jpeg',
    type: 'hackathon',
    isPast: true
  },
  {
    id: 'sui-workshop-stanford',
    title: 'Sui Development Workshop',
    description: 'Hands-on workshop teaching the fundamentals of developing on the Sui blockchain.',
    date: 'September 15, 2023',
    location: 'Stanford University',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/ev/ev3.jpeg',
    type: 'workshop',
    isPast: true
  },
  {
    id: 'blockchain-meetup-mit',
    title: 'Blockchain Innovation Meetup',
    description: 'Networking event connecting students with industry professionals.',
    date: 'October 5, 2023',
    location: 'MIT',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/ev/ev1.jpeg',
    type: 'meetup',
    isPast: true
  },
  {
    id: 'winter-hack-2024',
    title: 'Winter Hack 2024',
    description: 'Our largest hackathon yet, with $50k in prizes and mentorship from top Sui developers.',
    date: 'February 15-28, 2024',
    location: 'Global (Virtual)',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/ev/ev2.jpeg',
    type: 'hackathon',
    registrationLink: '#',
    isPinned: true
  },
  {
    id: 'spring-workshop-series',
    title: 'Spring Workshop Series',
    description: 'A series of workshops covering advanced topics in Sui development.',
    date: 'March - April, 2024',
    location: 'Multiple Universities',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/ev/wk1.jpeg',
    type: 'workshop',
    registrationLink: '#'
  }
];

// Function to update pinned status - ensures only one event is pinned at a time
export const updatePinnedStatus = (eventId: string): Event[] => {
  return events.map(event => ({
    ...event,
    isPinned: event.id === eventId
  }));
};
