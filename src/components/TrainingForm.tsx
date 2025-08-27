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
    <Card className="w-full max-w-md mx-auto retro-border pixel-shadow">
      <CardHeader>
        <CardTitle className="text-center font-mono text-primary">
          🏋️ ENREGISTRER TRACTIONS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="maxReps" className="font-mono text-foreground">
              Maximum de répétitions :
            </Label>
            <Input
              id="maxReps"
              type="number"
              value={maxReps}
              onChange={(e) => setMaxReps(e.target.value)}
              placeholder="Ex: 15"
              className="mt-1 font-mono retro-border"
              min="1"
              max="1000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="date" className="font-mono text-foreground">
              Date :
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 font-mono retro-border"
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button
              type="submit"
              className="flex-1 font-mono retro-border pixel-shadow"
              variant="default"
            >
              VALIDER
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 font-mono retro-border pixel-shadow"
              variant="secondary"
            >
              ANNULER
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}