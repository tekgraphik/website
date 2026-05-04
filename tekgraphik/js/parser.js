export function parseMD(rawText) {
    // Frontmatter semplice e robusto
    let metadata = {};
    let body = rawText;

    const fmMatch = rawText.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (fmMatch) {
        const metaString = fmMatch[1];
        body = fmMatch[2];

        metaString.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.includes(':')) return;
            const colon = trimmed.indexOf(':');
            const key = trimmed.slice(0, colon).trim();
            const value = trimmed.slice(colon + 1).trim();
            if (key) metadata[key] = value;
        });
    }

    const html = body
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h4>$1</h4>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^\> (.*)$/gm, '<blockquote>$1</blockquote>')
        .replace(/^\*\*\*$/gm, '<hr>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
        .replace(/^\s*\n/gm, '<br>')
        .trim();

    return { metadata, html };
}