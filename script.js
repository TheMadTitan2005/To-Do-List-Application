document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const groupPopup = document.getElementById("groupPopup");
  const groupInput = document.getElementById("groupInput");
  const moveToGroupBtn = document.getElementById("moveToGroupBtn");
  const closePopupBtn = document.querySelector(".close");
  const totalTasksCount = document.getElementById("totalTasks");
  const completedTasksCount = document.getElementById("completedTasks");

  let totalTasks = 0;
  let completedTasks = 0;
  let selectedTask;

  addTaskBtn.addEventListener("click", addTask);
  addTaskBtn.addEventListener("mouseover", function() {
    addTaskBtn.style.cursor = "pointer";
  });

  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "SPAN") {
      selectedTask = event.target.textContent.trim();
      showMoveToGroupPopup(selectedTask);
    }
  });

  moveToGroupBtn.addEventListener("click", function() {
    const groupName = groupInput.value.trim();
    if (groupName !== "") {
      addTaskToGroup(selectedTask, groupName);
      removeTaskFromMainList(selectedTask);
      updateTotalTasks();
      groupInput.value = "";
      closePopup();
    }
  });

  closePopupBtn.addEventListener("click", closePopup);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const li = createTaskElement(taskText);
      taskList.appendChild(li);
      totalTasks++;
      updateTotalTasks();
      taskInput.value = "";
    }
  }

  function createTaskElement(taskText) {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = taskText;
    li.appendChild(label);
    return li;
  }

  function showMoveToGroupPopup(task) {
    groupPopup.style.display = "block";
    selectedTask = task;
  }

  function closePopup() {
    groupPopup.style.display = "none";
  }

  function addTaskToGroup(task, groupName) {
    const li = createTaskElement(task);
    let group = document.querySelector(`#${groupName}`);
    if (!group) {
      group = document.createElement("ul");
      group.id = groupName;
      taskList.appendChild(group);
      const groupHeader = document.createElement("h2");
      groupHeader.textContent = groupName;
      group.insertBefore(groupHeader, group.firstChild);
    }
    group.appendChild(li);
  }

  function removeTaskFromMainList(taskText) {
    const taskElement = [...document.querySelectorAll('#taskList li')].find(node => node.textContent.trim() === taskText);
    if (taskElement) {
      taskElement.remove();
    }
  }

  function updateTotalTasks() {
    totalTasksCount.textContent = totalTasks;
  }
});
