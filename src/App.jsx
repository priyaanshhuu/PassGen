import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [len,setLen] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState()
  //here, usecallback is usedd to put a function that has many dependencies into a cache, i.e. cache memory.. since our password will get updated when we change the length or character or number, we have to call the password generator funciton again and again.. so to tackle the calling of functions, and their functioning, we have used useCallback()



  //useRef hook

  const passwordRef = useRef(null)
  //useref takes reference of element in webpage and we can manipulate it.. so store ref in  a variable, and use it in functions..

  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoplqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+= "!@#$%^&*"

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }

    setPassword(password)

  },[len,numberAllowed,charAllowed,setPassword])
  //we have used dependencies in useCallback, to optimize the methods. it memoizes the passwordGen function in cache, and according to dependencies-  len, noallowd, charallowed, it executes the pgen fufnction efficiently, i.e, dependencies se kuch change hua to method(passwordgen) run hoga, usko optimized way me karo karo. it is differen than useeffect.. 

  const copyPasswordToClipboard = useCallback(() => {
    //use passwordRef here
    passwordRef.current?.select()
    //optimization in badi companies
    //passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  },[password])

  //useEffect hook
  useEffect(() => { 
    passwordGenerator()
  },[len,numberAllowed,charAllowed,passwordGenerator])
  //here, it just means that jab bhi len,noallowed,etc me kuch bhi chedchad ho, then simply run the method again, here mo memoization like useCallBack


  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 m-8 text-orange-500 bg-gray-800'>
          <h1 className='text-white text-center p-4'>PASSWORD GENERATOR</h1>
          <div className='flex rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value = {password}
            className='outline-none w-full py-1 px-3 mb-5 rounded-xl'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none py-1 px-3 mb-5 rounded-xl bg-slate-600 ml-2 hover:text-white transition' onClick={copyPasswordToClipboard}>
            Copy
          </button>
          </div>
          <div className='flex text-sm gap-x-1 pb-3'>
            <input 
              type="range" 
              min={6}
              max={100}
              value={len}
              className='cursor-pointer'
              onChange={(e) => {setLen(e.target.value)}}
            />
            <label>Length: {len}</label>
          </div>
          <div className='flex text-sm gap-x-1 pb-3'>
          <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              className='cursor-pointer'
              onChange={(prev) => {setNumberAllowed(prev => !prev)}}
            /><label>Number</label>
          </div>
          <div className='flex text-sm gap-x-1 pb-3'>
          <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              className='cursor-pointer'
              onChange={(prev) => {setCharAllowed(prev => !prev)}}
            /><label>Special Character</label>
          </div>
        </div>
    </>
  )
}

export default App
