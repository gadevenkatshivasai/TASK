// Function to switch screens
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Function to add a task to the To-Do list
function addTask() {
    const taskText = document.getElementById('todo-input').value;
    if (taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `
            <span>${taskText}</span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        document.getElementById('todo-list').appendChild(taskDiv);
        document.getElementById('todo-input').value = '';
    }
}

// Function to mark a task as complete
function completeTask(button) {
    button.parentElement.classList.add('complete');
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.remove();
}
let tasks = [];
let completedTasks = [];

function addTask() {
    const task = document.getElementById('todo-input').value;
    const deadline = document.getElementById('todo-deadline').value;
    const priority = document.getElementById('todo-priority').value;
    const category = document.getElementById('todo-category').value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = {
        text: task,
        deadline: deadline,
        priority: priority,
        category: category,
        completed: false
    };

    tasks.push(taskItem);
    displayTasks();
    
    // Clear input fields
    document.getElementById('todo-input').value = '';
    document.getElementById('todo-deadline').value = '';
    document.getElementById('todo-priority').value = 'Low';
    document.getElementById('todo-category').value = '';
}

function displayTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'list-group-item d-flex justify-content-between align-items-center';

        taskDiv.innerHTML = `
            <div>
                <strong>${task.text}</strong> 
                <small class="text-muted">(${task.category})</small>
            </div>
            <div class="text-muted">
                <span class="me-2">Deadline: ${task.deadline}</span>
                <span class="me-2">Priority: ${task.priority}</span>
                <button class="btn btn-success btn-sm me-2" onclick="completeTask(${index})">Complete</button>
                <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Delete</button>
            </div>
        `;

        todoList.appendChild(taskDiv);
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    displayTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function showCompletedTasks() {
    const completedTasksList = document.getElementById('completed-tasks-list');
    completedTasksList.innerHTML = '';

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" id="task-${index}" checked disabled>
            <label for="task-${index}">${task.text} - ${task.deadline} - ${task.priority} - ${task.category}</label>
        `;
        completedTasksList.appendChild(taskItem);
    });

    // Show the modal
    const completedTasksModal = new bootstrap.Modal(document.getElementById('completedTasksModal'));
    completedTasksModal.show();
}

function openDiary(date) {
    console.log(`Opening diary entry for: ${date}`);
}

function filterDiary() {
    const filterDate = document.getElementById('diary-filter').value;
    console.log(`Filtering diary entries for: ${filterDate}`);
}



function openDiary(date) {
    // Logic to open the corresponding diary entry in the "diary.docx" file
    // For now, we just log it to the console
    console.log(`Opening diary entry for: ${date}`);
}

function filterDiary() {
    const filterDate = document.getElementById('diary-filter').value;
    console.log(`Filtering diary entries for: ${filterDate}`);
    // Logic to filter diary entries based on the selected date
}
// Function to save the diary entry
function saveDiaryEntry() {
    const date = document.getElementById('diary-filter').value;
    const entry = document.getElementById('diary-input').value;

    if (date === '') {
        alert('Please select a date.');
        return;
    }

    if (entry === '') {
        alert('Please write something in the diary.');
        return;
    }

    // Save the entry to local storage
    let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
    diaryEntries[date] = entry;
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));

    alert('Diary entry saved successfully!');

    // Clear the text area after saving
    document.getElementById('diary-input').value = '';

    // Add the date to the diary entries list if it's not already there
    if (!document.querySelector(`.diary-card[onclick="openDiary('${date}')"]`)) {
        const diaryEntriesList = document.getElementById('diary-entries');
        const newDiaryCard = document.createElement('div');
        newDiaryCard.className = 'list-group-item diary-card';
        newDiaryCard.setAttribute('onclick', `openDiary('${date}')`);
        newDiaryCard.textContent = date;
        diaryEntriesList.appendChild(newDiaryCard);
    }
}

// Function to open a diary entry
function openDiary(date) {
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
    const entry = diaryEntries[date] || '';

    document.getElementById('diary-filter').value = date;
    document.getElementById('diary-input').value = entry;
}

// Function to filter and display a diary entry for a selected date
function filterDiary() {
    const date = document.getElementById('diary-filter').value;
    openDiary(date);
}

// Other functions for diary, goals, and financial tracker will be implemented similarly
