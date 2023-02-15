import PaginationType from "@/modals/Pagination";
import Response, { State } from "@/modals/Respone";
const apiUrl: string = import.meta.env.REACT_APP_REST_API_URL
let token: string | null = localStorage.getItem('uid')


export class ProductRepository {
  constructor() {

  }

  create_product: (form: FormData) => Promise<Response> = async (form: FormData) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/items`, {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form
      })
      console.log(response)
      return await response.json()


    } catch (error) {
      console.log(error)
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  fetch_product: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/items/${id}`, {
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
  delete_product: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer " + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return await response.json()

    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  fetch_products: (pagination: PaginationType, params: any) => Promise<Response> = async (pagination: PaginationType, params: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/items?page=${pagination.currentPage}&&itemsPerPage=${pagination?.itemsPerPage}&&${params}`, {
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

  update_partial_product: (id: string, json_patch: any) => Promise<Response> = async (id: string, json_patch: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ values: json_patch }),
        headers: {
          Authorization: "Bearer " + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return await response.json()

    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  upload_image: (id: string, tag: string, form: any) => Promise<Response> = async (id: string, tag: string, form: any) => {
    try {

      const response = await fetch(`${apiUrl}/admin/api/images/${id}?type=upload&&tag=${tag}`, {
        method: 'PUT',
        body: form,
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      return await response.json()


    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  delete_image: (id: string, tag: string, image: string) => Promise<Response> = async (id: string, tag: string, image: string) => {
    try {

      const response = await fetch(`${apiUrl}/admin/api/images/${id}?type=delete&&tag=${tag}`, {
        method: 'PUT',
        body: JSON.stringify({ image: image }),
        headers: {
          Authorization: "Bearer " + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      return await response.json()


    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }

  search_products: (query: string) => Promise<Response> = async (query: string) => {
    try {
      const response = await fetch(`${apiUrl}/search?q=${query}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return await response.json()
    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }
  }

}





