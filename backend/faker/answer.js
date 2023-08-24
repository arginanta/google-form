import { faker } from "@faker-js/faker"
import Answer from "../models/Answer.js"

const run = async (limit) => {
  try {
    let data = []
    for (let i = 0; i < limit; i++) {
      data.push({
        '63f19abd2d419da045d310ba': faker.name.fullName(),
        '63f19ac82d419da045d310bc': faker.helpers.arrayElement(['31']),
        '63f19aca2d419da045d310be': faker.helpers.arrayElements(['Merah', 'kuning', 'Hijau', 'Putih']),
        'formId': '63ef6d640fe552412d5a5ca8',
        'userId': '63eea88e9a41fdff35950e1e'
      })
    }

    const fakeData = await Answer.insertMany(data)
    if(fakeData){
      console.log(fakeData)
      process.exit()
    }

  } catch (error) {
    console.log(error)
    process.exit()
  }
}

export { run }