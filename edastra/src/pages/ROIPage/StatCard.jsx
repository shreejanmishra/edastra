import { memo } from "react";

/**
 * Reusable stat card component for displaying metrics
 */
const StatCard = memo(
  ({ icon: Icon, iconColor, iconBgColor, title, value, subtitle }) => {
    return (
      <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 ${iconBgColor} rounded-xl`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h3 className="text-zinc-400 font-medium">{title}</h3>
        </div>
        <p className="text-4xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>}
      </div>
    );
  }
);

export default StatCard;
