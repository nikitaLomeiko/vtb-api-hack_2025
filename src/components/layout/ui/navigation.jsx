import React from 'react';
import { 
  HomeIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('главная');

  const navigate = useNavigate()

  // Определяем мобильное устройство
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'главная', label: 'Главная', path: '/', icon: HomeIcon },
    { id: 'Транзакции', label: 'Транзакции', path: '/transactions', icon: ArrowsRightLeftIcon },
    { id: 'карты', label: 'Карты', path: '/', icon: CreditCardIcon },
    { id: 'аналитика', label: 'Аналитика', path: '/', icon: ChartBarIcon },
    { id: 'еще', label: 'Еще', path: '/', icon: Cog6ToothIcon }
  ];

  const handleNavClick = (itemId) => {
    setActiveSection(itemId);
    console.log(`Переход на: ${itemId}`);
    navigate(navItems.find(item => item.id === itemId).path || '/')
  };

  // Десктопная версия - горизонтальное меню в хедере
  if (!isMobile) {
    return (
      <nav className="hidden md:flex items-center space-x-6 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <IconComponent className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Мобильная версия - тулбар внизу экрана
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <div className={`
                p-2 rounded-full transition-colors duration-200
                ${isActive ? 'bg-blue-50' : ''}
              `}>
                <IconComponent className="h-6 w-6" />
              </div>
              <span className={`
                text-xs mt-1 font-medium transition-all duration-200
                ${isActive ? 'scale-110' : 'scale-100'}
              `}>
                {item.label}
              </span>
              
              {/* Индикатор активного элемента */}
              {isActive && (
                <div className="absolute top-0 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Безопасная зона для iPhone */}
      <div className="h-4 bg-white"></div>
    </nav>
  );
};

export default Navigation;