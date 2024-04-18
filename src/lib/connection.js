import { Sequelize } from "sequelize";

export const Connection = async () => {
	const sequelize = new Sequelize('teste', 'teste', '12345', {
		host: 'localhost',
		port: 3306,
		dialect: 'mysql',
		dialectModule: require('mysql2'),
	});
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
