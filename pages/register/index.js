import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useIsLoggedIn } from 'hooks/useAuth';
import * as AuthService from 'services/auth-service';
import {
  apiResolver,
  redirectTo,
  validateConfirmPassword
} from 'services/common-utils';
import {
  FORM_FIELD_MINIMUM_LENGTH,
  FORM_FIELD_REQUIRED
} from 'services/constants';

import Head from 'components/Common/MetaHead';
import Preloader from 'components/Atom/Preloader';
import Notification from 'components/Atom/Notification';

export default function Register() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerMessage, setRegisterMessage] = useState();

  if (isLoggedIn) redirectTo(router, '/');

  const {
    watch,
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm({ mode: 'all' });

  const onSubmit = async formValues => {
    const submittedForm = formValues;
    delete submittedForm.confirmpassword;
    setRegisterMessage(null);

    try {
      setIsSubmitting(true);
      const [res, err] = await apiResolver(() =>
        AuthService.postRegisterNewCustomer(submittedForm)
      );
      if (err) {
        setRegisterMessage(err);
        return;
      }
      const confirmMessage = 'Cek email Anda untuk melakukan konfirmasi akun.';
      setRegisterMessage(`${res.message}, ${confirmMessage}`);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head title="Register" />

      <div className="category-wrapper px-[50px] py-2 sm:px-[15px]">
        {isSubmitting && <Preloader />}

        <div className="border-t-[1px] border-gray-300 mb-10 sm:px-[15px] sm:mb-0">
          <div className="max-w-md mx-auto mt-10">
            <h1 className="text-center py-4 font-bold text-3xl sm:text-xl">
              Daftar Akun Baru
            </h1>

            <form className="mb-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
              {/* email */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  Email <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Masukkan alamat email Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('email', {
                    required: { value: true, message: FORM_FIELD_REQUIRED }
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.email?.message}
                </div>
              </div>

              {/* first name */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="fistname"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  Nama Depan <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="text"
                  id="fistname"
                  required
                  placeholder="Masukkan nama depan Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('firstname', {
                    required: { value: true, message: FORM_FIELD_REQUIRED }
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.firstname?.message}
                </div>
              </div>

              {/* last name */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="lastname"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  Nama Belakang <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="text"
                  id="lastname"
                  required
                  placeholder="Masukkan nama belakang Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('lastname', {
                    required: { value: true, message: FORM_FIELD_REQUIRED }
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.lastname?.message}
                </div>
              </div>

              {/* no handphone */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="No. Handphone"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  No Handphone <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="text"
                  id="phone"
                  required
                  placeholder="Masukkan no handphone Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('phone', {
                    required: { value: true }
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.phone?.message}
                </div>
              </div>

              {/* kata sandi */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  Kata Sandi <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Masukkan kata sandi Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('password', {
                    required: { value: true, message: FORM_FIELD_REQUIRED },
                    minLength: {
                      value: 6,
                      message: FORM_FIELD_MINIMUM_LENGTH(6)
                    }
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.password?.message}
                </div>
              </div>

              {/* kata sandi konfirmasi */}
              <div className="mb-3 sm:mb-2">
                <label
                  htmlFor="confirmpassword"
                  className="text-xs font-bold text-gray-700 sm:text-[10px]"
                >
                  Konfirmasi Kata Sandi{' '}
                  <spam className="text-main-cyan">*</spam>
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  required
                  placeholder="Konfirmasi kata sandi Anda"
                  className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
                  {...register('confirmpassword', {
                    required: { value: true, message: FORM_FIELD_REQUIRED },
                    minLength: {
                      value: 6,
                      message: FORM_FIELD_MINIMUM_LENGTH(6)
                    },
                    validate: value =>
                      validateConfirmPassword(value, watch('password'))
                  })}
                />
                <div className="text-red-600 text-[9px]">
                  {errors?.confirmpassword?.message}
                </div>
              </div>

              {registerMessage && (
                <Notification icon type="warning" message={registerMessage} />
              )}

              <button
                type="submit"
                className="btn-cyan border text-xl font-semibold w-full mt-8 mb-3 py-3 lg:text-base sm:text-sm sm:py-3 sm:mt-3"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
