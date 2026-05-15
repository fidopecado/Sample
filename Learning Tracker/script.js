const logs = [];
let currentlyEditingLogId = null;

const form = document.querySelector('.log-form');
const statusFilter = document.getElementById('status-filter');
const searchRecent = document.getElementById('search-recent');

function saveAndRender() {
    saveLogs();
    updateSummary();
    applyFilters();
}

function cancelEdit() {
    currentlyEditingLogId = null;
    form.reset();
    document.querySelector('.log-form button[type="submit"]').textContent = 'Add Log';

    const cancelBtn = document.querySelector('.log-form .cancel-btn');
    if (cancelBtn) cancelBtn.remove();

    saveAndRender();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const logData = {
        date: document.getElementById('date').value,
        category: document.getElementById('category').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        reflection: document.getElementById('reflection').value
    };

    if (currentlyEditingLogId === null) {
        logData.id = Date.now();
        logs.push(logData);
    } else {
        const logIndex = logs.findIndex(log => log.id === currentlyEditingLogId);
        if (logIndex !== -1) {
            logs[logIndex] = { ...logs[logIndex], ...logData };
        }
        currentlyEditingLogId = null;
        document.querySelector('.log-form button[type="submit"]').textContent = 'Add Log';
    }

    saveAndRender();
    form.reset();
    
    // Menghapus class 'editing' setelah submit
    document.querySelectorAll('.log-card').forEach(card => card.classList.remove('editing'));
});

function addLog(logData) {
    const logsList = document.querySelector('.logs-list');
    const emptyState = document.querySelector('.empty-state-log');
    if (emptyState) emptyState.remove();

    const logCard = document.createElement('article');
    logCard.classList.add('log-card');
    
    // Menambahkan data-id agar elemen kartu mudah ditargetkan
    logCard.dataset.id = logData.id;
    
    // Memastikan class tetap ada jika terjadi re-render saat mode edit aktif
    if (currentlyEditingLogId === logData.id) {
        logCard.classList.add('editing');
    }
    
    logCard.innerHTML = `
        <h3>${logData.title}</h3>
        <div class="log-meta">
            <span class="log-category">${logData.category}</span>
            <span class="log-status">${logData.status}</span>
            <span class="log-date">${logData.date}</span>
        </div>
        <p>${logData.description}</p>
        <p>${logData.reflection}</p>
        <button type="button" class="delete-btn">Delete</button>
        <button type="button" class="edit-btn">Edit</button>
    `;

    logCard.querySelector('.delete-btn').addEventListener('click', () => {
        if (deleteLog(logData.id)) saveAndRender();
    });

    logCard.querySelector('.edit-btn').addEventListener('click', () => {
        editLog(logData.id); 
    });

    logsList.insertBefore(logCard, logsList.firstElementChild);
}

function updateSummary() {
    document.getElementById('total-sum').textContent = logs.length;
    document.getElementById('solved-sum').textContent = logs.filter(log => log.status === 'solved').length;
    document.getElementById('submitted-sum').textContent = logs.filter(log => log.status === 'submitted').length;
    document.getElementById('in_progress-sum').textContent = logs.filter(log => log.status === 'in_progress').length;
}

function saveLogs() {
    localStorage.setItem('learningTrackerLogs', JSON.stringify(logs));
}

function loadLogs() {
    const storedLogs = localStorage.getItem('learningTrackerLogs');
    if (storedLogs) {
        logs.push(...JSON.parse(storedLogs));
        updateSummary();
        applyFilters();
    }
}

function deleteLog(logId) {
    const logIndex = logs.findIndex(log => log.id === logId);
    if (logIndex !== -1) {
        logs.splice(logIndex, 1);
        return true;
    }
    return false;
}

function editLog(logId) {
    const log = logs.find(log => log.id === logId);
    if (log) {
        currentlyEditingLogId = logId;
        const fields = ['date', 'category', 'title', 'description', 'status', 'reflection'];
        fields.forEach(field => document.getElementById(field).value = log[field]);
        
        const submitBtn = document.querySelector('.log-form button[type="submit"]');
        submitBtn.textContent = 'Update Log';

        if (!document.querySelector('.log-form .cancel-btn')) {
            const cancelBtn = document.createElement('button');
            cancelBtn.id = 'cancel-btn';
            cancelBtn.type = 'button';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.classList.add('cancel-btn');
            cancelBtn.addEventListener('click', cancelEdit);
            submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
        }

        // Menghapus class 'editing' dari semua kartu, lalu menambahkan ke kartu yang dipilih
        document.querySelectorAll('.log-card').forEach(card => card.classList.remove('editing'));
        const activeCard = document.querySelector(`.log-card[data-id="${logId}"]`);
        if (activeCard) {
            activeCard.classList.add('editing');
        }

        return true;
    }
    return false;
}

function renderLogs(logArray) {
    const logsList = document.querySelector('.logs-list');
    logsList.innerHTML = '';
    
    if (logArray.length === 0) {
        logsList.innerHTML = '<p class="empty-state-log">No logs to display. Add your first log!</p>';
    } else {
        logArray.forEach(log => addLog(log));
    }
}

statusFilter.addEventListener('change', applyFilters);
searchRecent.addEventListener('input', applyFilters);

const sortRecent = document.getElementById('sort-recent');
sortRecent.addEventListener('change', applyFilters);

function applyFilters() {
    const selectedStatus = statusFilter.value;
    const searchTerm = searchRecent.value.toLowerCase();

    const filteredLogs = logs.filter(log => {
        const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
        const matchesSearch = !searchTerm || log.description.toLowerCase().includes(searchTerm) || log.reflection.toLowerCase().includes(searchTerm) || log.title.toLowerCase().includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    let sortOption = document.getElementById('sort-recent').value;
    const sortedLogs = [...filteredLogs];
    if (sortOption === 'date_desc') {
        sortedLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'date_asc') {
        sortedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'title_asc') {
        sortedLogs.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'title_desc') {
        sortedLogs.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderLogs(sortedLogs);
}

loadLogs();