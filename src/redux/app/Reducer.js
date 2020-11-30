import {createReducer} from '@reduxjs/toolkit'
import {setAppState} from './Actions'
const initialStore = {}
export const Reducer = createReducer(initialStore,{
    [setAppState]: (state, action) => ({...state, ...(action?.payload ?? {})}),
})
export default Reducer