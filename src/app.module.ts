import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InsurancePoliciesSchema } from './schema/insurancepolicies.schema';
import { InsurancepolicesController } from './controller/insurancepolices/insurancepolices.controller';
import { InsurancepolicesService } from './service/insurancepolices/insurancepolices.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './middleware/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  //   imports:[MongooseModule.forRoot('mongodb://localhost:27017/studentdb'),
  // MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],

  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://silverstone:silver%401234@silverstonedev.au08epl.mongodb.net/AffinityAdvisors?retryWrites=true&w=majority&appName=silverstonedev',
    ),
    MongooseModule.forFeature([
      { name: 'InsurancePolicies', schema: InsurancePoliciesSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, InsurancepolicesController],
  providers: [
    AppService,
    InsurancepolicesService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
