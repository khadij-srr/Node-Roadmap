const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const path_e = path.join(__dirname, 'expenses.json');

// loading expenses
function load() {
  if (!fs.existsSync(path_e)) {
    return [];
  }
  const data = fs.readFileSync(path_e, 'utf8');
  return JSON.parse(data);
}

// saving expenses to the JSON file
function save(exp) {
  fs.writeFileSync(path_e, JSON.stringify(exp, null, 2));
}
// configuring the commands
program.command('add').description('Add a new expense').requiredOption('--description <description>', 'Description of the expense').requiredOption('--amount <amount>', 'Amount of the expense', parseFloat).action((options) => {
    const expenses = load(); 
    const new_e = {
      id: expenses.length + 1, 
      date: new Date().toISOString().split('T')[0], 
      description: options.description, 
      amount: options.amount, 
    };
    expenses.push(new_e); 
    save(expenses);
    console.log(`Expense added successfully (ID: ${new_e.id})`);
  });


program.command('list').description('List all expenses').action(() => {
    const expenses = load(); 
    if (expenses.length === 0) {
      console.log('No expenses found.');
    } else {
      console.log('ID | Date |  Description | Amount');
      expenses.forEach((exp) => {
        console.log(`${exp.id}  ${exp.date} ${exp.description}       $${exp.amount}`);
      });
    }
  });

program.command('delete').description('Delete an expense by ID').requiredOption('--id <id>', 'ID of the expense to delete', parseInt).action((options) => {
    let expenses = load(); 
    const len = expenses.length; 
    expenses = expenses.filter((exp) => exp.id !== options.id);
    if (expenses.length === len) {
      console.log(`Expense with ID ${options.id} not found`); 
    } else {
      save(expenses); 
      console.log(`Expense deleted successfully`);
    }
  });

program.command('summary').description('Show a summary of all expenses').option('--month <month>', 'Filter expenses by month (1-12)', parseInt).action((options) => {
    const expenses = load(); 
    let expn = expenses;
    if (options.month) {
      expn = expenses.filter((exp) => {
        const month = new Date(exp.date).getMonth() + 1; 
        return month === options.month; 
      });
    }
    const total = expn.reduce((sum, exp) => sum + exp.amount, 0); 
    if (options.month) {
      const month = new Date(2024, options.month - 1).toLocaleString('default', { month: 'long' }); 
      console.log(`Total expenses for ${month}: $${total}`);
    } else {
      console.log(`Total expenses: $${total}`);
    }});


// Exporting expenses     
/* program.command('export-csv').description('Export expenses to CSV file').action(() => {
    const expenses = load();
    const csv_Path = path.join(__dirname, 'expenses.csv');
    const content = 'ID,Date,Description,Amount\n' + expenses.map(exp =>`${exp.id},${exp.date},${exp.description},${exp.amount}`).join('\n');
    fs.writeFileSync(csv_Path, content);
    console.log(`Expenses exported to ${csv_Path}`);});

*/

program.parse(process.argv);