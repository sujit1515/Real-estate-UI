import { LucideIcon } from "lucide-react";

type MetaType = "positive" | "negative" | "neutral" | "warning";

interface StatCardProps {
  label: string;
  value: string | number;
  meta?: string;
  metaType?: MetaType;
  icon?: LucideIcon;
}

const metaColors: Record<MetaType, string> = {
  positive: "text-emerald-400",
  negative: "text-red-400",
  neutral: "text-gray-500",
  warning: "text-amber-400 font-semibold",
};

export default function StatCard({ label, value, meta, metaType = "neutral", icon: Icon }: StatCardProps) {
  return (
    <div className="bg-[#16213e] rounded-2xl border border-[#1e2a47] p-5 flex items-start justify-between shadow-sm hover:border-[#2a3a5a] transition-colors">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {meta && <p className={`text-xs mt-1.5 ${metaColors[metaType]}`}>{meta}</p>}
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-[#1e2a47] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      )}
    </div>
  );
}