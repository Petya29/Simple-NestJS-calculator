import * as mongoose from 'mongoose';

export const calcSchema = new mongoose.Schema({
    val1: String,
    val2: String,
    calcOption: String,
    numberType: String,
    result: String
})