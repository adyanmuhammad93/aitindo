/* eslint-disable */

export const redirectTo = (router, href, hasDelay) => {
  if (hasDelay && typeof hasDelay === 'boolean') {
    setTimeout(() => {
      router.push(href)
    }, 1000)
    return
  }

  if (hasDelay && typeof hasDelay === 'number') {
    setTimeout(() => {
      router.push(href)
    }, hasDelay)
    return
  }

  router.push('/')
}

export const apiResolver = async (resolver) => {
  try {
    const res = await resolver()

    if (res?.status && res.status !== 200) throw new Error(res.error_message || '')

    return [res, null]
  } catch (err) {
    console.log(err)
    const message = err.response?.data?.message || err.message || ''
    const statusCode = err.response?.status || 200
    return [null, message, statusCode]
  }
}

/**
 *  Specially made for newsletter calls, because they return no data and have
 *  204 status code.
 *  NOTE: The calls are also different, we do not return axios response.data
 *  because the data is completely empty.
 */
export const apiResolverNewsletter = async (resolver) => {
  try {
    const res = await resolver()

    if (res?.status && res.status !== 204) throw new Error(res.error_message || '')

    return [res, null]
  } catch (err) {
    console.log(err)
    const message = err.response?.data?.message || err.message || ''
    const statusCode = err.response?.status || 200
    return [null, message, statusCode]
  }
}

export const numberWithCommas = (x) => {
  if (x === 0) return 0
  if (!x) return ''

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const addZero = (i) => {
  if (i < 10) {
    i = `0${i}`
  }
  return i
}

export const formatDate = (val) => {
  const bln = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
  const createDate = val.replace(/-/g, '/')
  const d = new Date(createDate)
  const dateExpired = `${addZero(d.getDate())} ${bln[d.getMonth()]} ${d.getFullYear()}`

  return dateExpired
}

// this function is used for validate react hook form
export const validateConfirmPassword = (
  currentValue,
  valueToCompare,
  customMessage,
  isReversed
) => {
  if (isReversed) {
    return currentValue === valueToCompare ? customMessage || 'Password sama' : true
  }

  return currentValue !== valueToCompare ? customMessage || 'Konfirmasi Password tidak sama' : true
}

export const getEncodedPaginationParams = (params) => {
  const optionalParams = []
  if (params?.page) optionalParams.push(`page=${params.page}`)
  if (params.size) optionalParams.push(`size=${params.size}`)

  return optionalParams.length > 0 ? `?${optionalParams.join('&')}` : ''
}
