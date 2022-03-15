import Base from 'components/Atom/Modal'
import Description from 'components/Page/Login/Description'
import LoginForm from 'components/Page/Login/LoginForm'
import ToResetPassword from 'components/Page/Login/ToResetPassword'
import Oauth from 'components/Page/Login/Oauth'
import ToRegister from 'components/Page/Login/ToRegister'

export default function LoginPopup() {
  return (
    <Base withClose noRounded classClose="top-[10px]">
      <div className="border-b-[1px] border-gray-300">
        <div className="w-full mx-auto my-10">
          <Description />
          <LoginForm />
          <ToResetPassword />
          <Oauth />
        </div>
      </div>

      <div className="w-full mx-auto pt-3">
        <ToRegister />
      </div>
    </Base>
  )
}
