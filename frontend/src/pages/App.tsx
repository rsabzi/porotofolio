import { useEffect } from 'react';
import { ActivityFeed } from '../components/ActivityFeed';
import { DuplicateManager } from '../components/DuplicateManager';
import { FolderPanel } from '../components/FolderPanel';
import { LogsPage } from '../components/LogsPage';
import { RulesManager } from '../components/RulesManager';
import { SettingsPanel } from '../components/SettingsPanel';
import { Shell } from '../components/Shell';
import { StatCard } from '../components/StatCard';
import { useLiveEvents } from '../hooks/useLiveEvents';
import { api } from '../services/api';
import { Settings, useAppStore } from '../store/appStore';

function Overview() {
  const events = useAppStore((state) => state.events);
  const settings = useAppStore((state) => state.settings);
  const duplicates = useAppStore((state) => state.duplicates);
  return (
    <div className="space-y-6">
      <div><h1 className="neon text-4xl font-black">Autonomous file hygiene, safely.</h1><p className="mt-2 text-slate-400">Monitor, classify, de-duplicate, rollback, and automate from one polished desktop dashboard.</p></div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Live Events" value={events.length} accent="text-cyan-300" />
        <StatCard label="Watched Folders" value={settings?.monitored_folders.length ?? 0} accent="text-fuchsia-300" />
        <StatCard label="Duplicate Groups" value={duplicates.length} accent="text-amber-300" />
        <StatCard label="Auto Organize" value={settings?.auto_organize ? 'ON' : 'OFF'} accent="text-emerald-300" />
      </div>
      <div className="grid grid-cols-[1.2fr_.8fr] gap-6"><ActivityFeed /><FolderPanel /></div>
    </div>
  );
}

export default function App() {
  useLiveEvents();
  const activePage = useAppStore((state) => state.activePage);
  const setSettings = useAppStore((state) => state.setSettings);
  useEffect(() => { api<Settings>('/settings').then(setSettings); }, [setSettings]);
  const page = activePage === 'Overview' ? <Overview /> : activePage === 'Folders' ? <FolderPanel /> : activePage === 'Rules' ? <RulesManager /> : activePage === 'Duplicates' ? <DuplicateManager /> : activePage === 'Logs' ? <LogsPage /> : <SettingsPanel />;
  return <Shell>{page}</Shell>;
}
