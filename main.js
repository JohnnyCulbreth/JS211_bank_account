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
        this.transactions.push(chargeTransaction);
        } else {
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

class SavingsAccount extends BankAccount {
    constructor (accountNumber, owner, interestRate) {
        super(accountNumber, owner);
        this.interestRate = interestRate;
    }
    accrueInterest() {
        let currentBalance = this.balance();
        let interestAmt = currentBalance * this.interestRate;
        let interestTransaction = new Transaction(interestAmt, "Interest");
        this.transactions.push(interestTransaction);
    }
}



// TESTS

if (typeof describe === 'function') {
    const assert = require('assert');

describe("#Testing account creation", function() {
    it('Should create a new account correctly', function() {
        let acct1 = new BankAccount('xx4432', 'John Doe');
        assert.equal(acct1.owner, 'John Doe');
        assert.equal(acct1.accountNumber, 'xx4432');
        assert.equal(acct1.transactions.length, 0);
        assert.equal(acct1.balance(), 0);
    });
});

describe("#Testing account balance", function() {
    it('Should test account balance', function() {
        let acct1 = new BankAccount('xx4432', 'John Doe');
        assert.equal(acct1.balance(), 0);
        acct1.deposit(100);
        assert.equal(acct1.balance(), 100);
        acct1.charge("Whole Foods", 10);
        assert.equal(acct1.balance(), 90);
    });
    it('should not allow a negative deposit', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.deposit(100);
        assert.equal(acct1.balance(),100);
        acct1.deposit(-30);
        assert.equal(acct1.balance(), 100);
    });
    it('should not allow charging to overdraft', function(){
    
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.charge('target', 30);
        assert.equal(acct1.balance(),0);
    });
    it('should allow a refund', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.charge('target', -30);
        assert.equal(acct1.balance(),30);
    });
});


describe ("#Testing transaction creation", function() {
    it('Should create a transaction correctly', function() {
        let t1 = new Transaction (30, "Deposit");
        assert.equal(t1.amount, 30);
        assert.equal(t1.payee, "Deposit");
    });
    it('Should create a transaction correctly for a charge', function() {
        let t1 = new Transaction (-49.95, "Whole Foods");
        assert.equal(t1.amount, -49.95);
        assert.equal(t1.payee, "Whole Foods");
    });
});

describe('Savings Account Creation', function(){
    it('create account correctly', function(){
      let saving = new SavingsAccount("xxx1234", 'Maddie Mortis', .10 );
      assert.equal("xxx1234", saving.accountNumber);
      assert.equal("Maddie Mortis", saving.owner);
      assert.equal(.10, saving.interestRate);
      assert.equal(0, saving.balance());
    });

    it('Accrue interest correctly', function(){
      let saving = new SavingsAccount("xxx1234", 'Maddie Mortis', .10 );
      assert.equal("xxx1234", saving.accountNumber);
      assert.equal("Maddie Mortis", saving.owner);
      assert.equal(.10, saving.interestRate);
      assert.equal(0, saving.balance());
      saving.deposit(100);
      saving.accrueInterest();
      assert.equal(110, saving.balance());
    });
}); 
}