
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    x?: string;
    linkedin?: string;
    github?: string;
  };
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Ogoyi Thompson',
    role: 'Founder & Team Lead',
    bio: 'SUI Ambassador and Founder Sui On Campus .',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/sign/suioncampus/GiIt06dXYAAI-3U.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdWlvbmNhbXB1cy9HaUl0MDZkWFlBQUktM1UuanBlZyIsImlhdCI6MTc0MjE2NzczOSwiZXhwIjozMzE4OTY3NzM5fQ.xIDIhEFEASKKgqG9m9Vs2oQ6Zcttyn6xUWhMXERt6gg',
    socials: {
      x: 'https://x.com/thompsonogoyi',
      linkedin: '#',
      
    }
  },
  {
    name: 'Lois Choji',
    role: 'Head of Data Collection',
    bio: 'Sui Ambassador.',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//choji.jpeg',
    socials: {
      x: 'https://x.com/Lois_choji',
      linkedin: '#',
    }
  },
  {
    name: 'Mr Anayo',
    role: 'Program Manager',
    bio: 'Program Manager at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//anayo.jpeg',
    socials: {
      x: 'https://x.com/AnayoPhd',
      linkedin: '#'
    }
  },
  {
    name: 'Mr Breakforth',
    role: 'Logistic Lead',
    bio: 'Logistic Lead at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//breakforth.jpeg',
    socials: {
      x: 'https://x.com/breakforth1998',
      linkedin: '#'
    }
  }
];
