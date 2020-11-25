import { Document } from 'mongoose';

export interface Post extends Document {
    readonly val1: String;
    readonly val2: String;
    readonly calcOption: String;
    readonly numberType: String;
    readonly result: String;
}