const format = function (name: string) {
    return `ENV ${name} is empty or does not found`;
}

export const ENV_LIST = [
    'DB_NAME',
    'DB_PORT',
    'DB_HOST',
    'DB_USERNAME',
    'DB_PASSWORD',
    'JWT_SECRET_KEY'
];

export default async () => {
    if(!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
    if(!process.env.PORT) process.env.PORT = '80';
    for(const env of ENV_LIST) {
        if(!process.env[env]) throw new Error(format(env))
    }
}

