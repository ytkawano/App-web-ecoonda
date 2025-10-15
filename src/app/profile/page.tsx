'use client';

import { User, Mail, Phone, MapPin, Award, Shield, Recycle, Sprout } from 'lucide-react';
import { impactBadges } from '@/lib/data';
import React from 'react';

const iconComponents: { [key: string]: React.ElementType } = {
    Sprout,
    Shield,
    Recycle,
    Award,
  };

const UserInfoLine = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <div className="flex items-center text-muted-foreground">
    <Icon className="h-5 w-5 mr-3 text-accent" />
    <span>{text}</span>
  </div>
);

export default function ProfilePage() {

    const earnedBadges = impactBadges.slice(0, 4);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="bg-card p-8 rounded-xl shadow-lg">
            
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                <img 
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                    alt="Foto do Perfil" 
                    className="w-32 h-32 rounded-full border-4 border-primary mb-6 sm:mb-0 sm:mr-8"
                />
                <div className="flex-grow">
                    <h1 className="font-headline text-4xl font-bold text-primary">Ana Costa</h1>
                    <p className="text-lg text-muted-foreground mt-1">Membro desde 20 de Abril de 2023</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <UserInfoLine icon={Mail} text="ana.costa@example.com" />
                        <UserInfoLine icon={Phone} text="+55 (11) 98765-4321" />
                        <UserInfoLine icon={MapPin} text="Rua das Flores, 123, São Paulo, SP" />
                    </div>
                </div>
            </div>

            <hr className="my-8 border-border" />

            {/* Badges Section */}
            <div>
                <h2 className="font-headline text-2xl font-bold text-primary mb-6">Meus Emblemas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
                {earnedBadges.map((badge) => {
                    const Icon = iconComponents[badge.icon];
                    return (
                        <div key={badge.name} className="flex flex-col items-center p-4 bg-background rounded-lg hover:shadow-md transition-shadow">
                            <div className="p-3 bg-accent rounded-full mb-2">
                                {Icon && <Icon className="h-10 w-10 text-accent-foreground" />}
                            </div>
                            <p className="font-semibold text-sm">{badge.name}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">{badge.description}</p>
                        </div>
                    );
                })}
                 <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg text-muted-foreground">
                    <Award className="h-10 w-10 mb-2" />
                    <p className="font-semibold text-sm">Veja todos</p>
                 </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
