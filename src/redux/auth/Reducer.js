import {createReducer} from '@reduxjs/toolkit'
import {setAuthState} from './Actions'
const initialStore = {}
export const Reducer = createReducer(initialStore,{
    [setAuthState]: (state, action) => ({...state, ...(action?.payload ?? {})}),
})
export default Reducer