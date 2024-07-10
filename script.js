const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
});

// Add task
function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText} 
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    taskList.appendChild(li);
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [...taskList.querySelectorAll('li')].map(li => li.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Event delegation for delete and edit buttons
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
        saveTasks();
    }
    if (event.target.classList.contains('edit')) {
        const newText = prompt('Edit task:', event.target.parentElement.textContent.trim());
        if (newText !== null) {
            event.target.parentElement.textContent = newText;
            saveTasks();
        }
    }
});
