import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePolicyDto } from 'src/dto/create-policy.dto';
import { UpdatePolicyDto } from 'src/dto/update-policy.dto';
import { InsurancepolicesService } from 'src/service/insurancepolices/insurancepolices.service';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter';
@Controller('insurancepolices')
export class InsurancepolicesController {
  constructor(
    private readonly insurancepolicesService: InsurancepolicesService,
  ) {}

  // Create new policy
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  async createPolicy(
    @Res() response,
    @Body() createPolicyDto: CreatePolicyDto,
  ) {
    try {
      const newPolicy =
        await this.insurancepolicesService.createPolicy(createPolicyDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Policy has been created successfully',
        newPolicy,
      });
    } catch (err) {
      throw new ForbiddenException('Error: Policy not created!');
    }
  }
  // Update Policy
  @Put('/:id')
  @UseFilters(new HttpExceptionFilter())
  async updatePolicy(
    @Res() response,
    @Param('id') policyId: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ) {
    const existingPolicy = await this.insurancepolicesService.updatePolicy(
      policyId,
      updatePolicyDto,
    );
    return response.status(HttpStatus.OK).json({
      message: 'Policy has been successfully updated',
      existingPolicy,
    });
  }
  // Get All Policies
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getPolicies(@Res() response) {
    const policyData = await this.insurancepolicesService.getAllPolicies();
    return response.status(HttpStatus.OK).json({
      message: 'All policies data found successfully',
      policyData,
    });
  }
  // Get By Id
  @Get('/:id')
  @UseFilters(new HttpExceptionFilter())
  async getPolicy(@Res() response, @Param('id') policyId: string) {
    const existingPolicy =
      await this.insurancepolicesService.getPolicy(policyId);
    return response.status(HttpStatus.OK).json({
      message: 'Policy found successfully',
      existingPolicy,
    });
  }
  // Delete By Id
  @Delete('/:id')
  @UseFilters(new HttpExceptionFilter())
  async deletePolicy(@Res() response, @Param('id') policyId: string) {
    const deletedPolicy =
      await this.insurancepolicesService.deletePolicy(policyId);
    return response.status(HttpStatus.OK).json({
      message: 'Policy deleted successfully',
      deletedPolicy,
    });
  }
}
