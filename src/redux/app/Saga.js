import {call, put, takeLatest, select} from 'redux-saga/effects';
import {setAppState, getMovies, tryOnlineAgain} from './Actions';
import {GENRES, POPULAR_MOVIE} from '../../utils/URLs';
import request from '../../utils/Request';
import {APIKEY} from '../../const'; 
import Restart from 'react-native-restart'
function* getMovies$(action) {
  const state = yield select();
  const page = state?.app?.page ?? 0;
  const payload = {
    api_key: APIKEY,
    page:page+1,
  };

  if(page!=1)yield put(setAppState({loading:true}));

  // get genres
 
  if(page==1){
    const param= {
      api_key: APIKEY,
    }
    const genreRes = yield call(request,GENRES,param,{type:'GET'})
    const gens = genreRes?.genres??[]
    const genre = {}
    gens.map((it,i)=>{
      genre[it.id] = it.name
    })
    yield put(setAppState({genre}));
  }

  const res = yield call(request,POPULAR_MOVIE,payload,{type:'GET',enableLoader:page==1})
  if(page!=1) yield put(setAppState({loading:false}));

  const pageNum = res?.page??1
  const list = res?.results??[]
  const movies = [...state?.app?.movies??[],...list]
  yield put(setAppState({movies, page:pageNum}));
}
function* tryOnlineAgain$(action) {

    Restart.Restart()
    yield put(setAppState({}));
    return;
  
}

export default function* rootSaga() {
  yield takeLatest(getMovies, getMovies$);
  yield takeLatest(tryOnlineAgain, tryOnlineAgain$);
}
