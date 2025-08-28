import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, RotateCcw } from 'lucide-react';
import Tractiongotchi from '@/components/Tractiongotchi';
import TrainingForm from '@/components/TrainingForm';
import ProgressChart from '@/components/ProgressChart';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

const Index = () => {
  const [records, setRecords] = useLocalStorage<TrainingRecord[]>('tractiongotchi-records', []);
  const [showForm, setShowForm] = useState(false);
  const [showChart, setShowChart] = useState(false);

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
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <TrainingForm 
          onAddRecord={addRecord}
          onClose={() => setShowForm(false)}
        />
      </div>
    );
  }

  if (showChart) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <ProgressChart 
          records={records}
          onClose={() => setShowChart(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card mx-6 mt-4 rounded-2xl p-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Tractiongotchi
        </h1>
        <p className="text-xs text-muted-foreground opacity-60 mt-1">
          par Lucas Lefèvre
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <Tractiongotchi 
          records={records}
          className="animate-fade-in"
        />

        {/* Action buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            onClick={() => setShowForm(true)}
            className="glass-button rounded-full w-14 h-14 p-0"
          >
            <Plus className="w-6 h-6 text-black" />
          </Button>
          
          <Button
            onClick={() => setShowChart(true)}
            className="glass-button rounded-full w-14 h-14 p-0"
          >
            <TrendingUp className="w-6 h-6 text-black" />
          </Button>

          {creatureState === 'dead' && (
            <Button
              onClick={resetCreature}
              className="glass-button rounded-full w-14 h-14 p-0 !bg-red-500/20 !border-red-500/30"
            >
              <RotateCcw className="w-6 h-6 text-black" />
            </Button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground opacity-60">
        <p>© 2024 Lucas Lefèvre</p>
      </footer>
    </div>
  );
};

export default Index;