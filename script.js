const optionInput = document.getElementById('optionInput');
const addBtn = document.getElementById('addBtn');
const optionsList = document.getElementById('optionsList');
const decideBtn = document.getElementById('decideBtn');
const resultDiv = document.getElementById('result');
const countInput = document.getElementById('countSelect');

let options = [];

// Render the list of added options
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

// Add button handler
addBtn.addEventListener('click', () => {
  const val = optionInput.value.trim();
  if (!val) return;
  options.push(val);
  optionInput.value = '';
  renderOptions();
});

// Decide button handler — **no delay, instant pop-in**
decideBtn.addEventListener('click', () => {
  const count = parseInt(countInput.value, 10) || 1;

  if (options.length === 0) {
    resultDiv.textContent = 'Add some options first!';
    resultDiv.classList.remove('hidden');
    return;
  }

  // Hide before resetting so animation can replay
  resultDiv.classList.add('hidden');
  resultDiv.textContent = '';

  // Pick random options
  const pick = [];
  const copy = [...options];
  for (let i = 0; i < Math.min(count, copy.length); i++) {
    const idx = Math.floor(Math.random() * copy.length);
    pick.push(copy.splice(idx, 1)[0]);
  }

  // Immediately show result with pop-in animation
  resultDiv.textContent = pick.join(', ');
  resultDiv.classList.remove('hidden');
});
