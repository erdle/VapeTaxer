import { handleErrors } from "../utils/errorHandling_ts"

export const getPaged = (page = 0) => {
    return fetch(`/api/products/paged/${page}`).then(handleErrors).then(res => res.json())
}
export const search = (term, page = 0) => {
    return fetch(`/api/products/search/${page}/${term}`).then(handleErrors).then(res => res.json())
}

export const getAll = () => fetch("/api/products").then(handleErrors).then(response => response.json())

export const syncAllProducts = () => fetch("/api/products/getallofthem").then(handleErrors).then(response => response.json())

export const getItem = (id) => fetch(`/api/products/${id}`).then(handleErrors).then(response => response.json())

export const create = (data) => {
    return fetch("/api/products", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}

export const update = (data, id) => {
    return fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}


