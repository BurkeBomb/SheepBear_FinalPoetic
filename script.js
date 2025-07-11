let entries = [], quotes = [], characters = [], profiles = [];

async function fetchAllData() {
  [entries, quotes, characters, profiles] = await Promise.all([
    fetch('timeline.json').then(r => r.json()),
    fetch('quotes.json').then(r => r.json()),
    fetch('characters.json').then(r => r.json()),
    fetch('profiles.json').then(r => r.json())
  ]);
  renderQuoteOfTheMoment();
  renderCharacterCards();
  renderTimeline();
}

function renderQuoteOfTheMoment() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteOfTheMoment").innerText = `${q.speaker === 'bear' ? '🐻' : '🐑'} "${q.quote}"`;
}

function renderCharacterCards() {
  const container = document.getElementById("characterCards");
  characters.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${c.name} ${c.icon}</h3>
      <p><strong>Nickname:</strong> ${c.nickname}</p>
      <p><strong>Energy:</strong> ${c.energy}</p>
      <p><strong>Archetype:</strong> ${c.archetype}</p>
      <p><strong>Weakness:</strong> ${c.weakness}</p>
    `;
    container.appendChild(div);
  });
}

function renderTimeline() {
  const timeline = document.getElementById("timeline");
  const filter = document.getElementById("speakerFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  timeline.innerHTML = "";
  entries.forEach(entry => {
    const bearText = entry.bear.toLowerCase();
    const sheepText = entry.sheep.toLowerCase();
    const match =
      (filter === 'bear' ? bearText.includes(search)
        : filter === 'sheep' ? sheepText.includes(search)
        : bearText.includes(search) || sheepText.includes(search));
    if (!match) return;

    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <div class="date">${entry.date}</div>
      <div class="caption">${entry.caption}</div>
      <div class="quote bear">${entry.bear}</div>
      <div class="quote sheep">${entry.sheep}</div>
    `;
    timeline.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", renderTimeline);
document.getElementById("speakerFilter").addEventListener("change", renderTimeline);

fetchAllData();
