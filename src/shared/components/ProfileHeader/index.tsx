import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import { useAppSelector } from '../../hooks'

export const ProfileHeader = () => {
  const user = useAppSelector(state => state.user.user)

  return (
    <Box display="flex" paddingY={2}>
      {user ? (
        <>
          <Avatar
            sx={{ width: 128, height: 128 }}
            src={user.profileImage ? user.profileImage : undefined}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginLeft={2}
            gap={1}
            height="auto"
          >
            <Typography variant="h5">{user.name}</Typography>
            <Typography>{user.bio}</Typography>
          </Box>
        </>
      ) : null}
    </Box>
  )
}
