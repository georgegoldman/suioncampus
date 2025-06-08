import { ArrowUpIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
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
    bio: 'Founder of Sui On Campus .',
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
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/choji.jpg',
    socials: {
      x: 'https://x.com/Lois_choji',
      linkedin: 'https://www.linkedin.com/in/lois-choji-4a24271a4',
    }
  },
  {
    name: 'Anayo Emmanuel',
    role: 'Program Manager',
    bio: 'Program Manager at Sui On Campus',
    image: 'https://pbs.twimg.com/profile_images/1915765711630200832/x1OnX5_3_400x400.jpg',
    socials: {
      x: 'https://x.com/AnayoPhd',
      linkedin: 'https://www.linkedin.com/in/emmanuel-anayo-8107a2349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    }
  },
  {
    name: 'Nunubee',
    role: 'Head of Media',
    bio: 'Media lead at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/bawo.jpg',
    socials: {
      x: 'https://x.com/_nunubee',
      linkedin: 'https://www.linkedin.com/in/bawo-nunu-50442a234/'
    }
  },
  {
    name: 'Tyopev Mykel',
    role: 'Legal Adviser ',
    bio: 'Sui on Campus Student Club Coordinator ',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/mykel.jpg',
    socials: {
      x: 'https://x.com/mykeltyopev',
      linkedin: 'https://www.linkedin.com/in/michael-tyopev-02a2a2191/'
    }
  },
  {
    name: 'John George-Goldman Onyedikachi',
    role: 'Developer Relations',
    bio: 'Developer Relations Lead',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/gold.jpg',
    socials: {
      x: 'http://X.com/0xgeorgegoldman',
      linkedin: 'http://linkedin.com/in/georgegoldmanjohn'
    }
  },
  {
    name: 'Ngbede',
    role: 'Community Manager ',
    bio: 'Community Manager at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/ngbede.jpg',
    socials: {
      x: 'http://X.com/Iam_Ngbede',
      linkedin: 'https://www.linkedin.com/in/ngbede-odeh-938983170/'
    }
  },
  {
    name: 'Michael Drey',
    role: 'Brand',
    bio: 'Brand Lead at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/design%20.jpg',
    socials: {
      x: 'http://X.com/mdgraphics04',
      linkedin: 'https://www.linkedin.com/in/md-graphics-b92b77228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    }
  },
  {
    name: 'Isaac Breakforth',
    role: 'Head Developer Marketer & Event Coordination',
    bio: 'Logistic Lead at Sui On Campus',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//breakforth.jpeg',
    socials: {
      x: 'https://x.com/breakforth1998',
      linkedin: '#'
    }
  }
];
