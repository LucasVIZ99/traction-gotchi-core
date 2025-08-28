import { useState, useEffect } from 'react';
import normalImage from '@/assets/tractiongotchi-normal.png';
import strongImage from '@/assets/tractiongotchi-strong.png';
import tiredImage from '@/assets/tractiongotchi-tired.png';
import deadImage from '@/assets/tractiongotchi-dead.png';

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

const getImageForState = (state: CreatureState) => {
  switch (state) {
    case 'normal': return normalImage;
    case 'strong': return strongImage;
    case 'tired': return tiredImage;
    case 'dead': return deadImage;
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
  className?: string;
}

export default function Tractiongotchi({ records, className = "" }: TraactiongotchiProps) {
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
          src={getImageForState(state)}
          alt={`Tractiongotchi ${state}`}
          className={`w-96 h-96 md:w-[32rem] md:h-[32rem] pixel-perfect ${state === 'normal' ? 'pixel-bounce' : ''} ${state === 'strong' ? 'pixel-glow' : ''}`}
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