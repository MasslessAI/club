import React, { useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import routes from './routes'
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import { setAuthData } from 'src/userSlice.js'
import { fetchUserPodcasts } from 'src/podcastSlice.js'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const routing = useRoutes(routes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { podcastMeta, action } = useSelector(state => ({
    podcastMeta: state.podcast.podcastMeta,
    action: state.podcast.action
  }))

  useEffect(() => {
    const init = async () => {
      try {
        // refersh access token if necessary
        await Auth.currentCredentials()

        const authData = await Auth.currentAuthenticatedUser()
        dispatch(setAuthData(authData))
        // if session exists, fetch userData
        dispatch(fetchUserPodcasts())
      } catch (err) {
        console.log(err)
        // pass
      }
    }

    init()

    const AuthListener = data => {
      console.log(data)
      switch (data.payload.event) {
        case 'signIn':
          dispatch(setAuthData(data.payload.data))
          dispatch(fetchUserPodcasts())
          break
        case 'signUp':
          dispatch(setAuthData(data.payload.data))
          dispatch(fetchUserPodcasts())
          break
        case 'signOut':
          break
        case 'signIn_failure':
          break
        case 'tokenRefresh':
          break
        case 'tokenRefresh_failure':
          break
        case 'configured':
          break
        default:
          throw new Error('Unknown auth event')
      }
    }

    Hub.listen('auth', data => {
      AuthListener(data)
    })
  }, [dispatch])

  useEffect(() => {
    if (!podcastMeta && action.fetchUserPodcasts === 'fulfilled') {
      // user does not have podcast yet
      // redirect to podcast creation page
      navigate('/dashboard/podcast/edit')
    }
  }, [podcastMeta, action, navigate])

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>
}

export default App
