'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamSectionProps {
  className?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  specialties: string[];
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Founder & Head Baker',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19b51487b-1763296224047.png",
    alt: 'Professional woman with blonde hair in chef whites smiling warmly in bright bakery kitchen',
    bio: 'With 15 years of baking experience and a degree from Culinary Institute of America, Sarah brings her grandmother\'s recipes to life with modern techniques.',
    specialties: ['Custom Cakes', 'French Pastries', 'Sourdough Breads']
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Pastry Chef',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf46143f-1763295306481.png",
    alt: 'Asian man with short black hair in white chef coat holding piping bag in professional kitchen',
    bio: 'Trained in Paris and Tokyo, Marcus specializes in delicate pastries and innovative flavor combinations that surprise and delight.',
    specialties: ['Macarons', 'Croissants', 'Tarts']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Cake Designer',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_138c375ea-1763300060914.png",
    alt: 'Hispanic woman with long dark hair in apron carefully decorating wedding cake with fondant flowers',
    bio: 'Emily\'s artistic background shines through her stunning cake designs. She transforms celebrations into edible art pieces.',
    specialties: ['Wedding Cakes', 'Fondant Art', 'Sugar Flowers']
  },
  {
    id: '4',
    name: 'James Thompson',
    role: 'Bread Master',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2603bed-1765780456409.png",
    alt: 'Bearded man with brown hair in casual chef attire kneading dough on wooden table in rustic bakery',
    bio: 'James is passionate about traditional bread-making techniques. His sourdough starters are treated like family members.',
    specialties: ['Sourdough', 'Artisan Breads', 'Bagels']
  },
  {
    id: '5',
    name: 'Aisha Patel',
    role: 'Dessert Specialist',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_100c31a44-1767192565231.png",
    alt: 'South Asian woman with black hair in chef whites plating elegant dessert with precision in modern kitchen',
    bio: 'Aisha creates show-stopping desserts that blend traditional Indian flavors with classic French techniques.',
    specialties: ['Fusion Desserts', 'Chocolate Work', 'Plated Desserts']
  },
  {
    id: '6',
    name: 'David Kim',
    role: 'Operations Manager',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99b3bec-1763294753860.png",
    alt: 'Asian man with glasses in business casual attire smiling confidently in bright office space',
    bio: 'David ensures everything runs smoothly behind the scenes, from ingredient sourcing to customer satisfaction.',
    specialties: ['Quality Control', 'Customer Service', 'Supply Chain']
  }];


  const toggleMemberBio = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <section className={`bg-background ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-4">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our talented team of bakers, pastry chefs, and artisans work together to create magic every day
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) =>
            <div
              key={member.id}
              className="bg-card rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-smooth">

                <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="caption text-primary font-semibold mb-4">
                    {member.role}
                  </p>

                  {expandedMember === member.id &&
                <div className="space-y-4 mb-4 animate-slide-in-from-top">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </p>
                      <div>
                        <p className="caption text-foreground font-semibold mb-2">
                          Specialties:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, index) =>
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">

                              {specialty}
                            </span>
                      )}
                        </div>
                      </div>
                    </div>
                }

                  <button
                  onClick={() => toggleMemberBio(member.id)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">

                    <span>{expandedMember === member.id ? 'Show Less' : 'Learn More'}</span>
                    <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`transition-smooth ${
                    expandedMember === member.id ? 'rotate-180' : ''}`
                    } />

                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TeamSection;