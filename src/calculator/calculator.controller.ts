import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Delete, Request, Render, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CreateResultDTO } from '../calc/dto/create-result.dto';
import { ValidateObjectId} from '../../shared/pipes/validate-object-id.pipes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('calculates')
@Controller('calculator')
export class CalculatorController {

    constructor( private calculatorService: CalculatorService) { }

    @Get('results')
    async getResults(@Res() res) {
        const results = await this.calculatorService.getResults();
        return res.status(HttpStatus.OK).json(results);
    }

    @Get('result/:resultID')
    async getResult(@Res() res, @Param('resultID', new ValidateObjectId()) resultID) {

        const result = await this.calculatorService.getResult(resultID);

        if(!result){
            throw new NotFoundException('Result does not exist');
        }

        return res.status(HttpStatus.OK).json({message: 'your result', post: result});
    }

    @Post('/')
    async createResult(@Res() res, @Body() createResultDTO: CreateResultDTO,@Query() query: CreateResultDTO) {
            const newResult = await this.calculatorService.addResult(createResultDTO);
            let hbsResult = newResult.result;
            return res.status(HttpStatus.OK).render('index', {hbsResult});
    }

    @Delete('delete/:resultID')
        async deleteResult(@Res() res, @Param('resultID', new ValidateObjectId()) resultID){
            const deletedResult = await this.calculatorService.deleteResult(resultID);
            if(!deletedResult){
                throw new  NotFoundException('Result does nor exist !');
            }
            return res.status(HttpStatus.OK).json({message: 'Result has been deleted !'})
    }

}
