export default function link({ title, href, className, target, onClick }) {
  return (
    <a onClick={onClick} className={`block cursor-pointer duration-300 ${className || ''}`} href={href} target={target || null}>
      {title}
    </a>
  );
}
