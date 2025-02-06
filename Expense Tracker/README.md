a simple expenses tracker application to manage your finances. The application allows users to add, delete, view their expenses, and provide a summary of the expenses , also export expenses to CSV.
## Command Reference and Usage Guide
```bash
$ tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)

$ tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: 2)

$ tracker list
# ID | Date   |  Description | Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10

$ tracker summary
# Total expenses: $30

$ tracker delete --id 2
# Expense deleted successfully

$ tracker summary
# Total expenses: $20

$ tracker summary --month 8
# Total expenses for August: $20

$ tracker export-csv
# Expenses exported to ...\expenses.csv
```
