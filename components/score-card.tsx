export const ScoreCard = ({ name, color, value, icon }: any) => {
  return (
    <div className="flex flex-col justify-between border-border border p-4 rounded bg-card">
      <div className="flex gap-2 items-center">
        <div
          className={`p-1 border-2 border-border rounded-sm text-primary text-xs`}>
          {icon}
        </div>
        <p className="leading-tight text-slate-500 text-base">{name}</p>
      </div>
      <p className="text-3xl font-medium mt-6">{value}</p>
    </div>
  );
};
