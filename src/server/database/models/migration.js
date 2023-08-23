import { model, Schema } from 'mongoose';

const migrationSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: { createdAt: true, updatedAt: false}});

const migrationModel = model('migration', migrationSchema);

export default migrationModel;
