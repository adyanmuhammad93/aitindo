import useResponsive from "hooks/useResponsive";

export default function button({
  href,
  color,
  className,
  btnBlock,
  anchorClassName,
  iconLeft,
  iconRight,
  title,
  target,
  onClick,
  mobileFull,
  type = "button"
}) {
  const { isMobile } = useResponsive();
  let newColor;

  if (color === "main") {
    newColor =
      "text-white duration-400 text-white self-stretch bg-gradient-to-r from-mainGreen1 to-mainGreen2";
  } else if (color === "white") {
    newColor =
      "text-white duration-400 text-blue-600 font-bold bg-white self-stretch";
  } else if (color === "borderCyan") {
    newColor =
      "bg-white border-[#43D5B0] text-[#43D5B0] duration-400 hover:text-white hover:bg-[#43D5B0]";
  } else if (color === "black") {
    newColor =
      "bg-black border-black text-white duration-400 hover:text-black hover:bg-white";
  } else if (color === "gray") {
    newColor = "bg-[#F3F2F6] border-[#F3F2F6] duration-400 hover:bg-white";
  } else if (color === "yellow") {
    newColor = "bg-[#FFC107] border-[#FFC107] duration-400 hover:bg-white";
  } else if (color === "cyan-invert") {
    newColor =
      "bg-[#43D5B0] border-[#43D5B0] text-white duration-400 hover:text-[#43D5B0] hover:bg-white";
  } else if (color === "navi-blue") {
    newColor =
      "bg-[#212047] border-[#212047] text-white duration-400 hover:text-[#212047] hover:bg-white";
  } else if (color === "cyan-nohover") {
    newColor = "bg-[#43D5B0] border-[#43D5B0] text-black duration-400";
  } else if (color === "red-nohover") {
    newColor = "bg-[#EA5160] border-[#EA5160] text-black duration-400";
  } else if (color === "green-nohover") {
    newColor = "bg-[#A5D1A1] border-[#A5D1A1] text-black duration-400";
  } else if (color === "yellow-nohover") {
    newColor = "bg-[#FFC107] border-[#FFC107] text-black duration-400";
  }

  return (
    <a
      href={href || null}
      alt=""
      target={target || null}
      onClick={onClick ? () => onClick() : null}
      className={`block
        ${btnBlock ? "w-full" : ""}
        ${anchorClassName || ""}
        ${mobileFull && isMobile && "w-full"}
      `}
    >
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={`flex justify-center items-center py-2 px-3
          ${className || ""}
          ${newColor}
          ${btnBlock ? "w-full" : ""}
          ${mobileFull && isMobile && "w-full"}
        `}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {title}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </a>
  );
}
