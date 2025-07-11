async function loadJSON(file) {
  const res = await fetch(file);
  return res.json();
}

function createTimelineItem(entry) {
  const div = document.createElement('div');
  div.className = 'timeline-item reveal';
  div.innerHTML = `
    <h3>📅 ${entry.date}</h3>
    <em>✨ ${entry.caption}</em>
    <p>🐻 ${entry.bear}</p>
    <p>🐑 ${entry.sheep}</p>
  `;
  return div;
}

function createCharacterCard(char) {
  return `
    <div class="character-card reveal">
      <h3>${char.icon} ${char.name} (${char.nickname})</h3>
      <p><strong>Archetype:</strong> ${char.archetype}</p>
      <p><strong>Energy:</strong> ${char.energy}</p>
      <p><strong>Weakness:</strong> ${char.weakness}</p>
    </div>
  `;
}

function createProfileCard(profile) {
  return `
    <div class="profile-card reveal">
      <h3>${profile.name}</h3>
      <p><strong>Defense:</strong> ${profile.defense}</p>
      <p><strong>Communication:</strong> ${profile.communication}</p>
      <p><strong>Trigger:</strong> ${profile.trigger}</p>
    </div>
  `;
}

// Scroll reveal logic
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Auto-play timeline entries (optional animation)
function animateTimeline(timelineData) {
  const section = document.getElementById('timeline');
  let i = 0;
  const interval = setInterval(() => {
    if (i < timelineData.length) {
      const item = createTimelineItem(timelineData[i]);
      section.appendChild(item);
      revealOnScroll();
      i++;
    } else {
      clearInterval(interval);
    }
  }, 1000); // 1 second delay per card
}

async function renderApp() {
  const [timeline, characters, profiles] = await Promise.all([
    loadJSON('timeline.json'),
    loadJSON('characters.json'),
    loadJSON('profiles.json')
  ]);

  animateTimeline(timeline);

  document.getElementById('characterCards').innerHTML = characters.map(createCharacterCard).join('');
  document.getElementById('profiles').innerHTML = profiles.map(createProfileCard).join('');

  document.getElementById('speakerFilter').addEventListener('change', e => {
    const val = e.target.value;
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.style.display = 'block';
      if (val !== 'all') {
        const contains = item.textContent.toLowerCase().includes(val);
        item.style.display = contains ? 'block' : 'none';
      }
    });
  });
}

renderApp();
