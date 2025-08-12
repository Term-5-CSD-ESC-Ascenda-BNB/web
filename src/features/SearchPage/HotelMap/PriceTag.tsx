import styles from './PriceTag.module.css';

interface PriceTagProps {
  price: number;
  currency?: string;
}

export function PriceTag({ price, currency = '$' }: PriceTagProps) {
  return (
    <div className={styles.priceTag}>
      {currency}
      {price}
    </div>
  );
}
