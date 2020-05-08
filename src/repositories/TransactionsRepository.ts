import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const totalTransactionType = (type: string): number => {
      const result = transactions.filter(
        transaction => transaction.type === type,
      );
      if (result.length > 0) {
        const totalTransaction = result
          .map(transaction => transaction.value)
          .reduce((accumulator, valueItem) => (accumulator += valueItem));
        return totalTransaction;
      }
      return 0;
    };

    const outcome = totalTransactionType('outcome');
    const income = totalTransactionType('income');
    const total = income - outcome;
    const balance = { outcome, income, total };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
