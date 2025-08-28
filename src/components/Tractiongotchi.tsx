import { useState, useEffect } from 'react';
import { AvatarType } from './AvatarSelector';

// Alien images
import alienNormal from '@/assets/alien-normal.png';
import alienStrong from '@/assets/alien-strong.png';
import alienTired from '@/assets/alien-tired.png';

// Robot images
import robotNormal from '@/assets/robot-normal.png';
import robotStrong from '@/assets/robot-strong.png';
import robotTired from '@/assets/robot-tired.png';

// Capybara images
import capybaraNormal from '@/assets/capybara-normal.png';
import capybaraStrong from '@/assets/capybara-strong.png';
import capybaraTired from '@/assets/capybara-tired.png';

type CreatureState = 'normal' | 'strong' | 'tired' | 'dead';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

const getCreatureState = (records: TrainingRecord[]): CreatureState => {
  if (records.length === 0) return 'dead';
  
  const now = new Date();
  const lastRecord = records[records.length - 1];
  const lastTrainingDate = new Date(lastRecord.date);
  const daysSinceLastTraining = Math.floor((now.getTime() - lastTrainingDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLastTraining >= 5) return 'dead';
  if (daysSinceLastTraining >= 2) return 'tired';
  
  // Check if user beat their record in the last 2 days
  const recordBeforeLast = records[records.length - 2];
  if (recordBeforeLast && lastRecord.maxReps > recordBeforeLast.maxReps && daysSinceLastTraining <= 2) {
    return 'strong';
  }
  
  return 'normal';
};

const getImageForState = (state: CreatureState, avatarType: AvatarType) => {
  if (state === 'dead') {
    // For dead state, use the tired version but with lower opacity
    return getImageForState('tired', avatarType);
  }

  switch (avatarType) {
    case 'alien':
      switch (state) {
        case 'normal': return alienNormal;
        case 'strong': return alienStrong;
        case 'tired': return alienTired;
        default: return alienNormal;
      }
    case 'robot':
      switch (state) {
        case 'normal': return robotNormal;
        case 'strong': return robotStrong;
        case 'tired': return robotTired;
        default: return robotNormal;
      }
    case 'capybara':
      switch (state) {
        case 'normal': return capybaraNormal;
        case 'strong': return capybaraStrong;
        case 'tired': return capybaraTired;
        default: return capybaraNormal;
      }
    default:
      return alienNormal;
  }
};

const getStateMessage = (state: CreatureState) => {
  switch (state) {
    case 'normal': return "En forme";
    case 'strong': return "💪 Record battu !";
    case 'tired': return "😴 Fatigué";
    case 'dead': return "💀 RIP";
  }
};

interface TraactiongotchiProps {
  records: TrainingRecord[];
  avatarType: AvatarType;
  className?: string;
}

export default function Tractiongotchi({ records, avatarType, className = "" }: TraactiongotchiProps) {
  const [state, setState] = useState<CreatureState>('normal');
  
  useEffect(() => {
    setState(getCreatureState(records));
  }, [records]);

  const daysSinceLastTraining = records.length > 0 
    ? Math.floor((Date.now() - new Date(records[records.length - 1].date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <div className="flex items-center justify-center">
        <img 
          src={getImageForState(state, avatarType)}
          alt={`${avatarType} ${state}`}
          className={`w-96 h-96 md:w-[32rem] md:h-[32rem] pixel-perfect ${state === 'normal' ? 'pixel-bounce' : ''} ${state === 'strong' ? 'pixel-glow' : ''} ${state === 'dead' ? 'opacity-50 grayscale' : ''}`}
        />
      </div>
      
      <div className="text-center">
        <div className="glass-card rounded-full px-8 py-3">
          <p className="text-lg font-medium text-foreground">
            {getStateMessage(state)}
          </p>
        </div>
      </div>
    </div>
  );
}