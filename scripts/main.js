let taskArray = [];

retrieveTasks();

function Task(description, status){
    this.description = description;
    this.status = status;
}

function storeTasks(){

    localStorage.setItem("tasks", JSON.stringify(taskArray));

}

function retrieveTasks(){

    let getTasks = JSON.parse(localStorage.getItem("tasks"));

    if(getTasks != null){

        taskArray = getTasks;
        changeTaskList();

    }

}

function changeTaskList(){

    let taskListElement = document.getElementById("tasklist");

    taskListElement.innerHTML = "";

    taskArray.map((task, index) => {

        if(task.status == "incomplete"){

            taskListElement.innerHTML += `
            <li id="${index}" class="w-auto bg-yellow-300 p-3 text-lg text-black flex rounded-md">
                <p class="cursor-pointer flex-auto w-64" onclick="completeTask(${index})">${index+1}. ${task.description}</p>
                <button onclick="deleteTask(${index})">
                    <strong class="float-right text-xl align-center cursor-pointer alert-del flex-none">&times;</strong>
                </button>
            </li>
            <br />`;

        }
        else{

            taskListElement.innerHTML += `
            <li id="${index}" class="w-auto bg-green-500 p-3 text-lg text-black flex rounded-md">
                <p class="cursor-pointer flex-auto w-64" onclick="setIncompleteTask(${index})">${index+1}. ${task.description}</p>
            </li>
            <br />`;

        }

    });

    storeTasks();

}

function saveTask() {

    let taskTextAreaValue = document.getElementById("task").value;

    if(taskTextAreaValue != ""){

        if(taskTextAreaValue.length <= 3){

            alert("Value must be greater than 3 characters!");

        }
        else{

            if(taskArray.length >= 8){

                alert("Maximum 8 items are allowed to add in the list.");

            }
            else{

                taskArray.push(new Task(taskTextAreaValue, "incomplete"));

                changeTaskList();

            }

        }

    }
    else{

        alert("Write something on the field!");

    }

}

function deleteTask(id){

    let decision = confirm("Do you want to delete the task?");
    
    if(decision){

        taskArray.splice(id, 1);

        changeTaskList();

    }

}

function completeTask(id){

    taskArray[id].status = "complete";

    changeTaskList();

}

function setIncompleteTask(id){

    taskArray[id].status = "incomplete";

    changeTaskList();

}