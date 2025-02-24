import { defineStore } from 'pinia'
import { baseUrl } from '../../utils/baseUrl.ts'
import axios from 'axios'

export const userApiSlice = defineStore('userApi', () => {

  const baseUrlUsers = `${baseUrl}/users`
  //petición para registrar un usuario
  const registerUser = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${baseUrlUsers}/register`, { email, password });
      return { status: res.status, data: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: null };
      }
      console.log(error);
      return { status: 500, data: null };
    } finally {
      console.log('done');
    }
  };
  //petición para loguear un usuario

  const loginUser = async (email: string, password: string) => {
    try{
      const res = await axios.post(`${baseUrlUsers}/login`,{email, password})
      return { status: res.status, data: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: null };
      }
      console.log(error);
      return { status: 500, data: null };
    } finally {
      console.log('done');
    }
  };
  //peticion para cerrar sesión
  const logout = async (token:string)=>{
    try{
      const res = await axios.post(`${baseUrlUsers}/logout`,{token})
      return { status: res.status, data: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: null };
      }
      console.log(error);
      return { status: 500, data: null };
    } finally {
      console.log('done');
    }
  }
  return {
    registerUser,
    loginUser,
    logout,
  }
})
