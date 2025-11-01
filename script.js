// Select Dom Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// NEW: Select the element for the remaining count
const remainingCountElement = document.getElementById('remaining-count');

// Try to load saved todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // Save current todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// NEW: Function to update the remaining todo count
function updateRemainingCount() {
    // Count how many tasks are NOT checked (not completed)
    const uncompletedTasks = todos.filter(todo => !todo.completed).length;
    
    // Update the text content of the element
    remainingCountElement.textContent = `Your remaining todos: ${uncompletedTasks}`;
}

// Create a DOM node for a todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        
        saveTodos();
        updateRemainingCount(); // UPDATED: Update count on change
    })

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    
    // Add double-click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    // Delete Todo Button 
    const delBtn = document.createElement('button');
    delBtn.textContent = "x"; // CHANGED: To match the sleek design
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render(); // render() now calls updateRemainingCount
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li
}

// Render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    // Recreate each item
    // We use a fixed index here, which is safer for splice operations
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node)
    });

    // NEW: Update the remaining count after rendering the list
    updateRemainingCount();
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    // Push a new todo object
    todos.push({ text: text, completed: false });
    input.value = '';
    render() // render() now calls updateRemainingCount
    saveTodos()

}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})

// Initial call to render the saved todos and the count when the page loads
render();





// NOTES SECTION: Save notes to localStorage
const notesArea = document.getElementById('notes-area');

// Load saved note if available
const savedNote = localStorage.getItem('notes');
if (savedNote) notesArea.value = savedNote;

// Save note on typing (debounced style)
notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
});


// REFLECTION SECTION
const reflectionInput = document.getElementById('reflection-input');
const savedReflection = localStorage.getItem('reflection');
if (savedReflection) reflectionInput.value = savedReflection;

reflectionInput.addEventListener('input', () => {
    localStorage.setItem('reflection', reflectionInput.value);
});
function updateRemainingCount() {
    const uncompletedTasks = todos.filter(todo => !todo.completed).length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    
    remainingCountElement.textContent = `Your remaining todos: ${uncompletedTasks}`;
    
    const completedCountElement = document.getElementById('completed-count');
    if (completedCountElement) {
        completedCountElement.textContent = `Completed tasks: ${completedTasks}`;
    }
}
