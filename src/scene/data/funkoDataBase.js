let funkos = [];

export async function loadFunkoDatabase() {
    const res = await fetch(
        "/TFG/src/scene/data/funkos.json"
    );
    funkos = await res.json();
}

export function getFunkoById(handle) {
    return funkos.find(f => f.handle === handle);
}
