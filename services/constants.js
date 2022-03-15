export const FORM_FIELD_REQUIRED = 'Wajib Diisi'
export const FORM_FIELD_MINIMUM_LENGTH = (length) => `Minimal ${length} karakter`

export const REGEX_PASSWORD = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
)
export const MESSAGE_INVALID_PASSWORD =
  'Password harus terdiri dari 8 karakter dengan kombinasi karakter besar, kecil, angka dan karakter khusus'
