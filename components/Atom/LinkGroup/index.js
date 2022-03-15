export default function LinkGroup({ children, href, target, className }) {
  return (
    <a href={href} target={target || null} className={`block cursor-pointer duration-300 ${className || ''}`} >
      {children}
    </a>
  )
}
