import React, { useEffect, useState } from 'react'
import { AppBar, List, ListItem, Box, Container, Typography, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import PodcastEpisode from './PodcastEpisode'
import PodcastSummary from './PodcastSummary'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPodcast } from 'src/podcastSlice.js'
import {
  useParams
} from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
  }
}))

const PodcastView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const feed = useSelector(state => state.podcast.feed)

  let { podcastId } = useParams()

  useEffect(() => {
    dispatch(fetchPodcast({ podcastId }))
  }, [dispatch, podcastId])

  return (
    <Page className={classes.root}>
      <Container maxWidth='md'>
        <List>
          <ListItem>
            <Box width='100%'>
              <PodcastSummary feed={feed} />
            </Box>
          </ListItem>
          {feed &&
            feed.items.slice(0, 10).map(feedItem => (
              <ListItem>
                <PodcastEpisode
                  episode={feedItem}
                  onSelect={() => {
                    setSelectedEpisode(feedItem)
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Container>
      {selectedEpisode && (
        <AppBar position='fixed' color='primary' className={classes.appBar}>
          <AudioPlayer header={<Typography color='textPrimary'> {selectedEpisode.title} </Typography>} autoPlay	src={selectedEpisode.enclosure.url} customAdditionalControls={[]} />
        </AppBar>
      )}
    </Page>
  )
}

export default PodcastView
