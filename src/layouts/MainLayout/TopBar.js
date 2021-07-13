import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { AppBar, Badge, Button, Box, Hidden, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import Logo from 'src/components/Logo'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}))

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles()
  const authData = useSelector(state => state.user.authData)
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to='/'>
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        {authData ?
        <IconButton color='inherit' onClick={onMobileNavOpen}>
          <MenuIcon />
        </IconButton> :
        <Button color='inherit' onClick={() => {}}>
          Sign in
        </Button>
}
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
}

export default TopBar
