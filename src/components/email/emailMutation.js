import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'


const EMAIL = gql`
  mutation getAnonymousEmail{
               createEmail{
                  _id
                  email
                  created_at
                  remove_at
                  mails{
                      subject
                      from
                      received_at
                      content
                  }
                }
        }
`

export const EmailMutation = ({ children }) => {
    return <Mutation mutation={EMAIL}>
        {children}
    </Mutation>
}