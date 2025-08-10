const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load tasks
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ text, completed }) => addTaskToDOM(text, completed));
});

// Save tasks
function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task node to the DOM
function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete" aria-label="Delete task">
            <span class="material-icons">delete_outline</span>
        </button>
    `;
    if (completed) li.classList.add('completed');

    // Toggle completion
    li.querySelector('.task-text').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete task
    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    list.appendChild(li);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText === "") return;
    addTaskToDOM(taskText);
    saveTasks();
    input.value = '';
});
