export interface Task{
    _id:BigInteger|undefined|null,
    title:String,
    description:String,
    date:Date,
    status:String
}

const HOST_NAME = 'http://192.168.1.149:5000'

export default HOST_NAME