import React, { useEffect } from 'react'
import {
  makeStyles,
  Button,
  IconButton,
  CardMedia,
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    flex: '1 0 auto',
    margin: '10px'
  },
  cover: {
    height: 100,
    width: 100,
    margin: '10px'
  }
}));

const PodcastSummary = ({ feed }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
           <Typography component="h5" variant="h5">
            {feed && feed.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {feed && feed.description}
          </Typography>
        </CardContent>
      </div>
      {feed &&
      <CardMedia
        className={classes.cover}
        image={feed.image.url}
        title={feed.title}
      />
    } 
    </Card>
  )
}

export default PodcastSummary
