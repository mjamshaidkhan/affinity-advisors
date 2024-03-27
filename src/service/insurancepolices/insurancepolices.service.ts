import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePolicyDto } from 'src/dto/create-policy.dto';
import { IInsurancePolicies } from 'src/interface/insurancepolicies.interface';
import { Model } from 'mongoose';
import { UpdatePolicyDto } from 'src/dto/update-policy.dto';
@Injectable()
export class InsurancepolicesService {
  constructor(
    @InjectModel('InsurancePolicies')
    private insuranceModel: Model<IInsurancePolicies>,
  ) {}
  // Create Policy
  async createPolicy(
    createPolicyDto: CreatePolicyDto,
  ): Promise<IInsurancePolicies> {
    const newStudent = await new this.insuranceModel(createPolicyDto);
    return newStudent.save();
  }

  // Update Policy
  async updatePolicy(
    policyId: string,
    updatePolicyDto: UpdatePolicyDto,
  ): Promise<IInsurancePolicies> {
    const existingPolicy = await this.insuranceModel.findByIdAndUpdate(
      policyId,
      updatePolicyDto,
      { new: true },
    );
    if (!existingPolicy) {
      throw new NotFoundException(`Policy #${policyId} not found`);
    }
    return existingPolicy;
  }

  // Get All Policy
  async getAllPolicies(): Promise<IInsurancePolicies[]> {
    const policyData = await this.insuranceModel.find();
    if (!policyData || policyData.length == 0) {
      throw new NotFoundException('Policy data not found!');
    }
    return policyData;
  }
  // Get Policy By Id
  async getPolicy(policyId: string): Promise<IInsurancePolicies> {
    const existingPolicy = await this.insuranceModel.findById(policyId).exec();
    if (!existingPolicy) {
      throw new NotFoundException(`Policy #${policyId} not found`);
    }
    return existingPolicy;
  }
  // Delete Policy
  async deletePolicy(policyId: string): Promise<IInsurancePolicies> {
    const deletedPolicy = await this.insuranceModel.findByIdAndDelete(policyId);
    if (!deletedPolicy) {
      throw new NotFoundException(`Policy #${policyId} not found`);
    }
    return deletedPolicy;
  }
}
