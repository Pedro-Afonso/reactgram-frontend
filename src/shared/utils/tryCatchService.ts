import { TErrors } from '../interface'
import { handleError } from './handleError'

export const tryCatchService = async <F extends () => any>(
  cb: F
): Promise<ReturnType<F> | TErrors> => {
  try {
    return await cb()
  } catch (error) {
    return { errors: [handleError(error)] } as TErrors
  }
}
