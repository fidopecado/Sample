
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
        id: Date.now(),
        date,
        category,
        title,
        description,
        status,
        reflection
    };
    logs.push(logData);
    addLog(logData);
    saveLogs();
    updateSummary();
    form.reset();
});

function addLog(logData) {
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
    logsList.insertBefore(logCard, logsList.firstElementChild);
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    logCard.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        const deleted = deleteLog(logData.id);
        if (deleted) {
            saveLogs();
            updateSummary();
            logCard.remove();
            if (logs.length === 0) {
                const emptyState = document.createElement('p');
                emptyState.classList.add('empty-state-log');
                emptyState.textContent = 'No logs to display. Add your first log!';
                logsList.appendChild(emptyState);
            }
        }
    });
}

function updateSummary() {
    const total = logs.length;
    const solved = logs.filter(log => log.status === 'solved').length;
    const submitted = logs.filter(log => log.status === 'submitted').length;
    const inProgress = logs.filter(log => log.status === 'in_progress').length;
    document.getElementById('total-sum').textContent = total;
    document.getElementById('solved-sum').textContent = solved;
    document.getElementById('submitted-sum').textContent = submitted;
    document.getElementById('in_progress-sum').textContent = inProgress;
}

function saveLogs() {
    const learningTrackerLogs = JSON.stringify(logs);
    localStorage.setItem('learningTrackerLogs', learningTrackerLogs);
}

function loadLogs() {
    const storedLogs = localStorage.getItem('learningTrackerLogs');
    if (storedLogs) {
        logs.push(...JSON.parse(storedLogs));
        logs.forEach(log => addLog(log));
        updateSummary();
    }
}

function deleteLog(logId) {
    const logIndex = logs.findIndex(log => log.id === logId);
    if (logIndex !== -1) {
        logs.splice(logIndex, 1);
        saveLogs();
        updateSummary();
        return true;
    } else {
        return false;
    }
    
}

loadLogs();