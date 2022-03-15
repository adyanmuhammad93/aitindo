import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useStoreActions } from 'easy-peasy'
import { useIsLoggedIn } from 'hooks/useAuth';
import * as AuthService from 'services/auth-service';
import { apiResolver, redirectTo } from 'services/common-utils';
import {
  FORM_FIELD_MINIMUM_LENGTH,
  FORM_FIELD_REQUIRED
} from 'services/constants';
import Preloader from 'components/Atom/Preloader';
import Notification from 'components/Atom/Notification';

export default function LoginForm() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [loginMessage, setLoginMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = React.useState({ showPassword: false });
  // const { setUserLoginStatus } = useStoreActions((store) => store)

  const showHidePassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  if (isLoggedIn) redirectTo(router, '/');

  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm({ mode: 'all' });

  const onSubmit = async formValues => {
    setLoginMessage(null);

    try {
      setIsSubmitting(true);

      const [res, err] = await apiResolver(() =>
        AuthService.postLogin(formValues)
      );

      if (err) {
        setLoginMessage(err);
      } else {
        const { token, expired } = res.data;

        AuthService.saveUserLoginInfoToLocalStorage({
          email: getValues('email'),
          token: token || '',
          expired: expired || Date.now() / 1000
        });
        // setUserLoginStatus(true)

        reset();

        router.reload();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sm:px-[15px]">
      {isSubmitting && <Preloader />}

      <form className="mb-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 sm:mb-2">
          <input
            type="email"
            id="email"
            required
            placeholder="Email*"
            className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
            {...register('email', {
              required: { value: true, message: FORM_FIELD_REQUIRED }
            })}
          />
          <div className="text-red-600 text-[9px]">
            {errors?.email?.message}
          </div>
        </div>

        <div className="btn-password relative mb-3 sm:mb-2">
          <input
            type={values.showPassword ? 'text' : 'password'}
            id="password"
            required
            placeholder="Kata Sandi*"
            className="border border-gray-300 mb-1 mt-1 px-4 py-4 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent w-full h-12 sm:h-10"
            {...register('password', {
              required: { value: true, message: FORM_FIELD_REQUIRED },
              minLength: { value: 1, message: FORM_FIELD_MINIMUM_LENGTH(1) }
            })}
          />

          <span
            onClick={showHidePassword}
            className="absolute right-[15px] top-[20px] text-[10px] underline font-bold text-gray-400 cursor-pointer hover:text-gray-700 sm:top-[18px] sm:text-[9px]"
            aria-hidden="true"
          >
            {values.showPassword ? 'Tutup' : 'Lihat'}
          </span>
        </div>

        {loginMessage && (
          <Notification icon type="warning" message={loginMessage} />
        )}

        <button
          type="submit"
          className="btn-cyan border text-xl font-semibold w-full mt-8 mb-3 py-3 lg:text-base sm:text-sm sm:py-3 sm:mt-3"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
