import React from 'react'

class TodoList extends React.Component {
    state = {
        'tasks':[   
            {
                'id': 1,
                'description':'Walk the dog',
                'done': false
            },
            {
                'id': 2,
                'description': 'Clean the room',
                'done': false
            },
            {
                'id': 3,
                'description': 'Do the laundy',
                'done': false
            }
        ],
        newTaskDescription:'',
        modifiedTaskDescription:'',
        taskIdBeingEdited:0
    }

    updateFormField = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    addTask = () => {

        // TOOO: add the task to the mongoDB via api,
        //thn the api should send back the id of newly inserted task 
        let newTask = {
            id: Math.floor(Math.random() * 100000 + 9999),
            description: this.state.newTaskDescription,
            done: false
        }

        // clone
        let clone = this.state.tasks.slice();
        // modify
        clone.push(newTask);
        // replace
        this.setState({
            'tasks': clone
        })
    }

    editTask = (taskIdBeingEdited) => {
        let taskBeingEdited = this.state.tasks.find(function(task){
            return task.id === taskIdBeingEdited
        })
        this.setState({
            'taskIdBeingEdited': taskIdBeingEdited,
            'modifiedTaskDescription': taskBeingEdited.description
        })
    }

    processEditTask = () => {
        let indexToReplace = this.state.tasks.findIndex((task)=>{
            return task.id === this.state.taskIdBeingEdited
        })

        // alternatively instead of using findIndex, use the below:
        // let foundIndex = -1;
        // for (let i = 0; i < this.state.tasks.length; i++) {
        //     if (this.state.tasks[i].id == this.state.taskIdBeingEdited) {
        //         foundIndex = i;
        //         break;
        //     }
        // }

        // clone the task that is being edited
        // let modifiedTask = {...this.state.tasks[indexToReplace]};
        // // and make changes to it
        // modifiedTask.description = this.state.modifiedTaskDescription;

        let modifiedTask =  {
            id : this.state.tasks[indexToReplace].id,
            description: this.state.modifiedTaskDescription,
            done: this.state.tasks[indexToReplace].done
        }

        let cloned = [
            // put in the tasks before the index to replace
            ...this.state.tasks.slice(0, indexToReplace),
            modifiedTask,
            ...this.state.tasks.slice(indexToReplace+1)

        ]
        
        this.setState({
            'tasks': cloned,
            'taskIdBeingEdited':0
        })
    }

    deleteTask = (taskIdBeingDeleted) => {
        // clone the array
        let cloned = this.state.tasks.slice();
        // modify the array
        let indexToDelete = this.state.tasks.findIndex((task)=>{
            return task.id === taskIdBeingDeleted
        })
        cloned.splice(indexToDelete, 1);

        // replace the clone into the state
        this.setState({
            'tasks': cloned
        })
    }


    renderNormalTask = (t) => {
        return <li key={t.id}>
        {t.description}
        <button onClick={()=>{
            // call a function with an arugment
            // because of an event, we will
            // use an event handler
            this.editTask(t.id)
        }}>Edit</button>
         <button onClick={()=>{
            this.deleteTask(t.id)
        }}>Delete</button>
    </li>
    }

    renderEditedTask = (t) => {
        return <li key={t.id}>
        <input type="text" 
               value={this.state.modifiedTaskDescription}
               onChange={this.updateFormField}
               name="modifiedTaskDescription"
        />
        <button onClick={this.processEditTask}>Update</button>
    </li>
    }

    renderTaskList = () => {
        let taskJSXs = [];
        for (let t of this.state.tasks) {
            // check if the task that we are displaying
            // is being edited or not

            if (this.state.taskIdBeingEdited != t.id) {
                taskJSXs.push(this.renderNormalTask(t))
            } else {
                taskJSXs.push(this.renderEditedTask(t))
            }
           
        }
        return taskJSXs;
    }

    render() {

        return <React.Fragment>
            <h1>Todo List </h1>
            <div>
                <label>Name of Task:</label>
                <input name="newTaskDescription" 
                       type="text"
                       value={this.state.newTaskDescription}
                       onChange={this.updateFormField}/>
                <button onClick={this.addTask}>Add</button>
            </div>
           <ul>
               {this.renderTaskList()}
           </ul>
        </React.Fragment>

    }
}

export default TodoList;