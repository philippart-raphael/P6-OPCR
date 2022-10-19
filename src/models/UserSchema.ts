import { Schema, model } from 'mongoose';
import { UserSchemaType } from './UserSchema.type';
import uniqValidator from 'mongoose-unique-validator';
// @ts-ignore
import mongooseErrors from 'mongoose-errors';

const schema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}

const UserSchema = new Schema<UserSchemaType>(schema,{ versionKey: false });

UserSchema.plugin(mongooseErrors);
UserSchema.plugin(uniqValidator);

export default model('User', UserSchema);
