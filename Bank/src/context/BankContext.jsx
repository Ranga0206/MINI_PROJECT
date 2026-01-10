import { createContext, useContext, useEffect, useReducer } from "react"

const BankContext = createContext();


const initialState = {
    account: JSON.parse(localStorage.getItem("bank_account")) || null,
    transactions: JSON.parse(localStorage.getItem("bank_transactions")) || [],
};

const bankReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_ACCOUNT":
            return {
                ...state,
                account: {
                    name: action.payload.name,
                    accountNumber: action.payload.accountNumber,
                    balance: action.payload.initialBalance,
                    createdAt: new Date().toISOString(),
                },
                transactions: [
                    {
                        id: Date.now(),
                        type: "INITIAL_DEPOSIT",
                        amount: action.payload.initialBalance,
                        date: new Date().toISOString(),
                        description: "Account Created",
                    }
                ],
            };

        case "DEPOSIT":
            return {
                ...state,
                account: { ...state.account, balance: state.account.balance + action.payload.amount },
                transactions: [
                    {
                        id: Date.now(),
                        type: "DEPOSIT",
                        amount: action.payload.amount,
                        date: new Date().toISOString(),
                        description: action.payload.description || "Cash Deposit",
                    },
                    ...state.transactions,
                ],
            };
        case "WITHDRAW":
            if (state.account.balance < action.payload.amount) {
                return state;
            }
            const newWithdrawBalance = state.account.balance - action.payload.amount;
            return {
                ...state,
                account: { ...state.account, balance: newWithdrawBalance },
                transactions: [
                    {
                        id: Date.now(),
                        type: "WITHDRAW",
                        amount: action.payload.amount,
                        date: new Date().toISOString(),
                        description: action.payload.description || "Cash WithDraw",
                    },
                    ...state.transactions,
                ],
            };
        case "RESET":
            localStorage.removeItem("bank_account");
            localStorage.removeItem("bank_transactions");
            return { account: null, transactions: [] }
        default:
            return state;
    }

};

export const BankProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bankReducer, initialState);
    useEffect(() => {
        if (state.account) {
            localStorage.setItem("bank_account", JSON.stringify(state.account));
            localStorage.setItem("bank_transactions", JSON.stringify(state.transactions));
        }
    }, [state])


    return (
        <BankContext.Provider value={{ state, dispatch }}>
            {children}
        </BankContext.Provider>
    )
}

export const useBank = () => {
    const context = useContext(BankContext);
    if (!context) {
        throw new Error("useBank must be used within a BankProvider")
    }
    return context;
}