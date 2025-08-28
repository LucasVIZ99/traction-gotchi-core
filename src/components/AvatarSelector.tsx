import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

// Import avatar images
import alienNormal from '@/assets/alien-normal.png';
import robotNormal from '@/assets/robot-normal.png';
import capybaraNormal from '@/assets/capybara-normal.png';

export type AvatarType = 'alien' | 'robot' | 'capybara';

interface AvatarSelectorProps {
  currentAvatar: AvatarType;
  onSelectAvatar: (avatar: AvatarType) => void;
  onClose: () => void;
}

const avatarOptions = [
  { type: 'alien' as AvatarType, name: 'Alien', image: alienNormal },
  { type: 'robot' as AvatarType, name: 'Robot', image: robotNormal },
  { type: 'capybara' as AvatarType, name: 'Capybara', image: capybaraNormal },
];

export default function AvatarSelector({ currentAvatar, onSelectAvatar, onClose }: AvatarSelectorProps) {
  return (
    <div className="w-full max-w-lg mx-auto glass-card rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Choisir un avatar
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {avatarOptions.map((avatar) => (
          <Card
            key={avatar.type}
            className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
              currentAvatar === avatar.type 
                ? 'ring-2 ring-primary bg-primary/10' 
                : 'hover:bg-secondary/50'
            }`}
            onClick={() => onSelectAvatar(avatar.type)}
          >
            <div className="text-center">
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-16 h-16 mx-auto mb-2 pixel-perfect"
              />
              <p className="text-sm font-medium">{avatar.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}