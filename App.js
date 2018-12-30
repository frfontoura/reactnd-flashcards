import React from 'react'
import { Provider } from 'react-redux'

import store from './src/store'
import AppContainer from './src/AppContainer'
import { setLocalNotification } from './src/utils/notifications'

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}