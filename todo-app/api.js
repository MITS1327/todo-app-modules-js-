console.log('API');
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

export async function createTodoItem({ name, owner }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
}

export async function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: todoItem.done }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function deleteTodoItem(todoItem) {
  console.log(todoItem);
  if (!confirm('Вы уверенны?')) {
    return;
  }
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  });
}
