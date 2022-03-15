import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

export default function Base({ children, onBackdropClick, fullScreen, className }) {
  const { setShowModal } = useStoreActions((action) => action)
  const { modal } = useStoreState((state) => state)

  function handleCloseModal() {
    if (onBackdropClick) {
      onBackdropClick()
    } else {
      setShowModal({ show: false, modalComponent: '' })
    }
  }

  useEffect(() => {
    if (fullScreen && modal.show) {
      document.querySelector('html').classList.add('overflow-y-hidden')
    }
    return () => {
      document.querySelector('html').classList.remove('overflow-y-hidden')
    }
  }, [modal.show])

  return (
    <div
      className={`fixed top-0 left-0  w-full h-screen z-[100] ${className} ${
        fullScreen ? 'bg-black top-[56px]' : 'bg-black/70'
      }`}
      role="presentation"
      onClick={handleCloseModal}
    >
      {children}
    </div>
  )
}
