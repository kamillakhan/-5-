const animationBlocks = document.querySelectorAll('.animation-block');
const metronome = document.getElementById('metronome');
const speedControl = document.getElementById('speed');
const bpmDisplay = document.getElementById('bpm-display');
let activeBlock = null; // Текущий активный блок
let currentViewIndex = 0;

// Виды видео
const views = ['front', 'side', 'back'];

// Устанавливаем зацикливание на метрономе
metronome.loop = true;

// Функция для выбора движения
animationBlocks.forEach(block => {
  block.addEventListener('click', () => {
    // Убираем активность со всех блоков
    animationBlocks.forEach(b => b.classList.remove('active'));
    block.classList.add('active'); // Добавляем активность текущему блоку
    activeBlock = block; // Устанавливаем текущий активный блок
  });
});

// Функция для запуска видео и метронома
function startVideo() {
  if (!activeBlock) return; // Ничего не делаем, если нет активного блока
  const video = activeBlock.querySelector('.animation-video');
  video.play();
  video.playbackRate = speedControl.value;

  metronome.play();
  metronome.playbackRate = speedControl.value;
}

// Функция для остановки видео и метронома
function stopAll() {
  animationBlocks.forEach(block => {
    const video = block.querySelector('.animation-video');
    video.pause();
    video.currentTime = 0;
  });
  metronome.pause();
  metronome.currentTime = 0;
}

// Функция для переключения вида
function switchView() {
  if (!activeBlock) return; // Ничего не делаем, если нет активного блока
  const video = activeBlock.querySelector('.animation-video');
  currentViewIndex = (currentViewIndex + 1) % views.length; // Переход к следующему виду
  const movement = activeBlock.dataset.movement;
  const newView = views[currentViewIndex];
  video.src = `/blender/${movement}_${newView}.mp4`; // Меняем источник видео
  video.load();
  video.play();
}

// Обновление скорости и отображение BPM
speedControl.addEventListener('input', () => {
  const speed = speedControl.value;
  const bpm = Math.round(speed * 120);
  bpmDisplay.textContent = `${bpm} BPM`;

  if (activeBlock) {
    const video = activeBlock.querySelector('.animation-video');
    video.playbackRate = speed;
  }
  metronome.playbackRate = speed;
});

// Добавление событий на кнопки
document.getElementById('start').addEventListener('click', startVideo);
document.getElementById('stop').addEventListener('click', stopAll);
document.getElementById('switch-view').addEventListener('click', switchView);
