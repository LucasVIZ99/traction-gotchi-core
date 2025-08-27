import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

interface ProgressChartProps {
  records: TrainingRecord[];
  onClose: () => void;
}

export default function ProgressChart({ records, onClose }: ProgressChartProps) {
  const chartData = records.map(record => ({
    date: new Date(record.date).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit' 
    }),
    fullDate: record.date,
    maxReps: record.maxReps
  })).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

  const maxRecord = records.length > 0 ? Math.max(...records.map(r => r.maxReps)) : 0;
  const totalSessions = records.length;

  return (
    <div className="w-full max-w-5xl mx-auto glass-card rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          📊 Votre progression
        </h2>
        <p className="text-muted-foreground">
          Suivez l'évolution de vos performances
        </p>
      </div>
      {records.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Aucun enregistrement pour le moment...
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Commencez par enregistrer vos premières tractions !
          </p>
        </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center glass-card rounded-2xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Record personnel</p>
              <p className="text-4xl font-bold text-primary">{maxRecord}</p>
              <p className="text-xs text-muted-foreground mt-1">répétitions</p>
            </div>
            <div className="text-center glass-card rounded-2xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Total séances</p>
              <p className="text-4xl font-bold text-primary">{totalSessions}</p>
              <p className="text-xs text-muted-foreground mt-1">entraînements</p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                  />
                  <YAxis 
                    className="text-xs"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px hsl(220 30% 0% / 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="maxReps" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-center pt-8">
        <Button
          onClick={onClose}
          variant="outline"
          className="px-8 py-3"
        >
          Fermer
        </Button>
      </div>
    </div>
  );
}