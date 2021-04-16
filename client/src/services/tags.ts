import { handleErrors } from "../utils/errorHandling_ts"

export const getAll = () => fetch("/api/tags").then(handleErrors).then(response => response.json())