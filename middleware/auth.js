export default function ({ store, error, redirect }) {
  if (!store.state.authUser) {
    return redirect('/login')
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
  }
}
