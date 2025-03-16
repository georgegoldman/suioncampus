
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
    name: 'Alex Rivera',
    role: 'Founder & Director',
    bio: 'Blockchain enthusiast with 5+ years experience in educational initiatives across top universities.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    socials: {
      x: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Sophia Chen',
    role: 'Technical Lead',
    bio: 'Computer Science PhD with expertise in blockchain infrastructure and smart contract development.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
    socials: {
      x: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Marcus Johnson',
    role: 'Community Manager',
    bio: 'Community builder passionate about bringing blockchain technology to underrepresented groups.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80',
    socials: {
      x: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Leila Patel',
    role: 'Education Coordinator',
    bio: 'Former lecturer with expertise in creating accessible blockchain curriculum for all skill levels.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
    socials: {
      x: '#',
      linkedin: '#'
    }
  }
];
