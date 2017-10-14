export default function ({ store, error, redirect }) {
  if (!store.state.authUser) {
    console.log('new!');
    return redirect('/login')
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
  }
}
