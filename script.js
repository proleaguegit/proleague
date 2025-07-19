<script>
let scorerList = [
  { name: "Месси", team: "Барселона", goals: 5 },
  { name: "Мбаппе", team: "ПСЖ", goals: 3 },
  { name: "Винисиус", team: "Реал", goals: 2 }
];

function renderScorers() {
  const container = document.getElementById('scorers');
  container.innerHTML = '';
  scorerList.forEach((scorer, index) => {
    const div = document.createElement('div');
    div.className = "scorer-field";
    div.style.margin = "20px auto";
    div.style.padding = "10px";
    div.style.border = "1px solid #444";
    div.style.background = "rgba(255,255,255,0.05)";
    div.style.width = "90%";
    div.style.maxWidth = "600px";

    div.innerHTML = `
      <div contenteditable="true" oninput="updateName(${index}, this.innerText)">
        <span style="color:#00ffe1;">Имя:</span> ${scorer.name}
      </div>
      <div contenteditable="true" oninput="updateTeam(${index}, this.innerText)">
        <span style="color:#00ffe1;">Команда:</span> ${scorer.team}
      </div>
      <div>
        <span style="color:#ffcc00;">Голы:</span> <strong id="goal-${index}">${scorer.goals}</strong>
        <button onclick="changeGoals(${index}, 1)">➕</button>
        <button onclick="changeGoals(${index}, -1)">➖</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateName(index, text) {
  scorerList[index].name = text.replace('Имя:', '').trim();
}
function updateTeam(index, text) {
  scorerList[index].team = text.replace('Команда:', '').trim();
}
function changeGoals(index, delta) {
  scorerList[index].goals = Math.max(0, scorerList[index].goals + delta);
  document.getElementById(`goal-${index}`).innerText = scorerList[index].goals;
}
function saveScorers() {
  localStorage.setItem('scorerList', JSON.stringify(scorerList));
  alert("Бомбардиры сохранены!");
}
function loadScorers() {
  const saved = localStorage.getItem('scorerList');
  if (saved) {
    scorerList = JSON.parse(saved);
  }
  renderScorers();
}

function saveTable() {
  const table = document.getElementById('leagueTable').innerHTML;
  localStorage.setItem('leagueData', table);
  alert("Таблица сохранена!");
}

function toggleBurgerMenu() {
  const menu = document.getElementById('burgerMenu');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Переключение вкладок
function showSection(id) {
  const sections = [
    'tableSection',
    'scorersSection',
    'matchesSection',
    'newsSection',
    'aboutSection'
  ];
  sections.forEach(section => {
    const el = document.getElementById(section);
    if (el) el.style.display = (section === id) ? 'block' : 'none';
  });
  // Скрываем бургер-меню после выбора
  const menu = document.getElementById('burgerMenu');
  if (menu) menu.style.display = 'none';
}

window.onload = function () {
  const savedTable = localStorage.getItem('leagueData');
  if (savedTable) {
    document.getElementById('leagueTable').innerHTML = savedTable;
  }
  loadScorers();
};
</script>
