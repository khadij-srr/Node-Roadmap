A simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on.
## Command Reference and Usage Guide
```bash
# Adding a new task
CLI add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
CLI update 1 "Buy groceries and cook dinner"
CLI delete 1

# Marking a task as in progress or done
CLI mark-in-progress 1
CLI mark-done 1

# Listing all tasks
CLI list

# Listing tasks by status
CLI list done
CLI list todo
CLI list in-progress
```
