import { useStoreActions } from 'easy-peasy'
import useResponsive from 'hooks/useResponsive'

import { CgClose } from 'react-icons/cg'

export default function ModalInner({
  children,
  className,
  withTitle,
  withClose,
  fullScreen = false,
  onCloseClick,
}) {
  const { setShowModal } = useStoreActions((action) => action)
  const { isTablet } = useResponsive()

  function handleCloseModal() {
    if (onCloseClick) {
      onCloseClick()
    } else {
      setShowModal({ show: false, modalComponent: '' })
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      style={
        fullScreen
          ? {
              height: isTablet ? 'calc(100vh - 56px)' : 'calc(100vh - 171px)',
            }
          : {}
      }
      className={`bg-white translate-x-[-50%] left-[50%] absolute ${className}
        ${
          fullScreen
            ? 'top-0 h-screen w-full overflow-y-scroll'
            : 'rounded md:w-[95%] translate-y-[-50%] top-[50%] '
        }
      `}
    >
      <div className={withTitle && 'flex justify-between p-4'}>
        {withTitle}
        {withClose && !fullScreen && (
          <div
            className="absolute right-4 top-4 cursor-pointer text-xl"
            role="presentation"
            onClick={() => handleCloseModal()}
          >
            <CgClose />
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
