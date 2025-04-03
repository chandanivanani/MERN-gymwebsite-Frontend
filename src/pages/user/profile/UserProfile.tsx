import React from 'react'
import Profile from '../../../components/dashboard/profile/Profile'

type Props = {}

const UserProfile = (props:Props) => {
    return (
        <div> <Profile isAdmin={false} /></div>
    )
}

export default UserProfile;