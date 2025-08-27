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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card mx-6 mt-6 rounded-3xl p-8 text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          Tractiongotchi
        </h1>
        <p className="text-muted-foreground">
          Développé par <span className="font-semibold text-primary">Lucas Lefèvre</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Gardez votre alien virtuel en vie grâce aux tractions ! 👽
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-10">
        <Tractiongotchi 
          records={records}
          className="animate-fade-in"
        />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <Button
            onClick={() => setShowForm(true)}
            variant="default"
            className="flex-1 text-lg py-4 px-8"
          >
            🏋️ Enregistrer tractions
          </Button>
          
          <Button
            onClick={() => setShowChart(true)}
            variant="outline"
            className="flex-1 text-lg py-4 px-8"
          >
            📊 Voir progression
          </Button>
        </div>

        {/* Reset button for dead state */}
        {creatureState === 'dead' && (
          <Button
            onClick={resetCreature}
            variant="destructive"
            className="text-base px-6 py-3"
          >
            🔄 Recommencer
          </Button>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>© 2024 Lucas Lefèvre - Tractiongotchi</p>
        <p className="text-xs mt-1">Votre compagnon virtuel pour rester motivé ! 💪</p>
      </footer>
    </div>
  );
};

export default Index;