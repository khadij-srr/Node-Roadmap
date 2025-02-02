const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const tasks_f = path.join(__dirname, 'tasks.json');

function load() {
    if (!fs.existsSync(tasks_f)) {
        return [];
    }
    const data = fs.readFileSync(tasks_f, 'utf-8');
    return JSON.parse(data);
}

function save(tasks) {
    fs.writeFileSync(tasks_f, JSON.stringify(tasks, null, 2));
}

function add(description) {
    const tasks = load();
    const new_task = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
    };
    tasks.push(new_task);
    save(tasks);
    console.log(`Task added successfully (ID: ${new_task.id})`);
}

function update(id, description) {
    const tasks = load();
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.description = description;
        task.updated = new Date().toISOString();
        save(tasks);
        console.log(`Task ${id} updated successfully`);
    } else {
        console.log(`Task ${id} not found`);
    }
}

function delete_task(id) {
    let tasks = load();
    const initialLength = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    if (tasks.length < initialLength) {
        save(tasks);
        console.log(`Task ${id} deleted successfully`);
    } else {
        console.log(`Task ${id} not found`);
    }
}

function mark(id, status) {
    const tasks = load();
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        task.updated = new Date().toISOString();
        save(tasks);
        console.log(`Task ${id} marked as ${status}`);
    } else {
        console.log(`Task ${id} not found`);
    }
}

function list(status) {
    const tasks = load();
    let filtered = tasks;
    if (status) {
        filtered = tasks.filter((t) => t.status === status);
    }
    if (filtered.length === 0) {
        console.log('No tasks found');
    } else {
        filtered.forEach((task) => {
            console.log(
                `${task.id}: ${task.description} [${task.status}] (Created: ${task.created}, Updated: ${task.updated})`
            );
        });
    }
}

const program = new Command();

program.name('task-cli').description('A CLI tool to manage tasks').version('1.0.0');
program.command('add <description>').description('Add a new task').action((description) => {add(description);});
program.command('update <id> <description>').description('Update a task by ID').action((id, description) => {update(Number(id), description);});
program.command('delete <id>').description('Delete a task by ID').action((id) => {delete_task(Number(id));});
program.command('mark <id> <status>').description('Mark a task as "todo", "in-progress", or "done"').action((id, status) => {
        if (!['todo', 'in-progress', 'done'].includes(status)) {
            console.log('Error: status must be "todo", "in-progress", or "done".');
            return;
        }
        mark(Number(id), status); });

program.command('list [status]').description('List all tasks or filter by status').action((status) => {
        if (status && !['todo', 'in-progress', 'done'].includes(status)) {
            console.log('Error: Status must be "todo", "in-progress", or "done".');
        return;}
        list(status); });

program.parse(process.argv);