import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface TrainingRecord {
  date: string;
  maxReps: number;
}

interface ShareModalProps {
  records: TrainingRecord[];
  onClose: () => void;
}

export default function ShareModal({ records, onClose }: ShareModalProps) {
  const maxRecord = records.length > 0 ? Math.max(...records.map(r => r.maxReps)) : 0;
  const totalSessions = records.length;
  
  const shareText = `🏋️ Mon record Tractiongotchi !
💪 Record personnel: ${maxRecord} répétitions
📅 ${totalSessions} séances d'entraînement
🎯 Continue de grandir ! #Tractiongotchi`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      toast.success('Copié dans le presse-papiers !');
    }).catch(() => {
      toast.error('Impossible de copier');
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mon record Tractiongotchi',
        text: shareText,
      }).catch(() => {
        handleCopyToClipboard();
      });
    } else {
      handleCopyToClipboard();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-card rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Partager votre record
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <Card className="p-6 mb-6 text-center">
        <div className="text-4xl font-bold text-primary mb-2">{maxRecord}</div>
        <p className="text-sm text-muted-foreground mb-4">répétitions record</p>
        <div className="text-lg font-medium">{totalSessions} séances</div>
      </Card>

      <div className="space-y-3">
        <Button
          onClick={handleShare}
          className="w-full"
          variant="default"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Partager
        </Button>
        
        <Button
          onClick={handleCopyToClipboard}
          className="w-full"
          variant="outline"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copier le texte
        </Button>
      </div>
    </div>
  );
}