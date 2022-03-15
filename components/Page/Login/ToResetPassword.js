import Link from "components/Atom/Link"

export default function  LoginToResetPassword() {
  return (
    <div className="text-center">
      <Link
        href="/forgot-password"
        title={
          <div className="cursor-pointer underline py-3 text-gray-500 text-base inline-block font-semibold hover:text-black sm:text-sm">
            Lupa Password
          </div>
        }
      />
      <br/><span className="block text-gray-400 py-4 text-xs font-semibold">- atau -</span>
    </div>
  )
}