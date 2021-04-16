import { handleErrors } from "../utils/errorHandling_ts"

export const getAll = () => fetch("/api/collections").then(handleErrors).then(response => response.json())
export const getCustomCollections = () => fetch("/api/collections/custom").then(handleErrors).then(response => response.json())
