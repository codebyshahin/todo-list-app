const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  // Task span
  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-text");
  taskSpan.innerText = taskText;

  // Due date span
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("due-date");
  dateSpan.innerText = dueDate ? `Due: ${dueDate}` : "";

  // Edit button
const editBtn = document.createElement("button");
editBtn.innerText = "✏️";
editBtn.classList.add("edit-btn");

// NEW Edit function setup
function setEditFunction(editBtn, taskSpan) {
  let isEditing = false;

  editBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!isEditing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskSpan.innerText;
      taskSpan.replaceWith(input);
      editBtn.innerText = "💾";
      isEditing = true;

      editBtn.addEventListener("click", function saveEdit(e) {
        e.stopPropagation();
        const newSpan = document.createElement("span");
        newSpan.classList.add("task-text");
        newSpan.innerText = input.value;
        input.replaceWith(newSpan);
        editBtn.innerText = "✏️";
        isEditing = false;

        editBtn.removeEventListener("click", saveEdit);
        setEditFunction(editBtn, newSpan);
      }, { once: true });
    }
  });
}

// Call function to activate it
setEditFunction(editBtn, taskSpan);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
  });

  // Mark completed on click
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  li.appendChild(taskSpan);
  li.appendChild(dateSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  taskInput.value = "";
  dueDateInput.value = "";
});
