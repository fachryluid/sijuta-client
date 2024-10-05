import axios from '@/utils/axios'
import { mutate } from 'swr';

export const storeJournal = async (formData) => {
  try {
    const response = await axios.post('journal/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error storing journal:', error);
    throw error;
  }
};

export const updateJournal = async (uuid, formData) => {
  try {
    const response = await axios.patch(`journal/${uuid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    mutate(`/journal/${uuid}`)
    
    return response.data;
  } catch (error) {
    console.error('Error storing journal:', error);
    throw error;
  }
};

export const deleteJournal = async (uuid) => {
  try {
    const response = await axios.delete(`/journal/${uuid}`)

    return response.data;
  } catch (error) {
    console.error('Error deleting journal:', error);
    throw error;
  }
};