import * as CounterStore from "./CounterStore"
// @ponicode
describe("increment", () => {
    let inst: any

    beforeEach(() => {
        inst = new CounterStore.CounterStore()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.increment()
        }
    
        expect(callFunction).not.toThrow()
    })
})
