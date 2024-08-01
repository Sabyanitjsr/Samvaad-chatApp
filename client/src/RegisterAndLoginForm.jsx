import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "./components/UserContext";
import { toast } from "react-toastify";

const RegisterAndLoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
//changed name setUsername to setLoggedInUserName to avoid collision
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    async function handleSubmit(ev) {
      ev.preventDefault();
      const url = isLoginOrRegister === 'register' ? 'register' : 'login';
      console.log( {username,password})
      try {
        const { data } = await axios.post(url, { username, password });
        console.log(" login request posted",data)
        setLoggedInUsername(username);
        setId(data.id);
        toast.success('Login successful!');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Wrong credentials, please try again.');
        } else {
          toast.error('An error occurred, please try again later.');
        }
      }
    } 

  return (
    <div className="bg-blue-50 h-screen flex items-center">
    
    <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
    <div className="font-bold text-blue-500 text-3xl flex justify-center pb-5">Samvaad 📨</div>
      <input value={username}
             onChange={ev => setUsername(ev.target.value)}
             type="text" placeholder="username"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <input value={password}
             onChange={ev => setPassword(ev.target.value)}
             type="password"
             placeholder="password"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
        {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
      </button>
      <div className="text-center mt-2">
        {isLoginOrRegister === 'register' && (
          <div>
            Already a member?
            <button className="ml-1 text-blue-500" onClick={() => setIsLoginOrRegister('login')}>
              Login here
            </button>
          </div>
        )}
        {isLoginOrRegister === 'login' && (
          <div>
            Don't have an account?
            <button className="ml-1 text-blue-500" onClick={() => setIsLoginOrRegister('register')}>
              Register
            </button>
          </div>
        )}
      </div>
    </form>
  </div>
  )
}

export default RegisterAndLoginForm
