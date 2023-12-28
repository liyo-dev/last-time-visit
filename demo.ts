//Deno demo **************************************

//Crear la base de datos *************************
// const db = await Deno.openKv()

//INSERT *****************************************
// const user = 'liyodev'
// const result = await db.set(["username"], user)
// console.log(result)

//SELECT *****************************************
// const username = await db.get(["username"])
// console.log(username)

// await db.set(["counter"], 0)
// const { value } = await db.get<number>(["counter"])
// console.log(value)
// const newCounter = value == null ? 0 : value +1
// await db.set(["counter"], newCounter)
// const result = await db.get(["counter"])
// console.log(result)


// await db.set(["visits"], new Deno.KvU64(0n))
// await db
//   .atomic()
//   .sum(["visits"], 1n)
//   .commit()
//
// const result = await db.get(["visits"])
// console.log(result)


// const preferencesLiyodev = {
//   username: "liyodev",
//   theme: "light",
//   language: "es-ES",
// }
//
// const preferencesAnyUser = {
//   username: "anyUser",
//   theme: "dark",
//   language: "en-EN",
// }
//
// await db.set(["preferences", "liyodev"], preferencesLiyodev)
// await db.set(["preferences", "anyUser"], preferencesAnyUser)

// const [
//   preferencesLiyodev,
//   preferencesAnyUser
// ] = await db.getMany([["preferences", "liyodev"], ["preferences", "anyUser"]])

// const entries = db.list({ prefix: ["preferences"] })

// const result = await db.get(["preferences", "liyodev"])

// for await (const entry of entries){
//   console.log(entry)
// }


// await db.delete(["preferences", "anyUser"])

// for await (const entry of entries){
//   console.log(entry)
// }
