import { IoCheckmarkCircleOutline, IoWarning } from 'react-icons/io5'
import { BiMoney, BiCreditCardFront } from 'react-icons/bi'
import { useEffect, useState } from 'react'


export default function Message({ message, icon, iconSrc, type, deadline, className }) {
  const [timeRemaining, setTimeRemaining] = useState({})
  let currentIcon

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / ((1000 * 60 * 60) % 24))

    return {
      total,
      seconds,
      minutes,
      hours,
      days,
    }
  }

  function initializeClock(endTime) {
    const timeinterval = setInterval(() => {
      const t = getTimeRemaining(endTime)

      setTimeRemaining({
        days: `${t.days} hari`,
        hours: `${t.hours} jam`,
        minutes: `${t.minutes} menit`,
        seconds: `${t.seconds} detik`,
      })

      if (t.total <= 0) {
        clearInterval(timeinterval)
      }
    }, 1000)
  }

  useEffect(() => {
    if (deadline) {
      initializeClock(deadline)
      // console.log(getTimeRemaining())
    }
  }, [])

  function renderClassName() {
    if (type === 'warning') {
      if (icon) currentIcon = <IoWarning className="mr-2 text-[#FFC107]" />

      return 'bg-white border-[#FFC107]'
    }
    if (type === 'warningOrange') {
      if (icon) currentIcon = <IoWarning className="mr-2 text-[#FFC107]" />

      return 'bg-[#FFF3CD] border-[#FFF3CD]'
    }
    if (type === 'success') {
      if (icon) currentIcon = <IoCheckmarkCircleOutline className="mr-2" />

      return 'bg-[#6FCF97] border-[#43D5B0]'
    }
    if (type === 'payment') {
      if (icon) currentIcon = <BiMoney className="mr-2" />

      return 'bg-[#D6EFF5] border-[#D6EFF5]'
    }
    if (type === 'paymentMetode') {
      if (icon) currentIcon = <BiCreditCardFront className="mr-2" />

      return 'bg-[#FFF3CD] border-[#FFF3CD]'
    }

    return ''
  }

  return (
    <div
      className={`${
        className || ''
      }  border my-2 py-2 px-3 rounded flex items-center ${renderClassName()}`}
    >
      {currentIcon ?? iconSrc}
      {deadline ? (
        <div className="flex w-full items-center justify-between">
          <div className="text-[10px]">{message}</div>
          <div className="text-xs font-semibold">
            {timeRemaining.hours} {timeRemaining.minutes} {timeRemaining.seconds}
          </div>
        </div>
      ) : (
        <div className="text-[10px]">{message}</div>
      )}
    </div>
  )
}
