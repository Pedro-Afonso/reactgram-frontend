import { Provider } from 'react-redux'
import { store } from '../../store'

interface IAppReduxProviderProps {
  children: React.ReactNode
}

export const AppReduxProvider: React.FC<IAppReduxProviderProps> = ({
  children
}) => {
  return <Provider store={store}>{children}</Provider>
}
