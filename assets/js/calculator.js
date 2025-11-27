/* ======================================================
      ARURF ARCANE DELUXE – CALCULATEUR JS
   ====================================================== */

let players = [];
let games = [];

// ==========================================
// Ajout d'un joueur
// ==========================================
document.getElementById("addPlayer").addEventListener("click", () => {
    let name = prompt("Nom du joueur ?");
    if (!name) return;

    players.push(name);

    // Ajouter ce joueur dans toutes les parties existantes
    games.forEach(g => {
        g.push({ dmg: 0, pouilleux: false, teubed: false });
    });

    render();
});


// ==========================================
// Ajout d'une partie
// ==========================================
document.getElementById("addGame").addEventListener("click", () => {
    let newPart = players.map(p => ({
        dmg: 0,
        pouilleux: false,
        teubed: false
    }));

    games.push(newPart);
    render();
});


// ==========================================
// Rendu complet du tableau (mais ne touche pas les valeurs !)
// ==========================================
function render() {
    let container = document.getElementById("games");
    container.innerHTML = "";

    games.forEach((game, partIndex) => {
        let box = document.createElement("div");
        box.className = "arcane-game";

        box.innerHTML = `
            <h3 class="part-title">PARTIE ${partIndex + 1}</h3>

            <div class="table-header">
                <span>Joueur</span>
                <span>Dégâts</span>
                <span>Pouilleux</span>
                <span>Teubed</span>
                <span>Total</span>
            </div>
        `;

        game.forEach((playerData, pIndex) => {
            let row = document.createElement("div");
            row.className = "arcane-row";

            row.innerHTML = `
                <div class="player-name">${players[pIndex]}</div>

                <input type="number" class="arcane-input dmg-input"
                    value="${playerData.dmg}" data-p="${pIndex}" data-g="${partIndex}">

                <input type="checkbox" class="arcane-check pouilleux-check"
                    ${playerData.pouilleux ? "checked" : ""}
                    data-p="${pIndex}" data-g="${partIndex}">

                <input type="checkbox" class="arcane-check teubed-check"
                    ${playerData.teubed ? "checked" : ""}
                    data-p="${pIndex}" data-g="${partIndex}">

                <span class="total-badge total-zero" id="total-${partIndex}-${pIndex}">0</span>
            `;

            box.appendChild(row);
        });

        container.appendChild(box);
    });

    bindEvents();
    updateUI();
}


// ==========================================
// Écouteurs : dégâts / pouilleux / teubed
// ==========================================
function bindEvents() {

    document.querySelectorAll(".dmg-input").forEach(input => {
        input.addEventListener("input", e => {
            let g = parseInt(e.target.dataset.g);
            let p = parseInt(e.target.dataset.p);
            games[g][p].dmg = parseInt(e.target.value || 0);
            updateUI();
        });
    });

    document.querySelectorAll(".pouilleux-check").forEach(chk => {
        chk.addEventListener("change", e => {
            let g = parseInt(e.target.dataset.g);
            let p = parseInt(e.target.dataset.p);
            games[g][p].pouilleux = e.target.checked;
            updateUI();
        });
    });

    document.querySelectorAll(".teubed-check").forEach(chk => {
        chk.addEventListener("change", e => {
            let g = parseInt(e.target.dataset.g);
            let p = parseInt(e.target.dataset.p);
            games[g][p].teubed = e.target.checked;
            updateUI();
        });
    });
}


// ==========================================
// Mise à jour visuelle sans recréer le tableau
// ==========================================
function updateUI() {

    document.querySelectorAll(".arcane-row").forEach(row => {
        let dmgInput = row.querySelector(".dmg-input");

        if (!dmgInput) return;

        let g = parseInt(dmgInput.dataset.g);
        let p = parseInt(dmgInput.dataset.p);

        let data = games[g][p];
        let total = data.dmg +
                    (data.pouilleux ? -5000 : 0) +
                    (data.teubed ? -10000 : 0);

        // BADGE
        let badge = document.getElementById(`total-${g}-${p}`);
        if (badge) {
            badge.textContent = total;

            badge.classList.remove("total-pos", "total-neg", "total-zero");
            if (total > 0) badge.classList.add("total-pos");
            else if (total < 0) badge.classList.add("total-neg");
            else badge.classList.add("total-zero");
        }

        // HIGHLIGHT
        row.classList.remove("row-malus", "row-clean");
        if (data.teubed || data.pouilleux)
            row.classList.add("row-malus");
        else if (data.dmg > 0)
            row.classList.add("row-clean");
    });

    updateResults();
}


// ==========================================
// Résultats finaux
// ==========================================
function updateResults() {
    let res = document.getElementById("ranking");
    res.innerHTML = "";

    if (players.length === 0) return;

    let totals = players.map((p, i) => {
        let sum = 0;
        games.forEach(g => {
            sum += g[i].dmg +
                   (g[i].pouilleux ? -5000 : 0) +
                   (g[i].teubed ? -10000 : 0);
        });
        return { name: p, total: sum };
    });

    totals.sort((a, b) => b.total - a.total);

    let winner = totals[0];
    let loser = totals[totals.length - 1];

    res.innerHTML += `<p class="winner">🏆 ${winner.name} gagne avec ${winner.total} dégâts !</p>`;
    res.innerHTML += `<p class="loser">💀 ${loser.name} termine dernier avec ${loser.total} dégâts... pathétique.</p>`;

    totals.forEach(t => {
        res.innerHTML += `<p>${t.name} : ${t.total} dégâts</p>`;
    });
}


// Première génération
render();
