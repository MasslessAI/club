import React, { useEffect, useState } from 'react'
import {
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Slider,
  AppBar,
  List,
  ListItem,
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core'
import { createMuiTheme, Theme, MuiThemeProvider } from '@material-ui/core/styles'
import Page from 'src/components/Page'
import TextField from '@material-ui/core/TextField'
import MUIRichTextEditor from 'mui-rte'
import defaultTheme from '../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPodcast, updateEpisode } from 'src/podcastSlice.js'
import {
  useParams
} from "react-router-dom";
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import {usePrevious} from 'react-use'
import draftToHtml from 'draftjs-to-html';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  episodeTitle: {
    fontSize: 25
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
  }
}))

const EpisodeEditView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { podcastId, episodeId } = useParams()
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

  const [value, setValue] = useState([0, 100])
  const [file, setFile] = useState(null)
  const [editorState, setEditorState] = useState(null)
  const [editorDefaultValue, setEditorDefaultValue] = useState(undefined)
  const [episodeMeta, setEpisodeMeta] = useState({
    title: null,
    summary: null,
    content: null
  })
  const prevEpisodeMeta = usePrevious(episodeMeta)

  const feed = useSelector(state => state.podcast.feed)
  const episode = feed && feed.items.find(e => e.guid === episodeId)
  const url = `https://clubhouse-audio.s3.amazonaws.com/${podcastId}/index.rss`

  useEffect(() => {
    if(!feed) {
      dispatch(fetchPodcast(url))
    }
  }, [dispatch, url, feed])

  useEffect(() => {
    if (episode && !episodeMeta.title) {
      setEpisodeMeta({
        title: episode.title,
        summary: episode.itunes.summary,
        content: episode.content
      })

      // 1. Convert the HTML
      const contentHTML = convertFromHTML(episode.content)

      // 2. Create the ContentState object
      const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)

      // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
      const content = JSON.stringify(convertToRaw(state))

      setEditorDefaultValue(content)
    }
  }, [episode, episodeMeta])

  const onSave = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
 
    const markup = draftToHtml(
      rawContentState
    )
    dispatch(updateEpisode({episodeId, episodeMeta: {...episodeMeta, content: markup}}))
  }

  

  return (
    <Page className={classes.root}>
      <Container maxWidth='lg'>
        <Paper style={{ marginTop: '10px' }}>
          <Box
            p={2}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-start'
          >
            <Box width='100%' pb={3}>
              <TextField
                fullWidth
                id='episode-title'
                label='Episode Title'
                InputProps={{
                  classes: {
                    input: classes.episodeTitle
                  }
                }}
                onChange={(event) => setEpisodeMeta({...episodeMeta, title: event.target.value})}
                value={episodeMeta.title}
                variant="outlined"
              />
            </Box>
            <Box width='100%' pb={3}>
              <TextField
                fullWidth
                id='episode-summary'
                label='Summary'
                InputProps={{
                  classes: {
                    input: classes.episodeTitle
                  }
                }}
                defaultValue={episodeMeta.summary}
                onChange={(event) => setEpisodeMeta({...episodeMeta, summary: event.target.value})}
                multiline
                rowsMax={10}
                variant="outlined"
              />
            </Box>
            <Box width='100%'>
              <MuiThemeProvider theme={defaultTheme}>
                 <MUIRichTextEditor
                  label='What else do you want your listeners to know?'
                  onChange={state => setEditorState(state)}
                  inlineToolbar={true}
                  defaultValue={editorDefaultValue}
                />
              </MuiThemeProvider>
            </Box>
          </Box>
        </Paper>
        <Box p={2} display='flex' justifyContent='center'>
          <Box m={1}>
            <Button onClick={onSave} variant='contained' color='primary' size='large'>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default EpisodeEditView
