export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_YOUTUBE_SEARCH,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
    }
};

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    return await response.json();
};