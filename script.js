document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
        saveTasks();
    } else if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');
        saveTasks();
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(li) {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('span').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.text);
        if (task.completed) {
            document.querySelector('#taskList li:last-child span').classList.add('completed');
        }
    });
}

loadTasks();
