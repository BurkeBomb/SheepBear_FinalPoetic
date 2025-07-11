async function loadJSON(file) {
  const res = await fetch(file);
  return res.json();
}

function createTimelineItem(entry) {
  const div = document.createElement('div');
  div.className = 'timeline-item';
  div.innerHTML = `
    <h3>${entry.date}</h3>
    <em>${entry.caption}</em>
    <p>🐻 ${entry.bear}</p>
    <p>🐑 ${entry.sheep}</p>
  `;
  return div;
}

function createCharacterCard(char) {
  return `
    <div class="character-card">
      <h3>${char.icon} ${char.name} (${char.nickname})</h3>
      <p><strong>Archetype:</strong> ${char.archetype}</p>
      <p><strong>Energy:</strong> ${char.energy}</p>
      <p><strong>Weakness:</strong> ${char.weakness}</p>
    </div>
  `;
}

function createProfileCard(profile) {
  return `
    <div class="profile-card">
      <h3>${profile.name}</h3>
      <p><strong>Defense:</strong> ${profile.defense}</p>
      <p><strong>Communication:</strong> ${profile.communication}</p>
      <p><strong>Trigger:</strong> ${profile.trigger}</p>
    </div>
  `;
}

async function renderApp() {
  const [timeline, characters, profiles] = await Promise.all([
    loadJSON('timeline.json'),
    loadJSON('characters.json'),
    loadJSON('profiles.json')
  ]);

  // Timeline
  const timelineSection = document.getElementById('timeline');
  timeline.forEach(entry => {
    timelineSection.appendChild(createTimelineItem(entry));
  });

  // Character Cards
  document.getElementById('characterCards').innerHTML = characters.map(createCharacterCard).join('');

  // Profiles
  document.getElementById('profiles').innerHTML = profiles.map(createProfileCard).join('');

  // Filter (optional future)
  document.getElementById('speakerFilter').addEventListener('change', e => {
    const val = e.target.value;
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.style.display = 'block'; // show all
      if (val !== 'all') {
        const contains = item.textContent.toLowerCase().includes(val);
        item.style.display = contains ? 'block' : 'none';
      }
    });
  });
}

renderApp();
