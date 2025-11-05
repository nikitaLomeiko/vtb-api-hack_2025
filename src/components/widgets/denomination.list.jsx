import { useBank } from "@store/bank";

export const DenominationList = () => {
    const { bank } = useBank();

    const calculateDenominations = (balance) => {
    const denominations = [
      { value: 5000, color: 'bg-purple-100 text-purple-800 border border-purple-200' },
      { value: 2000, color: 'bg-blue-100 text-blue-800 border border-blue-200' },
      { value: 1000, color: 'bg-green-100 text-green-800 border border-green-200' },
      { value: 500, color: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
      { value: 100, color: 'bg-gray-100 text-gray-800 border border-gray-200' }
    ];

    let remainingBalance = balance;
    return denominations.map(denom => {
      const count = Math.floor(remainingBalance / denom.value);
      remainingBalance = remainingBalance % denom.value;
      return {
        ...denom,
        count: count > 0 ? count : 0
      };
    }).filter(denom => denom.count > 0);
  };

    const denominations = calculateDenominations(bank.total);

    return (
        <div className="my-5 border-t border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-4 text-center">Номиналы в обороте</p>
          <div className="flex justify-center flex-wrap gap-3">
            {denominations.map((denom, index) => (
              <div 
                key={denom.value}
                className={`${denom.color} px-4 py-3 rounded-xl text-center min-w-24 transition-all duration-300 hover:scale-105 hover:shadow-md`}
              >
                <div className="font-bold text-lg">{denom.value} ₽</div>
                <div className="text-sm opacity-75 mt-1">{denom.count} шт</div>
              </div>
            ))}
          </div>
        </div>
    )
}