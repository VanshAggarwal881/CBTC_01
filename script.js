document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('form');
    let titleinput = document.getElementById('titleinput');
    let dateinput = document.getElementById('dateinput');
    let descriptioninput = document.getElementById('descriptioninput');
    let msg = document.getElementById('msg');
    let tasks = document.getElementById('tasks');
    let add = document.getElementById('add');
    let completedToggle = document.getElementById('completedToggle');
    let deleteAllBtn = document.getElementById('deleteAll');

    let currentTaskIndex = null;
    let showCompleted = false;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formvalidation();
    });

    completedToggle.addEventListener('click', () => {
        showCompleted = !showCompleted;
        completedToggle.textContent = showCompleted ? 'Pending' : 'Completed';
        createtasks();
    });

    deleteAllBtn.addEventListener('click', () => {
        data = [];
        localStorage.setItem('data', JSON.stringify(data));
        createtasks();
    });

    let data = JSON.parse(localStorage.getItem('data')) || [];

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

    function resetform() {
        titleinput.value = '';
        dateinput.value = '';
        descriptioninput.value = '';
    }

    function deletetask(index) {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
        createtasks();
    }

    function updatetask(index) {
        currentTaskIndex = index;
        let task = data[index];
        titleinput.value = task.title;
        dateinput.value = task.date;
        descriptioninput.value = task.description;
    }

    window.toggleComplete = (index) => {
        data[index].completed = !data[index].completed;
        localStorage.setItem('data', JSON.stringify(data));
        createtasks();
    };

    window.deletetask = deletetask;
    window.updatetask = updatetask;

    createtasks();
});
