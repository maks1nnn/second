 
 
import {ObjectId, WithId, Document } from 'mongodb';

export const checkEmailOrLoginMock  = {
    async findByEmailOrLogin(loginOrEmail: string): Promise<WithId<Document> | null> {
      // Имитируем базу данных "в памяти"
      const mockUsers: WithId<Document>[] = [
        { _id: new ObjectId(), login: 'user1', email: 'user1@test.com',passwordHash: 'string' },
        
      ];
  
      // Ищем пользователя по логину или email
      const foundUser = mockUsers.find(
        (user) => user.login === loginOrEmail || user.email === loginOrEmail
      );
  
      return foundUser || null;
    },
}