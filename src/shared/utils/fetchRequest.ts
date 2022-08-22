export const fecthRequest = async <TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> => {
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    throw error;
  }
};
