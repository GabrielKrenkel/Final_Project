const { User } = require("./src/db/models");

(async () => {
    let { name, email, phone, password } = require('minimist')(process.argv.slice(2));
    
    password = password.toString();

    try {
        await User.create({ name, email, phone, password, role: "dev" });

        console.log(`Dev com o email: ${email} e senha: ${password} foi criado`);
    } catch (error) {
        console.log("Dev criado com sucesso");
        console.log(error);
    }
})();


// node .\generateDev.js --name=DiegoF --email=dev@dev --phone=47988848888 --password=123456
