import { Document } from 'mongoose';
export interface IInsurancePolicies extends Document {
  readonly policy: string;
  readonly createdAt: Date;
  readonly description: string;
}
