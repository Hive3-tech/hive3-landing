export function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  style,
  ...props
}) {
  const Component = as
  const classes = ['reveal', className].filter(Boolean).join(' ')
  const mergedStyle = {
    ...style,
    '--delay': `${delay}ms`,
  }

  return (
    <Component className={classes} style={mergedStyle} {...props}>
      {children}
    </Component>
  )
}
