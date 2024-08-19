import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { Task, TaskStatus, TaskPriority } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    // If users collections is empty, seed it
    const userCounts = await this.userModel.countDocuments();
    if (userCounts === 0) {
      for (var x = 0; x < 5; x++) {
        let newUser = {
          name: faker.person.fullName(),
          email: faker.internet.email().toLocaleLowerCase(),
          password: await bcrypt.hash('0415@User#', 11),
          isEnabled: false,
          image: faker.image.url({ height: 100, width: 100 }),
          role: x === 0 ? 'Admin' : 'User',
        };
        let saveThisUser = new this.userModel(newUser);
        console.log('New User', newUser.name);
        await saveThisUser.save();
      }
      let adminUser = {
        name: 'Eric Thomas D. Cabigting',
        email: 'erictestemail@gmail.com',
        password: await bcrypt.hash('tester123@Admin#', 11),
        isEnabled: false,
        image: faker.image.url({ height: 100, width: 100 }),
        role: 'Admin',
      };
      let saveThisUser = new this.userModel(adminUser);
      console.log('New User', adminUser.name);
      await saveThisUser.save();
      console.log('Database seeded with initial users');
    } else {
      console.log(
        'Database already contains users, skipping seeding users collection',
      );
    }

    // If task collections is empty, seed it
    const taskCounts = await this.taskModel.countDocuments();
    if (taskCounts === 0) {
      let tasks = [];
      const userIDs = await this.userModel.find().select('_id name');
      for (var x = 0; x < 200; x++) {
        let randomUserCreator = faker.helpers.arrayElement(userIDs);
        let randomUserAssignee = faker.helpers.arrayElement(userIDs);
        let newTask = {
          title: faker.lorem.sentences(1),
          description: faker.lorem.sentences(4),
          dueDate: faker.date.future({ refDate: new Date() }),
          status: faker.helpers.enumValue(TaskStatus),
          assignedToName: randomUserAssignee.name,
          assignedToId: randomUserAssignee.id,
          createdById: randomUserCreator.id,
          createdByName: randomUserCreator.name,
          updatedById: randomUserCreator.id,
          updatedByName: randomUserCreator.name,
          Priority: faker.helpers.enumValue(TaskPriority),
          isDeleted: false,
        };
        let saveThisTask = new this.taskModel(newTask);
        console.log(
          `Adding New Task ${newTask.title} isDeleted:${newTask.isDeleted}`,
        );
        await saveThisTask.save();
      }
    } else {
      console.log(
        'Database already contains tasks, skipping seeding tasks collection',
      );
    }
  }
}
