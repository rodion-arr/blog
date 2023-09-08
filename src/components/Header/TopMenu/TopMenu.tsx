import css from './TopMenu.module.scss';
import { Link } from '@/components/Util/Link/Link';

const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Backend', href: '/backend' },
  { title: 'CSS/Layout', href: '/css' },
  { title: 'JavaScript/React', href: '/js' },
  { title: 'Tech project management', href: '/pm' },
  { title: 'DevOps', href: '/devops' },
  { title: 'Misc', href: '/misc' },
];

export const TopMenu = () => {
  return (
    <ul className={css.menu}>
      {menuItems.map((item, index) => (
        <li className={css.menu__item} key={index}>
          <Link activeClassName={css['menu__active-link']} href={item.href}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
