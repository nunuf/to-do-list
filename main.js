// Load notes from localStorage
function load() {
  allTasks = getTasksFromLocalStorage();
  displayTasks(allTasks);
}
load();

// Add new note
function add() {
  const isValid = validate();
  if (!isValid) {
    return;
  }
  let allTasks = getTasksFromLocalStorage();
  const newTask = getTask(idBox.value === '' ? ''+allTasks.length : idBox.value);
  let found = false;
  allTasks = allTasks.map(t => {
    if (t.id === newTask.id) {
      found = true;
      return newTask;
    }
    return t;
  });
  if (found) {
    displayTasks(allTasks);
  } else {
    displayNewTask(newTask);
    allTasks.push(newTask);
  }
  saveTasksToStorage(allTasks);
  reset();
}

// New note validations
function validate() {
  const title = titleBox.value;
  const description = descriptionBox.value;
  const date = dateBox.value;
  const time = timeBox.value;
  const colorSelected = document.querySelector('input[name="btnRadio"]:checked');

  if (title === "") {
    on();
    document.getElementById("validateText").innerText = `Please Enter a Title`;
    return false;
  }
  if (description === "") {
    on();
    document.getElementById("validateText").innerText = `Please Enter Description`;
    return false;
  }
  if (colorSelected === null || colorSelected.value === '') {
    on();
    document.getElementById("validateText").innerText = `Please Select Color`;
    return false;
  }
  if (date === "") {
    on();
    document.getElementById("validateText").innerText = `Please Select Date`;
    return false;
  }
  if (time === "") {
    on();
    document.getElementById("validateText").innerText = `Please Select Time`;
    return false;
  }

  return true;
}

// Display validations overlay
function on() {
  document.getElementById("validateOn").style.display = "block";
}

// Hide validations overlay
function off() {
  document.getElementById("validateOn").style.display = "none";
}

// Get new note values from form
function getTask(id) {
  const colorSelected = document.querySelector('input[name="btnRadio"]:checked');
  const color = colorSelected.value;
  const title = titleBox.value;
  const description = descriptionBox.value;
  const date = dateBox.value;
  const time = timeBox.value;

  const task = {
    id,
    title,
    description,
    color,
    date,
    time
  };
  return task;
}

// Get notes from localStorage
function getTasksFromLocalStorage() {
  const str = localStorage.getItem("tasks");
  const tasks = str === null ? [] : JSON.parse(str);
  return tasks;
}

// Save notes to localStorage
function saveTasksToStorage(allTasks) {
  const str = JSON.stringify(allTasks);
  localStorage.setItem("tasks", str);
}

function getCard(task) {
  const card = document.createElement('div');
  card.innerHTML = `
    <div id="${task.id}" class="note-card ${task.color}">
      <div id="delete${task.id}" class="close ${task.color}-btn" onclick="deleteItem(this)" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
          <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
          <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
        </svg>
      </div>
      <div id="edit${task.id}" class="edit ${task.color}-btn" onclick="editItem(this)" title="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </div>
      <img src="assets/images/thumbPin2.png" class="push-pin"/>
      <div class="text-center fs-2">${task.title}</div>
      <div class="text-center fs-4 description">${task.description.replaceAll('\n', '<br/>')}</div>
      <div class="ps-1 pb-0 fs-5 fw-bolder text-left">${task.date.split('-').reverse().join('/')}<br> ${task.time}</div>
    </div>
  `;
  return card;
}

// Display notes
function displayTasks(allTasks) {
  toDoList.innerHTML = '';
  allTasks.forEach(task => {
    toDoList.appendChild(getCard(task));
  });
}

// Display new note
function displayNewTask(task) {
  toDoList.appendChild(getCard(task));
}

// Clear form fields
function reset() {
  idBox.value = '';
  titleBox.value = '';
  descriptionBox.value = '';
  dateBox.value = '';
  timeBox.value = '';
  document.querySelector('input[name="btnRadio"]:checked').value = '';
  setTimeout(() => {
    location.reload();
  }, 3000);
}

// Delete note
function deleteItem(button) {
  const index = button.id.replace('delete', '');
  const allTasks = getTasksFromLocalStorage();
  allTasks.splice(index, 1);
  const cardToRemove = document.getElementById(`${index}`);
  cardToRemove.classList.add('removed');
  cardToRemove.addEventListener('transitionend', () => {
    displayTasks(allTasks);
  });
  saveTasksToStorage(allTasks);
}

// Edit note
function editItem(button) {
  const index = button.id.replace('edit', '');
  const allTasks = getTasksFromLocalStorage();
  const taskToEdit = allTasks.find(task => task.id === index);
  idBox.value = index;
  titleBox.value = taskToEdit.title;
  descriptionBox.value = taskToEdit.description;
  dateBox.value = taskToEdit.date;
  timeBox.value = taskToEdit.time;
}