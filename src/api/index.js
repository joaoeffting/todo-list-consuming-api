//@flow
import axios from 'axios';

const ROOT_URL = `https://todowebservice.herokuapp.com/api`;

export const Api = {
    getTasks() {
        return axios.get(`${ROOT_URL}/todos`);
    },
    postTask(description: string, done: boolean) {
        let data = {
            description,
            done
        }
        return axios.post(`${ROOT_URL}/todos`, data);
    },
    removeTask(id: string) {
        return axios.delete(`${ROOT_URL}/todos/${id}`);
    },
    editTask(description: string, done: boolean, id: string) {
        let data = {
            description,
            done
        }
        return axios.put(`${ROOT_URL}/todos/${id}`, data);
    }
}