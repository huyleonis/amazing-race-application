const isColorCode = (value) => {
  if (!value) return false
  return /^#[0-9a-fA-F]{6}$/.test(value) || /^#[0-9a-fA-F]{8}$/.test(value)
}

export default {
  isColorCode,
}
