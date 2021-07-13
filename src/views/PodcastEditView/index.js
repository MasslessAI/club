import React, { useEffect, useState } from 'react'
import {
  Popover,
  Menu,
  MenuItem,
  Paper,
  IconButton,
  Button,
  AppBar,
  List,
  ListItem,
  Box,
  Container,
  Typography,
  InputLabel,
  FormControl,
  ListSubheader,
  CircularProgress,
  Select,
  makeStyles
} from '@material-ui/core'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import Page from 'src/components/Page'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPodcastMeta, updatePodcastMeta, verifyClubhouseId } from 'src/podcastSlice.js'
import PodcastEpisode from '../PodcastView/PodcastEpisode'
import { useParams, Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useNavigate, useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import * as api from '../../api'
import { podcastCategories } from '../../clubhouseData'
import moment from 'moment'
import { usePrevious } from 'react-use'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    padding: 45
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  textField: {
    fontSize: 18
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  paper: {
    padding: 40
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

const PodcastEditView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const podcastMeta = useSelector(state => state.podcast.podcastMeta)
  const action = useSelector(state => state.podcast.action)
  const prevAction = usePrevious(action)

  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const [podcastId, setPodcastId] = useState('')
  const [podcastName, setPodcastName] = useState('')
  const [podcastDescription, setPodcastDescription] = useState('')
  const [podcastCategory, setPodcastCategory] = React.useState('')
  const [authorName, setAuthorName] = React.useState('')
  const [authorEmail, setAuthorEmail] = React.useState('')
  const [authorClubhouseId, setAuthorClubhouseId] = useState('')
  const [podcastCoverUrl, setPodcastCoverUrl] = useState(
    'https://clubhouse-audio.s3.amazonaws.com/defaultCover.jpeg'
  )
  const [pendingPodcastCoverUrl, setPendingPodcastCoverUrl] = useState('')
  const [clubhouseIdVerificationCode, setClubhouseIdVerificationCode] = useState(
    Math.floor(1000000 + Math.random() * 1000000)
  )
  // indicator to see if the user is creating a new podcast or updating
  // and existing one
  const [updatePodcastSettings, setUpdatePodcastSettings] = useState(false)

  const clubhouseIdVerificationStatus = useSelector(
    state => state.podcast.clubhouseIdVerificationStatus
  )

  useEffect(() => {
    if (podcastMeta) {
      setPodcastId(podcastMeta.podcastId)
      setPodcastName(podcastMeta.title)
      setPodcastDescription(podcastMeta.description)
      setAuthorName(podcastMeta.author)
      setAuthorEmail(podcastMeta.email)
      setPodcastCoverUrl(podcastMeta.image.url)
      setAuthorClubhouseId(podcastMeta.authorClubhouseId)
      setUpdatePodcastSettings(true)

      let _category
      if (podcastMeta.categoriesWithSubs) {
        _category = {
          category: podcastMeta.categoriesWithSubs[0].name,
          subcategory: podcastMeta.categoriesWithSubs[0].subs[0].name
        }
      } else if (podcastMeta.categories) {
        _category = {
          category: podcastMeta.categories[0],
          subcategory: null
        }
      }
      setPodcastCategory(JSON.stringify(_category))
    }
  }, [podcastMeta])

  // once updated, navigate to the previous page
  useEffect(() => {
    if (
      prevAction &&
      prevAction.updatePodcastMeta === 'pending' &&
      action.updatePodcastMeta === 'fulfilled'
    ) {
      navigate(-1)
    }
  }, [navigate, prevAction, action])

  useEffect(() => {})

  // upload status
  const [uploadStatus, setUploadStatus] = useState(null)

  // specify upload params and url for your files
  const getPodcastCoverUploadParams = async ({ file, meta }) => {
    const { uploadURL, url } = await api.getPresignedUrl({
      podcastId: podcastId === '' ? undefined : podcastId,
      type: 'PODCAST_COVER',
      fileType: file.type
    })
    setPendingPodcastCoverUrl(url)
    return {
      method: 'PUT',
      url: uploadURL,
      body: file
    }
  }

  const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <div>
        {previews}
        {files.length < 1 && <div {...dropzoneProps}>{input}</div>}
      </div>
    )
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      setPodcastCoverUrl(pendingPodcastCoverUrl)
    }
    setUploadStatus(status)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const onSave = () => {
    const _podcastCategory = JSON.parse(podcastCategory)
    dispatch(
      updatePodcastMeta({
        podcastId,
        podcastMeta: {
          podcastId,
          title: podcastName,
          description: podcastDescription,
          keywords: [],
          email: authorEmail,
          language: 'en-us',
          author: authorName,
          authorClubhouseId,
          clubhouseIdVerificationCode,
          categories: !_podcastCategory.subcategory ? [_podcastCategory.category] : undefined,
          categoriesWithSubs: _podcastCategory.subcategory
            ? [
                {
                  name: _podcastCategory.category,
                  subs: [
                    {
                      name: _podcastCategory.subcategory
                    }
                  ]
                }
              ]
            : undefined,
          image: {
            url: podcastCoverUrl,
            title: podcastName,
            link: `https://laterclub.com/podcast/${podcastId}`
          }
        }
      })
    )
  }

  return (
    <Page className={classes.root}>
      <Container maxWidth='lg'>
        <Box mb={9} display='flex' flexDirection='row' alignItems='center'>
          <Box flexGrow={1}>
            <Typography variant='h2'> Podcast settings </Typography>
          </Box>
          <Box>
            <div className={classes.wrapper}>
              <Button color='primary' variant='contained' onClick={onSave}>
                Save
              </Button>
              {action.updatePodcastMeta === 'pending' && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
            </div>
          </Box>
        </Box>
        <Box mb={1}>
          <Typography variant='h4'> About your podcast </Typography>
        </Box>
        <Box>
          <Paper className={classes.paper}>
            <Box p={2}>
              <TextField
                className={classes.textField}
                required
                variant='outlined'
                fullWidth
                id='podcast-name-textfield'
                label='Podcast Name'
                value={podcastName}
                InputProps={{
                  classes: {
                    input: classes.textField
                  }
                }}
                onChange={e => setPodcastName(e.target.value)}
              />
            </Box>
            <Box p={2}>
              <TextField
                className={classes.textField}
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                id='podcast-description-textfield'
                label='Podcast Description'
                value={podcastDescription}
                InputProps={{
                  classes: {
                    input: classes.textField
                  }
                }}
                onChange={e => setPodcastDescription(e.target.value)}
              />
            </Box>
            <Box p={2} display='flex' flexDirection='row' alignItems='center'>
              {podcastCoverUrl && (
                <Box mr={2}>
                  <img alt='Podcast cover art' src={podcastCoverUrl} width='150px' />
                </Box>
              )}
              <Box flexGrow={1}>
                <Dropzone
                  getUploadParams={getPodcastCoverUploadParams}
                  onChangeStatus={handleChangeStatus}
                  onSubmit={handleSubmit}
                  accept='image/*'
                  maxFiles={1}
                  maxSizeBytes={30 * 1024 * 1024} // 300 MB
                  LayoutComponent={Layout}
                  inputContent={
                    podcastMeta && podcastMeta.image.url !== ''
                      ? 'Update cover art'
                      : 'Upload cover art'
                  }
                />
              </Box>
            </Box>
            <Box p={2}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='category-select-input-label'>Podcast category</InputLabel>
                <Select
                  className={classes.textField}
                  labelId='category-select-label'
                  id='category-select'
                  value={podcastCategory}
                  onChange={event => setPodcastCategory(event.target.value)}
                  label='Category'
                >
                  {podcastCategories.reduce((items, currentCategory) => {
                    let rv = [
                      <MenuItem
                        key={currentCategory.value}
                        value={JSON.stringify({
                          category: currentCategory.value,
                          subcategory: null
                        })}
                      >
                        <Typography variant='h5'>{currentCategory.display} </Typography>
                      </MenuItem>
                    ]
                    if (currentCategory.subCategories) {
                      rv = [
                        ...rv,
                        currentCategory.subCategories.map(cat => (
                          <MenuItem
                            key={cat.value}
                            value={JSON.stringify({
                              category: currentCategory.value,
                              subcategory: cat.value
                            })}
                          >
                            <Typography style={{ paddingLeft: '10px' }}>{cat.display}</Typography>
                          </MenuItem>
                        ))
                      ]
                    }
                    return [...rv, ...items]
                  }, [])}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Box>
        <Box mb={1} mt={4}>
          <Typography variant='h4'> About you </Typography>
        </Box>
        <Paper className={classes.paper}>
          <Box p={2}>
            <TextField
              className={classes.textField}
              variant='outlined'
              required
              fullWidth
              id='name-textfield'
              label='Your name'
              value={authorName}
              InputProps={{
                classes: {
                  input: classes.textField
                }
              }}
              onChange={e => setAuthorName(e.target.value)}
            />
          </Box>
          <Box p={2}>
            <TextField
              className={classes.textField}
              variant='outlined'
              required
              fullWidth
              id='email-textfield'
              label='Your email'
              value={authorEmail}
              InputProps={{
                classes: {
                  input: classes.textField
                }
              }}
              onChange={e => setAuthorEmail(e.target.value)}
            />
          </Box>
          <Box p={2} display='flex' flexDirection='row' alignItems='center'>
            <Box flexGrow={1}>
              <TextField
                className={classes.textField}
                variant='outlined'
                required
                fullWidth
                id='clubhouse-id-textfield'
                label='Your clubhouse username'
                value={authorClubhouseId}
                helperText={"We need your Clubhouse username in order to verify it's really you."}
                InputProps={{
                  classes: {
                    input: classes.textField
                  }
                }}
                onChange={e => setAuthorClubhouseId(e.target.value)}
              />
            </Box>
            <Box ml={2}>
              <TextField
                className={classes.textField}
                variant='outlined'
                fullWidth
                id='clubhouse-verification-textfield'
                label='Verification code'
                value={clubhouseIdVerificationCode}
                helperText={
                  clubhouseIdVerificationStatus
                    ? 'Your clubhouse username has been successfully verified'
                    : 'Paste the code anywhere in your clubhouse bio to verify'
                }
                InputProps={{
                  classes: {
                    input: classes.textField
                  },
                  endAdornment: (
                    <Button
                      color='primary'
                      // disable on verified
                      disabled={clubhouseIdVerificationStatus}
                      onClick={() =>
                        dispatch(
                          verifyClubhouseId({
                            clubhouseId: authorClubhouseId,
                            code: clubhouseIdVerificationCode
                          })
                        )
                      }
                    >
                      {clubhouseIdVerificationStatus ? (
                        <Box display='flex' flexDirection='row' alignItems='center'>
                          <CheckBoxOutlinedIcon style={{ color: 'green' }} />
                          <Typography style={{ color: 'green' }}> Verified </Typography>
                        </Box>
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  )
                }}
                onChange={e => setAuthorClubhouseId(e.target.value)}
              />
            </Box>
          </Box>
          <Box p={2} display='flex' flexDirection='row' alignItems='center'>
            <Box>
              <Typography> laterclub.com/ </Typography>
            </Box>
            <Box ml={1}>
              <TextField
                className={classes.textField}
                variant='outlined'
                fullWidth
                id='outlined-basic'
                label='podcast id'
                value={podcastId}
                InputProps={{
                  classes: {
                    input: classes.textField
                  }
                }}
                onChange={e => setPodcastId(e.target.value)}
                disabled={updatePodcastSettings}
                helperText={'Podcast Id cannot be changed'}
              />
            </Box>
          </Box>
        </Paper>
        {podcastMeta && (
          <>
            <Box mb={1} mt={4}>
              <Typography variant='h4'> Distribution </Typography>
            </Box>
            <Paper className={classes.paper}>
              <Box p={2}>
                <Box ml={1}>
                  <TextField
                    className={classes.textField}
                    variant='outlined'
                    fullWidth
                    id='outlined-basic'
                    label='Your RSS feed'
                    value={podcastMeta.feedUrl}
                    InputProps={{
                      classes: {
                        input: classes.textField
                      }
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Page>
  )
}

export default PodcastEditView
