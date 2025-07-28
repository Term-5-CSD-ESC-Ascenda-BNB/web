import { Logo } from '../Logo/Logo';
import styles from './Footer.module.css';
import { Stack } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandX,
  IconBrandInstagram,
  IconPhone,
  IconMail,
} from '@tabler/icons-react';

export function Footer() {
  return (
    <div className={styles['footer']}>
      <Stack gap={20} className={styles['logo-container']}>
        <Logo c={'gray.1'} />
        <p className={styles['copyright']}>© 2025 Wayfare. All rights reserved.</p>
      </Stack>

      <Stack gap={16} className={styles['details-container']}>
        <h3 className={styles['section-title']}>Contact Us</h3>
        <div className={styles['line']}></div>
        <div className={styles['contact-info']}>
          <p>
            <IconMail size={18} /> contact@wayfare.com
          </p>
          <p>
            <IconPhone size={18} /> +65 6789 1234
          </p>
        </div>
        <div className={styles['social-icons']}>
          <div className={styles['social-icon']}>
            <IconBrandFacebook size={18} />
          </div>
          <div className={styles['social-icon']}>
            <IconBrandTiktok size={18} />
          </div>
          <div className={styles['social-icon']}>
            <IconBrandX size={18} />
          </div>
          <div className={styles['social-icon']}>
            <IconBrandInstagram size={18} />
          </div>
        </div>
      </Stack>

      <Stack gap={16} className={styles['details-container']}>
        <h3 className={styles['section-title']}>Navigation</h3>
        <div className={styles['line']}></div>
        <div className={styles['nav-links']}>
          <p>About Us</p>
          <p>Hotels</p>
          <p>FAQs</p>
          <p>My Bookings</p>
        </div>
      </Stack>

      <Stack gap={16} className={styles['details-container']}>
        <h3 className={styles['section-title']}>Legal</h3>
        <div className={styles['line']}></div>
        <div className={styles['legal-links']}>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </Stack>
    </div>
  );
}
