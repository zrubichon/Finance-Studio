import { observationDate, type HistoryPoint } from "@/lib/market-periods";

// FRED can return an HTML error page with a successful HTTP status. A numeric
// fragment in that page is not a market observation: validate the CSV schema.
export function parseFredCsv(csv: string, seriesId: string): HistoryPoint[] {
  const lines = csv.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(line => line.trim());
  const unquote = (cell: string) => cell.trim().replace(/^"(.*)"$/, "$1");
  const header = (lines[0] || "").split(",").map(unquote);
  if (header.length !== 2 || !/^(observation_date|DATE)$/i.test(header[0]) || header[1] !== seriesId) {
    throw new Error(`Invalid FRED CSV schema for ${seriesId}`);
  }
  const points = new Map<string, HistoryPoint>();
  for (const line of lines.slice(1)) {
    const cells = line.split(",").map(unquote);
    if (cells.length !== 2) continue;
    const [rawDate, rawValue] = cells;
    const date = observationDate(rawDate);
    if (!date || rawDate !== date || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(rawValue)) continue;
    const value = Number(rawValue);
    if (Number.isFinite(value)) points.set(date, { date, value });
  }
  return [...points.values()].sort((a, b) => a.date.localeCompare(b.date));
}
