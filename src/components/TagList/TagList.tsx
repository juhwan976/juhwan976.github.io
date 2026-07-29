import styles from './TagList.module.scss';

interface TagListProps {
  items: readonly string[];
  ariaLabel?: string;
}

export default function TagList({
  items,
  ariaLabel,
}: TagListProps): React.ReactNode {
  return (
    <ul className={styles.list} aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
