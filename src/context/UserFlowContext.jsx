import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
  const [flowData, setFlowData] = useState(null);

  const saveUserFlow = async (userId, data) => {
    try {
      await axios.post(`http://localhost:8010/api/save`, {
        userId,
        flow: data
      });
      return { success: true };
    } catch (error) {
      console.error('Save flow error:', error.message);
      return { success: false, message: 'Could not save user flow' };
    }
  };

  const getUserFlow = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8010/api/${userId}`);
      setFlowData(res.data.flow);
      return { success: true, flow: res.data.flow };
    } catch (error) {
      console.error('Fetch flow error:', error.message);
      return { success: false, message: 'Could not fetch user flow' };
    }
  };

  const deleteUserFlow = async (userId) => {
    try {
      await axios.delete(`http://localhost:8010/api/${userId}`);
      setFlowData(null);
      return { success: true };
    } catch (error) {
      console.error('Delete flow error:', error.message);
      return { success: false, message: 'Could not delete user flow' };
    }
  };

  return (
    <UserFlowContext.Provider value={{ flowData, saveUserFlow, getUserFlow, deleteUserFlow }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);
