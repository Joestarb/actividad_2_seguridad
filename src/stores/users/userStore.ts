import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', () => {

  const logoutLocalStorage = ()=>{
    localStorage.removeItem('userToken')
  }


  return{
    logoutLocalStorage
  }
});
