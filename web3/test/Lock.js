let obj = {
  url: process.env.POLYGON_RPC_URL,
  accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
}


console.log(process.env.POLYGON_RPC_URL);