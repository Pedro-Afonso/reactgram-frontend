export const fecthRequest = async <TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> => {
  alert(url)
  const response = await fetch(url, config)
  const data = await response.json()
  return data as TResponse
}
