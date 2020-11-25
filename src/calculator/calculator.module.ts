import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { calcSchema } from '../calc/schemas/calc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: calcSchema}])], // for PostModel available
  providers: [CalculatorService],
  controllers: [CalculatorController]
})
export class CalculatorModule {}
