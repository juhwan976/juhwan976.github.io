import Magnet from '@/components/Magnet/Magnet';
import { siteConfig } from '@/content/site';
import styles from './ContactSection.module.scss';

const EMAIL_PLACEHOLDER = 'EMAIL_PLACEHOLDER';

export default function ContactSection(): React.ReactNode {
  const hasEmail = siteConfig.email !== EMAIL_PLACEHOLDER;

  return (
    <section id="contact" className={styles.section} aria-label="연락처">
      <div className={styles.stage}>
        <h2 className={styles.title}>{siteConfig.contact.title}</h2>
      </div>

      <div className={styles.edgeBottom}>
        <p className={styles.meta}>
          <span className={styles.metaName}>{siteConfig.name}</span>
          <span>{siteConfig.role}</span>
          {hasEmail ? (
            <Magnet>
              <a
                href={`mailto:${siteConfig.email}`}
                className={styles.emailLink}
              >
                {siteConfig.email}
              </a>
            </Magnet>
          ) : (
            <span className={styles.placeholder}>{EMAIL_PLACEHOLDER}</span>
          )}
        </p>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </section>
  );
}
