import { defineStore } from 'pinia';
import axios from 'axios';
import { baseUrlAttacks } from '@/utils/baseUrl.ts'
export const attacksSlice = defineStore('attacksApi', () => {

  const xssAttack = async (user_id: string, comment: string): Promise<{ status: number; data: any | null }> => {
    try {
      const res = await axios.post(`${baseUrlAttacks}/xss`, { user_id, comment });
      return { status: res.status, data: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: null };
      }
      console.error('Axios error:', error);
      return { status: 500, data: null };
    } finally {
      console.log('Request completed');
    }
  };
  const getXssResults = async (): Promise<{ status: number; data: any | null }> => {
    try {
      const res = await axios.get('http://localhost:3000/attack/xss');
      console.log(res.data)
      return { status: res.status, data: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: null };
      }
      console.error('Axios error:', error);
      return { status: 500, data: null };
    } finally {
      console.log('Request completed');
    }
  };

  return {
    xssAttack,
    getXssResults
  };
});
