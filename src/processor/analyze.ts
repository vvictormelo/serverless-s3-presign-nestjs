export function analyzeBuffer(key: string, buf: Buffer) {
    const text = buf.toString('utf-8');

    const isCsv = key.toLowerCase().endsWith('.csv');
    if (isCsv) {
        const lines = text.split(/\r?\n/).filter(Boolean);

        const header = (lines[0] || '')
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

        const rows = Math.max(lines.length - 1, 0);

        return {
            kind: 'csv',
            columns: header,
            rows,
            sizeBytes: buf.length,
            preview: lines.slice(0, 5)
        };
    }

    const lines = text.split(/\r?\n/);

    return {
        kind: 'text',
        lines: lines.length,
        sizeBytes: buf.length,
        preview: lines.slice(0, 10)

    }
}