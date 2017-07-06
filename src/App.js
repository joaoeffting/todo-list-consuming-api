//@flow
import React, { Component } from 'react';
import { Form, List } from './components';
import { Api } from './api';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Loader from 'react-loader-advanced';

import type { Task } from './flow/types';

type State = {
  tasks: Array<Task>,
  isEditing: boolean,
  task: Task,
  loading: boolean,
  loadingMessage: string
}

class App extends Component {
  state: State = {
    tasks: [],
    isEditing: false,
    task: {},
    loading: false,
    loadingMessage: 'Carregando ...'
  }
  componentDidMount() {
    this.loadTasks();
  }
  loadTasks = async () => {
      this.setState({loading: true, loadingMessage: 'Carregando Tarefas'});
      let response = await Api.getTasks();
      this.setState({tasks: response.data, loading: false, loadingMessage: ''});
  }
  addTask = async (description: string, done: boolean) => {
    try {
        this.setState({loading: true, loadingMessage: 'Adicionando Tarefa'});
        await Api.postTask(description, done);
        this.setState({loading: false, loadingMessage: ''});
        this.loadTasks();
        toastr.success(`Tarefa ${description} adicionada com sucesso!`);
    } catch (e) {
        toastr.error(`Ocorreu um erro ao tentar inserir a tarefa ${description}: ${e}`);
    }
  }
  removeTask = async (id: string) => {
    try {
        this.setState({loading: true, loadingMessage: 'Removendo Tarefa'});
        await Api.removeTask(id);
        let taskDescription = this.state.tasks.find(task => task._id === id) || {description : ''};
        this.setState({loading: false, loadingMessage: ''});
        this.loadTasks();
        toastr.success(`Tarefa ${taskDescription.description} removida com sucesso!`);
    } catch (e) {
        toastr.error(`Ocorreu um erro ao tentar remover a tarefa: ${e}`);
    }
  }
  editTask = async (description: string, done: boolean, id: string) => {
    try {
        this.setState({loading: true, loadingMessage: 'Editando Tarefa'});
        await Api.editTask(description, done, id);
        this.setState({loading: false, loadingMessage: ''});
        this.loadTasks();
        toastr.success(`Tarefa alterada com sucesso!`);
        this.setState({task: {}, isEditing: false})
    } catch (e) {
        toastr.error(`Ocorreu um erro ao tentar alterar a tarefa: ${e}`);
    }
  }
  onEditTaskButtonClick = (id: string) => {
    let taskToEdit = this.state.tasks.find(task => task._id === id);
    this.setState({task: taskToEdit, isEditing: true});
  }
  render() {
    const { tasks, isEditing, task, loading, loadingMessage } = this.state;
    return (
      <div>
        <Loader show={loading} message={loadingMessage} contentBlur={1} backgroundStyle={{ zIndex: 999999 }}>
          <Form
            isEditing={isEditing}
            task={task}
            addTask={this.addTask}
            editTask={this.editTask}
          />
          {
            tasks.length && 
              <List
                tasks={tasks}
                onEditTaskButtonClick={this.onEditTaskButtonClick}
                removeTask={this.removeTask}
              />
          }
        </Loader>
      </div>
    );
  }
}

export default App;