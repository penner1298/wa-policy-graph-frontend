import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) return NextResponse.json([]);

  const dbPath = path.resolve(process.cwd(), '../sao-scraper/sao_2024.db');
  const db = new Database(dbPath, { readonly: true });
  
  const results = db.prepare(`
    SELECT DISTINCT jurisdiction 
    FROM findings 
    WHERE jurisdiction LIKE ? 
    LIMIT 8
  `).all(`%${q}%`);

  return NextResponse.json(results);
}
