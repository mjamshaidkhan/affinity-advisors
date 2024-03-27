import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class InsurancePolicies {
  @Prop()
  policy: string;
  @Prop()
  createdAt: Date;
  @Prop()
  description: string;
}
export const InsurancePoliciesSchema =
  SchemaFactory.createForClass(InsurancePolicies);
