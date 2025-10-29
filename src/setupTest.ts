import "@testing-library/jest-dom"
import "whatwg-fetch"
import {server} from './test/msw/server'

beforeAll(()=>server.listen())//ejecuta antes de iniciar la prueba
afterEach(()=>server.resetHandlers())//se ejecuta durante la prueba 
afterAll(()=>server.close())//ejecuta despues de finalizar prueba