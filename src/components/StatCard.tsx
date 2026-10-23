function StatCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-orange-400 px-8 py-4 bg-orange-50">
            <p className="text-sm font-medium text-black">{title}</p>
            <div className="mt-2">{children}</div>
        </div>
    );
}

export default StatCard;