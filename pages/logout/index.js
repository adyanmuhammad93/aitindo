import { useRouter } from 'next/router';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useStoreActions } from 'easy-peasy'
import { useIsLoggedIn } from 'hooks/useAuth';
import * as AuthService from 'services/auth-service';
import { apiResolver, redirectTo } from 'services/common-utils';
// import {
//   FORM_FIELD_MINIMUM_LENGTH,
//   FORM_FIELD_REQUIRED
// } from 'services/constants';
// import Preloader from 'components/Atom/Preloader';
// import Notification from 'components/Atom/Notification';

export default function Logout() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  // const [loginMessage, setLoginMessage] = useState();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [values, setValues] = React.useState({ showPassword: false });
  // const { setUserLoginStatus } = useStoreActions((store) => store)

  if (isLoggedIn) {
    try {
      const run = async function run(){
        // setIsSubmitting(true);

        const [res, err] = await apiResolver(() =>
          AuthService.postCustomerLogout()
        );

        if (err) {
          // setLoginMessage(err);
          console.error(err)
          console.error(res)
        }
        // else {
        //   const { token, expired } = res.data;
    
        //   AuthService.saveUserLoginInfoToLocalStorage({
        //     email: getValues('email'),
        //     token: token || '',
        //     expired: expired || Date.now() / 1000
        //   });
        //   // setUserLoginStatus(true)
    
        //   reset();

        //   router.reload();
        // }

        // setIsSubmitting(false);

        AuthService.removeUserLoginInfoFromLocalStorage()
        
        // router.reload()
        redirectTo(router, '/', 1)
      }

      run();
    }
    finally {
      // setIsSubmitting(false);
    }
  }
  else {
    redirectTo(router, '/', 1)
  }

  return null;
}
