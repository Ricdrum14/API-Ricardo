interface DatabaseConfig {
    host: string;
    port: string;
    user: string;
    password: string;
    bdname: string;
}

interface Config {
    ACCESS_TOKEN_SECRET: string;
    BDD: DatabaseConfig;
}

const config: Config = {
  ACCESS_TOKEN_SECRET: "EMMA123",
  BDD: {
    host: "dpg-d4i4pr95pdvs739jg100-a.oregon-postgres.render.com",
    port: "5432",
    user: "pollution_wsrw_user",
    password: "JQ8xRJIycJi09rX6ni8WW3nEt7JoGt7b",
    bdname: "pollution_wsrw"
  }

};

export default config;