import mongoose from 'mongoose';

export const startTransaction = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};
export const commitTransaction = async (session) => {
  await session.commitTransaction();
  await session.endSession();
};
export const abortTransaction = async (session) => {
  await session.abortTransaction();
  await session.endSession();
};
