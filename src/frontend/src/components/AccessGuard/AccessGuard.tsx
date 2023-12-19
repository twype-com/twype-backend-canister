import { FC, PropsWithChildren, ReactNode } from 'react'
import { Button } from '@radix-ui/themes'
import cn from 'classnames'
import styles from './AccessGuard.module.scss'

export type AccessGuardProps = {
  title: string
  text?: string
  image?: ReactNode
  isFilled?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryButtonClick?: () => void
  onSecondaryButtonClick?: () => void
}

export const AccessGuard: FC<PropsWithChildren<AccessGuardProps>> = ({
  title,
  text,
  image,
  isFilled,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  children,
  ...restProps
}) => {
  const isPrimaryButtonVisible = primaryButtonText && onPrimaryButtonClick
  const isSecondaryButtonVisible = secondaryButtonText && onSecondaryButtonClick
  const isFooterVisible = isPrimaryButtonVisible || isSecondaryButtonVisible

  return (
    <section className={cn(styles.guard, { [styles.filled]: isFilled })} {...restProps}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        {text && <p className={styles.text}>{text}</p>}

        {children && <div className={styles.children}>{children}</div>}

        {isFooterVisible && (
          <footer className={styles.footer}>
            {isSecondaryButtonVisible && (
              <Button onClick={onSecondaryButtonClick}>{secondaryButtonText}</Button>
            )}
            {isPrimaryButtonVisible && (
              <Button onClick={onPrimaryButtonClick}>{primaryButtonText}</Button>
            )}
          </footer>
        )}

        {image && <aside className={styles.decor}>{image}</aside>}
      </div>
    </section>
  )
}
