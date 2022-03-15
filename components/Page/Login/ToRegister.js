import Button from "components/Atom/Button"

export default function  LoginToRegister() {
  return (
    <div className="sm:px-[15px]">
      <h2 className="text-center text-xl font-bold py-5 sm:text-lg sm:py-4">Baru Bergabung dengan JD?</h2>
      <p className="text-center text-sm pb-2 sm:text-xs sm:pb-1">Dapatkan rekomendasi produk kami dan miliki produk favoritmu.</p>
      <p className="text-center text-sm pb-2 sm:text-xs">Maksimalkan pengalaman belanja di JD untuk mengelola pesanan, menyimpan produk favorit hingga melacak pesanan dengan mudah.</p>
      <div className="my-5">
        <Button
          href="/register"
          title="Daftar Akun Baru"
          className="btn-white border border-gray-500 text-lg font-semibold w-full my-3 py-3 lg:text-lg sm:text-sm sm:py-3 sm:mt-3"
        />
      </div>
    </div>
  )
}