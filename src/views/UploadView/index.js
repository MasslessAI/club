import React, { useEffect, useState } from 'react'
import {
  Button,
  Select,
  Box,
  Container,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles
} from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Page from 'src/components/Page'
import 'react-jinke-music-player/assets/index.css'
import './style.css'
import TextField from '@material-ui/core/TextField'
import MUIRichTextEditor from 'mui-rte'
import defaultTheme from '../../theme'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import * as api from '../../api'
import { useParams } from 'react-router-dom'
import { categories, topics } from '../../clubhouseData'
import DateMomentUtils from '@date-io/moment' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addEpisode, updateEpisode } from '../../podcastSlice'
import { useDispatch, useSelector } from 'react-redux'
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import { fetchEpisode, removeEpisode } from 'src/podcastSlice.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useNavigate } from 'react-router-dom'
import { usePrevious } from 'react-use'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  textField: {
    background: 'white'
  },
  episodeTitle: {
    fontSize: 25
  },
  episodeTitle: {
    fontSize: 18
  },
  MUIRichTextEditor: {
    root: {
      padding: 20
    },
    editor: {
      padding: '5px',
      height: '300px',
      maxHeight: '300px',
      overflow: 'auto',
      border: '1px solid gray'
    },
    editorContainer: {
      height: '300px'
    },
    placeHolder: {
      paddingTop: 5,
      paddingLeft: 5,
      width: 'inherit'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

function valuetext(value) {
  return `${value}°C`
}
const UploadView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          backgroundColor: 'white'
        },
        editor: {
          backgroundColor: 'white',
          padding: '20px',
          height: '300px',
          maxHeight: '300px',
          overflow: 'auto'
        }
      }
    }
  })

  const handleCategoryChange = event => {
    setCategory(event.target.value)
  }

  const handleTopicChange = event => {
    setTopic(event.target.value)
  }

  const podcastMeta = useSelector(state => state.podcast.podcastMeta)
  const { episodeId } = useParams()
  const navigate = useNavigate()

  const episode = useSelector(state => state.podcast.episode)
  const action = useSelector(state => state.podcast.action)
  const prevAction = usePrevious(action)

  const publishStatus =
    action.updateEpisode === 'pending' || action.addEpisode === 'pending' ? 'pending' : 'idle'

  // internal episodeId (null for creating new episode)
  // non-null for updating existing episode
  const [_episodeId, _setEpisodeId] = useState(episodeId)
  const [editorState, setEditorState] = useState(null)
  const [editorDefaultValue, setEditorDefaultValue] = useState(undefined)

  // upload status
  const [uploadStatus, setUploadStatus] = useState(null)

  // episode meta data
  const [category, setCategory] = React.useState('')
  const [topic, setTopic] = React.useState([])
  const [title, setTitle] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState('')
  const [pubDate, setPubDate] = useState(new Date())
  const [episodeCoverUrl, setEpisodeCoverUrl] = useState(
    'https://clubhouse-audio.s3.amazonaws.com/defaultCover.jpeg'
  )
  const [pendingEpisodeCoverUrl, setPendingEpisodeCoverUrl] = useState('')

  useEffect(() => {
    if (episodeId) {
      dispatch(fetchEpisode({ episodeId }))
    }
  }, [dispatch, episodeId])

  useEffect(() => {
    if (episode) {
      setCategory(episode.category)
      setTopic(episode.topic)
      setTitle(episode.title)
      setEpisodeNumber(episode.itunes.episode)
      setPubDate(new Date(episode.pubDate))
      setEpisodeCoverUrl(episode.itunes.image)

      // 1. Convert the HTML
      const contentHTML = convertFromHTML(episode.content)

      // 2. Create the ContentState object
      const state = ContentState.createFromBlockArray(
        contentHTML.contentBlocks,
        contentHTML.entityMap
      )

      // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
      const content = JSON.stringify(convertToRaw(state))

      setEditorDefaultValue(content)
    }
  }, [episode])

  useEffect(() => {
    if (
      (prevAction &&
        prevAction.updateEpisode === 'pending' &&
        action.updateEpisode === 'fulfilled') ||
      (prevAction && prevAction.addEpisode === 'pending' && action.addEpisode === 'fulfilled') ||
      (prevAction && prevAction.removeEpisode === 'pending' && action.removeEpisode === 'fulfilled')
    ) {
      navigate(-1)
    }
  }, [navigate, prevAction, action])

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }) => {
    const { uploadURL, guid } = await api.getPresignedUrl({
      podcastId: podcastMeta.podcastId,
      episodeId,
      type: 'EPISODE'
    })
    _setEpisodeId(guid)
    return {
      method: 'PUT',
      url: uploadURL,
      body: file
    }
  }

  const getEpisodeCoverUploadParams = async ({ file, meta }) => {
    const { uploadURL, url } = await api.getPresignedUrl({
      podcastId: podcastMeta.podcastId,
      episodeId: _episodeId,
      type: 'EPISODE_COVER',
      fileType: file.type
    })
    setPendingEpisodeCoverUrl(url)
    return {
      method: 'PUT',
      url: uploadURL,
      body: file
    }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      setEpisodeCoverUrl(pendingEpisodeCoverUrl)
    }
    setUploadStatus(status)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  // publish/update an episode
  const onPubish = () => {
    const html = convertToHTML(editorState.getCurrentContent())
    if (!episodeId) {
      // adding a new episode
      dispatch(
        addEpisode({
          podcastId: podcastMeta.podcastId,
          episodeId: _episodeId,
          episodeMeta: {
            category,
            topic,
            title,
            content: html,
            pubDate,
            itunes: {
              episode: episodeNumber,
              image: episodeCoverUrl
            }
          }
        })
      )
    } else {
      // updating an existing episode
      dispatch(
        updateEpisode({
          podcastId: podcastMeta.podcastId,
          episodeId: _episodeId,
          episodeMeta: {
            category,
            topic,
            title,
            content: html,
            pubDate,
            itunes: {
              episode: episodeNumber,
              image: episodeCoverUrl
            }
          }
        })
      )
    }
  }

  const onDelete = () => {
    dispatch(removeEpisode({ podcastId: podcastMeta.podcastId, episodeId }))
  }

  const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <div>
        {previews}
        {files.length < 1 && <div {...dropzoneProps}>{input}</div>}
      </div>
    )
  }

  return (
    <Page className={classes.root}>
      <Container maxWidth='lg'>
        <Box p={2}>
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept='video/mp4'
            maxFiles={1}
            maxSizeBytes={300 * 1024 * 1024} // 300 MB
            LayoutComponent={Layout}
            inputContent={episodeId ? 'Replace screen record' : 'Upload screen record'}
          />
        </Box>
        <Box p={2}>
          <TextField
            className={classes.textField}
            variant='outlined'
            fullWidth
            id='outlined-basic'
            label='Episode Title'
            value={title}
            InputProps={{
              classes: {
                input: classes.episodeTitle
              }
            }}
            onChange={e => setTitle(e.target.value)}
          />
        </Box>

        <Box p={2}>
          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              defaultValue={editorDefaultValue}
              onChange={state => setEditorState(state)}
              inlineToolbar={true}
            />
          </MuiThemeProvider>
        </Box>
        <Box p={2} display='flex' flexDirection='row' alignItems='center'>
          {episodeCoverUrl && (
            <Box mr={2}>
              <img alt='Episode cover art' src={episodeCoverUrl} width='150px' />
            </Box>
          )}
          <Box flexGrow={1}>
            <Dropzone
              getUploadParams={getEpisodeCoverUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              accept='image/*'
              maxFiles={1}
              maxSizeBytes={30 * 1024 * 1024} // 300 MB
              LayoutComponent={Layout}
              inputContent={
                podcastMeta && podcastMeta.image.url !== ''
                  ? 'Update episode art'
                  : 'Upload episode art'
              }
            />
          </Box>
        </Box>
        <Box p={2} display='flex' flexDirection='row' alignItems='center'>
          <Box>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='category-select-input-label'>Category</InputLabel>
              <Select
                className={classes.textField}
                labelId='category-select-label'
                id='category-select'
                value={category}
                onChange={handleCategoryChange}
                label='Category'
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow={1}>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='topic-select-input-label'>Topic</InputLabel>
              <Select
                className={classes.textField}
                labelId='topic-select-label'
                id='topic-select'
                value={topic}
                onChange={handleTopicChange}
                label='Topic'
                multiple
                disabled={category === ''}
              >
                {category &&
                  topics[category].map(topic => (
                    <MenuItem key={topic} value={topic}>
                      {topic}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mr={1}>
            <TextField
              type='number'
              className={classes.textField}
              variant='outlined'
              id='outlined-basic'
              label='Episode Number'
              value={episodeNumber}
              onChange={e => setEpisodeNumber(e.target.value)}
            />
          </Box>
          <Box>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <DateTimePicker
                className={classes.textField}
                label='Pub Date'
                inputVariant='outlined'
                value={pubDate}
                onChange={setPubDate}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Box>
        <Box p={2} display='flex' justifyContent='center'>
          <Box m={1}>
            <Button variant='contained' color='primary' size='large' onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
          {episodeId && (
            <Box m={1}>
              <div className={classes.wrapper}>
                <Button
                  disabled={action.removeEpisode === 'pending'}
                  onClick={onDelete}
                  style={{
                    backgroundColor: '#ED5E68'
                  }}
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  Delete
                </Button>
                {action.removeEpisode === 'pending' && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
            </Box>
          )}
          <Box m={1}>
            <div className={classes.wrapper}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={onPubish}
                disabled={publishStatus === 'pending' || (uploadStatus && uploadStatus !== 'done')}
              >
                Publish
              </Button>
              {publishStatus === 'pending' && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
            </div>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default UploadView
