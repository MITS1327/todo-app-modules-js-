import { createTodoApp } from './view.js';

let isLocal = true,
apiStorage,
storageSt = JSON.parse(localStorage.getItem('isLocal'));

storageSt === null ? localStorage.setItem('isLocal', JSON.stringify(isLocal)) : isLocal = storageSt;





async function setApiStorage (isLocal) {
  if (!isLocal) {
    apiStorage = await import('./localStorage.js')
  }
  else {
    apiStorage = await import('./api.js')
  }
}

async function createAll (owner) {
  const container = document.querySelector('#todo-app')

  container.innerHTML = '';

  const todoItemList = await apiStorage.getTodoList(owner);
  createTodoApp(document.getElementById('todo-app'), {
    title: 'Мои дела',
    owner,
    todoItemList: todoItemList || [],
    onCreateFormSubmit: apiStorage.createTodoItem,
    onDoneClick: apiStorage.switchTodoItemDone,
    onDeleteClick: apiStorage.deleteTodoItem,
  });
}

function initBtn (owner) {
  let switchBtn = document.getElementById('switchStorage');
  switchBtn.textContent = !isLocal ? 'Переключить на LS' : 'Переключить на API';

  switchBtn.addEventListener('click', async () => {
    if (!isLocal) {
      switchBtn.textContent = 'Переключить на API';
      localStorage.setItem('isLocal', JSON.stringify(true));
    }
    else {
      switchBtn.textContent = 'Переключить на LS';
      localStorage.setItem('isLocal', JSON.stringify(false));
    }
    isLocal = !isLocal;
    await setApiStorage(isLocal);
    await createAll(owner);
  });
}

async function initApp (owner) {
  await setApiStorage(isLocal);
  await createAll(owner);
  initBtn(owner);
  console.log(isLocal);
}

export default initApp;
