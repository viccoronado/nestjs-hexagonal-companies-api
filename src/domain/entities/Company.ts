import { CompanyType } from './CompanyType';

export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: CompanyType,
    public readonly joinedAt: Date,
  ) {}

  static create(name: string, type: CompanyType): Company {
    return new Company(
      crypto.randomUUID(),
      name,
      type,
      new Date()
    );
  }
}