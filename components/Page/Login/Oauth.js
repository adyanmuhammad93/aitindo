/* eslint-disable */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import FBLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import * as AuthService from 'services/auth-service'
import { apiResolver, redirectTo } from 'services/common-utils'

export default function LoginOauth(props) {
  const router = useRouter()
  const { isHomepage } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const googleLoginCallback = (response) => {
    handleSocialMediaLogin(response.accessToken, 'google')
  }

  const facebookLoginCallback = (response) => {
    handleSocialMediaLogin(response.accessToken, 'facebook')
  }

  const handleSocialMediaLogin = async (accessToken, type) => {
    try {
      setIsSubmitting(true)

      const [res, err] = await apiResolver(() =>
        AuthService.postLogin({ token: accessToken, type })
      )

      if (err) {
        alert(err)
        return
      }

      const { token, expired } = res.data

      AuthService.saveUserLoginInfoToLocalStorage({
        // email: getValues('email'),
        token: token || '',
        expired: expired || Date.now() / 1000,
      })

      // success login
      // alert(res.message)

      router.reload()
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', (data) => {
      const appleToken = data.detail.authorization.id_token

      console.log('%c 🚀 detail', 'color: green; font-weight: bold;', data.detail)

      handleSocialMediaLogin(appleToken, 'apple')
    })

    document.addEventListener('AppleIDSignInOnFailure', (err) => {
      // handle error.
      const message = err.detail.error || ''
      if (message !== 'popup_closed_by_user') {
        setAlertSocialMedia({ variant: 'danger', message: err.detail.error || '' })
      }
    })
  }, [])

  return (
    <div className="sm:px-[15px]">
      <GoogleLogin
        clientId={process.env.GOOGLE_ID}
        render={(renderProps) => (
          <button
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="w-full flex items-center justify-start border rounded mb-5 mt-3 h-11 px-5 border-gray-300 btn-google hover:bg-gray-100 sm:h-10"
          >
            <img src="../../static/images/logo/google.png" className="w-5 mr-3" alt="" />
            <span className="font-bold text-xs text-gray-700">Google</span>
          </button>
        )}
        cookiePolicy="single_host_origin"
        onSuccess={googleLoginCallback}
        onFailure={(errObject) => {
          if (errObject.error === 'popup_closed_by_user') return
          console.log(errObject)
        }}
      />

      <FBLogin
        appId={process.env.FACEBOOK_ID}
        autoLoad={false}
        textButton=" Facebook"
        fields="name,email,picture"
        cssClass="flex items-center w-full h-11 border rounded mb-3 mt-1 py-3 px-5 border-gray-300 btn-fb font-bold text-xs text-gray-700 text-left hover:bg-gray-100 sm:h-10"
        icon="fa-facebook w-5 mr-3 text-center text-blue-800 !text-lg"
        callback={facebookLoginCallback}
        onFailure={(error) => {
          console.log(error)
        }}
        version="11.0"
      />
    </div>
  )
}
