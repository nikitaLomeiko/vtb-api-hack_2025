import { BalanceSummaryCard } from "@components/widgets/balance.summary.card";
import { BanksList } from "@components/widgets/bank.list";
import { DenominationList } from "@components/widgets/denomination.list";

export const HomePage = () => {

  return (
    <div>
      <BalanceSummaryCard/>
      <DenominationList/>
      <BanksList/>
    </div>    
  );
};