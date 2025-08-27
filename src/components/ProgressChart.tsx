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
    <Card className="w-full max-w-4xl mx-auto retro-border pixel-shadow">
      <CardHeader>
        <CardTitle className="text-center font-mono text-primary">
          📊 PROGRESSION TRACTIONS
        </CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-mono text-muted-foreground">
              Aucun enregistrement pour le moment...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-secondary retro-border p-3">
                <p className="font-mono text-sm text-muted-foreground">RECORD PERSONNEL</p>
                <p className="font-mono text-2xl font-bold text-primary">{maxRecord}</p>
              </div>
              <div className="text-center bg-secondary retro-border p-3">
                <p className="font-mono text-sm text-muted-foreground">TOTAL SÉANCES</p>
                <p className="font-mono text-2xl font-bold text-primary">{totalSessions}</p>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    className="font-mono text-xs"
                  />
                  <YAxis 
                    className="font-mono text-xs"
                  />
                  <Tooltip 
                    labelClassName="font-mono"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '2px solid hsl(var(--border))',
                      borderRadius: '2px',
                      fontFamily: 'monospace'
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
          </>
        )}
        
        <div className="flex justify-center pt-4">
          <Button
            onClick={onClose}
            className="font-mono retro-border pixel-shadow"
            variant="secondary"
          >
            FERMER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}