'use strict'

class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []
    }

    balance() {
        let sum = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            sum += this.transactions[i].amount;
        }
        return sum;
    }

    charge(payee, amount) {
        let currentBalance = this.balance();
        if (amount <= currentBalance) {
        let chargeTransaction = new Transaction(-amount, payee)
        this.transactions.push(depositTransaction);
        }
    }

    deposit(amount) {
        if (amount > 0) {
        let depositTransaction = new Transaction(amount, this.owner);
        this.transactions.push(depositTransaction);
        }
    }
}

class Transaction {
    constructor(amount, payee) {
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}