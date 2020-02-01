const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('constructor need file name');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8'
      })
    );
  }
  async create(attrs) {
    attrs.id = this.getRandomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  async getOne(id) {
    const records = await this.getAll();
    return records.find(user => user.id === id);
  }
  async deleteOne(id) {
    const records = await this.getAll();
    const newRecords = records.filter(user => user.id !== id);
    await this.writeAll(newRecords);
    return newRecords;
  }
  getRandomId() {
    return crypto.randomBytes(4).toString('hex');
  }
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(user => user.id === id);
    if (!record) {
      throw new Error('we cound not find this user');
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }
  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}
module.exports = new UsersRepository('users.json');
// const test = async () => {
//   const repo = new UsersRepository('users.json');
//   // await repo.create({ email: 'bashiroghlu@gmail.com', password: '12345' });
//   // let user = await repo.getOne('a4963f47');
//   // let user = await repo.update('ec235127', {
//   //   password: 'ec235127'
//   // });
//   let user = await repo.getOneBy({
//     password: 'ec23s5127',
//     email: 'afsfas@gmail.com'
//   });
//   console.log(user);
// };

// test();
