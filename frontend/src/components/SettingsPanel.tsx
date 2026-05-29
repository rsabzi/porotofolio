import { api } from '../services/api';
import { Settings, useAppStore } from '../store/appStore';

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4">
      <span><b>{label}</b><p className="text-sm text-slate-400">{description}</p></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

export function SettingsPanel() {
  const settings = useAppStore((state) => state.settings);
  const setSettings = useAppStore((state) => state.setSettings);
  if (!settings) return null;
  const patch = async (payload: Partial<Settings>) => {
    const response = await api<{ settings: Settings }>('/settings', { method: 'POST', body: JSON.stringify(payload) });
    setSettings(response.settings);
  };
  const patchSafety = (payload: Partial<Settings['safety']>) => patch({ safety: { ...settings.safety, ...payload } });
  const patchCategory = (category: string, raw: string) => patch({ category_map: { ...settings.category_map, [category]: raw.split(',').map((item) => item.trim()).filter(Boolean) } });
  return (
    <section className="space-y-5">
      <div className="glass rounded-3xl p-5">
        <h2 className="mb-4 text-lg font-bold">Professional Settings</h2>
        <div className="grid gap-3">
          <Toggle label="Auto organize" description="Automatically move safe, approved files when they appear." checked={settings.auto_organize} onChange={(value) => patch({ auto_organize: value })} />
          <Toggle label="Dry run mode" description="Preview and log moves without touching files." checked={settings.safety.dry_run} onChange={(value) => patchSafety({ dry_run: value })} />
          <Toggle label="Recursive watch" description="Watch subfolders too. Keep off for Downloads-style safety." checked={settings.safety.recursive_watch} onChange={(value) => patchSafety({ recursive_watch: value })} />
          <Toggle label="Protect code projects" description="Never organize inside folders containing .git, package.json, pyproject.toml, Cargo.toml, go.mod, etc." checked={settings.safety.skip_code_projects} onChange={(value) => patchSafety({ skip_code_projects: value })} />
          <Toggle label="Protect code files" description="Do not move .py, .js, .ts, .json, lockfiles and other programming files unless explicitly enabled." checked={!settings.safety.allow_code_file_organization} onChange={(value) => patchSafety({ allow_code_file_organization: !value })} />
          <Toggle label="Protect installers/apps" description="Do not move .exe, .msi, .dmg, .pkg, .deb, .rpm and app packages by default." checked={!settings.safety.allow_installer_organization} onChange={(value) => patchSafety({ allow_installer_organization: !value })} />
          <Toggle label="Require duplicate delete confirmation" description="Duplicate cleanup must pass confirmed=true before deleting files." checked={settings.safety.require_delete_confirmation} onChange={(value) => patchSafety({ require_delete_confirmation: value })} />
        </div>
      </div>
      <div className="glass rounded-3xl p-5">
        <h3 className="mb-4 font-bold">Timing and destinations</h3>
        <div className="grid grid-cols-3 gap-3">
          <label className="rounded-2xl bg-white/5 p-4">Large file MB<input className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2" type="number" value={settings.max_file_size_large_mb} onChange={(event) => patch({ max_file_size_large_mb: Number(event.target.value) })} /></label>
          <label className="rounded-2xl bg-white/5 p-4">Min file age seconds<input className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2" type="number" value={settings.safety.min_file_age_seconds} onChange={(event) => patchSafety({ min_file_age_seconds: Number(event.target.value) })} /></label>
          <label className="rounded-2xl bg-white/5 p-4">Duplicate scan minutes<input className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2" type="number" value={settings.duplicate_scan_frequency_minutes} onChange={(event) => patch({ duplicate_scan_frequency_minutes: Number(event.target.value) })} /></label>
        </div>
        <label className="mt-3 block rounded-2xl bg-white/5 p-4">Optional organize root<input className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2" value={settings.organize_root ?? ''} onChange={(event) => patch({ organize_root: event.target.value || null })} placeholder="Leave empty to organize inside source folder" /></label>
      </div>
      <div className="glass rounded-3xl p-5">
        <h3 className="mb-4 font-bold">Category extension map</h3>
        <div className="grid gap-3">
          {Object.entries(settings.category_map).map(([category, extensions]) => (
            <label key={category} className="rounded-2xl bg-white/5 p-4"><b>{category}</b><input className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm" value={extensions.join(', ')} onChange={(event) => patchCategory(category, event.target.value)} /></label>
          ))}
        </div>
      </div>
      <div className="glass rounded-3xl p-5">
        <h3 className="mb-4 font-bold">Protection lists</h3>
        <label className="block rounded-2xl bg-white/5 p-4">Protected path segments<textarea className="mt-2 min-h-24 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm" value={settings.safety.protected_path_segments.join('\n')} onChange={(event) => patchSafety({ protected_path_segments: event.target.value.split('\n').filter(Boolean) })} /></label>
        <label className="mt-3 block rounded-2xl bg-white/5 p-4">Project marker files/folders<textarea className="mt-2 min-h-24 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm" value={settings.safety.protected_folder_markers.join('\n')} onChange={(event) => patchSafety({ protected_folder_markers: event.target.value.split('\n').filter(Boolean) })} /></label>
        <label className="mt-3 block rounded-2xl bg-white/5 p-4">Ignored glob patterns<textarea className="mt-2 min-h-20 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm" value={settings.safety.ignored_globs.join('\n')} onChange={(event) => patchSafety({ ignored_globs: event.target.value.split('\n').filter(Boolean) })} /></label>
      </div>
    </section>
  );
}
