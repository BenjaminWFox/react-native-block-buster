import React from 'react'
import MainTabs from './main-tabs'

class TabsWrapped extends React.Component {
  static router = MainTabs.router

  render() {
    return (
      <MainTabs style={{ backgroundColor: 'black' }} />
    )
  }
}

export default TabsWrapped
