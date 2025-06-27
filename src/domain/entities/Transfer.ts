export class Transfer {
    constructor(
      public readonly id: string,
      public readonly companyId: string,
      public readonly amount: number,
      public readonly date: Date
    ) {}
  
    static create(companyId: string, amount: number): Transfer {
      return new Transfer(
        crypto.randomUUID(),
        companyId,
        amount,
        new Date()
      );
    }
  }