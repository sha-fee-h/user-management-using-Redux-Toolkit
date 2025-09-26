import React from 'react'

import { useSelector } from 'react-redux'

 

const User = () => {

    const user = useSelector(state=>state.auth.user)
  return (
    <div>
      <h1>{user.name}</h1>
      <button>click</button>
    </div>
  )
}

export default User
