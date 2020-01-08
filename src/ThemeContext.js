import { createContext } from 'react'

const themeContext = createContext(["green", () => {}]) // sticking hook inside, but anything can be stuck in there

export default themeContext