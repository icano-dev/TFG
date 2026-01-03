let funkos = [];

export async function loadFunkoDatabase() {
    const res = await fetch(
        "./src/scene/data/funkos.json"
    );
    funkos = await res.json();
}

export function getFunkoById(id) {
    return funkos.find(f => f.id === id);
}
