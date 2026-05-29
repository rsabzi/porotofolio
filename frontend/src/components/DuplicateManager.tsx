import { api } from '../services/api';
import { DuplicateGroup, useAppStore } from '../store/appStore';

export function DuplicateManager() {
  const duplicates = useAppStore((state) => state.duplicates);
  const setDuplicates = useAppStore((state) => state.setDuplicates);
  const scan = async () => setDuplicates(await api<DuplicateGroup[]>('/duplicates'));
  const resolve = async (group: DuplicateGroup, strategy: string) => {
    await api('/duplicates/resolve', { method: 'POST', body: JSON.stringify({ files: group.files.map((file) => file.path), strategy }) });
    await scan();
  };
  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Duplicate Manager</h2><button onClick={scan} className="rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950">Scan</button></div>
      <div className="space-y-4">
        {duplicates.length === 0 && <p className="text-sm text-slate-500">No duplicate groups loaded.</p>}
        {duplicates.map((group) => <div key={group.hash} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex justify-between"><b>{group.count} exact duplicates</b><span className="text-xs text-slate-500">{group.hash.slice(0, 12)}</span></div>
          {group.files.map((file) => <div key={file.path} className="truncate text-sm text-slate-300">{file.name} · {(file.size / 1024).toFixed(1)} KB · {file.path}</div>)}
          <div className="mt-3 flex gap-2"><button onClick={() => resolve(group, 'keep_newest')} className="rounded-xl bg-white/10 px-3 py-2 text-sm">Keep newest</button><button onClick={() => resolve(group, 'keep_largest')} className="rounded-xl bg-white/10 px-3 py-2 text-sm">Keep largest</button></div>
        </div>)}
      </div>
    </section>
  );
}
