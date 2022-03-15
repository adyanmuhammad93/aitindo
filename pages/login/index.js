/* eslint-disable */
import Head from 'components/Common/MetaHead'
import Oauth from 'components/Page/Login/Oauth'
import LoginForm from 'components/Page/Login/LoginForm'
import ToRegister from 'components/Page/Login/ToRegister'
import Description from 'components/Page/Login/Description'
import ToResetPassword from 'components/Page/Login/ToResetPassword'


export default function Login() {
  return (
    <>
      <Head title="Login"/>

      <>
        <div className="px-[50px] py-2 sm:px-[15px] sm:py-[10px]">
          <div className="border-b-[1px] border-t-[1px] border-gray-300">
            <div className="max-w-md mx-auto my-10">
              <Description />
              <LoginForm />
              <ToResetPassword />
              <Oauth />
            </div>
          </div>

          <div className="max-w-md mx-auto pt-3">
            <ToRegister />
          </div>
        </div>
      </>
    </>
  )
}
