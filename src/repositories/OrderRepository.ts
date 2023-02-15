import PaginationType from "../modals/Pagination";
import Response, { State } from "../modals/Respone";
const apiUrl: string = import.meta.env.REACT_APP_REST_API_URL
let token: string | null = localStorage.getItem('uid')


export class OrderRepository {
  constructor() {

  }

  fetch_order: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/orders/${id}`, {
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

  fetch_orders: (pagination: PaginationType, params: any) => Promise<Response> = async (pagination: PaginationType, params: any) => {
    try {
      const response = await fetch(`${apiUrl}/admin/api/orders?page=${pagination.currentPage}&&itemsPerPage=${pagination?.itemsPerPage}&&${params}`, {
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

  delete_order: (id: string) => Promise<Response> = async (id: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/orders/${id}`, {
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
  change_order_status: (id: string, body: any) => Promise<Response> = async (id: string, body: any) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify(body),
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
  cancel_order: (id: string, reason: string) => Promise<Response> = async (id: string, reason: string) => {

    try {
      const response = await fetch(`${apiUrl}/admin/api/orders/${id}/cancel`, {
        method: 'PUT',
        body: JSON.stringify({ reason: reason }),
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


}





