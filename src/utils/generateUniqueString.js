import { customAlphabet } from "nanoid"


const generateUniequeString=(len)=>{
    const nanoid=customAlphabet('123456789',len)
    return nanoid()
}

export default generateUniequeString