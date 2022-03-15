/* eslint-disable */

import axios from 'axios'
import {
  customerDBTokenizedAxios,
  sapAxios,
  sapTokenizedAxios,
  specialSapTokenizedAxios,
} from './config'
import { getEncodedPaginationParams } from './common-utils'

// Notes: In order to understand the params behind the func, by commented it out the func should be improved the clarity that it is not using TypeScript

export const getPointCRM = async (email) => {
  const url = `${process.env.HOST_API}/api/v1/crm/customer/${email}`
  const response = await axios.get(url)

  return response
}

/**
 * Get Customer Info
 */
export const getCustomerInfo = () =>
  customerDBTokenizedAxios.get('/profile').then((res) => res.data)

/**
 * Get Customer Membership Eraclub
 * @param email
 */
export const getCRMPoint = (email) => sapAxios.get(`/crm/customer/${email}`).then((res) => res.data)

/**
 * Get Customer History Orders
 * @param email, {limit, page}
 */
export const getHistoryOrders = (email, { limit = 10, page = 1 }) =>
  sapTokenizedAxios
    .get(`/orders/history?source=ibox&limit=${limit}&page=${page}&email=${email}`)
    .then((res) => res.data)

/**
 * Update Profile Info
 * @param { firstname, lastname, phone, identityNumber, gender, dateOfBirth } body
 */
export const putUpdateProfile = (body) =>
  customerDBTokenizedAxios.put('/profile', body).then((res) => res.data)

/**
 * Update Customer Password
 * @param { password, newPassword } body
 */
export const putChangePassword = (body) =>
  customerDBTokenizedAxios.put('/auth/password', body).then((res) => res.data)

/**
 * Update Customer Email
 * @param { password, email } body
 */
export const putChangeEmail = (body) =>
  customerDBTokenizedAxios.put('/auth/email', body).then((res) => res.data)

/**
 * Get Customer Addresses
 * @param { limit, page } param
 */
export const getCustomerAddresses = (paginationParams) => {
  const parsedParams = getEncodedPaginationParams(paginationParams)

  return customerDBTokenizedAxios.get(`/profile/addresses${parsedParams}`).then((res) => res.data)
}

/**
 * Get Customer Addresses by Id
 * @param { id } param
 */
export const getCustomerAddressById = (id) =>
  customerDBTokenizedAxios.get(`/profile/addresses/${id}`).then((res) => res.data)

export const getCustomerAddressDefaultShipping = () =>
  customerDBTokenizedAxios
    .get('/profile/default-address/shipping')
    .then((res) => res.data)
    .catch((err) => ({ data: null, error_message: err.message, status: 400 }))

export const getCustomerAddressDefaultBilling = () =>
  customerDBTokenizedAxios.get('/profile/default-address/billing').then((res) => res.data)

// Address: latitude, longitude, streetMap, countryCode, regionCode, cityId, districtId, subDistrictId, postcode, telephone, isBilling, isDefaultBilling, isShipping, isDefaultShipping,

/**
 * Create Customer Addresses
 * @param { address } body
 */
export const postCreateCustomerAddress = (body) =>
  customerDBTokenizedAxios.post('/profile/addresses', body).then((res) => res.data)

/**
 * Update Customer Addresses
 * @param { address } param
 */
export const putUpdateCustomerAddress = (id, body) => {
  customerDBTokenizedAxios.put(`/profile/addresses/${id}`, body).then((res) => res.data)
}

export const postUpdateDefaultAddress = async (body) => {
  let result = null
  const response = await customerDBTokenizedAxios
    .post(`profile/default-address/shipping`, body)
    .then((res) => {
      result = { ...res.data, status: 200 }
    })
    .catch((error) => {
      const err = error.response
      result = { ...err.data, status: err.status }
    })

  return result
}

export const postUpdateDefaultBilling = async (body) => {
  customerDBTokenizedAxios.post(`profile/default-address/billing`, body).then((res) => res.data)
}

const urlCart = `${process.env.CART_HOST_API}/v1/quote/`
export const getCustomerCart = (tokenCustomer) =>
  axios.get(urlCart, {
    headers: {
      Authorization: `Bearer ${tokenCustomer}`,
    },
  })
/**
 * Delete Customer Addresses by Id
 * @param { id } param
 */
export const deleteCustomerAddressById = (id) =>
  customerDBTokenizedAxios.delete(`/profile/addresses/${id}`).then((res) => res.data)

/**
 * Get Customer Latest Review
 * @param customerId, reviewType
 */
export const getLatestReview = (customerId, reviewType = 'customer') =>
  sapTokenizedAxios
    .get(`/reviews/?type=${reviewType}&customer_id=${customerId}`)
    .then((res) => res.data)

/**
 * Write a Review for specific Product
 * @param { product_id, rating, nickname, title, detail } body
 */
export const putProductReview = (body) =>
  sapTokenizedAxios.put('/reviews/', body).then((res) => res.data)

/**
 * Get customer's newsletter status.  Look for data.isSubscribeNewsletter field.
 */
export const getCustomerNewsletterStatus = () => {
  return customerDBTokenizedAxios.get(`profile/newsletter/status`).then((res) => res.data)
}

/**
 * Set customer to subscribe to newsletter.
 */
export const subscribeCustomerToNewsletter = () => {
  return customerDBTokenizedAxios.post(`profile/newsletter/subscribe`).then((res) => res)
}

/**
 * Cancel customer's subscription to newsletter.
 */
export const unsubscribeCustomerToNewsletter = () => {
  return customerDBTokenizedAxios.post(`profile/newsletter/unsubscribe`).then((res) => res)
}
