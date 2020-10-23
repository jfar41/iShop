import tokenService from './tokenService';
const BASE_URL = '/api/products';

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
    }).then(res => res.json());
}

export function create(item) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(item)
    }).then(res => res.json());
}

export function update(item) {
    return fetch(`${BASE_URL}/${item._id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(item)
    }).then(res => res.json())
}

export function deleteOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    }).then(res => res.json());
}

export default {
    getAll,
    create,
    update,
    deleteOne
}