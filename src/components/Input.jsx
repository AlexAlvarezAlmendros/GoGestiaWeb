import { useState } from 'react'

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={`input-field resize-none ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : isFocused 
                  ? 'border-brand-lime ring-2 ring-brand-lime' 
                  : 'border-gray-300'
            }`}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            className={`input-field ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : isFocused 
                  ? 'border-brand-lime ring-2 ring-brand-lime' 
                  : 'border-gray-300'
            }`}
            {...props}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input
