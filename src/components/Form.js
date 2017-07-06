//@flow
import React, { Component } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import '../assets/form.css';
import type { Task } from '../flow/types';

type Props = {
    addTask: (description: string, done: boolean) => void,
    editTask: (description: string, done: boolean, _id: string) => void,
    isEditing: boolean,
    task: Task
}

type State = {
    descricao: string,
    done: boolean
}

const initState = {
    descricao: "",
    done: false
}

class Form extends Component {
    props: Props;
    state: State = initState;
    descricaoRef = null;
    onFormSubmit = async (e: Event) => {
        e.preventDefault();
        const { descricao, done } = this.state;
        if (!descricao) {
            toastr.warning("É obrigatório informar uma descrição para a tarefa!");
            if (this.descricaoRef)
                this.descricaoRef.focus();
            return;
        }

        this.props.isEditing 
            ? this.props.editTask(descricao, done, this.props.task._id) 
            : this.props.addTask(descricao, done);

        this.setState(initState);
    }
    componentWillReceiveProps(nextProps : Props) {
        if (nextProps.isEditing && this.props.task !== nextProps.task) {
            const { description, done} = nextProps.task;
            this.setState({
                descricao: description,
                done
            })
        }
    }
    render() {
        const { descricao, done } = this.state;
        const { isEditing } = this.props;
        return (
            <div className="contact-clean">
                <form onSubmit={this.onFormSubmit}>
                    <h2 className="text-center">Adicione uma tarefa</h2>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            ref={(input) => this.descricaoRef = input}
                            placeholder="Digite uma tarefa"
                            value={descricao}
                            onChange={(e) => this.setState({descricao: e.currentTarget.value})}
                        />
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <label className="control-label">
                                <input 
                                    type="checkbox"
                                    checked={done}
                                    onChange={(e) => this.setState({done: !done})}
                                />
                                    Completa
                                </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button 
                            className="btn btn-primary" 
                            type="submit"
                        >
                            {isEditing ? "Alterar": "Adicionar"}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;