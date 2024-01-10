import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Menu.module.css';

const routes = [
  { path: '/new-space', label: 'New Space' },
  { path: '/reuse-space', label: 'Reuse Space' }
];

export default function Menu() {
  const currentRoute = usePathname();
  return (
    <div className={styles.menu}>
      <h2>
        <Link href="/">
          <code>&lt;Flatfile /&gt;</code>
        </Link>
      </h2>
      <div className="tabs">
        {routes.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className={`tab tab-bordered ${
              currentRoute === path ? 'tab-active' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
