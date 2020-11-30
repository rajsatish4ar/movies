import {createAction} from '@reduxjs/toolkit'
export const setAppState = createAction('SET_APP_STATE')
export const getMovies = createAction('GET_MOVIES')
export const getMovieDetails = createAction('GET_MOVIE_DETAILS')
export const tryOnlineAgain =createAction('ONLINE_AGAIN') 
