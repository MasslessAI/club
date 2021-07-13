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
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEpisodesByPodcastId } from 'src/podcastSlice.js'
import PodcastEpisode from '../PodcastView/PodcastEpisode'
import { useParams, Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useNavigate, useLocation } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
  }
}))

const DashboardView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const episodes = useSelector(state => state.podcast.episodes)
  const podcastMeta = useSelector(state => state.podcast.podcastMeta)
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  useEffect(() => {
      if (podcastMeta) {
        dispatch(fetchEpisodesByPodcastId({ podcastId: podcastMeta.podcastId }))
      }
  }, [dispatch, podcastMeta])

  const SortableItem = ({ value }) => (
    <ListItem>
      <Box
        component={Paper}
        display='flex'
        width='100%'
        alignContent='stretch'
        justifyContent='center'
      >
        <Box flexGrow={1}>
          <PodcastEpisode
            episode={value}
            showSummary={false}
            showExpandIcon={false}
            onSelect={() => {
              setSelectedEpisode(value)
            }}
          />
        </Box>
        <IconButton component={Link} aria-label='more' to={`upload/${value.guid}`}>
          <EditIcon />
        </IconButton>
      </Box>
    </ListItem>
  )

  return (
    <Page className={classes.root}>
      <Container maxWidth='lg'>
        <Fab className={classes.fab} color='primary' aria-label='add' onClick={() => navigate(`${location.pathname}/upload`)}>
          <AddIcon />
        </Fab>
        <Box m={2}>
          <Typography variant='h2'> Episodes </Typography>
        </Box>
        <Box>
          <List>
            {episodes &&
              episodes.map((value, index) => (
                <SortableItem key={`item-${value.guid}`} index={index} value={value} />
              ))}
          </List>
        </Box>
      </Container>
      {selectedEpisode && (
        <AppBar position='fixed' color='primary' className={classes.appBar}>
          <AudioPlayer
            header={<Typography color='textPrimary'> {selectedEpisode.title} </Typography>}
            autoPlay
            src={selectedEpisode.enclosure.url}
            customAdditionalControls={[]}
          />
        </AppBar>
      )}
    </Page>
  )
}

export default DashboardView
