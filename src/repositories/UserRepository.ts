
import PaginationType from "@/modals/Pagination";
import Response, { State } from "@/modals/Respone";
const apiUrl: string = import.meta.env.REACT_APP_REST_API_URL
let token: string | null = localStorage.getItem('uid')


export class UserRepository {
    constructor() {

    }

    fetch_products: (pagination: PaginationType, params: any) => Promise<Response> = async (pagination: PaginationType, params: any) => {
        try {
          const response = await fetch(`${apiUrl}/products?page=${pagination.currentPage}&&itemsPerPage=${pagination?.itemsPerPage}&&${params}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: "Bearer " + token,
    
            }
          })
          return await response.json()
    
        } catch (error) {
          return { message: 'Something went wrong.', state: State.ERROR }
        }
    
      }
    fetch_product: (slug: string) => Promise<Response> = async (slug: string) => {

        try {
            const response = await fetch(`${apiUrl}/products/${slug}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,

                }
            })
            return await response.json()


        } catch (error) {
            return { message: 'Something went wrong.', state: State.ERROR }
        }
    }
}