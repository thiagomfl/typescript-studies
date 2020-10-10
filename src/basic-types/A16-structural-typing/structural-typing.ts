type verifyUserFn = (user: User, sentValues: User) => boolean
type User = { username: string; password: string }

export const verifyUser: verifyUserFn = (user, sentValue) => {
  return user.username === sentValue.username && user.password === sentValue.password
}

const dbUser: User = { username: 'Thiago', password: '123' }
const sentUser: User = { username: 'Thiago', password: 'q3eqw' }

const loggedIn = verifyUser(dbUser, sentUser)
console.log(loggedIn)
