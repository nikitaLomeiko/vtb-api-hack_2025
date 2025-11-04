import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { codeSchema } from '../schema/auth.zod.schema';

const CodeStage = ({ onSubmit, onBack, isLoading, userEmail }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(codeSchema),
    mode: 'onChange'
  });

  const code = watch('code') || '';
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = code.split('');
      newCode[index] = value;
      const combinedCode = newCode.join('');
      setValue('code', combinedCode, { shouldValidate: true });

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      setValue('code', pastedData, { shouldValidate: true });
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Проверка кода</h1>
        <p className="text-gray-600">
          Код отправлен на <span className="font-semibold">{userEmail}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            6-значный код
          </label>
          <div className="flex justify-center space-x-3 mb-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={code[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
            ))}
          </div>
          <input
            {...register('code')}
            type="hidden"
          />
          {errors.code && (
            <p className="text-center mt-2 text-sm text-red-600">{errors.code.message}</p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Назад
          </button>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Проверка...
              </div>
            ) : (
              'Продолжить'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeStage;