
const logs = [];

const form = document.querySelector('.log-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const reflection = document.getElementById('reflection').value;
    const logData = {
        date,
        category,
        title,
        description,
        status,
        reflection
    };
    logs.push(logData);
    addLog(logData);
    updateSummary();
    form.reset();
});

function addLog(logData) {
    const totalLogs = logs.length;
    const logsList = document.querySelector('.logs-list');
    const logCard = document.createElement('article');
    logCard.classList.add('log-card');
    const logTitle = document.createElement('h3');
    const logMeta = document.createElement('div');
    logMeta.classList.add('log-meta');
    const logCategory = document.createElement('span');
    logCategory.classList.add('log-category');
    const logStatus = document.createElement('span');
    logStatus.classList.add('log-status');
    const logDate = document.createElement('span');
    logDate.classList.add('log-date');
    const logDescription = document.createElement('p');
    const logReflection = document.createElement('p');
    logTitle.textContent = logData.title;
    logCategory.textContent = logData.category;
    logStatus.textContent = logData.status;
    logDate.textContent = logData.date;
    logDescription.textContent = logData.description;
    logReflection.textContent = logData.reflection;
    logCard.appendChild(logTitle);
    logMeta.appendChild(logCategory);
    logMeta.appendChild(logStatus);
    logMeta.appendChild(logDate);
    logCard.appendChild(logMeta);
    logCard.appendChild(logDescription);
    logCard.appendChild(logReflection);
    const emptyState = document.querySelector('.empty-state-log');
    if (emptyState) {
        emptyState.remove();
    }
    if (totalLogs > 0) {
        logsList.insertBefore(logCard, logsList.firstElementChild);
    } else {
        logsList.appendChild(logCard);
    }
}

function updateSummary() {
    let total = logs.length;
    let solved = logs.filter(log => log.status === 'solved').length;
    let submitted = logs.filter(log => log.status === 'submitted').length;
    let inProgress = logs.filter(log => log.status === 'in_progress').length;
    document.getElementById('total-sum').textContent = total;
    document.getElementById('solved-sum').textContent = solved;
    document.getElementById('submitted-sum').textContent = submitted;
    document.getElementById('in_progress-sum').textContent = inProgress;
}