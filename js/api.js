const BASE_URL = 'https://cdn.jsdelivr.net/gh/tekgraphik/website@main';

export const API = {
    async getIndex() {
        const res = await fetch(`${BASE_URL}/database.json`);
        return res.json();
    },
    async getContent(filename) {
        const res = await fetch(`${BASE_URL}/database/${filename}`);
        return res.text();
    }
};
