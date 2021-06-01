import { handleErrors } from "../utils/errorHandling_ts"

export const getPaged = (page = 0, page_size = 10, sort = 'created') => fetch(`/api/products/${page}/${page_size}/${sort}`).then(handleErrors).then(response => response.json())
export const syncAllProducts = () => fetch(`/api/products/sync_all`).then(handleErrors).then(response => response.json())
