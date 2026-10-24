//data expected in this card
type MetricCardProps = {
  title: string;
  value: number;
  description: string;
};

//this fuction renders the metrics card
function MetricCard({
  title,
  value,
  description,
}: MetricCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-sm transition-colors hover:border-slate-500 ">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black">{value.toLocaleString()}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </article>
  );
}

export default MetricCard;
