/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useIsLoggedIn } from 'hooks/useAuth'

import * as AuthService from 'services/auth-service'
import { apiResolver, redirectTo } from 'services/common-utils'
import { FORM_FIELD_REQUIRED } from 'services/constants'

import Head from 'components/Common/MetaHead'
import Preloader from 'components/Atom/Preloader'
import Notification from 'components/Atom/Notification'

export default function ResetPassword() {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [forgotMessage, setForgotMessage] = useState()
  // const { setEmailResetPassword } = useStoreActions((action) => action)

  if (isLoggedIn) redirectTo(router, '/')

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ mode: 'all' })

  const onSubmit = async (formValues) => {
    const currEmail = formValues.email
    try {
      setIsLoading(true)

      const [res, err] = await apiResolver(() =>
        AuthService.postCreateVerificationCode({ type: 'reset_password', email: currEmail })
      )

      if (err) {
        setForgotMessage(err)
        console.error(err)
      }

      if (res) {
        setIsShowPopup(true)
        setForgotMessage(res.message)
        // setEmailResetPassword(currEmail)
        localStorage.setItem('__emailreset', currEmail);
        reset()
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handlePopup() {
    setIsShowPopup(true)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <>
      <Head title="Forgot Password" />

      <>
        {isShowPopup && (
          <div className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-30">
            <div className="absolute inset-0 m-auto max-w-[400px] w-full max-h-[340px]">
              <div className="flex flex-col items-center justify-center p-6 h-full m-2 bg-white">
                <img src="../../static/icon/ico-email.png" alt="" />
                <div className="text-center pt-4 font-bold text-md md:text-sm">Email sent!</div>
                <div className="text-center pt-2 leading-4 text-[13px] md:text-[11px]">
                  If your email address is registered to us, you will receive an email notification
                  shortly. Please follow the link provided in the email to create a new password
                </div>
                <button
                  onClick={handlePopup}
                  type="button"
                  className="btn-black border text-sm font-semibold w-full mt-8 mb-3 py-4 sm:text-xs sm:py-3"
                >
                  {' '}
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="category-wrapper px-[50px] py-2 sm:px-[15px]">
          {isLoading && <Preloader />}
          
          <div className="border-t-[1px] border-gray-300 mb-10 sm:px-[15px] sm:mb-0">
            <div className="max-w-md mx-auto mt-10">
              <h1 className="text-center py-4 font-bold text-3xl sm:text-xl">Reset Password</h1>
              <p className="text-center text-sm sm:text-[10px] sm:pb-1">
                To reset your password please enter your email address below.
              </p>

              <form className="mb-2 mt-12 sm:mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 sm:mb-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-700 sm:text-[10px]">
                    Email <spam className="text-main-cyan">*</spam>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Masukkan alamat email Anda"
                    className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                    {...register('email', {
                      required: { value: true, message: FORM_FIELD_REQUIRED },
                    })}
                  />
                  <div className="text-red-600 text-[9px]">{errors?.email?.message}</div>
                </div>

                {forgotMessage ? (
                  <Notification icon type="warning" message={forgotMessage} className="my-2" />
                ) : null}

                <button
                  type="submit"
                  className="btn-cyan border text-xl font-semibold w-full mt-8 mb-3 py-3 lg:text-base sm:text-sm sm:py-3 sm:mt-3"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  )
}
