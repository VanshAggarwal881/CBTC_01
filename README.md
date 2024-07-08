# CBTC_01
# Live Demo : https://vanshaggarwal881.github.io/CBTC_01/
# TO-DO-LIST WEB APPLICATION
# Event Listeners
Form Submission: Handles the form submission to either add or update a task.
```
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formvalidation();
});
```
# Toggle Completed/Pending Tasks: Toggles the view between completed and pending tasks.
```
completedToggle.addEventListener('click', () => {
    showCompleted = !showCompleted;
    completedToggle.textContent = showCompleted ? 'Pending' : 'Completed';
    createtasks();
});
```
# Delete All Tasks: Clears all tasks from local storage and the data array.
```
deleteAllBtn.addEventListener('click', () => {
    data = [];
    localStorage.setItem('data', JSON.stringify(data));
    createtasks();
});
```
# Data Handling
data: Array that holds all task objects. It's initialized from local storage.
```
let data = JSON.parse(localStorage.getItem('data')) || [];
```
# Form Validation
Ensures that the title input is not blank before proceeding to accept data.
```
function formvalidation() {
    if (titleinput.value === '') {
        msg.innerHTML = 'Title cannot be blank';
    } else {
        msg.innerHTML = '';
        acceptdata();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
}
```
# Accepting Data (Create/Update)
Adds a new task or updates an existing task in the data array and updates local storage.
```
function acceptdata() {
    if (currentTaskIndex !== null) {
        data[currentTaskIndex] = {
            title: titleinput.value,
            date: dateinput.value,
            description: descriptioninput.value,
            completed: data[currentTaskIndex] ? data[currentTaskIndex].completed : false
        };
        currentTaskIndex = null;
    } else {
        data.push({
            title: titleinput.value,
            date: dateinput.value,
            description: descriptioninput.value,
            completed: false
        });
    }

    localStorage.setItem('data', JSON.stringify(data));
    createtasks();
}
```
# Creating Tasks (Read)
Generates the HTML for the tasks based on the data array and the showCompleted state.
```
function createtasks() {
    tasks.innerHTML = '';
    data.forEach((x, y) => {
        if (x.completed === showCompleted) {
            tasks.innerHTML += `
                <div id=${y} class="tasklist">
                    <div class="left">
                        <input type="checkbox" ${x.completed ? 'checked' : ''} onchange="toggleComplete(${y})">
                        <span class="taskno">${x.title}</span>
                        <span class="small">${x.date}</span>
                        <p>${x.description}</p>
                    </div>
                    <div class="right">
                        <span class="icons">
                            <i onclick='updatetask(${y})' data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                            <i onclick='deletetask(${y})' class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                </div>`;
        }
    });
    resetform();
}
```
# Reset Form
Clears the input fields after a task is added or updated.
```
function resetform() {
    titleinput.value = '';
    dateinput.value = '';
    descriptioninput.value = '';
}
```
# Delete Task
Removes a task from the data array and updates local storage.
```
function deletetask(index) {
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    createtasks();
}
```
# Update Task
Prepares the form for updating an existing task by populating the input fields with the task's current data.
```
function updatetask(index) {
    currentTaskIndex = index;
    let task = data[index];
    titleinput.value = task.title;
    dateinput.value = task.date;
    descriptioninput.value = task.description;
}
```
# Toggle Task Completion
Toggles the completed state of a task and updates local storage.
```
window.toggleComplete = (index) => {
    data[index].completed = !data[index].completed;
    localStorage.setItem('data', JSON.stringify(data));
    createtasks();
};
```
# Summary
1) CRUD Operations: The script allows you to Create, Read, Update, and Delete tasks.
2) Local Storage: Data persistence is achieved using local storage.
3) Dynamic DOM Manipulation: Tasks are dynamically created and manipulated in the DOM based on the data array.
4) Event Handling: Various event listeners are used to handle form submissions, button clicks, and input changes.
5) Form Validation: Basic validation ensures that tasks have titles before they can be added or updated.
