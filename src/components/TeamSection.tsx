
import React from 'react';
import { teamMembers } from '@/data/team';
import MotionDiv from './ui/MotionDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ArrowUpIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const TeamSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 ">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className=" rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-xl transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4"
              />
              <h3 className="text-xl font-semibold ">
                {member.name}
              </h3>
              <p className="text-sm ">
                {member.role}
              </p>
              <p className="mt-2 text-sm">{member.bio}</p>
              <div className="flex gap-4 mt-4">
                {member.socials.x && (
                  <a
                    href={member.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                )}
                {member.socials.linkedin && member.socials.linkedin !== "#" && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
