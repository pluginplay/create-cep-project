import About from '../components/Tabs/About'
import Plugin from '../components/Tabs/Plugin'
import Settings from '../components/Tabs/Settings'
import information from 'react-cep/assets/icons/information.svg'
import settings from 'react-cep/assets/icons/settings.svg'

export const APPLICATION_TABS = [
  {
    identifier: 'plugin',
    title: '<%= data.bundleName %>',
    icon: information,
    component: Plugin
  },
  {
    identifier: 'settings',
    title: 'Settings',
    icon: settings,
    component: Settings
  },
  {
    identifier: 'about',
    title: 'About',
    icon: information,
    component: About
  }
]
