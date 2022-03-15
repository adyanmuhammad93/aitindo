import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useIsLoggedIn } from 'hooks/useAuth'
import * as AuthService from 'services/auth-service'
import { FORM_FIELD_REQUIRED } from 'services/constants'
import { apiResolver, redirectTo } from 'services/common-utils'

import Head from 'components/Common/MetaHead'
import Preloader from 'components/Atom/Preloader'
import Notification from 'components/Atom/Notification'

export default function Confirmation() {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()
  const [isLoading, setIsLoading] = useState(false)
  const [setIsResendEmailActivation] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState()
  const token = router.query?.token

  if (isLoggedIn) redirectTo(router, '/')

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: 'all',
  })

  const verifyToken = async () => {
    if (!token) return

    try {
      setIsLoading(true)

      const [errValidate] = await apiResolver(() => AuthService.getValidateToken(token))
      if (errValidate) {
        setConfirmationMessage(errValidate)
        setIsResendEmailActivation(true)
        console.error(errValidate)
      }

      const [resVerify, errVerify] = await apiResolver(() => AuthService.putVerifyToken(token))

      if (errVerify) {
        setConfirmationMessage(errVerify)
        setIsResendEmailActivation(true)
      }

      if (resVerify) {
        setConfirmationMessage(resVerify.message || '')
        redirectTo(router, '/login', 2000)
        reset()
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    verifyToken()
  }, [token])

  const onSubmit = async (formValues) => {
    try {
      setIsLoading(true)

      const [res, err] = await apiResolver(() =>
        AuthService.postCreateVerificationCode({ type: 'registration', email: formValues.email })
      )

      if (err) {
        console.error(err)
        setConfirmationMessage(err)
      }

      if (res) {
        setConfirmationMessage(res.message || '')
        reset({ email: '' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Head title="Confirmation" />

      <div className="px-[50px] py-2 sm:px-[15px] sm:py-[10px]">
        
        <Preloader isShow={isLoading} />

        <div className="border-t-[1px] border-gray-300">
          <div className="max-w-md mx-auto my-10">
            <h1 className="text-center py-4 font-bold text-3xl sm:text-xl">Konfirmasi Email</h1>

            <form className="mb-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
              {/* email */}
              <div className="mb-3 sm:mb-2">
                <label htmlFor="email" className='text-xs font-bold text-gray-700 sm:text-[10px]'>
                  Email <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Masukkan alamat email Anda"
                  className='border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10'
                  {...register('email', {
                    required: { value: true, message: FORM_FIELD_REQUIRED },
                  })}
                />
                <div className="text-red-600 text-[9px]">{errors?.email?.message}</div>
              </div>

              
              {confirmationMessage && 
                <Notification
                  icon 
                  type="warning"
                  message={confirmationMessage}
                  className="mb-2"
                />
              }

              <button 
                type="submit"
                className="btn-cyan border text-xl font-semibold w-full mt-8 mb-3 py-3 lg:text-base sm:text-sm sm:py-3 sm:mt-3"
              >
                Konfirmasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
