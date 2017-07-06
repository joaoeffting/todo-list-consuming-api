//@flow
import axios from 'axios';
import type { Task } from '../flow/types';

const ROOT_URL = `https://todowebservice.herokuapp.com/api`;

export const Api = {
    getTasks() {
        return axios.get(`${ROOT_URL}/todos`);
    },
    postTask(description: Task.description, done: Task.done) {
        let data = {
            description,
            done
        }
        return axios.post(`${ROOT_URL}/todos`, data);
    },
    removeTask(id: Task._id) {
        return axios.delete(`${ROOT_URL}/todos/${id}`);
    },
    editTask(description: Task.description, done: Task.done, id: Task._id) {
        let data = {
            description,
            done
        }
        return axios.put(`${ROOT_URL}/todos/${id}`, data);
    }
}