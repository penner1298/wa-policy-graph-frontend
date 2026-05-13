import Database from 'better-sqlite3';
import path from 'path';

// Resolves to workspace/sao-scraper/sao_2024.db from workspace/policy-graph-gui
const dbPath = path.resolve(process.cwd(), '../sao-scraper/sao_2024.db');

export type Finding = {
  report_num: string;
  jurisdiction: string;
  type: string;
  category: string;
  summary: string;
  root_cause: string;
  dollar_impact: number;
};

export function getFindings(): Finding[] {
  try {
    const db = new Database(dbPath, { readonly: true });
    const stmt = db.prepare('SELECT * FROM findings ORDER BY dollar_impact DESC LIMIT 100');
    return stmt.all() as Finding[];
  } catch (error) {
    console.error("Failed to connect to or query the database:", error);
    return [];
  }
}
