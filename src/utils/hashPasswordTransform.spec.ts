import { hashPasswordTransform } from "./hashPasswordTransform";

describe("Testing util to hash password", () => {

    it("Should be return suceffuly password hashed", async () => {        
        const passwordHashed = await hashPasswordTransform.to("123")

        expect(passwordHashed).toBeDefined()
        expect(passwordHashed.length).toBeGreaterThanOrEqual(3)
    })


    it("Should be return suceffuly hashed password", async() => {
        const passwordHashed = await hashPasswordTransform.to('123');
        
        expect(await hashPasswordTransform.from(passwordHashed)).toEqual(passwordHashed)
    })

})