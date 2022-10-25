/* eslint-disable no-console */
/* interface MessagesIndex {
  [index: string]: string;
} */

export const handleError = (error: any): string => {
  if (error instanceof Error) {
    const { message } = error
    console.error(message)
    return 'Ocorreu um erro, por favor tente mais tarde.'
  } else {
    console.error(error)
    return 'Ocorreu um erro, por favor tente mais tarde.'
  }
}
