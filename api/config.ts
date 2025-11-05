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
    host: "dpg-d41mvg24d50c73eto4vg-a.singapore-postgres.render.com",
    port: "5432",
    user: "pollution_bpbo_user",
    password: "2BZl1iWB49PZmtA2ZkYkZCmtI9U4Jcur",
    bdname: "pollution_bpbo"
  }
};

export default config;