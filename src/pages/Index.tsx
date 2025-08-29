import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, RotateCcw, Share2, Settings } from 'lucide-react';
import Tractiongotchi from '@/components/Tractiongotchi';
import TrainingForm from '@/components/TrainingForm';
import ProgressChart from '@/components/ProgressChart';
import AvatarSelector, { AvatarType } from '@/components/AvatarSelector';
import ShareModal from '@/components/ShareModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

const Index = () => {
  const [records, setRecords] = useLocalStorage<TrainingRecord[]>('tractiongotchi-records', []);
  const [avatarType, setAvatarType] = useLocalStorage<AvatarType>('tractiongotchi-avatar', 'alien');
  const [showForm, setShowForm] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const addRecord = (record: TrainingRecord) => {
    setRecords(prev => [...prev, record]);
  };

  const resetCreature = () => {
    if (window.confirm('Êtes-vous sûr de vouloir recommencer ? Toutes vos données seront perdues !')) {
      setRecords([]);
    }
  };

  const creatureState = records.length === 0 ? 'dead' : 
    Math.floor((Date.now() - new Date(records[records.length - 1].date).getTime()) / (1000 * 60 * 60 * 24)) >= 5 ? 'dead' : 'normal';

  if (showForm) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <TrainingForm 
          onAddRecord={addRecord}
          onClose={() => setShowForm(false)}
        />
      </div>
    );
  }

  if (showChart) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <ProgressChart 
          records={records}
          onClose={() => setShowChart(false)}
        />
      </div>
    );
  }

  if (showAvatarSelector) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <AvatarSelector 
          currentAvatar={avatarType}
          onSelectAvatar={setAvatarType}
          onClose={() => setShowAvatarSelector(false)}
        />
      </div>
    );
  }

  if (showShareModal) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <ShareModal 
          records={records}
          onClose={() => setShowShareModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Tractiongotchi
        </h1>
        <p className="text-xs text-gray-500">
          par Lucas Lefèvre
        </p>
      </div>


      <main className="flex-1 flex items-center justify-center pt-16">
        <Tractiongotchi 
          records={records}
          className="animate-fade-in"
        />

        {/* Action buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            onClick={() => setShowForm(true)}
            className="glass-button rounded-full w-16 h-16 p-0 shadow-lg"
          >
            <Plus className="w-6 h-6 text-black" />
          </Button>
          
          <Button
            onClick={() => setShowChart(true)}
            className="glass-button rounded-full w-16 h-16 p-0 shadow-lg"
          >
            <TrendingUp className="w-6 h-6 text-black" />
          </Button>

          <Button
            onClick={() => setShowShareModal(true)}
            className="glass-button rounded-full w-16 h-16 p-0 shadow-lg"
            disabled={records.length === 0}
          >
            <Share2 className={`w-6 h-6 ${records.length === 0 ? 'text-gray-400' : 'text-black'}`} />
          </Button>

          {creatureState === 'dead' && (
            <Button
              onClick={resetCreature}
              className="glass-button rounded-full w-16 h-16 p-0 shadow-lg !bg-red-500/20 !border-red-500/30"
            >
              <RotateCcw className="w-6 h-6 text-black" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;