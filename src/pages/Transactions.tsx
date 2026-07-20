import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Type pour une transaction
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: string;
  category: string;
  notes: string;
}

// Données Mock des Transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
  { id: '2', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
  { id: '3', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
  { id: '4', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
  { id: '5', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
  { id: '6', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.0, balance: 298.0, type: 'Electronic', category: 'Food', notes: '' },
];

// Données Mock des Comptes pour l'en-tête dynamique
const ACCOUNTS_DATA: Record<string, { title: string; amount: string; description: string }> = {
  '1': { title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
  '2': { title: 'Argent Bank Savings (x6712)', amount: '$48,098.43', description: 'Available Balance' },
  '3': { title: 'Argent Bank Credit Card (x8349)', amount: '$48,098.43', description: 'Current Balance' },
};

const Transactions: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();

  const currentAccount = accountId && ACCOUNTS_DATA[accountId]
    ? ACCOUNTS_DATA[accountId]
    : { title: 'Account', amount: '$0.00', description: 'Balance' };

  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [openTransactionId, setOpenTransactionId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ id: string; value: string } | null>(null);
  const [editingNote, setEditingNote] = useState<{ id: string; value: string } | null>(null);

  const categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Shopping', 'Utilities'];

  const toggleTransaction = (id: string) => {
    if (openTransactionId === id) {
      setOpenTransactionId(null);
      setEditingCategory(null);
      setEditingNote(null);
    } else {
      setOpenTransactionId(id);
    }
  };

  const handleCategorySave = (id: string) => {
    if (editingCategory) {
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, category: editingCategory.value } : t))
      );
      setEditingCategory(null);
    }
  };

  const handleNoteSave = (id: string) => {
    if (editingNote) {
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, notes: editingNote.value } : t))
      );
      setEditingNote(null);
    }
  };

  return (
    <main className="flex-1 bg-white min-h-screen pb-10">
      {/* Header compte */}
      <div className="w-full bg-white pt-6 pb-6">
        <div className="w-full max-w-[1000px] mx-auto px-4 py-8 flex flex-col items-center justify-center relative bg-[#343a40] text-white rounded-md shadow-sm">
          <p className="text-white text-xl m-0 font-normal">{currentAccount.title}</p>
          <p className="text-white text-4xl font-bold my-2">{currentAccount.amount}</p>
          <p className="text-white text-xl m-0 font-normal">{currentAccount.description}</p>

          <button
            onClick={() => navigate('/profile')}
            className="absolute top-6 right-6 text-white bg-transparent border-none cursor-pointer hover:text-[#00bc77] transition-colors"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-3xl font-bold"></i>
          </button>
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="w-full max-w-[1000px] mx-auto px-4">
        {/* En-tête desktop */}
        <div className="hidden md:grid grid-cols-[15%_40%_20%_20%_5%] p-4 text-[#2c3e50] uppercase text-sm px-5 mb-2 font-bold border-b border-gray-200">
          <div className="flex items-center justify-center">Date</div>
          <div className="flex items-center justify-center">Description</div>
          <div className="flex items-center justify-center">Amount</div>
          <div className="flex items-center justify-center">Balance</div>
          <div></div>
        </div>

        {/* Lignes des transactions */}
        {transactions.map(tx => {
          const isOpen = openTransactionId === tx.id;

          return (
            <div
              key={tx.id}
              className={`mb-2 rounded-sm overflow-hidden ${
                isOpen ? 'bg-[#00bc77]' : ''
              }`}
            >
              {/* Ligne principale */}
              <div
                className={`grid grid-cols-2 md:grid-cols-[15%_40%_20%_20%_5%] p-4 px-5 items-center cursor-pointer text-white transition-colors ${
                  isOpen ? '' : 'bg-[#00bc77] hover:bg-[#00a568]'
                }`}
                onClick={() => toggleTransaction(tx.id)}
              >
                <div className="text-sm md:text-center" data-label="Date">
                  {tx.date}
                </div>
                <div
                  className="text-sm font-bold md:font-normal md:text-center"
                  data-label="Description"
                >
                  {tx.description}
                </div>
                <div
                  className="text-sm text-right md:text-center"
                  data-label="Amount"
                >
                  ${tx.amount.toFixed(2)}
                </div>
                <div
                  className="text-sm text-right md:text-center"
                  data-label="Balance"
                >
                  ${tx.balance.toFixed(2)}
                </div>
                <div className="text-right flex justify-end md:justify-center">
                  <i
                    className={`fa-solid fa-chevron-up text-xl text-white transition-transform duration-200 ${
                      isOpen ? 'rotate-0' : 'rotate-180'
                    }`}
                  ></i>
                </div>
              </div>

              {/* Détails dépliés */}
              {isOpen && (
                <div className="p-4 px-5 text-white">
                  <div className="flex flex-col gap-2 text-left">
                    <p className="m-0 text-sm">
                      <span className="font-bold">Transaction Type:</span> {tx.type}
                    </p>

                    {/* Category */}
                    <div className="flex items-center gap-2 text-sm h-8">
                      <span className="font-bold w-24">Category: </span>
                      {editingCategory?.id === tx.id ? (
                        <div className="flex gap-2 items-center">
                          <select
                            value={editingCategory.value}
                            onClick={e => e.stopPropagation()}
                            onChange={e =>
                              setEditingCategory({ id: tx.id, value: e.target.value })
                            }
                            className="border border-gray-300 p-1 rounded text-[#2c3e50] bg-white"
                          >
                            {categories.map(c => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleCategorySave(tx.id)}
                            className="bg-white text-[#00bc77] px-3 py-1 rounded text-xs font-bold"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          <span>{tx.category}</span>
                          <i
                            className="fa-solid fa-pencil text-xs cursor-pointer hover:text-[#2c3e50] p-2 rounded-full transition-opacity"
                            onClick={e => {
                              e.stopPropagation();
                              setEditingCategory({ id: tx.id, value: tx.category });
                            }}
                          ></i>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="flex items-center gap-2 text-sm h-8">
                      <span className="font-bold w-24">Notes: </span>
                      {editingNote?.id === tx.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={editingNote.value}
                            onClick={e => e.stopPropagation()}
                            onChange={e =>
                              setEditingNote({ id: tx.id, value: e.target.value })
                            }
                            className="border border-gray-300 p-1 rounded text-[#2c3e50] bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleNoteSave(tx.id)}
                            className="bg-white text-[#00bc77] px-3 py-1 rounded text-xs font-bold"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          <span>{tx.notes || 'Lorem ipsum'}</span>
                          <i
                            className="fa-solid fa-pencil text-xs cursor-pointer hover:text-[#2c3e50] p-1 rounded-full transition-opacity"
                            onClick={e => {
                              e.stopPropagation();
                              setEditingNote({ id: tx.id, value: tx.notes });
                            }}
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Transactions;