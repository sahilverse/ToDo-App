// Sets Date
const dateContainer = document.getElementById('date');

let date = new Date();

let daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let month = monthsList[date.getMonth()];
let day = daysList[date.getDay()];
let todayDate = date.getDate();

dateContainer.innerHTML = `${day}, ${month} ${todayDate}`;

// Creating Tasks

const input = document.getElementById('inputTask');
const taskList = document.getElementById('taskList');

function createTask() {

    if (input.value == '') {
        alert('Task cannot be empty');
    } else {
        let li = document.createElement('li');
        li.innerHTML = input.value;
        taskList.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    };
    input.value = "";
    setData();
};

input.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {
        createTask();
    };
});

const add = document.getElementById('plus');
add.addEventListener('click', createTask)

// Mark complete or delete Task;
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        setData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        setData();
    }
});


// Storing in local Storage
function setData() {
    localStorage.setItem("Task", taskList.innerHTML);
};

// Gets data from local Storage
taskList.innerHTML = localStorage.getItem("Task");

// Search Engine;
const searchValue = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

function searchTask() {
    let filter = searchValue.value.toUpperCase();
    const taskList = document.getElementById('taskList');
    let isMatch = false;
    let a = taskList.getElementsByTagName('li');
    for (let i = 0; i < a.length; i++) {

        if (a[i].innerHTML.toUpperCase().includes(filter) || a[i].textContent.toUpperCase().includes(filter) || a[i].innerText.toUpperCase().includes(filter)) {
            a[i].style.display = "";
            isMatch = true;
        } else {
            a[i].style.display = "none";
        };
    };

    const noMatch = document.querySelector('.noMatch');
    if (!isMatch) {
        noMatch.style.display = "flex";
        noMatch.innerHTML = `<p>No Matching Task Found</p>`;
    } else {
        noMatch.style.display = "none";
    };

};

searchValue.addEventListener('keyup', searchTask);
searchBtn.addEventListener('click', searchTask);