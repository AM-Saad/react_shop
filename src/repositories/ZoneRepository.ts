import PaginationType from "../modals/Pagination";
import Response, { State } from "../modals/Respone";
const apiUrl: string = import.meta.env.REACT_APP_REST_API_URL
let token: string | null = localStorage.getItem('uid')


export class ZoneRepository {
  constructor() {

  }


  fetch_zone: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/zones/${id}`, {
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

  fetch_zones: (pagination: PaginationType, params: any) => Promise<Response> = async (pagination: PaginationType, params: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/zones?page=${pagination.currentPage}&&itemsPerPage=${pagination?.itemsPerPage}&&${params}`, {
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

  delete_zone: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/zones/${id}`, {
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


  update_partial_zone: (id: string, json_patch: any) => Promise<Response> = async (id: string, json_patch: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/zones/${id}`, {
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
  create_zone: (form: any) => Promise<Response> = async (form: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/zones`, {
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
}






