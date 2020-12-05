import { Document } from 'mongoose'

export interface userModel extends Document {
    readonly username: String,
    readonly password?: String
}