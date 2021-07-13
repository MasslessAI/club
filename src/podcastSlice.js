import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RSSParser from 'rss-parser'
import * as api from './api'

// First, create the thunk
const fetchPodcast = createAsyncThunk('podcast/fetchPodcast', async ({ podcastId }) => {
  const url = `${process.env.REACT_APP_S3_BUCKET_URL_BASE}/${podcastId}/index.rss`
  let parser = new RSSParser()
  const feed = await parser.parseURL(url)
  return { feed }
})

const fetchPodcastMeta = createAsyncThunk('podcast/fetchPodcastMeta', async ({ podcastId }) => {
  return api.fetchPodcastMeta({ podcastId })
})

const updatePodcastMeta = createAsyncThunk(
  'podcast/updatePodcastMeta',
  async ({ podcastId, podcastMeta }) => {
    return api.updatePodcastMeta({ podcastId, podcastMeta })
  }
)

const fetchEpisode = createAsyncThunk(
  'podcast/fetchEpisode',
  async ({ episodeId }, { getState }) => {
    return api.fetchEpisode({ episodeId })
  }
)

const addEpisode = createAsyncThunk(
  'podcast/addEpisode',
  async ({ podcastId, episodeId, episodeMeta }, { getState }) => {
    await api.addEpisode({ podcastId, episodeId, episodeMeta })
  }
)

const updateEpisode = createAsyncThunk(
  'podcast/updateEpisode',
  async ({ podcastId, episodeId, episodeMeta, convertAudio }, { getState }) => {
    await api.updateEpisode({ podcastId, episodeId, episodeMeta, convertAudio })
  }
)

const removeEpisode = createAsyncThunk(
  'podcast/removeEpisode',
  async ({ podcastId, episodeId }, { getState }) => {
    await api.removeEpisode({ podcastId, episodeId })
  }
)

const fetchEpisodesByPodcastId = createAsyncThunk(
  'podcast/fetchEpisodesByPodcastId',
  async ({ podcastId }, { getState }) => {
    return api.fetchEpisodesByPodcastId({ podcastId })
  }
)

const fetchUserPodcasts = createAsyncThunk('podcast/fetchUserPodcasts', async () => {
  return api.fetchUserPodcasts()
})

const verifyClubhouseId = createAsyncThunk(
  'podcast/verifyClubhouseId',
  async ({ clubhouseId, code }) => {
    return api.verifyClubhouseId({ clubhouseId, code })
  }
)

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: { loading: 'idle', updating: 'idle', action: {} },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchPodcast.fulfilled]: (state, action) => {
      state.feed = action.payload.feed
    },
    [fetchPodcastMeta.pending]: (state, action) => {
      state.action.fetchPodcastMeta = 'pending'
    },
    [fetchPodcastMeta.fulfilled]: (state, action) => {
      state.podcastMeta = action.payload
      state.action.fetchPodcastMeta = 'fulfilled'
    },
    [updatePodcastMeta.pending]: (state, action) => {
      state.action.updatePodcastMeta = 'pending'
    },
    [updatePodcastMeta.fulfilled]: (state, action) => {
      state.action.updatePodcastMeta = 'fulfilled'
    },
    [updateEpisode.pending]: (state, action) => {
      state.action.updateEpisode = 'pending'
    },
    [updateEpisode.fulfilled]: (state, action) => {
      state.action.updateEpisode = 'fulfilled'
    },
    [addEpisode.pending]: (state, action) => {
      state.action.addEpisode = 'pending'
    },
    [addEpisode.fulfilled]: (state, action) => {
      state.action.addEpisode = 'fulfilled'
    },
    [fetchEpisode.pending]: (state, action) => {
      state.action.fetchEpisode = 'pending'
    },
    [fetchEpisode.fulfilled]: (state, action) => {
      state.episode = action.payload
      state.action.fetchEpisode = 'fulfilled'
    },
    [removeEpisode.pending]: (state, action) => {
      state.action.removeEpisode = 'pending'
    },
    [removeEpisode.fulfilled]: (state, action) => {
      state.action.removeEpisode = 'fulfilled'
    },
    [fetchEpisodesByPodcastId.pending]: (state, action) => {
      state.action.fetchEpisodesByPodcastId = 'pending'
    },
    [fetchEpisodesByPodcastId.fulfilled]: (state, action) => {
      state.episodes = action.payload
      state.action.fetchEpisodesByPodcastId = 'fulfilled'
    },
    [fetchUserPodcasts.pending]: (state, action) => {
      state.action.fetchUserPodcasts = 'pending'
    },
    [fetchUserPodcasts.fulfilled]: (state, action) => {
      // currently only one podcast allowed
      state.podcastMeta = action.payload[0]
      state.action.fetchUserPodcasts = 'fulfilled'
    },
    [verifyClubhouseId.pending]: (state, action) => {
      state.action.verifyClubhouseId = 'pending'
    },
    [verifyClubhouseId.fulfilled]: (state, action) => {
      state.action.verifyClubhouseId = 'fulfilled'
      state.clubhouseIdVerificationStatus = action.payload.verificationStatus
    },
  }
})

export {
  fetchPodcast,
  fetchUserPodcasts,
  fetchPodcastMeta,
  updatePodcastMeta,
  fetchEpisode,
  updateEpisode,
  addEpisode,
  removeEpisode,
  fetchEpisodesByPodcastId,
  verifyClubhouseId
}
export default podcastSlice.reducer
