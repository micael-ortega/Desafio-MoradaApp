import { Module } from '@nestjs/common';
import { Crypt } from './crypt';
import { CryptImpl } from './crypt.impl';

@Module({
  providers: [
    {
      provide: Crypt,
      useClass: CryptImpl,
    },
  ],

  exports: [Crypt],
})
export class CryptModule {}
