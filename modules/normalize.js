export const normalizePexelPhoto = (photo) => {
    return {
        id: photo.id,
        type: "pexels",
        urls: {
          small: photo.src.small,
          medium: photo.src.medium,
          large: photo.src.large,
        },
      };
}

export const normalizePixabayPhoto = (photo) => {
    if(!(photo?.hits && Array.isArray(photo.hits) && photo.hits.length > 0)) return {}
    console.log('gee')
    const img = photo.hits[0]
    return {
        id: img.id,
        type: "pixabay",
        urls: {
            small: img.previewURL,
            medium: img.webformatURL,
            large: img.largeImageURL,
        },
      };
}