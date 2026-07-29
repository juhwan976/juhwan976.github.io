import { useInViewOnce } from '@/hooks/useInViewOnce';
import type { DiagramSpec } from '@/content/types';
import styles from './DiagramView.module.scss';

interface DiagramViewProps {
  diagram: DiagramSpec;
}

/** 아키텍처 다이어그램. viewport 진입 시 단계가 순차적으로 강조된다. */
export default function DiagramView({
  diagram,
}: DiagramViewProps): React.ReactNode {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);
  const rootClassName = inView ? `${styles.root} ${styles.active}` : styles.root;

  if (diagram.type === 'flow') {
    return (
      <div ref={ref} className={rootClassName}>
        <p className={styles.title}>{diagram.title}</p>
        <ol className={styles.flow}>
          {diagram.steps.map((step, index) => (
            <li
              key={step.title}
              className={styles.flowStep}
              style={{ transitionDelay: `${index * 220}ms` }}
            >
              <span className={styles.flowIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.flowTitle}>{step.title}</span>
              {step.detail ? (
                <span className={styles.flowDetail}>{step.detail}</span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={ref} className={rootClassName}>
      <p className={styles.title}>{diagram.title}</p>
      <div className={styles.split}>
        <div
          className={`${styles.splitPanel} ${styles.splitPanelAccent}`}
          style={{ transitionDelay: '0ms' }}
        >
          <p className={styles.splitTitle}>{diagram.left.title}</p>
          <ul className={styles.splitList}>
            {diagram.left.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.splitPanel} style={{ transitionDelay: '260ms' }}>
          <p className={styles.splitTitle}>{diagram.right.title}</p>
          <ul className={styles.splitList}>
            {diagram.right.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
