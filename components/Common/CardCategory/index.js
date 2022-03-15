import { HiOutlineChevronRight } from 'react-icons/hi'
import Button from 'components/Atom/Button'

export default function CardCategory({ img, title, titleBtn, btnLink, btnBlock, classImg, classTitle, classBtn, className }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={classImg}>
        <img src={img} alt="" className="w-full h-full object-contain" />
      </div>
      <p className={classTitle}>{title}</p>
      <Button
        color="main"
        href={btnLink}
        title={titleBtn}
        btnBlock={btnBlock}
        iconRight={<HiOutlineChevronRight className="text-base" />}
        className={classBtn}
      />
    </div>
  )
}
