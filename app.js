const form = document.querySelector("#task-form");
const task_list = document.querySelector(".collection");
const clear_btn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const task_input = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", get_tasks);
    form.addEventListener("submit", add_task);
    task_list.addEventListener("click", remove_task);
    clear_btn.addEventListener("click", clear_tasks);
    filter.addEventListener("keyup", filter_tasks);
}

function get_tasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);

        task_list.appendChild(li);
    })
}

function add_task(event) {
    if (task_input.value === "") {
        alert("Add a task");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task_input.value));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);

        task_list.appendChild(li);

        store_task(task_input.value);

        task_input.value = "";
    }

    event.preventDefault();
}

function store_task(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function remove_task(event) {
    if (event.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            event.target.parentElement.parentElement.remove();
            unstore_task(event.target.parentElement.parentElement);
        }
    }
}

function unstore_task(task_item) {
    let tasks;

    console.log("unstoring");
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (task_item.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clear_tasks() {
    while (task_list.firstChild) {
        task_list.removeChild(task_list.firstChild)
    }
    localStorage.clear();
}


function filter_tasks(event) {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}
