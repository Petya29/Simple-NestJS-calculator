import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../calc/interfaces/calc-result.interface';
import { CreateResultDTO } from '../calc/dto/create-result.dto';
import { complex, add, multiply, re, im } from 'mathjs';

@Injectable()
export class CalculatorService {

    constructor(@InjectModel('Post') private readonly postModel : Model<Post>) { }

    async getResults(): Promise<Post[]> {
        const results = await this.postModel.find().exec();
        return results;
    }

    async getResult(resultID: any): Promise<Post> {
        const result = await this.postModel.findById(resultID).exec();
        return result;
    }

    async addResult(CreateResultDTO: CreateResultDTO) : Promise<Post> {
        let result
        let val1 = CreateResultDTO.val1
        let val2 = CreateResultDTO.val2
        if(CreateResultDTO.numberType === 'simple' ){
            switch(CreateResultDTO.calcOption){
                case "+": result = Number(val1) + Number(val2)
                break;
                case "-": result = Number(val1) - Number(val2)
                break;
                case "*": result = Number(val1) * Number(val2)
                break;
                case "/": result = Number(val1) / Number(val2)
                break;
            }
            CreateResultDTO.result = result
        }else if(CreateResultDTO.numberType === 'complex' ){
            switch(CreateResultDTO.calcOption){
                case "+": result = add(complex(val1.toString()), complex(val2.toString()));
                break;
                case "-": result = complexMinus(val1, val2);
                break;
                case "*": result = multiply(complex(val1.toString()), complex(val2.toString()));
                break;
                case "/": result = complexSplit(val1, val2);
                break;
            }
            CreateResultDTO.result = result
        }
        const newResult = new this.postModel(CreateResultDTO);
        return await newResult.save();
    }

    async deleteResult(resultID) : Promise<any> {
        const deletedResult = await this.postModel.findByIdAndRemove(resultID);
        return deletedResult;
    }

}

function complexMinus(a, b) {
    let reResult = (Number(re(complex(a.toString()))) - Number(re(complex(b.toString())))).toString();
    let imResult = (Number(im(complex(a.toString()))) - Number(im(complex(b.toString())))).toString();
    if((Number(reResult) > 0 || Number(reResult) < 0) && Number(imResult) > 0){
        return reResult + '+' + imResult + 'i';
    }else if(Number(imResult) < 0){
        return reResult + imResult + 'i';
    }else if(Number(reResult) === 0){
        return imResult + 'i';
    }else if(Number(imResult) === 0){
        return reResult;
    }else if(Number(imResult) === 0 && Number(reResult) === 0){
        return 0;
    }
}

function complexSplit(a, b) {
    let reResult = (Number(re(complex(a.toString()))) / Number(re(complex(b.toString())))).toString();
    let imResult = (Number(im(complex(a.toString()))) / Number(im(complex(b.toString())))).toString();
    if((Number(reResult) > 0 || Number(reResult) < 0) && Number(imResult) > 0){
        return reResult + '+' + imResult + 'i';
    }else if(Number(imResult) < 0){
        return reResult + imResult + 'i';
    }else if(Number(reResult) === 0){
        return imResult + 'i';
    }else if(Number(imResult) === 0){
        return reResult;
    }else if(Number(imResult) === 0 && Number(reResult) === 0){
        return 0;
    }
}