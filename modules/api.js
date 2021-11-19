
import { KEYS, URLS, PER_PAGE, NORMALIZE } from './config';
import { normalizePexelPhoto, normalizePixabayPhoto } from './normalize';
import API from './request';


const shuffle = (list) => list[Math.floor((Math.random()*list.length))];

export const searchPexels = async (q, page = 1, perPage = PER_PAGE) => {
    const res = {
        total: 0,
        perPage: perPage,
        results: []
    }
    if(!q) return res;
    try {
        const url = `${URLS.PEXELS}/search?query=${q}&per_page=${perPage}&page=${page}`;
        const options = {
            headers: {
                Authorization: shuffle(KEYS.PEXELS),
              },
        }
        const response = await API.get(url, options);
        
        if(response?.data){
            response.data["perPage"] = perPage;
            console.log(response.data);
            return NORMALIZE.PEXELS(response.data);
        }else{
            console.log(err);
            return res;
        }

    }catch(err){
        return res
    }
}


export const searchPixabay = async (q, page = 1, perPage = PER_PAGE) => {
    const res = {
        total: 0,
        perPage: perPage,
        results: []
    }
    if(!q) return res;
    try {
        const url = `${URLS.PIXABAY}/?key=${shuffle(KEYS.PIXABAY)}&q=${q}&per_page=${perPage}&page=${page}&image_type=photo&pretty=true`;

        const response = await API.get(url);
        
        if(response?.data){
            response.data["perPage"] = perPage;
            console.log(response.data);
            return NORMALIZE.PIXABAY(response.data);
        }else{
            console.log(err);
            return res;
        }

    }catch(err){
        return res
    }

}

export const getPexelPhoto = async (id) => {
    const res = {
    }

    if(!id) return res;
    try{
        const options = {
            headers: {
                Authorization: shuffle(KEYS.PEXELS),
              },
        }
        const url = `${URLS.PEXELS}/photos/${id}`;
        const response = await API.get(url, options);
        if(response?.data){
            return normalizePexelPhoto(response.data);
        }else{
            console.log(err);
            return res;
        }
    }catch(err){
            return res;
    }
   
}

export const getPixabayPhoto = async (id) => {
    const res = {
    }

    if(!id) return res;
    try{
        const url = `${URLS.PIXABAY}/?key=${shuffle(KEYS.PIXABAY)}&id=${id}&image_type=photo&pretty=true`;
        const response = await API.get(url);
        if(response?.data){
            return normalizePixabayPhoto(response.data);
        }else{
            console.log(err);
            return res;
        }
    }catch(err){
            return res;
    }
   
}



export const searchAll = async(q, page = 1, perPage = PER_PAGE/3) => {
    const copy = {
        'pexels': searchPexels,
        'pixabay': searchPixabay,
}
    const res = await Promise.all(Object.values(copy).map(func => func(q, page, perPage)) );
    return NORMALIZE.ALL(res, perPage);

}

export const API_MAP = {
    'pexels': searchPexels,
    'pixabay': searchPixabay,
    'all': searchAll,
    'photo-pexels': getPexelPhoto,
    'photo-pixabay': getPixabayPhoto
}
