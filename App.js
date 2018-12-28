import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Constants } from 'expo'

import store from './src/store'
import AppContainer from './src/AppContainer'
import { black } from './src/utils/colors'

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}