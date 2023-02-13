// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'bx:home-circle',
  },
  {
    title: 'Post',
    path: '/post/create',
    icon: 'bx:bxs-invader',
  },
]

export default navigation
