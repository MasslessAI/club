import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'

const ProtectedRoute = children => (
  <AmplifyAuthenticator usernameAlias='email'>
    <AmplifySignUp
      headerText='Sign-up for laterclub'
      slot='sign-up'
      usernameAlias='email'
      formFields={[
        {
          type: 'email',
          placeholder: 'Email',
          required: true
        },
        {
          type: 'password',
          placeholder: 'Password',
          required: true
        },
        {
          type: 'username',
          placeholder: 'Clubhouse Id',
          required: true
        }
      ]}
    />

    <AmplifySignIn
      slot='sign-in'
      usernameAlias='email'
      federated={{
        googleClientId: '365203176907-svoi5rcfp5itu1nrlcc4h7t9it2h0vfn.apps.googleusercontent.com'
      }}
    />
    {children}
  </AmplifyAuthenticator>
)

export default ProtectedRoute
