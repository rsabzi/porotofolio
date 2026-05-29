import { create } from 'zustand';

export type ActivityEvent = {
  type: string;
  timestamp: string;
  filename?: string;
  path?: string;
  operation?: string;
  from?: string;
  to?: string;
  category?: string;
  rule?: string;
  count?: number;
};

export type SafetySettings = {
  dry_run: boolean;
  recursive_watch: boolean;
  min_file_age_seconds: number;
  skip_hidden_files: boolean;
  skip_code_projects: boolean;
  allow_code_file_organization: boolean;
  allow_installer_organization: boolean;
  require_delete_confirmation: boolean;
  protected_folder_markers: string[];
  protected_path_segments: string[];
  ignored_globs: string[];
};

export type Settings = {
  monitored_folders: string[];
  auto_organize: boolean;
  duplicate_scan_frequency_minutes: number;
  theme: 'dark' | 'light';
  notifications_enabled: boolean;
  organize_root?: string | null;
  max_file_size_large_mb: number;
  category_map: Record<string, string[]>;
  safety: SafetySettings;
};

export type Rule = {
  id: string;
  name: string;
  enabled: boolean;
  condition: Record<string, unknown>;
  action: Record<string, unknown>;
};

export type DuplicateGroup = { hash: string; count: number; files: Array<{ path: string; name: string; size: number; modified: number }> };

export type LogRecord = { timestamp: string; type: string; message: string; details: Record<string, unknown> };

type AppState = {
  events: ActivityEvent[];
  settings: Settings | null;
  rules: Rule[];
  duplicates: DuplicateGroup[];
  logs: LogRecord[];
  activePage: string;
  setPage: (page: string) => void;
  setSettings: (settings: Settings) => void;
  setRules: (rules: Rule[]) => void;
  setDuplicates: (duplicates: DuplicateGroup[]) => void;
  setLogs: (logs: LogRecord[]) => void;
  pushEvent: (event: ActivityEvent) => void;
};

export const useAppStore = create<AppState>((set) => ({
  events: [],
  settings: null,
  rules: [],
  duplicates: [],
  logs: [],
  activePage: 'Overview',
  setPage: (activePage) => set({ activePage }),
  setSettings: (settings) => set({ settings }),
  setRules: (rules) => set({ rules }),
  setDuplicates: (duplicates) => set({ duplicates }),
  setLogs: (logs) => set({ logs }),
  pushEvent: (event) => set((state) => ({ events: [event, ...state.events].slice(0, 250) })),
}));
