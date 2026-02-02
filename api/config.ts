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
    host: "dpg-d60f7gngi27c73e0uj00-a.oregon-postgres.render.com",
    port: "5432",
    user: "pollution_o41x_user",
    password: "66ZV5P3PRR7Bz0lv7x8yfUqbTKCXwSDB",
    bdname: "pollution_o41x"
  }

};



export default config;