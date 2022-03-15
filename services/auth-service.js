/* eslint-disable */

import { v4 as uuidv4 } from 'uuid'
import { customerDBAxios as Axios, customerDBTokenizedAxios as TokenizedAxios } from './config'

// Notes: In order to understand the params behind the func, by commented it out the func should be improved the clarity that it is not using TypeScript

/**
 * __deviceId is required for device-id headers
 */
export const setDeviceId = async () => {
  try {
    if (!localStorage.getItem('__deviceId')) {
      localStorage.setItem('__deviceId', uuidv4())
    }
  } catch (err) {
    console.error(err)
  }
}
export const getDeviceId = async () => {
  try {
    const deviceId = (await localStorage.getItem('__deviceId')) || uuidv4()
    return deviceId
  } catch (err) {
    console.error(err)
    return err.message
  }
}

export const saveUserLoginInfoToLocalStorage = ({ token, email, expired }) => {
  try {
    localStorage.setItem('__customerKey', token)
    localStorage.setItem('__email', email)
    localStorage.setItem('isLogin', '1')
  } catch (err) {
    console.error(err)
  }
}
export const removeUserLoginInfoFromLocalStorage = () => {
  try {
    localStorage.removeItem('__customerKey')
    localStorage.removeItem('__email')
    localStorage.removeItem('isLogin')
  } catch (err) {
    console.error(err)
  }
}

/**
 * Handle Logout Customer
 */
export const postCustomerLogout = () => TokenizedAxios.post('/auth/logout').then((res) => res.data)

/**
 * Create new customer
 * @param { firstname, lastname, email, password } body
 */
export const postRegisterNewCustomer = (body) =>
  Axios.post('/auth/register', body).then((res) => res.data)

/**
 * Customer Login using password or social media
 * @param {email, password || token} body
 */
export const postLogin = (body) => Axios.post('/auth/login', body).then((res) => res.data)

/**
 * Validate Verification Token
 * @param token
 */
export const getValidateToken = (token) =>
  Axios.get(`/auth/verify?code=${token}`).then((res) => res.data)

/**
 * Verify Verification Token
 * @param  { token, password}
 */
export const putVerifyToken = (token, password) =>
  Axios.put('/auth/verify', { code: token, password }).then((res) => res.data)

/**
 * Create Verification Code for Registration and Reset Password
 * @param { type = registration | reset_password, email } body
 */
export const postCreateVerificationCode = (body) =>
  Axios.post('/auth/verify', body).then((res) => res.data)

export const postValidateCustomerToken = () => TokenizedAxios.post('/auth/validate')
