// import { ObjectId } from 'mongodb';
// import { postsCollection } from './../../db/mongo';
// //...

// //подготовка бд к тестам

// const post = [
//     { title: 'x4' },
//     { title: 'x5' }
// ]


// async function testDB() {
//     await postsCollection.drop()
//     const info = await postsCollection.insertMany([{ title: 'x1' }, { title: 'x2' }])

//     const insertedInfo = await postsCollection.insertMany(post)
//         (await postsCollection
//             .find({ title: 'xxx' }, { projection: { title: 1, _id: 0 } })
//             .toArray()) as { title: string, insertedId: number}[]
//     await postsCollection.findOne({ _id:  })
//     await postsCollection.updateOne({ _id: insertedInfo.insertedId }, {
//         $set: { title: 'x4' }
//     })
// //осьтановился на разборе этого участка кода
//     await postsCollection.deleteOne({ _id: insertedInfo.insertedId })

//     new ObjectId(req.params.id)
//     createdInfo.id.toString()

// }

//не получилось подключиться к mongoDB
