import React, { useEffect, useReducer } from 'react'
import EditIcon from './EditIcon'
enum ActionKind {
  USER_INPUT = 'USER_INPUT',
}
type Action = {
  type: ActionKind,
  value: string | number;
  isEdit: boolean;
}

interface InputState {
  value: string | number;
  isEdit: boolean;
}


const inputReducer = (state: InputState, action: Action) => {
  if (action.type === ActionKind.USER_INPUT) {
    return { isEdit: action.isEdit, value: action.value }
  }
  return { isEdit: false, value: state.value }
}

const EditableMultiselect: React.FC<{ label: string, inputType: string; defaultVal: string | number, loading: boolean; onSave: (value: string | number) => void }> = ((props, ref) => {

  const [inputState, dispatchInputState] = useReducer(inputReducer, { isEdit: false, value: props.defaultVal });

  useEffect(() => {
    console.log(props.defaultVal)
  }, [props.defaultVal])
  return (
    <>
      <div className="text-left border-b-1-g mb-6 pb-2 border-b-2">
        <span className="text-xl font-bold text-gray-600 mb-2">{props.label}</span>

        <div className="flex items-center mb-5 mt-3">
          <p className={`${inputState.isEdit ? 'hidden' : 'block'} mr-5  font-medium text-lg`}>{props.defaultVal}</p>
          <EditIcon isEdit={inputState.isEdit} startEdit={() => { dispatchInputState({ type: ActionKind.USER_INPUT, isEdit: true, value: props.defaultVal }) }} />
        </div>
        <div className={`${inputState.isEdit ? 'block' : 'hidden'}`}>
          <input className={`border-1-b bg-lightgray  w-full  p-large b-r-medium mb-2 m-t-large font-medium `} onChange={(e) => dispatchInputState({ type: ActionKind.USER_INPUT, value: e.target.value, isEdit: true })} id={`update_${props.label}`} type={props.inputType} placeholder={`Add ${props.label}`} defaultValue={props.defaultVal} />
          <div className="flex justify-end gap-2">
            <button type="button" className=" py-2 px-4 text-sm bg-gray-400 rounded hover:opacity-70 text-white" onClick={() => dispatchInputState({ type: ActionKind.USER_INPUT, isEdit: false, value: props.defaultVal })}>Cancel</button>
            <button type="button" className=" py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white" onClick={() => props.onSave(inputState.value)}>{props.loading ? 'Update...' : 'Update'}</button>
          </div>
        </div>
      </div>
    </>

  )
})

export default EditableMultiselect