//controller to  display all data
app.controller('mainController', ['$window', function ($window) {
    
    if ($window.localStorage.tasks) {

        this.tasks = JSON.parse($window.localStorage.tasks);
    } else {

        $window.localStorage.tasks = JSON.stringify([]);
        this.tasks = JSON.parse($window.localStorage.tasks);
    }
    this.newTask = '',
    this.editedText = '',
    this.editTaskIndex = '',
    this.status = '',


        //Add new task in todo 
        this.addTask = function () {
            if (this.newTask !== '') {
                this.tasks.unshift({
                    task: this.newTask,
                    completed: false
                });
                $window.localStorage.tasks = JSON.stringify(this.tasks);
                this.newTask = '';
                console.log(this.tasks);
            }

        },

        //Function to delete task 
        this.deleteTask = function (index) {
            this.tasks.splice(index, 1);
            $window.localStorage.tasks = JSON.stringify(this.tasks);
        },

        this.taskToEdit = function (index, task) {
            this.editedText = task.task;
            this.editTaskIndex = index;
        },
        //Function to edit task 
        this.editTask = function (index) {
            this.tasks[index].task = this.editedText;
            $window.localStorage.tasks = JSON.stringify(this.tasks);
            this.editedText = '';
        },

        //Function to move task up in order
        this.moveUp = function (task) {


            let result = this.tasks.filter(function (obj) {
                return obj.task == task;
            });
            let index = this.tasks.indexOf(result[0]);
            if (index !== 0) {
                let temp = this.tasks[index - 1];
                this.tasks[index - 1] = this.tasks[index];
                this.tasks[index] = temp;
                if (this.status == '') {
                    $window.localStorage.tasks = JSON.stringify(this.tasks);
                }
            }
        },
        //Function to move task down in order
        this.moveDown = function (task) {
            let result = this.tasks.filter(function (obj) {
                return obj.task == task;
            });
            let index = this.tasks.indexOf(result[0]);


            if (index !== this.tasks.length - 1) {
                let temp = this.tasks[index + 1];
                this.tasks[index + 1] = this.tasks[index];
                this.tasks[index] = temp;
                if (this.status == '') {

                    $window.localStorage.tasks = JSON.stringify(this.tasks);
                }
            }
        },
        //Function to change status of task
        this.taskStatus = function (task) {

            let result = this.tasks.filter(function (obj) {
                return obj.task == task;
            });
            let index = this.tasks.indexOf(result[0]);
            this.tasks[index].completed = !this.tasks[index].completed;

            $window.localStorage.tasks = JSON.stringify(this.tasks);
        }

}]);
//end