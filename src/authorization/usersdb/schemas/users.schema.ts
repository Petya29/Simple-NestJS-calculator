import * as mongoose from 'mongoose'

export const usersSchema = new mongoose.Schema({
    username: String,
    password: String
})