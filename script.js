let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let input = document.getElementById("taskInput");
  let priority = document.getElementById("priority").value;

  if (input.value === "") return;

  let task = {
    text: input.value,
    completed: false,
    priority: priority
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks(filter = "all") {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {

    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    let li = document.createElement("li");

    li.className = task.priority;
    if (task.completed) li.classList.add("completed");

   li.innerHTML = `
  <span>${task.text}</span>
  <div>
    <button onclick="toggleTask(${index})">✔</button>
    <button onclick="deleteTask(${index})">❌</button>
  </div>
`;

    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();