import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pavel',
      database: 'redistrainbd',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
