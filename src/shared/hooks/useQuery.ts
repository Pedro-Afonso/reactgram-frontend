import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()

  const queryParams = useMemo(() => {
    return new URLSearchParams(search)
  }, [search])

  return queryParams
}
