import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

interface TrainingFormProps {
  onAddRecord: (record: TrainingRecord) => void;
  onClose: () => void;
}

export default function TrainingForm({ onAddRecord, onClose }: TrainingFormProps) {
  const [maxReps, setMaxReps] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (maxReps && date) {
      onAddRecord({
        date,
        maxReps: parseInt(maxReps)
      });
      setMaxReps('');
      onClose();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-card rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          🏋️ Enregistrer vos tractions
        </h2>
        <p className="text-muted-foreground text-sm">
          Nourrissez votre Tractiongotchi !
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="maxReps" className="text-foreground font-medium">
            Maximum de répétitions
          </Label>
            <Input
              id="maxReps"
              type="number"
              value={maxReps}
              onChange={(e) => setMaxReps(e.target.value)}
              placeholder="Ex: 15"
            className="mt-2 glass-card border-0 rounded-xl"
              min="1"
              max="1000"
              required
            />
          </div>
          
        <div>
          <Label htmlFor="date" className="text-foreground font-medium">
            Date de l'entraînement
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            className="mt-2 glass-card border-0 rounded-xl"
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        
        <div className="flex space-x-3 pt-6">
          <Button
            type="submit"
            className="flex-1 text-base py-3"
            variant="default"
          >
            Valider
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 text-base py-3"
            variant="outline"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}