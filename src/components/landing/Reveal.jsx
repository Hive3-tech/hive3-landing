export function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  style,
  ...props
}) {
  const classes = ['reveal', className].filter(Boolean).join(' ')
  const mergedStyle = {
    ...style,
    '--delay': `${delay}ms`,
  }

  return (
    <Tag className={classes} style={mergedStyle} {...props}>
      {children}
    </Tag>
  )
}
