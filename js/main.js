import { API } from './api.js';
import { parseMD } from './parser.js';

export async function initArchive(listId, viewerId) {
    const list = document.getElementById(listId);
    const viewer = document.getElementById(viewerId);
    if (!list || !viewer) return;

    try {
        const index = await API.getIndex();
        const fragment = document.createDocumentFragment();

        index.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'menu-item';
            btn.textContent = item.id;
            btn.onclick = async () => {
                const raw = await API.getContent(item.filename);
                const { html, metadata } = parseMD(raw);
                viewer.innerHTML = html;
                viewer.scrollTop = 0;
                // Qui interverranno le logiche di movimento 2D basate sui metadata
            };
            fragment.appendChild(btn);
        });

        list.innerHTML = '';
        list.appendChild(fragment);
    } catch (e) {
        console.error("Initialization error:", e);
    }
}
