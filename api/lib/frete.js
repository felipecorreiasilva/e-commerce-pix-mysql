const axios = require('axios');
require('dotenv').config()

const calcFrete = async(args) => {
    
    const options = {
        method: 'POST',
        url: 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ENV_TOKEN}`,
          'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
        },
        data: {
          from: {postal_code: process.env.ENV_MY_CEP},
          to: {postal_code: `${args.cep}`},
          package: {
            height: args.height,
            width: args.width, 
            length: args._length,
            weight: args.weight,
          }
        }
      }
      
      const result = await axios.request(options)

      return result
    
      
}

module.exports = {
    calcFrete
}