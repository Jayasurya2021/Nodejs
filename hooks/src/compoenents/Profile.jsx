import React, { useContext } from 'react'
import { UserContext } from './userProvider'

function Profile() {

    const {name } = useContext(UserContext)

  return (
    <div>
      {name}

    </div>
  )
}

export default Profile
