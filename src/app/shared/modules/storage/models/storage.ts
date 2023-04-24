export  interface Storage {
  getItem: <T>(key: string) => Promise< T |  null>
  setItem: <T>(key: string, value: T) => void
  removeItem: (key: string) => void
  clear: () => void
}
