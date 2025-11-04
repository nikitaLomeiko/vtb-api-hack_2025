import { useState } from 'react';

export const useAuth = () => {
  const [currentStage, setCurrentStage] = useState('email');
  const [userData, setUserData] = useState({
    email: '',
    code: '',
    pin: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const goToNextStage = () => {
    const stages = ['email', 'code', 'pin'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  const goToPrevStage = () => {
    const stages = ['email', 'code', 'pin'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1]);
    }
  };

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const simulateApiCall = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const sendCodeToEmail = async (email) => {
    setIsLoading(true);
    await simulateApiCall(1500);
    console.log(`Код отправлен на: ${email}`);
    setIsLoading(false);
    return '123456';
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    await simulateApiCall(1000);
    const isValid = code === '123456'; // Для демонстрации
    setIsLoading(false);
    return isValid;
  };

  const createPin = async (pin) => {
    setIsLoading(true);
    await simulateApiCall(1000);
    console.log(`Пин-код создан: ${pin}`);
    // В реальном приложении здесь будет API call для сохранения пин-кода
    setIsLoading(false);
    return true;
  };

  return {
    currentStage,
    userData,
    isLoading,
    goToNextStage,
    goToPrevStage,
    updateUserData,
    sendCodeToEmail,
    verifyCode,
    createPin
  };
};