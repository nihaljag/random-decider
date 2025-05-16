const optionInput = document.getElementById('optionInput');
const addBtn = document.getElementById('addBtn');
const optionsList = document.getElementById('optionsList');
const decideBtn = document.getElementById('decideBtn');
const resultDiv = document.getElementById('result');
const countInput = document.getElementById('countSelect');

let options = [];

function renderOptions() {
  optionsList.innerHTML = '';
  options.forEach((opt, idx) => {
    const li = document.createElement('li');
    li.textContent = opt;
    const rm = document.createElement('button');
    rm.textContent = '✕';
    rm.onclick = () => {
      options.splice(idx, 1);
      renderOptions();
    };
    li.appendChild(rm);
    optionsList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const val = optionInput.value.trim();
  if (!val) return;
  options.push(val);
  optionInput.value = '';
  renderOptions();
});

decideBtn.addEventListener('click', () => {
  const count = parseInt(countInput.value, 10) || 1;
  if (options.length === 0) {
    resultDiv.textContent = 'Add some options first!';
    return;
  }
  const pick = [];
  const copy = [...options];
  for (let i = 0; i < Math.min(count, copy.length); i++) {
    const idx = Math.floor(Math.random() * copy.length);
    pick.push(copy.splice(idx, 1)[0]);
  }
  resultDiv.textContent = pick.join(', ');
});
