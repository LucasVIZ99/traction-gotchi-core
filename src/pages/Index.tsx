import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="text-center py-6 bg-card retro-border pixel-shadow mx-4 mt-4">
        <h1 className="text-3xl font-bold font-mono text-primary mb-2">
          TRACTIONGOTCHI
        </h1>
        <p className="text-sm font-mono text-muted-foreground">
          par Lucas Lefèvre
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        <Tractiongotchi 
          records={records}
          className="animate-fade-in"
        />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={() => setShowForm(true)}
            variant="default"
            className="flex-1 font-mono text-base py-3"
          >
            🏋️ ENCODER TRACTIONS
          </Button>
          
          <Button
            onClick={() => setShowChart(true)}
            variant="secondary"
            className="flex-1 font-mono text-base py-3"
          >
            📊 VOIR PROGRESSION
          </Button>
        </div>

        {/* Reset button for dead state */}
        {creatureState === 'dead' && (
          <Button
            onClick={resetCreature}
            variant="destructive"
            className="font-mono text-sm"
          >
            🔄 RECOMMENCER
          </Button>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs font-mono text-muted-foreground">
        <p>Gardez votre Tractiongotchi en vie avec des tractions régulières ! 💪</p>
      </footer>
    </div>
  );
};

export default Index;