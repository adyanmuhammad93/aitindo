/* eslint-disable */
import Head from 'components/Common/MetaHead';
// import Button from 'components/Atom/Button'

export default function error404() {
  return (
    <>
      <Head title="Error 404" />
      <section className="content h-[90vh] flex flex-col items-center justify-center">
        <img src="static/images/404.png" alt="" className="w-[200px]" />
        <h1 className="text-2xl font-bold pt-16 pb-2 sm:text-xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-[12px] text-center leading-5 pb-5 sm:text-[10px]">
          Sepertinya halaman yang kamu cari tidak tersedia.
          <br />
          Coba keyword lain atau kembali ke Home.
        </p>
        {/* <Button href="/" title="Kembali ke Home" color="black" className='text-xs mt-5 w-40 h-10' /> */}
      </section>
    </>
  );
}
