let drawing = false;
let ctx;

function startDrawing() {
    const canvas = document.getElementById('visualizationCanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mousemove', draw);
}

function stopDrawing() {
    const canvas = document.getElementById('visualizationCanvas');
    canvas.removeEventListener('mousedown', () => drawing = true);
    canvas.removeEventListener('mouseup', () => drawing = false);
    canvas.removeEventListener('mousemove', draw);
}

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineTo(event.clientX - ctx.canvas.offsetLeft, event.clientY - ctx.canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - ctx.canvas.offsetLeft, event.clientY - ctx.canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

let currentSlide = 0;

function moveCarousel(direction) {
    const images = document.querySelector('.carousel-images');
    const totalImages = images.children.length;
    currentSlide = (currentSlide + direction + totalImages) % totalImages;
    images.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function estimateCost() {
    const area = document.getElementById('area').value;
    const costPerSqFt = document.getElementById('costPerSqFt').value;
    const estimatedCost = area * costPerSqFt;
    document.getElementById('estimatedCost').textContent = `Estimated Cost: $${estimatedCost}`;
}

let budgetItems = [];

function addBudgetItem() {
    const item = document.getElementById('item').value;
    const amount = document.getElementById('amount').value;
    budgetItems.push({ item, amount: parseFloat(amount) });
    updateBudgetList();
}

function updateBudgetList() {
    const budgetList = document.getElementById('budgetList');
    budgetList.innerHTML = '';
    let totalBudget = 0;
    budgetItems.forEach(({ item, amount }) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item}: $${amount}`;
        budgetList.appendChild(listItem);
        totalBudget += amount;
    });
    document.getElementById('totalBudget').textContent = `Total Budget: $${totalBudget}`;
}

function addTask() {
    const task = document.getElementById('task').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const taskList = document.getElementById('taskList');
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = `${task} - ${taskDescription} (Due: ${dueDate})`;
    taskList.appendChild(newTaskItem);
}

function updateProgress() {
    const progressRange = document.getElementById('progressRange').value;
    document.getElementById('progressText').textContent = `${progressRange}%`;
    const timelineProgress = document.getElementById('timelineProgress');
    timelineProgress.style.width = `${progressRange}%`;
}
