
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'event' | 'hackathon' | 'workshop';
  year: number;
  title: string;
  description: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//hack.jpeg',
    alt: ' 2024 Hackerfest winners',
    category: 'hackathon',
    year: 2024,
    title: 'Sui On Campus Lagos Hackerfest',
    description: 'Students building on  SUI blockchain projects during our summer hackathon event.'
  },
  {
    id: '2',
    src: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//workshop.jpeg',
    alt: 'Move Workshop ',
    category: 'workshop',
    year: 2025,
    title: 'Sui Blockchain Fundamentals Workshop',
    description: 'Introducing students to the core principles of Move technology.'
  },
  {
    id: '3',
    src: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//confrence.jpeg',
    alt: 'Conference audience',
    category: 'event',
    year: 2023,
    title: 'Sui On Campus Interactive session with builders',
    description: 'The official launch event of our Sui On Campus initiative.'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    alt: 'Student team collaborating',
    category: 'hackathon',
    year: 2022,
    title: 'Winter Code Sprint',
    description: 'Teams competing to build the most innovative dApps during our winter hackathon.'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    alt: 'Team meeting',
    category: 'event',
    year: 2022,
    title: 'Campus Ambassador Gathering',
    description: 'Our campus ambassadors meeting to discuss outreach strategies.'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&auto=format&fit=crop&q=80',
    alt: 'Workshop session',
    category: 'workshop',
    year: 2022,
    title: 'Move Language Workshop',
    description: 'Teaching students how to program with the Move language.'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=80',
    alt: 'Networking event',
    category: 'event',
    year: 2023,
    title: 'Blockchain Industry Mixer',
    description: 'Students connecting with industry professionals at our networking event.'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    alt: 'Coding team',
    category: 'hackathon',
    year: 2023,
    title: 'BuildOnSui Hackathon',
    description: 'Participants building innovative applications on the Sui blockchain.'
  },
];
