import { Avatar, Box, Typography } from '@mui/material'
import { IProfile } from '../../interface'

export const ProfileHeader: React.FC<{ user: IProfile }> = ({ user }) => {
  return (
    <Box display="flex" paddingY={2}>
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
    </Box>
  )
}
