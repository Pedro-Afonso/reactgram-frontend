import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useYupValidationResolver } from '../../../hooks'
import { VTextField } from '../VTextField'

const formSchema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  password: yup
    .string()
    .min(8, 'A senha precisa de no mínimo 8 caracteres.')
    .required('A senha é obrigatória')
})

type TForm = yup.InferType<typeof formSchema>

interface ILoginFormProps {
  handleLogin: (data: TForm) => void
}

export const LoginForm: React.FC<ILoginFormProps> = ({ handleLogin }) => {
  const resolver = useYupValidationResolver(formSchema)
  const { handleSubmit, control } = useForm<TForm>({
    resolver,
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: TForm) => {
    handleLogin(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <VTextField
        name="email"
        label="email"
        type="email"
        placeholder="Insira o email cadastrado..."
        control={control}
      />
      <VTextField
        name="password"
        label="senha"
        type="password"
        placeholder="Insira sua senha"
        control={control}
      />
      <Button type="submit" variant="contained" color="warning">
        Entrar
      </Button>
    </Box>
  )
}
