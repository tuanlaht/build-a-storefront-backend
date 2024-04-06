import jsonwebtoken from 'jsonwebtoken'
export function getUserIdFromToken(token: string): number | null {
  try {
    const decodedToken: any = jsonwebtoken.decode(token)

    if (decodedToken && decodedToken.user && decodedToken.user.id) {
      return decodedToken.user.id
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
