import { shuffle } from './utils';

const decryptKeys = (string) => string.split(';')

export const KEYS = {
        PIXABAY: decryptKeys(process.env.NEXT_PUBLIC_PIXABAY_KEYS),
        PEXELS: decryptKeys(process.env.NEXT_PUBLIC_PEXELS_KEYS),
    }

export const URLS = {
    PIXABAY: 'https://pixabay.com/api',
    PEXELS: 'https://api.pexels.com/v1'
}

export const NORMALIZE = {
    PEXELS: (res) => {
        const total = res.total_results;
        const modulus = total % res.perPage;
        const divide = Math.floor(total / res.perPage);
        const results = res.photos.map((photo) => {
          return {
            id: photo.id,
            type: "pexels",
            urls: {
              small: photo.src.small,
              medium: photo.src.medium,
              large: photo.src.large,
            },
          };
        });
      
        return {
          total: res.total_results,
          totalPage: modulus === 0 ? divide : divide + 1,
          perPage: res.perPage,
          results: results,
        };
      },

      PIXABAY: (data) => {
        const total = data.total;
        const modulus = total % data.perPage;
        const divide = Math.floor(total / data.perPage);
        const results = data.hits.map((d, i) => {
          return {
            id: d.id,
            type: "pixabay",
            urls: {
              small: d.previewURL,
              medium: d.webformatURL,
              large: d.largeImageURL,
            },
          };
        });
        return {
          total: data.total,
          totalPage: modulus === 0 ? divide : divide + 1,
          perPage: data.perPage,
          results,
        };
      },

      ALL : (mediaArr, perPage) => {
        const res = {
          total: 0,
          perPage: perPage,
          totalPage: 0,
          results: []
      }
      mediaArr.forEach(media => {
        res.total += media.total;
        res.results = [...res.results, ...media.results];
        res.totalPage += media.totalPage;
      })
      res.results = shuffle(res.results);
      return res;
      }
      

}
export const PER_PAGE = 30;