import Link from "components/Atom/Link"

export default function JDBreadcrumb({ bread, className = '', labelClassName = '' }) {
  if (!bread) return null

  const { length } = bread
  const lastIndex = length - 1
  const breadCrumbList = []

  // eslint-disable-next-line array-callback-return
  bread.map((b, index) => {
    breadCrumbList.push(
      <li
        key={index}
        className={`last:font-bold text-xs text-[#676767] font-medium last:text-black last:text-[11px] cursor-pointer capitalize ${labelClassName}`}
      >
        <Link 
          href={b.href}
          title={
            <span>{b.label}</span>
          }        
        />
      </li>
    )
    if (index < lastIndex)
      breadCrumbList.push(
        <li key={`separator-${index}`} className={`text-md ${className}`}>
          /
        </li>
      )
  })

  return (
    <nav aria-label="breadcrumb" className="py-4 flex">
      <ul className="breadcrumbx flex items-center space-x-2">{breadCrumbList}</ul>
    </nav>
  )
}
