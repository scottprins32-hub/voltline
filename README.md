# Voltline Worlds

Seventeen living 3D worlds from the World Prompt Pack, played as **one idle game**. Three.js from a CDN, no build step, no external models.

**Live:** https://scottprins32-hub.github.io/voltline/ · **World map:** https://scottprins32-hub.github.io/voltline/hub.html

## How the game works
- Every world earns ⚡ credits on its own: tested cars, exported megawatt-hours, lifted containers, boarded passengers.
- Spend ⚡ inside a world on products and tiered upgrades that change the simulation and add visible geometry.
- Growing a world earns **Charter ★** (1 ★ per 1M ⚡ lifetime, 2 ★ for a fully upgraded world). Charter unlocks new worlds on the map, in five tiers from Home base to Orbital.
- Every owned world keeps earning while you are away or in another world; income is collected when you return.

## Worlds
| # | World | Status |
|---|-------|--------|
| 17 | Voltline — EV gigafactory | playable, home base (`index.html`) |
| 07 | Gridleaf — wind & solar farm | playable (`gridleaf.html`) |
| 03 | Berthwise — container port | playable (`berthwise.html`) |
| 06 | Railgrid — metro rail control | playable (`railgrid.html`) |
| others | Gateflow, Dabba, Fieldmind, Coreline, Pulseway, Apex, Summit, Parkline, Leafline, Orbitline, Boundary, Siren, Redline | on the map, in construction |

## Files
- `hub.html` — the 3D world map: islands per tier, unlock and travel.
- `kit.js` / `kit.css` — the shared world engine and skin. A new world is a content file of a few hundred lines.
- `meta.js` — the shared save, Charter economy and offline income across worlds.
- `index.html` — Voltline, the original hand-built world.

Controls everywhere: drag to pan, right-drag or two-finger twist to rotate, scroll or pinch to zoom, click anything to follow it.
