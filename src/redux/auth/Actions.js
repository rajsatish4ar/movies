import {createAction} from '@reduxjs/toolkit'
export const setAuthState = createAction('SET_AUTH_STATE')
export const emailLogin = createAction('EMAIL_LOGIN')
export const verifyLogin = createAction('VERIFY_LOGIN')
export const doLogout = createAction('logout')
export const resetState = createAction('RESET_STATE')