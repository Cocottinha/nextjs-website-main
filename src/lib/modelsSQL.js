import { Sequelize } from "sequelize";

const sequelize = new Sequelize('teste', 'teste', '12345',
{
    dialect:'mysql',
    dialectModule: require('mysql2')
})
export const User = sequelize.define('users',
{
    id_user:{type:Int32Array, autoIncrement:true, primaryKey:true, allowNull:false},
    username:{type:String, allowNull:false},
    email:{type:String, allowNull:false},
    password:{type:String, allowNull:false},
    isAdmin:{type:Boolean, defaultValue:false},
    isBlocked:{type:Boolean, defaultValue:false},
    lastLogin:{type:Date},
    lastPasswordChange:{type:Date}
},
{
    timestamps:false
});
console.log("Connected To DB!");
