import { HiOutlineChevronRight } from "react-icons/hi";
import Button from "components/Atom/Button";
import useResponsive from "hooks/useResponsive";

export default function CardCategory({
  img,
  title,
  titleBtn,
  btnLink,
  btnBlock,
  classImg,
  classTitle,
  classBtn,
  className
}) {
  const { isMobile } = useResponsive();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={classImg}>
        <img
          src={img}
          alt=""
          className="w-full mt-4 h-full object-contain md:mt-2 sm:mt-1 sm:p-1"
        />
      </div>
      {isMobile ? (
        <Button
          color="main"
          href={btnLink}
          title={title}
          btnBlock={btnBlock}
          className={`${classBtn} !text-sm rounded-2xl !justify-center !leading-4 h-10 mb-2`}
        />
      ) : (
        <>
          <p className={classTitle}>{title}</p>
          <Button
            color="main"
            href={btnLink}
            title={titleBtn}
            btnBlock={btnBlock}
            iconRight={<HiOutlineChevronRight className="text-base" />}
            className={classBtn}
          />
        </>
      )}
    </div>
  );
}
