import axios from 'axios'
import { Auth, Cache } from 'aws-amplify'

const clubApi = axios.create({
  baseURL: 'http://localhost:4000/dev',
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: status => {
    return status >= 200 && status < 300 // default
  }
})

// Add a request interceptor
clubApi.interceptors.request.use(
  async function (config) {
    const user = await Auth.currentAuthenticatedUser()
    // config.headers.Authorization = session.accessToken.jwtToken
    config.headers.Authorization = user.token
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

const fetchPodcastMeta = async ({ podcastId }) => {
  const response = await clubApi.post('/', {
    action: 'GET_PODCAST_META',
    payload: {
      podcastId
    }
  })
  return response.data
}

const updatePodcastMeta = async ({ podcastId, podcastMeta }) => {
  const response = await clubApi.post('/', {
    action: 'UPDATE_PODCAST_META',
    payload: {
      podcastId,
      podcastMeta,
    }
  })
  return response.data
}

const getPresignedUrl = async ({ podcastId, episodeId, type, fileType }) => {
  const response = await clubApi.post('/', {
    action: 'GET_UPLOAD_URL',
    payload: {
      podcastId,
      episodeId,
      type,
      fileType
    }
  })
  return response.data
}

const addEpisode = async ({ podcastId, episodeId, episodeMeta }) => {
  const response = await clubApi.post('/', {
    action: 'ADD_EPISODE',
    payload: {
      podcastId,
      episodeId,
      episodeMeta
    }
  })
  return response.data
}

const updateEpisode = async ({ podcastId, episodeId, episodeMeta, convertAudio }) => {
  const response = await clubApi.post('/', {
    action: 'UPDATE_EPISODE',
    payload: {
      podcastId,
      episodeId,
      episodeMeta,
      convertAudio
    }
  })
  return response.data
}


const fetchEpisode = async ({ episodeId }) => {
  const response = await clubApi.post('/', {
    action: 'GET_EPISODE',
    payload: {
      episodeId
    }
  })
  return response.data
}

const removeEpisode = async ({ podcastId, episodeId }) => {
  await clubApi.post('/', {
    action: 'REMOVE_EPISODE',
    payload: {
      podcastId,
      episodeId
    }
  })
}

const fetchEpisodesByPodcastId = async ({ podcastId }) => {
  const response = await clubApi.post('/', {
    action: 'GET_EPISODES_BY_PODCAST_ID',
    payload: {
      podcastId
    }
  })
  return response.data
}

const fetchUserPodcasts = async () => {
  const response = await clubApi.post('/', {
    action: 'GET_USER_DATA',
  })
  return response.data.podcasts
}

const verifyClubhouseId = async({ clubhouseId, code}) => {
  const response = await clubApi.post('/', {
    action: 'VERIFY_CLUBHOUSE_ID',
    payload: {
      clubhouseId,
      code
    }
  })
  return response.data
}


export {
  fetchPodcastMeta,
  updatePodcastMeta,
  getPresignedUrl,
  fetchEpisode,
  addEpisode,
  updateEpisode,
  removeEpisode,
  fetchEpisodesByPodcastId,
  fetchUserPodcasts,
  verifyClubhouseId
}
