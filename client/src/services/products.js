import { handleErrors } from "../utils/errorHandling_ts"

export const getAll = (page = 0, page_size = 10, sort = 'created') => fetch(`/api/products/${page}/${page_size}/${sort}`).then(handleErrors).then(response => response.json())
export const getPending = (page = 0, page_size = 10, sort = 'created') => fetch(`/api/products/pending/${page}/${page_size}/${sort}`).then(handleErrors).then(response => response.json())
export const getApproved = (page = 0, page_size = 10, sort = 'created') => fetch(`/api/products/approved/${page}/${page_size}/${sort}`).then(handleErrors).then(response => response.json())

export const syncAllProducts = () => fetch(`/api/products/sync_all`).then(handleErrors).then(response => response.json())
export const syncAndGet = (id) => fetch(`/api/products/sync_and_get/${id}`).then(handleErrors).then(response => response.json())

export const approve = (id, data) => {
    return fetch(`/api/products/approve/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors).then(res => res.json())
}
