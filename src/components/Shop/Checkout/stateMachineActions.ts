import { GlobalState } from "little-state-machine";
 import Checkout from '../../../modals/Checkout'

declare module "little-state-machine" {
    interface GlobalState {
      form: Checkout;
      data?: any;
      version: number;
    }
  }


export const updateForm = (state: GlobalState, payload:any) => {
  return ({...state, form: {...state.form, ...payload,}, })
}


