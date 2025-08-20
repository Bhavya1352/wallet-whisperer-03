import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  amount: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  variant?: 'success' | 'warning' | 'primary';
}

const StatsCard = ({ title, amount, change, changeType, icon: Icon, variant = 'primary' }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`stat-card ${variant} group`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{amount}</p>
          <p className={`text-sm ${getChangeColor()}`}>{change}</p>
        </div>
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;