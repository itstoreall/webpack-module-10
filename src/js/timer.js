import "../sass/timer.scss";

// Функция шаблонизатор
const template = (value) => `
<div class="timer card">
<button class="btn btn-danger stop" disabled>Stop</button>
<span class="value">${value}</span>
<button class="btn btn-success start">Start</button>
</div>
`;

class Timer{ 

   // Конструктор с деструктуризированными аргументами
   constructor({ selector, value = 0 }) { 
      this.container = document.querySelector(selector);

      // Начальное значение таймера
      this.value = value;

      // Вставка разметки в элемент
      this.container.insertAdjacentHTML('beforeend', template(this.value));

      this.refs = {

         // Поиск значения на в documents, а в container
         // на случай если будет несколько счетчиков
         value: this.container.querySelector('.value'),
         startBtn: this.container.querySelector('.start'),
         stopBtn: this.container.querySelector('.stop'),
      };

      this.refs.stopBtn.addEventListener("click", this.stop.bind(this));
      this.refs.startBtn.addEventListener("click", this.start.bind(this));
   };

   // Функция рендер будет вставлять при сработке setInterval
   render() {
      this.refs.value.textContent = this.value;
   }

   // Функция старт
   start() {

      // Проверка, чтобы не создавать дубликатов
      if (this.timerId) {
         return;
      }

      this.timerId = setInterval(() => {
         this.value += 1

         // Вызывает функцию рендер
         this.render();
      }, 500);

      // При запуске активируется stop, деактивируется start
      this.refs.stopBtn.removeAttribute("disabled");
      this.refs.startBtn.setAttribute("disabled", true);
   };

   // Функция стоп
   stop() {
      if (!this.timerId) {
         return
      };

      clearInterval(this.timerId);
      this.timerId = null;

      // При остановке активируется start, деактивируется stop
      this.refs.stopBtn.setAttribute("disabled", true);
      this.refs.startBtn.removeAttribute("disabled");
   };
};

// Экземпляр таймера с автозапуском с ноля
const timer = new Timer({ selector: "#timer" });

// Функция позволяет запускать таймер автоматически
// если экземпляр присвоен в переменную
timer.start();

// Экземпляры таймера с параметрами собранными в объект

new Timer({
   selector: "#timer2",
   value: 200,
});

new Timer({
   selector: "#timer3",
   value: 500,
});

console.log(timer);

