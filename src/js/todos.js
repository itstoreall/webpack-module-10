import "../sass/todos.scss";

const getMarkup = () => `
<form class="form-inline">
   <div class="form-group mb-2">
      <label for="staticEmail2" class="sr-only">Enter todo</label>
      <input type="text" class="form-control-plaintext" id="staticEmail2" name="input">
   </div>
   <button type="submit" class="btn btn-primary mb-2">Confirm identity</button>
</form>

<div class="list-group"></div>
`;

// Шаблон элемента списка
const getItemMarkup = (value) => `
   <span href="#" class="list-group-item list-group-item-action">${value}</span>
`;

class Todos {
   constructor({ selector }) {
      this.container = document.querySelector(selector);
      this.container.insertAdjacentHTML('beforeend', getMarkup());

      this.refs = {
         form: this.container.querySelector(".form-inline"),
         list: this.container.querySelector(".list-group"),
      };

      this.refs.form.addEventListener("submit", this.handleSubmit.bind(this));

      this.items = [];
      this.loadData();
   };

   // Функция рендерит элементы списка
   render() {

      // удаляет элементы перед добавлением
      this.refs.list.innerHTML = '';
      this.refs.list.insertAdjacentHTML('beforeend', this.items.map((value) => getItemMarkup(value)).join(""));
   }

   // Функция записывает данные в this.items и рендерит их
   loadData() {

      // Функция try-catch хендлит на случай если переданы кривые данные
      try {

         // парсит данные или пустой массив в случае их отсутствия
         const items = JSON.parse(localStorage.getItem("todos")) || [];

         this.items = items;
         this.render(); 
         
         // catch говорит, что делать в случае ошибки
      } catch (error) {
         
         // если в localStorage фигня, то данные очищаются
         localStorage.removeItem("todos");
      };
   };

   // Функция сохраняет данные в localStorage
   saveData() {
      localStorage.setItem("todos", JSON.stringify(this.items));
   };

   // Функция добавляет значение в items
   addItems(text) {
      this.items.push(text);
      this.render();
      this.saveData();
   }

   handleSubmit(e) {
      e.preventDefault();

      this.addItems(e.target.elements.input.value);
      e.target.elements.input.value = "";
   };
};

new Todos({ selector: "#todos" });