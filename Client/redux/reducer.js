import { GET_TRENDING_LIST } from "./actionType"

const INIT_STATE={
    trending:[]
}

export const reducer = (state=INIT_STATE,action)=>{
    switch(action.type){
        case GET_TRENDING_LIST:{
            console.log("get_trending_list "+JSON.stringify(action.payload.httpResponse.results))
            return {...state,trending:action.payload.httpResponse.results}
        }
            default:
                return state
    }
}