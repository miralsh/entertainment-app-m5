import axios from 'axios'
import { GET_TRENDING_LIST } from './actionType'
import { url } from '../constants';

export const get_trending_list = () => {

    const options = {
        url:url,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTVmZDkxY2JiZTAyMzljYjhlNjQ2Njk4MzI3MmI2YSIsIm5iZiI6MTczNzI4NjE3OS45NzMsInN1YiI6IjY3OGNlMjIzODU5ZmI0ZTZhODZkZjFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AYMY95_sdxcXzGagr19NwMN64bUcVsmHUdszNJ4Hl0E'
        }
    };
    return (dispatch) => {
        axios.request(options)
            .then((res) => {
                dispatch(
                    ((data) => {
                        return {
                            type: GET_TRENDING_LIST,
                            payload: {
                                httpResponse: data
                            }
                        }
                    })(res.data)
                )
            }).catch((err) => {
                console.log(err)
            })
    }
}
