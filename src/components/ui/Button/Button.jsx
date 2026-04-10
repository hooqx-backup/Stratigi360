import { Link } from 'react-router-dom'
import './Button.css'

/**
 * Global Button — two core visual styles:
 *   filled   → variant="primary" | "white" | "dark"
 *   outlined → variant="secondary" | "outline-white"
 *
 * Behaviour is driven by props:
 *   href (internal /path)  → renders <Link>   (SPA navigation, no full reload)
 *   href (external URL)    → renders <a>      (opens normally)
 *   type="submit" / click  → renders <button> (form submit or action)
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  // Internal SPA route
  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }

  // External link (mailto:, tel:, https://, etc.)
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  // Button (submit, reset, or plain click)
  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
