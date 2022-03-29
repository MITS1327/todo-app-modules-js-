(function(){

  function createAppTitle(title){
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm () {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group','mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn' , 'btn-primary');
    button.textContent = 'Добавить дело';

    button.setAttribute('disabled' , true);

    button.addEventListener('click' , function() {
      if(!input.value) {
        button.setAttribute('disabled' , true);
      }
    })

    buttonWrapper.append(button);
    form.append(buttonWrapper);
    form.append(input);


    return {
      button,
      input,
      form,
    }
  }

  function createTodoList () {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem (name , done = false) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    if(done) {
      item.classList.add('list-group-item-success');
    }
    item.textContent = name;

    buttonGroup.classList.add('btn-group','btn-group-sm');
    doneButton.classList.add('btn','btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn','btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      doneButton,
      deleteButton,
      item,
    }
  }

  function createTodoApp(container,title = 'Список дел', storageName , todoArr = []) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    todoArr.forEach(element => {
      let loadedItem = createTodoItem(element.name , element.done);

      todoList.append(loadedItem.item);

      loadedItem.doneButton.addEventListener('click' , function() {
        loadedItem.item.classList.toggle('list-group-item-success')
        for(let todos of todoArr) {
          if (todos.name === element.name) {
            todos.done = todos.done === false? true : false;
          }
        }
        localStorage.setItem(storageName , JSON.stringify(todoArr));
      });

      loadedItem.deleteButton.addEventListener('click' , function() {

        if(confirm('Вы уверены ?')) {
          loadedItem.item.remove();

          for (let i in todoArr) {
            if (todoArr[i].name === element.name) {
              todoArr.splice(i , 1);
            }
          }
          localStorage.setItem(storageName ,  JSON.stringify(todoArr));
        }
      });

    });

    todoItemForm.input.addEventListener('input' , function() {
      todoItemForm.button.removeAttribute('disabled');
    });

    todoItemForm.input.addEventListener('input' , function() {
      todoItemForm.button.disabled = false;
      if (!todoItemForm.input.value) {
        todoItemForm.button.disabled = true;
      }
    })

    todoItemForm.form.addEventListener('submit',function(){

      todoItemForm.button.setAttribute('disabled' , true);



      let todoItem = createTodoItem(todoItemForm.input.value);

      todoItem.doneButton.addEventListener('click',function(){
        todoItem.item.classList.toggle('list-group-item-success');
      });

      todoItem.deleteButton.addEventListener('click',function(){
        if(confirm('Вы уверенны ?')) {
          todoItem.item.remove();
        }
      });

      todoList.append(todoItem.item);
      todoArr.push({
        name : todoItemForm.input.value ,
        done : false
      });


      localStorage.setItem(storageName , JSON.stringify(todoArr));
      todoItemForm.input.value = '';

    });
  }

  window.createTodoApp = createTodoApp;

})();
