import { handleErrors } from "../utils/errorHandling_ts"

export const getAll = () => fetch("/api/options").then(handleErrors).then(response => response.json())
export const getItem = (id:string) => fetch(`/api/options/${id}`).then(handleErrors).then(response => response.json())

export const create = (data:any) => {
    return fetch("/api/options", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}

export const update = (data:any, id:string) => {
    return fetch(`/api/options/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}
