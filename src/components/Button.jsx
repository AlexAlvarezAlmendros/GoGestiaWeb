import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  to, 
  href,
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-brand-lime text-brand-dark-green hover:opacity-90 focus:ring-brand-lime',
    secondary: 'bg-brand-dark-green text-white hover:opacity-90 focus:ring-brand-dark-green',
    outline: 'border-2 border-brand-dark-green text-brand-dark-green bg-transparent hover:bg-brand-dark-green hover:text-white focus:ring-brand-dark-green',
    ghost: 'text-brand-dark-green bg-transparent hover:bg-brand-lime hover:bg-opacity-20 focus:ring-brand-lime'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  
  return (
    <button 
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
