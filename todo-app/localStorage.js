let LsArray = [];

export function createTodoItem({ owner, name }) {
  const loadedArr = JSON.parse(localStorage.getItem(owner));
  if (loadedArr !== null) {
    LsArray = loadedArr;
  }
  const todoItem = {
    owner: owner,
    name: name,
    done: false,
  };

  LsArray.push(todoItem);
  console.log(LsArray);
  console.log(owner);

  localStorage.setItem(owner, JSON.stringify(LsArray));
  return todoItem;
}

export function switchTodoItemDone(todoItem, owner) {
  LsArray = JSON.parse(localStorage.getItem(owner)) || LsArray;
  const currentItem = LsArray.find((item) => todoItem.todoItem.name === item.name);
  currentItem.done = !currentItem.done;
  localStorage.setItem(owner, JSON.stringify(LsArray));
}

export function deleteTodoItem(todoItem, owner) {
  if (confirm('Вы уверены ?')) {
    LsArray = JSON.parse(localStorage.getItem(owner)) || LsArray;
    const currentItemIndex = LsArray.findIndex((item) => todoItem.name === item.name);
    LsArray.splice(currentItemIndex, 1);
    localStorage.setItem(owner, JSON.stringify(LsArray));
  }
}

export function getTodoList(owner) {
  const list = JSON.parse(localStorage.getItem(owner));
  console.log(list);
  return list;
}
