import { handleErrors } from "../utils/errorHandling_ts"

export const getAll = () => fetch("/api/productTypes").then(handleErrors).then(response => response.json())
export const getItem = (id:string) => fetch(`/api/productTypes/${id}`).then(handleErrors).then(response => response.json())

export const create = (data:any) => {
    return fetch("/api/productTypes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}

export const update = (data:any, id:string) => {
    return fetch(`/api/productTypes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}
