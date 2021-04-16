import { handleErrors } from "../utils/errorHandling_ts"
import { Vendor } from "../Models/Vendor"

export const getAll = () => fetch("/api/productVendors").then(handleErrors).then(response => response.json())