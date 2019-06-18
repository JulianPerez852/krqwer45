import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false },
      ],
      newTask: '',
      isError: '',
    }
    this.handlerText= this.handlerText.bind(this);
    this.handlerNewTask=this.handlerNewTask.bind(this);
    this.handlerTaskClick=this.handlerTaskClick.bind(this);
  }

  handlerText(e){
    this.setState({
      newTask: e.target.value,
    })
  }

  handlerNewTask(e){
    if(e.key==="Enter"){
      if(this.state.newTask === '') {
        e.preventDefault()
        console.log("vacio");
        this.setState({
          isError: 'error'
        })
      } else {
        e.preventDefault()
        const { tasks } = this.state;
        const lenTask = tasks.length;
        console.log(e.target.value);
        const newTaskTodo = {
          id: lenTask + 1,
          name: e.target.value,
          done: false,
        };
        this.state.tasks.push(newTaskTodo);
        this.setState({ 
          tasks,
          newTask: ""
        })
      }
    }
  }

  handlerTaskClick(id){
    const {tasks}= this.state;

    tasks.map(function(dato){
      if(dato.id === id){
        dato.done = !dato.done;
      }
      return dato;
    });

    this.setState({
      tasks: tasks
    });  

  }



  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li key={task.id} className={task.done === true ? `done` : ''} onClick={()=>this.handlerTaskClick(task.id)} >{task.name}</li>)}
          </ul>
          <form>
            <input type="text" id="new-task" className={this.state.isError} placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} onChange={this.handlerText} onKeyPress={this.handlerNewTask} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
