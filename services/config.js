/* eslint-disable */

import axios from 'axios'
import { deviceDetect } from 'react-device-detect'
import { getDeviceId } from './auth-service'

const getDeviceInfo = (deviceInfo) => {
  if (!deviceInfo) return ''

  const { osName, osVersion, browserName, browserMajorVersion } = deviceInfo

  return `${browserName} ${browserMajorVersion}, ${osName} ${osVersion}`
}

const defaultOptions = {
  baseURL: `${process.env.HOST_API}/api/v1`,
  headers: {
    'Content-type': 'application/json',
  },
}

export const sapAxios = axios.create(defaultOptions)

export const sapTokenizedAxios = (() => {
  const instance = axios.create(defaultOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('__customerKey')
    config.headers.Authorization = `Bearer ${token || ''}`

    return config
  })

  return instance
})()

/**
 *  The difference is that apparently, all shipping services
 *  now require a source or x-source argument.
 *  Separating this with O2O (which is basically the same)
 *  so if later O2O changes the rests are not affected.
 */
export const sapTokenizedAxiosNew = (() => {
  const instance = axios.create(defaultOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('__customerKey')
    config.headers.Authorization = `Bearer ${token || ''}`
    config.headers.Source = 'wellings'
    config.headers['x-source'] = 'wellings'

    return config
  })

  return instance
})()

export const sapTokenizedAxiosO2O = (() => {
  const instance = axios.create(defaultOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('__customerKey')
    config.headers.Authorization = `Bearer ${token || ''}`
    config.headers.Source = 'wellings'
    config.headers['x-source'] = 'wellings'

    return config
  })

  return instance
})()

const customerDBOptions = {
  baseURL: `${process.env.CUSTOMERDB_HOST_API}/v1`,
  headers: {
    'Content-type': 'application/json',
    Source: 'wellings',
  },
}

export const customerDBAxios = (() => {
  const instance = axios.create(customerDBOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use(async (config) => {
    config.headers.Device = getDeviceInfo(deviceDetect())
    config.headers['Device-ID'] = await getDeviceId()

    return config
  })

  return instance
})()

export const customerDBTokenizedAxios = (() => {
  const instance = axios.create(customerDBOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('__customerKey')
    config.headers.Authorization = `Bearer ${token || ''}`
    config.headers.Device = getDeviceInfo(deviceDetect())
    config.headers['Device-ID'] = await getDeviceId()

    return config
  })

  return instance
})()

const privateInstance = () => {
  const instance = axios.create(customerDBOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('__customerKey')
    config.headers.Authorization = `Bearer ${token || ''}`

    return config
  })

  return instance
}

export default privateInstance()
