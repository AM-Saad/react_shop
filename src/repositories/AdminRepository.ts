import PaginationType from "../modals/Pagination";
import Response, { State } from "../modals/Respone";
const apiUrl: string = import.meta.env.REACT_APP_REST_API_URL
let token: string | null = localStorage.getItem('uid')


export class AdminRepository {
  constructor() {

  }


  login: (email: string, password: string,) => Promise<Response> = async (email: string, password: string,) => {

    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  me: () => Promise<Response> = async () => {

    try {
      const response = await fetch(`${apiUrl}/admin/me`, {
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

  create_category: (form: FormData) => Promise<Response> = async (form: FormData) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/category`, {
        method: 'POST',
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
  upload_category_image: (id: string, tag: string, body: any) => Promise<Response> = async (id: string, tag: string, body: any) => {
    console.log(body)
    try {
      const response = await fetch(`${apiUrl}/admin/api/images/${id}?type=upload&&tag=${tag}`, {
        method: 'PUT',
        body: body,
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      return await response.json()

    } catch (error) {
      return { message: 'Something went wrong.', state: State.ERROR }
    }

  }
  delete_category_image: (id: string, tag: string, image: string) => Promise<Response> = async (id: string, tag: string, image: string) => {

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
  fetch_category: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/category/${id}`, {
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
  delete_category: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/category/${id}`, {
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
  fetch_categories: (pagination: PaginationType, params: any) => Promise<Response> = async (pagination: PaginationType, params: any) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/category?page=${pagination.currentPage}&&itemsPerPage=${pagination?.itemsPerPage}&&${params}`, {
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
  update_partial_category: (id: string, json_patch: any) => Promise<Response> = async (id: string, json_patch: any) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/category/${id}`, {
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
  update_partial_admin: (id: string, json_patch: any) => Promise<Response> = async (id: string, json_patch: any) => {

    try {
      const response = await fetch(`${apiUrl}/admin/settings/info/${id}`, {
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





