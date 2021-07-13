import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather'
import NavItem from './NavItem'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../../userSlice'

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
}

const items = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Home'
  },
  {
    href: '/dashboard/podcast/edit',
    icon: BarChartIcon,
    title: 'Podcast settings'
  },
  {
    href: '/dashboard/episodes',
    icon: BarChartIcon,
    title: 'Episodes'
  }
]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()
  const dispatch = useDispatch()
  const authData = useSelector(state => state.user.authData)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={authData.picture}
          to='/dashboard'
        />
        <Typography className={classes.name} color='textPrimary' variant='h5'>
          {authData.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
          <ListItem>
            <Button onClick={() => dispatch(signOut())}> Logout </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  )

  return (
    <>
      <Drawer
        anchor='right'
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant='temporary'
      >
        {content}
      </Drawer>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
}

export default NavBar
