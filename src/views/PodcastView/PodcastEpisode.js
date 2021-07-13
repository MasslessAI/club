import React, { useEffect } from 'react'
import {
  makeStyles,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Grid,
  Container,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  playBtn: {
    margin: theme.spacing(1),
    border: '1px solid #dadce0',
    borderRadius: '100px'
  }
}))

const PodcastEpisode = ({ episode, onSelect, showSummary = true, showExpandIcon = true }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card style={{ width: '100%', boxShadow: 'none' }}>
      <CardHeader title={episode.title} subheader={moment(episode.pubDate).format('MMM D, YYYY')} />

      {showSummary && (
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {episode.itunes.summary}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <Button
          className={classes.playBtn}
          startIcon={<PlayCircleOutlineIcon />}
          onClick={onSelect}
          variant='outlined'
          color='primary'
        >
          {moment.utc(moment.duration(episode.itunes.duration, "seconds").asMilliseconds()).format("HH:mm:ss")}
        </Button>
        {showExpandIcon && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default PodcastEpisode
