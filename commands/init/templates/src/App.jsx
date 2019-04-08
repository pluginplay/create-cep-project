import { Component } from 'react'
import SystemContainer from 'react-cep/SystemContainer'
import TabContainer from 'react-cep/TabContainer'
import systemState from './lib/Models/SystemState'
import './App.css'
import 'react-cep/assets/style.css'
import { observer } from 'mobx-react'
import { APPLICATION_TABS } from './constants/tabs'

@observer
export default class App extends Component {
  onReportClicked () {
    // TODO: Handle reporting an error. Maybe through something like Sentry...
  }

  componentDidCatch (error, errorInfo) {
    // This should rarely happen, but represents a critical failure of the application.
    console.error(error)
  }

  render () {
    return (
      <SystemContainer
        systemState={systemState}
        errorEvent={'<%= data.bundleId %>.error'}
        debugEvent={'<%= data.bundleId %>.debug'}
        theme={{}}
        onReportClicked={this.onReportClicked}
      >
        <TabContainer tabs={APPLICATION_TABS} />
      </SystemContainer>
    )
  }
}
