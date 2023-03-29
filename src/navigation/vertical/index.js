// ** Icon imports
import {
  Logout,
  BookPlus,
  AccountEdit,
  Table,
  FormatListBulleted,
  SelectGroup,
  HeadPlusOutline,
  ViewDashboardOutline,
  ClipboardList
} from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: ViewDashboardOutline,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Users & Transactions'
    },
    {
      title: 'Users & Providers',
      icon: FormatListBulleted,
      path: '/users'
    },
    {
      title: 'Transactions',
      icon: Table,
      path: '/transactions'
    },
    {
      sectionTitle: 'Teams'
    },
    {
      title: 'Manage admins',
      icon: SelectGroup,
      path: '/admins'
    },
    {
      title: 'Add an admin',
      icon: HeadPlusOutline,
      path: '/add-admin'
    },
    {
      sectionTitle: 'Categories'
    },

    {
      title: 'Categories',
      icon: ClipboardList,
      path: '/categories'
    },
    {
      title: 'Add category',
      icon: BookPlus,
      path: '/add-category'
    },
    {
      sectionTitle: 'Settings'
    },

    {
      title: 'My profile',
      icon: AccountEdit,
      path: '/account-settings'
    },
    {
      title: 'Logout',
      icon: Logout,
      path: '/login'
    }
  ]
}

export default navigation
