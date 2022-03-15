import { useStoreActions } from 'easy-peasy'
import { CgClose } from 'react-icons/cg'

export default function Base({ children, withClose, noRounded, classClose, onCloseClick }) {
  const { setShowModal } = useStoreActions((action) => action)

  function handleCloseModal() {
    if (onCloseClick) {
      onCloseClick()
    } else {
      setShowModal({ show: false, modalComponent: '' })
    }
  }

  return (
    <div
      className="fixed top-0 left-0 bg-black/70 w-full h-screen z-[100]"
      role="presentation"
      onClick={() =>
        setShowModal({
          show: false,
          modalComponent: '',
        })
      }
    >
      <div
        className="absolute w-full overflow-y-scroll max-w-[460px] max-h-[95%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 no-scrollbar"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-white p-5 sm:mx-2 ${noRounded ? '' : 'rounded'}`}>
          {withClose && (
            <div
              className={`${classClose} z-10 fixed right-4 cursor-pointer text-xl`}
              role="presentation"
              onClick={() => handleCloseModal()}
            >
              <CgClose />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
